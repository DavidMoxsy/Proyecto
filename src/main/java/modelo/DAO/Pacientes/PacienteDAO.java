package modelo.DAO.Pacientes;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mysql.cj.jdbc.MysqlDataSource;
import modelo.General.Citas;
import modelo.Pacientes.Paciente;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import javax.sql.DataSource;

public class PacienteDAO {

    private PacienteDAO() {
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

    public static PacienteDAO obtenerInstancia() {
        if (instancia == null) {
            instancia = new PacienteDAO();
        }
        return instancia;
    }

    public void crearPaciente(String medic) {

        Gson gson = new Gson();
        Paciente paciente = gson.fromJson(medic, Paciente.class);

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(CREAR_PACIENTE)) {

            pst.setInt(1, paciente.getCedula());
            pst.setString(2, paciente.getNombre());
            pst.setString(3, paciente.getApellido());
            pst.setString(4, paciente.getClave());
            pst.setString(5, paciente.getEmail());
            pst.setObject(6, gson.toJson(paciente.getCitas()));
            pst.setString(7, paciente.getResena());
            pst.setString(8, paciente.getFoto());
            pst.setInt(1, paciente.getCedula());

            pst.executeUpdate();
            System.out.println("Se registró el paciente correctamente");
            cnx.close();

        } catch (Exception ex) {
            System.out.println("Error al registrar a el paciente");
            System.out.println(ex.getMessage());
        }
    }

    public void borrar_Paciente(int cedula) {

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(BORRAR_PACIENTE)) {

            pst.setInt(1, cedula);

            pst.executeUpdate();

            cnx.close();

        } catch (Exception ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
    }

    public Paciente getPacienteID(String cedula) {

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(CONSULTA_PACIENTE_POR_ID);) {

            Paciente paciente = new Paciente();

            Gson gson = new Gson();

            int ced = gson.fromJson(cedula, int.class
            );

            pst.setInt(1, ced);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {

                paciente.setCedula(rs.getInt(1));
                paciente.setNombre(rs.getString(2));
                paciente.setApellido(rs.getString(3));
                paciente.setClave(rs.getString(4));
                paciente.setEmail(rs.getString(5));

                if (rs.getObject(6) != null) {

                    java.lang.reflect.Type typeMyType = new TypeToken<ArrayList<Citas>>() {
                    }.getType();

                    ArrayList<Citas> list2 = gson.fromJson(rs.getString(6), typeMyType);

                    paciente.setCitas(list2);

                } else {
                    ArrayList<Citas> list2 = new ArrayList<>();
                    paciente.setCitas(list2);
                }
                paciente.setResena(rs.getString(7));
                paciente.setFoto(rs.getString(8));

            }

            cnx.close();
            System.out.println("Se encontró a el paciente");
            return paciente;

        } catch (Exception ex) {
            Paciente paciente = new Paciente();

            System.out.println("Error al encontrar al paciente");
            System.out.println(ex.getMessage());

            return paciente;
        }

    }

    public void editarPacientes(Paciente paciente) {

        Gson gson = new Gson();

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(EDITAR_PACIENTE)) {

            String cit = gson.toJson(paciente.getCitas());

            pst.setInt(1, paciente.getCedula());
            pst.setString(2, paciente.getNombre());
            pst.setString(3, paciente.getApellido());
            pst.setString(4, paciente.getClave());
            pst.setString(5, paciente.getEmail());
            pst.setString(6, cit);
            pst.setString(7, paciente.getResena());
            pst.setString(8, paciente.getFoto());
            pst.setInt(9, paciente.getCedula());

            pst.executeUpdate();

            cnx.close();

        } catch (Exception ex) {
            System.out.println("Error al actualizar al paciente");
            System.out.println(ex.getMessage());
        }
    }

    public List<Paciente> getAllPacientes() throws SQLException {
        List<Paciente> r = new ArrayList<>();
        Gson gson = new Gson();

        try ( Connection cnx = ds.getConnection();  Statement stm = cnx.createStatement();  ResultSet rs = stm.executeQuery(CONSULTA_PACIENTES)) {
            while (rs.next()) {
                Paciente paciente = new Paciente();

                paciente.setCedula(rs.getInt(1));
                paciente.setNombre(rs.getString(2));
                paciente.setApellido(rs.getString(3));
                paciente.setClave(rs.getString(4));
                paciente.setEmail(rs.getString(5));

                if (rs.getObject(6) != null) {

                    java.lang.reflect.Type typeMyType = new TypeToken<ArrayList<Citas>>() {
                    }.getType();

                    ArrayList<Citas> list2 = gson.fromJson(rs.getString(6), typeMyType);

                    paciente.setCitas(list2);

                } else {
                    paciente.setCitas(null);
                }
                paciente.setResena(rs.getString(7));
                paciente.setFoto(rs.getString(8));

                r.add(paciente);

            }
            cnx.close();
        } catch (Exception ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
        return r;
    }

    private static final String ARCHIVO_CONFIGURACION
            = "../configuraciones.properties";
    private static final String CONSULTA_PACIENTES
            = "SELECT * FROM prueba.pacientes ORDER BY cedula; ";
    private static final String CONSULTA_PACIENTE_POR_ID
            = "SELECT * FROM pacientes WHERE cedula = ?";
    private static final String BORRAR_PACIENTE
            = "DELETE FROM prueba.pacientes WHERE cedula = ?; ";
    private static final String CREAR_PACIENTE
            = "INSERT INTO prueba.pacientes(cedula,nombre,apellido,clave,email,citas, descripcion, foto)" + "values(?,?,?,?,?,?,?,?)";
    private static final String EDITAR_PACIENTE
            = "UPDATE pacientes SET  cedula = ?, nombre = ?, apellido = ?, clave = ?, email = ?, citas = ?, descripcion = ?, foto = ? WHERE cedula = ?";
    private static PacienteDAO instancia = null;

    private final DataSource ds;
}
