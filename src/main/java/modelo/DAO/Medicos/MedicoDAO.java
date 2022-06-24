package modelo.DAO.Medicos;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mysql.cj.jdbc.MysqlDataSource;
import modelo.General.Citas;
import modelo.Localidades.Localidades;
import modelo.Medicos.Medico;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import javax.sql.DataSource;

public class MedicoDAO {

    private MedicoDAO() {
        this.ds = new MysqlDataSource();
        MysqlDataSource mds = (MysqlDataSource) ds;

        try {
            Properties prop = new Properties();
            prop.loadFromXML(getClass().getResourceAsStream(ARCHIVO_CONFIGURACION));
            mds.setURL(String.format("%s//%s/%s",
                    prop.getProperty("protocol"),
                    prop.getProperty("server_url"),
                    prop.getProperty("database")
            ));
            mds.setUser(prop.getProperty("user"));
            mds.setPassword(prop.getProperty("password"));

            mds.setUseSSL(false);
            mds.setAllowPublicKeyRetrieval(true);

        } catch (IOException | NumberFormatException | SQLException ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
    }

    public static MedicoDAO obtenerInstancia() {
        if (instancia == null) {
            instancia = new MedicoDAO();
        }
        return instancia;
    }

    public void crearMedico(String medic) {

        Gson gson = new Gson();
        Medico medico = gson.fromJson(medic, Medico.class);

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(CREAR_MEDICO)) {

            pst.setInt(1, medico.getCedula());
            pst.setString(2, medico.getNombre());
            pst.setString(3, medico.getApellido());
            pst.setString(4, medico.getClave());
            pst.setString(5, medico.getEmail());
            pst.setObject(6, gson.toJson(medico.getEspecialidades()));
            pst.setFloat(7, medico.getCostoConsulta());
            pst.setObject(8, gson.toJson(medico.getLocalidades()));
            pst.setObject(9, gson.toJson(medico.getCitas()));
            pst.setString(10, medico.getResena());
            pst.setString(11, medico.getFoto());
            pst.setString(12, medico.getEstado());

            pst.executeUpdate();
            System.out.println("Se registró el medico correctamente");
            cnx.close();

        } catch (Exception ex) {
            System.out.println("Error al registrar a el medico");
            System.out.println(ex.getMessage());
        }
    }

    public void borrar_Medico(int cedula) {

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(BORRAR_MEDICO)) {

            pst.setInt(1, cedula);

            pst.executeUpdate();

            cnx.close();

        } catch (Exception ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
    }

    public Medico getMedicoID(String cedula) {

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(CONSULTA_MEDICO_POR_ID);) {

            Medico medico = new Medico();

            Gson gson = new Gson();

            int ced = gson.fromJson(cedula, int.class
            );

            pst.setInt(1, ced);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {

                medico.setCedula(rs.getInt(1));
                medico.setNombre(rs.getString(2));
                medico.setApellido(rs.getString(3));
                medico.setClave(rs.getString(4));
                medico.setEmail(rs.getString(5));

                if (rs.getObject(6) != null) {

                    ArrayList<String> list = gson.fromJson(rs.getString(6), ArrayList.class
                    );

                    medico.setEspecialidades(list);

                } else {
                    ArrayList<String> list = new ArrayList<>();
                    medico.setEspecialidades(list);
                }

                medico.setCostoConsulta(rs.getFloat(7));

                if (rs.getObject(8) != null) {

                    java.lang.reflect.Type typeMyType = new TypeToken<ArrayList<Localidades>>() {
                    }.getType();

                    ArrayList<Localidades> list = gson.fromJson(rs.getString(8), typeMyType);

                    medico.setLocalidades(list);

                } else {
                    medico.setLocalidades(null);
                }

                if (rs.getObject(9) != null) {

                    java.lang.reflect.Type typeMyType = new TypeToken<ArrayList<Citas>>() {
                    }.getType();

                    ArrayList<Citas> list2 = gson.fromJson(rs.getString(9), typeMyType);
                    //Borrar String fecha, String hora, String lugarDeCita, String disponibilidad
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");  
                    SimpleDateFormat formatter2 = new SimpleDateFormat("HH:mm");  
                    Date date = new Date();  
                    Citas c = new Citas(formatter.format(date), formatter2.format(date), "San Jose", "No Disponible");
                    list2.add(c);

                    medico.setCitas(list2);

                } else {
                    ArrayList<Citas> list2 = new ArrayList<>();
                    medico.setCitas(list2);
                }

                medico.setResena(rs.getString(10));
                medico.setFoto(rs.getString(11));
                medico.setEstado(rs.getString(12));

            }
            
            cnx.close();
            System.out.println("Se encontró a el medico");
            return medico;

        } catch (Exception ex) {
            Medico medico = new Medico();

            System.out.println("Error al encontrar al medico");
            System.out.println(ex.getMessage());

            return medico;
        }

    }

    public void editarMedicos(Medico medico) {

        Gson gson = new Gson();

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(EDITAR_MEDICO)) {

            String espe = gson.toJson(medico.getEspecialidades());
            String loca = gson.toJson(medico.getLocalidades());
            String cit = gson.toJson(medico.getCitas());

            pst.setInt(1, medico.getCedula());
            pst.setString(2, medico.getNombre());
            pst.setString(3, medico.getApellido());
            pst.setString(4, medico.getClave());
            pst.setString(5, medico.getEmail());
            pst.setString(6, espe);
            pst.setFloat(7, medico.getCostoConsulta());
            pst.setString(8, loca);
            pst.setString(9, cit);
            pst.setString(10, medico.getResena());
            pst.setString(11, medico.getFoto());
            pst.setString(12, medico.getEstado());
            pst.setInt(13, medico.getCedula());

            pst.executeUpdate();

            cnx.close();

        } catch (Exception ex) {
            System.out.println("Error al actualizar al medico");
            System.out.println(ex.getMessage());
        }
    }

    public List<Medico> getAllMedicos() throws SQLException {
        List<Medico> r = new ArrayList<>();
        Gson gson = new Gson();

        try ( Connection cnx = ds.getConnection();  Statement stm = cnx.createStatement();  ResultSet rs = stm.executeQuery(CONSULTA_MEDICOS)) {
            while (rs.next()) {
                Medico medico = new Medico();

                medico.setCedula(rs.getInt(1));
                medico.setNombre(rs.getString(2));
                medico.setApellido(rs.getString(3));
                medico.setClave(rs.getString(4));
                medico.setEmail(rs.getString(5));

                if (rs.getObject(6) != null) {

                    ArrayList<String> list = gson.fromJson(rs.getString(6), ArrayList.class
                    );

                    medico.setEspecialidades(list);

                } else {
                    ArrayList<String> list = new ArrayList<>();
                    medico.setEspecialidades(list);
                }

                medico.setCostoConsulta(rs.getFloat(7));

                if (rs.getObject(8) != null) {

                    java.lang.reflect.Type typeMyType = new TypeToken<ArrayList<Localidades>>() {
                    }.getType();

                    ArrayList<Localidades> list = gson.fromJson(rs.getString(8), typeMyType);

                    medico.setLocalidades(list);

                } else {
                    medico.setLocalidades(null);
                }

                if (rs.getObject(9) != null) {

                    java.lang.reflect.Type typeMyType = new TypeToken<ArrayList<Citas>>() {
                    }.getType();

                    ArrayList<Citas> list2 = gson.fromJson(rs.getString(9), typeMyType);

                    medico.setCitas(list2);

                } else {
                    medico.setCitas(null);
                }
                medico.setResena(rs.getString(10));
                medico.setFoto(rs.getString(11));
                medico.setEstado(rs.getString(12));

                r.add(medico);

            }
            cnx.close();
        } catch (Exception ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
        return r;
    }

    private static final String ARCHIVO_CONFIGURACION
            = "../configuraciones.properties";
    private static final String CONSULTA_MEDICOS
            = "SELECT * FROM prueba.medicos ORDER BY cedula; ";
    private static final String CONSULTA_MEDICO_POR_ID
            = "select * from medicos where cedula = ?";
    private static final String BORRAR_MEDICO
            = "DELETE FROM prueba.medicos WHERE cedula = ?; ";
    private static final String CREAR_MEDICO
            = "insert into medicos(cedula,nombre,apellido,clave,email,especialidades,costoConsulta,localidades,citas,descripcion, foto, estado)" + "values(?,?,?,?,?,?,?,?,?,?,?,?)";
    private static final String EDITAR_MEDICO
            = "UPDATE medicos SET  cedula = ?, nombre = ?, apellido = ?, clave = ?, email = ?, especialidades = ?, costoConsulta = ?, localidades = ?, citas = ?, descripcion = ?, foto = ?, estado = ? where cedula = ?";
    private static MedicoDAO instancia = null;

    private final DataSource ds;
}
