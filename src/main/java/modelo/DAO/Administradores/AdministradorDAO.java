package modelo.DAO.Administradores;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mysql.cj.jdbc.MysqlDataSource;
import modelo.General.Citas;
import modelo.Administradores.Administrador;
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

public class AdministradorDAO {

    private AdministradorDAO() {
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

    public static AdministradorDAO obtenerInstancia() {
        if (instancia == null) {
            instancia = new AdministradorDAO();
        }
        return instancia;
    }

    public void crearAdministrador(String medic) {

        Gson gson = new Gson();
        Administrador administrador = gson.fromJson(medic, Administrador.class);

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(CREAR_ADMINISTRADOR)) {

            pst.setInt(1, administrador.getCedula());
            pst.setString(2, administrador.getNombre());
            pst.setString(3, administrador.getApellido());
            pst.setString(4, administrador.getClave());
            pst.setString(5, administrador.getEmail());
            pst.setString(6, administrador.getResena());
            pst.setString(7, administrador.getFoto());
            pst.setInt(1, administrador.getCedula());

            pst.executeUpdate();
            System.out.println("Se registró el administrador correctamente");
            cnx.close();

        } catch (Exception ex) {
            System.out.println("Error al registrar a el administrador");
            System.out.println(ex.getMessage());
        }
    }

    public void borrar_Administrador(int cedula) {

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(BORRAR_ADMINISTRADOR)) {

            pst.setInt(1, cedula);

            pst.executeUpdate();

            cnx.close();

        } catch (Exception ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
    }

    public Administrador getAdministradorID(String cedula) {

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(CONSULTA_ADMINISTRADOR_POR_ID);) {

            Administrador administrador = new Administrador();

            Gson gson = new Gson();

            int ced = gson.fromJson(cedula, int.class
            );

            pst.setInt(1, ced);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {

                administrador.setCedula(rs.getInt(1));
                administrador.setNombre(rs.getString(2));
                administrador.setApellido(rs.getString(3));
                administrador.setClave(rs.getString(4));
                administrador.setEmail(rs.getString(5));
                administrador.setResena(rs.getString(6));
                administrador.setFoto(rs.getString(7));

            }

            cnx.close();
            System.out.println("Se encontró a el administrador");
            return administrador;

        } catch (Exception ex) {
            Administrador administrador = new Administrador();

            System.out.println("Error al encontrar al administrador");
            System.out.println(ex.getMessage());

            return administrador;
        }

    }

    public void editarAdministradores(Administrador administrador) {


        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(EDITAR_ADMINISTRADOR)) {

            pst.setInt(1, administrador.getCedula());
            pst.setString(2, administrador.getNombre());
            pst.setString(3, administrador.getApellido());
            pst.setString(4, administrador.getClave());
            pst.setString(5, administrador.getEmail());
            pst.setString(6, administrador.getResena());
            pst.setString(7, administrador.getFoto());
            pst.setInt(8, administrador.getCedula());

            pst.executeUpdate();

            cnx.close();

        } catch (Exception ex) {
            System.out.println("Error al actualizar al administrador");
            System.out.println(ex.getMessage());
        }
    }

    public List<Administrador> getAllAdministradores() throws SQLException {
        List<Administrador> r = new ArrayList<>();
        Gson gson = new Gson();

        try ( Connection cnx = ds.getConnection();  Statement stm = cnx.createStatement();  ResultSet rs = stm.executeQuery(CONSULTA_ADMINISTRADORES)) {
            while (rs.next()) {
                Administrador administrador = new Administrador();

                administrador.setCedula(rs.getInt(1));
                administrador.setNombre(rs.getString(2));
                administrador.setApellido(rs.getString(3));
                administrador.setClave(rs.getString(4));
                administrador.setEmail(rs.getString(5));
                administrador.setResena(rs.getString(6));
                administrador.setFoto(rs.getString(7));

                r.add(administrador);

            }
            cnx.close();
        } catch (Exception ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
        return r;
    }

    private static final String ARCHIVO_CONFIGURACION
            = "../configuraciones.properties";
    private static final String CONSULTA_ADMINISTRADORES
            = "SELECT * FROM prueba.administradores ORDER BY id; ";
    private static final String CONSULTA_ADMINISTRADOR_POR_ID
            = "SELECT * FROM administradores WHERE id = ?";
    private static final String BORRAR_ADMINISTRADOR
            = "DELETE FROM prueba.administradores WHERE id = ?; ";
    private static final String CREAR_ADMINISTRADOR
            = "INSERT INTO prueba.administradores(id,nombre,apellido,clave,email, descripcion, foto)" + "values(?,?,?,?,?,?,?)";
    private static final String EDITAR_ADMINISTRADOR
            = "UPDATE prueba.administradores SET  id = ?, nombre = ?, apellido = ?, clave = ?, email = ?, descripcion = ?, foto = ? WHERE id = ?";
    private static AdministradorDAO instancia = null;

    private final DataSource ds;
}
