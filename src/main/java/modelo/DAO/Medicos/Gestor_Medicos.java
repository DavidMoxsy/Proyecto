package modelo.DAO.Medicos;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import modelo.Medicos.Conjunto_Medicos;
import modelo.Medicos.Conjunto_MedicosW;
import modelo.Medicos.Medico;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

public class Gestor_Medicos {

    public Gestor_Medicos() {
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
        return gson.toJson(new Conjunto_MedicosW(datosMedicos()));
    }

    public String datosJSON(String cedula) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(datosMedicoID(cedula));
    }

    public Conjunto_Medicos datosMedicos() {
        Conjunto_Medicos r = new Conjunto_Medicos();
        try {
            MedicoDAO dao = MedicoDAO.obtenerInstancia();
            List<Medico> datos = dao.getAllMedicos();
            for (int i = 0; i < datos.size(); i++) {
                r.agregar(datos.get(i));
            }
        } catch (Exception ex) {
            System.out.printf("Excepción: '%s'%n", ex.getMessage());
        }

        return r;
    }

    public Medico datosMedicoID(String cedula) {

        try {
            MedicoDAO dao = MedicoDAO.obtenerInstancia();
            Medico dato = dao.getMedicoID(cedula);
            return dato;

        } catch (Exception ex) {
            System.out.printf("Excepción: '%s'%n", ex.getMessage());
            Medico dato = new Medico();
            return dato;

        }

    }

    public void crearMedico(String medico) {
        MedicoDAO dao = MedicoDAO.obtenerInstancia();
        dao.crearMedico(medico);
    }

    public void editarMedico(String medico) {

        Gson gson = new Gson();
        Medico newMedico = gson.fromJson(medico, Medico.class);
        MedicoDAO dao = MedicoDAO.obtenerInstancia();
        dao.editarMedicos(newMedico);
    }

    public void eliminarMedico(String cedula) {
        MedicoDAO dao = MedicoDAO.obtenerInstancia();
        dao.borrar_Medico(Integer.parseInt(cedula));
    }

    public static void main(String[] args) {

    }

    private static Properties configuracion = null;
}
