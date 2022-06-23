package modelo.DAO.Localidades;

import com.google.gson.Gson;
import com.mysql.cj.jdbc.MysqlDataSource;
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
import modelo.Localidades.Localidades;

public class LocalidadDAO {

    private LocalidadDAO() {
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

    public static LocalidadDAO obtenerInstancia() {
        if (instancia == null) {
            instancia = new LocalidadDAO();
        }
        return instancia;
    }

    public void borrar_Localidad(int id) {

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(BORRAR_LOCALIDADES)) {

            pst.setInt(1, id);

            pst.executeUpdate();

            cnx.close();

        } catch (Exception ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
    }

    public Localidades getLocalidadID(String id) {

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(CONSULTA_LOCALIDADES_POR_ID);) {

            Localidades localidad = new Localidades();

            Gson gson = new Gson();

            int ced = gson.fromJson(id, int.class);

            pst.setInt(1, ced);

            ResultSet rs = pst.executeQuery();

            if (rs.next()) {

                localidad.setId(rs.getInt(1));
                localidad.setUbicacion(rs.getString(2));
            }

            cnx.close();
            System.out.println("Se encontró la localidad");
            return localidad;

        } catch (Exception ex) {
            Localidades localidad = new Localidades();

            System.out.println("Error al encontrar la localidad");
            System.out.println(ex.getMessage());

            return localidad;
        }

    }

    public void editarLocalidad(Localidades localidad) {

        try ( Connection cnx = ds.getConnection();  PreparedStatement pst = cnx.prepareStatement(EDITAR_LOCALIDADES)) {

            pst.setInt(1, localidad.getId());
            pst.setString(2, localidad.getUbicacion());
            pst.executeUpdate();

            cnx.close();

        } catch (Exception ex) {
            System.out.println("Error al actualizar la localidad");
            System.out.println(ex.getMessage());
        }
    }

    public List<Localidades> getAllLocalidades() throws SQLException {

        List<Localidades> localidades = new ArrayList<>();

        try ( Connection cnx = ds.getConnection();  Statement stm = cnx.createStatement();  ResultSet rs = stm.executeQuery(CONSULTA_LOCALIDADES)) {

            while (rs.next()) {
                Localidades localidad = new Localidades();

                localidad.setId(rs.getInt(1));

                localidad.setUbicacion(rs.getString(2));

                localidades.add(localidad);
            }
            cnx.close();
        } catch (Exception ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
        return localidades;
    }

    private static final String ARCHIVO_CONFIGURACION
            = "../configuraciones.properties";
    private static final String CONSULTA_LOCALIDADES
            = "SELECT * FROM prueba.localidades ORDER BY id; ";
    private static final String CONSULTA_LOCALIDADES_POR_ID
            = "SELECT * FROM prueba.localidades WHERE id = ?";
    private static final String BORRAR_LOCALIDADES
            = "DELETE FROM prueba.localidades WHERE id = ?; ";
    private static final String EDITAR_LOCALIDADES
            = "UPDATE prueba.localidades SET  id = ?,nombre = ? where id = ?";
    private static LocalidadDAO instancia = null;

    private final DataSource ds;
}
