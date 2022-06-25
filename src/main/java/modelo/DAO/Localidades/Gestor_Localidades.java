package modelo.DAO.Localidades;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.util.List;
import java.util.Properties;
import modelo.Localidades.Conjunto_Localidades;
import modelo.Localidades.Conjunto_LocalidadesW;
import modelo.Localidades.Localidades;

public class Gestor_Localidades {

    public Gestor_Localidades() {
        if (configuracion == null) {
            configuracion = new Properties();
            try {
                configuracion.load(getClass().getResourceAsStream("configuraciones.properties"));
            } catch (IOException ex) {
                System.out.printf("Excepción: '%s'%n", ex.getMessage());
            }
        }
    }

    public String datosJSON() {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(new Conjunto_LocalidadesW(datosLocalidades()));
    }

    public String datosJSON(String id) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(datosLocalidadesID(id));
    }

    public void crearLocalidad(String especialidad) {
        LocalidadDAO dao = LocalidadDAO.obtenerInstancia();
        dao.crearLocalidad(especialidad);
    }

    public Conjunto_Localidades datosLocalidades() {
        Conjunto_Localidades r = new Conjunto_Localidades();
        try {
            LocalidadDAO dao = LocalidadDAO.obtenerInstancia();
            List<Localidades> datos = dao.getAllLocalidades();
            for (int i = 0; i < datos.size(); i++) {
                r.agregar(datos.get(i));
            }
        } catch (Exception ex) {
            System.out.printf("Excepción: '%s'%n", ex.getMessage());
        }

        return r;
    }

    public Localidades datosLocalidadesID(String id) {

        try {
            LocalidadDAO dao = LocalidadDAO.obtenerInstancia();
            Localidades dato = dao.getLocalidadID(id);
            return dato;

        } catch (Exception ex) {
            System.out.printf("Excepción: '%s'%n", ex.getMessage());
            Localidades dato = new Localidades();
            return dato;

        }

    }

    public void editarLocalidades(String especialidad) {

        Gson gson = new Gson();

        Localidades newLocalidades = gson.fromJson(especialidad, Localidades.class);

        LocalidadDAO dao = LocalidadDAO.obtenerInstancia();

        dao.editarLocalidad(newLocalidades);
    }

    public void eliminarMedicoLocalidades(String id) {
        LocalidadDAO dao = LocalidadDAO.obtenerInstancia();
        dao.borrar_Localidad(Integer.parseInt(id));
    }

    public static void main(String[] args) {

    }

    private static Properties configuracion = null;
}
