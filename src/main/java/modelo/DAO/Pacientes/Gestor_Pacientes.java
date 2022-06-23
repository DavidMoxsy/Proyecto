package modelo.DAO.Pacientes;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import modelo.Pacientes.Conjunto_Pacientes;
import modelo.Pacientes.Conjunto_PacientesW;
import modelo.Pacientes.Paciente;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

public class Gestor_Pacientes {

    public Gestor_Pacientes() {
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
        return gson.toJson(new Conjunto_PacientesW(datosPacientes()));
    }

    public String datosJSON(String cedula) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(datosPacienteID(cedula));
    }

    public Conjunto_Pacientes datosPacientes() {
        Conjunto_Pacientes r = new Conjunto_Pacientes();
        try {
            PacienteDAO dao = PacienteDAO.obtenerInstancia();
            List<Paciente> datos = dao.getAllPacientes();
            for (int i = 0; i < datos.size(); i++) {
                r.agregar(datos.get(i));
            }
        } catch (Exception ex) {
            System.out.printf("Excepción: '%s'%n", ex.getMessage());
        }

        return r;
    }

    public Paciente datosPacienteID(String cedula) {

        try {
            PacienteDAO dao = PacienteDAO.obtenerInstancia();
            Paciente dato = dao.getPacienteID(cedula);
            return dato;

        } catch (Exception ex) {
            System.out.printf("Excepción: '%s'%n", ex.getMessage());
            Paciente dato = new Paciente();
            return dato;

        }

    }

    public void crearPaciente(String paciente) {
        PacienteDAO dao = PacienteDAO.obtenerInstancia();
        dao.crearPaciente(paciente);
    }

    public void editarPaciente(String paciente) {

        Gson gson = new Gson();
        Paciente newPaciente = gson.fromJson(paciente, Paciente.class);
        PacienteDAO dao = PacienteDAO.obtenerInstancia();
        dao.editarPacientes(newPaciente);
    }

    public void eliminarPaciente(String cedula) {
        PacienteDAO dao = PacienteDAO.obtenerInstancia();
        dao.borrar_Paciente(Integer.parseInt(cedula));
    }

    public static void main(String[] args) {

    }

    private static Properties configuracion = null;
}
