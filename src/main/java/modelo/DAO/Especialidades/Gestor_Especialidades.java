package modelo.DAO.Especialidades;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.util.List;
import java.util.Properties;
import modelo.Especialidades.Conjunto_Especialidades;
import modelo.Especialidades.Conjunto_EspecialidadesW;
import modelo.Especialidades.Especialidad;

public class Gestor_Especialidades {

    public Gestor_Especialidades() {
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
        return gson.toJson(new Conjunto_EspecialidadesW(datosEspecialidades()));
    }

    public String datosJSON(String id) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(datosEspecialidadID(id));
    }

    public Conjunto_Especialidades datosEspecialidades() {
        Conjunto_Especialidades r = new Conjunto_Especialidades();
        try {
            EspecialidadDAO dao = EspecialidadDAO.obtenerInstancia();
            List<Especialidad> datos = dao.getAllEspecialidades();
            for (int i = 0; i < datos.size(); i++) {
                r.agregar(datos.get(i));
            }
        } catch (Exception ex) {
            System.out.printf("Excepción: '%s'%n", ex.getMessage());
        }

        return r;
    }

    public Especialidad datosEspecialidadID(String id) {

        try {
            EspecialidadDAO dao = EspecialidadDAO.obtenerInstancia();
            Especialidad dato = dao.getEspecialidadID(id);
            return dato;

        } catch (Exception ex) {
            System.out.printf("Excepción: '%s'%n", ex.getMessage());
            Especialidad dato = new Especialidad();
            return dato;

        }

    }

    public void editarEspecialidad(String especialidad) {

        Gson gson = new Gson();

        Especialidad newEspecialidad = gson.fromJson(especialidad, Especialidad.class);

        EspecialidadDAO dao = EspecialidadDAO.obtenerInstancia();

        dao.editarEspecialidad(newEspecialidad);
    }

    public void eliminarMedicoEspecialidad(String id) {
        EspecialidadDAO dao = EspecialidadDAO.obtenerInstancia();
        dao.borrar_Especialidad(Integer.parseInt(id));
    }

    public static void main(String[] args) {

    }

    private static Properties configuracion = null;
}
