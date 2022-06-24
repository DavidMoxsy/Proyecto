package modelo.DAO.Especialidades;

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
import modelo.Especialidades.Especialidad;

public class EspecialidadDAO {

    private EspecialidadDAO() {
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

    public static EspecialidadDAO obtenerInstancia() {
        if (instancia == null) {
            instancia = new EspecialidadDAO();
        }
        return instancia;
    }

    public void crearEspecialidad(String espec) {

        Gson gson = new Gson();
        Especialidad especialidad = gson.fromJson(espec, Especialidad.class);

        try (Connection cnx = ds.getConnection(); PreparedStatement pst = cnx.prepareStatement(CREAR_ESPECIALIDAD)) {

            pst.setInt(1, especialidad.getId());
            pst.setString(2, especialidad.getNombre());

            pst.executeUpdate();
            System.out.println("Se registró la especialidad correctamente");
            cnx.close();

        } catch (Exception ex) {
            System.out.println("Error al registrar a la especialidad");
            System.out.println(ex.getMessage());
        }
    }

    public void borrar_Especialidad(int id) {

        try (Connection cnx = ds.getConnection(); PreparedStatement pst = cnx.prepareStatement(BORRAR_ESPECIALIDAD);) {

            pst.setInt(1, id);

            pst.executeUpdate();

            cnx.close();

            editarEspecialidad();

        } catch (Exception ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
    }

    public Especialidad getEspecialidadID(String id) {

        try (Connection cnx = ds.getConnection(); PreparedStatement pst = cnx.prepareStatement(CONSULTA_ESPECIALIDADES_POR_ID);) {

            Especialidad especialidad = new Especialidad();

            Gson gson = new Gson();

            int ced = gson.fromJson(id, int.class);

            pst.setInt(1, ced);

            ResultSet rs = pst.executeQuery();

            if (rs.next()) {

                especialidad.setId(rs.getInt(1));
                especialidad.setNombre(rs.getString(2));

            }

            cnx.close();
            System.out.println("Se encontró la especialidad");
            return especialidad;

        } catch (Exception ex) {
            Especialidad especialidad = new Especialidad();

            System.out.println("Error al encontrar la especialidad");
            System.out.println(ex.getMessage());

            return especialidad;
        }

    }

    public void editarEspecialidad(Especialidad especialidad) {

        try (Connection cnx = ds.getConnection(); PreparedStatement pst = cnx.prepareStatement(EDITAR_ESPECIALIDAD)) {

            pst.setInt(1, especialidad.getId());
            pst.setString(2, especialidad.getNombre());
            pst.setInt(3, especialidad.getId());

            pst.executeUpdate();

            cnx.close();

        } catch (Exception ex) {
            System.out.println("Error al actualizar la especialidad");
            System.out.println(ex.getMessage());
        }
    }

    public void editarEspecialidad() {

        try (Connection cnx = ds.getConnection(); PreparedStatement pst = cnx.prepareStatement(EDITAR_ESPECIALIDAD); Statement stm = cnx.createStatement(); ResultSet rs = stm.executeQuery(CONSULTA_ESPECIALIDADES)) {

            List<Especialidad> especialidades = new ArrayList<>();

            while (rs.next()) {

                Especialidad especialidad = new Especialidad();

                especialidad.setId(rs.getInt(1));

                especialidad.setNombre(rs.getString(2));

                especialidades.add(especialidad);
            }

            for (int i = 0; i < especialidades.size(); i++) {

                pst.setInt(1, i + 1);
                pst.setString(2, especialidades.get(i).getNombre());
                pst.setInt(3, especialidades.get(i).getId());

                pst.executeUpdate();
            }

            cnx.close();

        } catch (Exception ex) {
            System.out.println("Error al actualizar la especialidad");
            System.out.println(ex.getMessage());
        }
    }

    public List<Especialidad> getAllEspecialidades() throws SQLException {

        List<Especialidad> especialidades = new ArrayList<>();

        try (Connection cnx = ds.getConnection(); Statement stm = cnx.createStatement(); ResultSet rs = stm.executeQuery(CONSULTA_ESPECIALIDADES)) {

            while (rs.next()) {
                Especialidad especialidad = new Especialidad();

                especialidad.setId(rs.getInt(1));

                especialidad.setNombre(rs.getString(2));

                especialidades.add(especialidad);
            }
            cnx.close();
        } catch (Exception ex) {
            System.err.printf("Excepción: '%s'%n", ex.getMessage());
        }
        return especialidades;
    }

    private static final String ARCHIVO_CONFIGURACION
            = "../configuraciones.properties";
    private static final String CONSULTA_ESPECIALIDADES
            = "SELECT * FROM prueba.especialidades ORDER BY id; ";
    private static final String CONSULTA_ESPECIALIDADES_POR_ID
            = "SELECT * FROM prueba.especialidades WHERE id = ?";
    private static final String BORRAR_ESPECIALIDAD
            = "DELETE FROM prueba.especialidades WHERE id = ?; ";
    private static final String EDITAR_ESPECIALIDAD
            = "UPDATE prueba.especialidades SET  id = ?, nombre = ? WHERE id = ?";
    private static final String CREAR_ESPECIALIDAD
            = "INSERT INTO prueba.especialidades(id, nombre)" + "values(?,?)";
    private static EspecialidadDAO instancia = null;

    private final DataSource ds;
}
