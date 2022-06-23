package modelo.DAO.Administradores;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import modelo.Administradores.Conjunto_Administradores;
import modelo.Administradores.Conjunto_AdministradoresW;
import modelo.Administradores.Administrador;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

public class Gestor_Administradores {

    public Gestor_Administradores() {
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
        return gson.toJson(new Conjunto_AdministradoresW(datosAdministradores()));
    }

    public String datosJSON(String cedula) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(datosAdministradorID(cedula));
    }

    public Conjunto_Administradores datosAdministradores() {
        Conjunto_Administradores r = new Conjunto_Administradores();
        try {
            AdministradorDAO dao = AdministradorDAO.obtenerInstancia();
            List<Administrador> datos = dao.getAllAdministradores();
            for (int i = 0; i < datos.size(); i++) {
                r.agregar(datos.get(i));
            }
        } catch (Exception ex) {
            System.out.printf("Excepción: '%s'%n", ex.getMessage());
        }

        return r;
    }

    public Administrador datosAdministradorID(String cedula) {

        try {
            AdministradorDAO dao = AdministradorDAO.obtenerInstancia();
            Administrador dato = dao.getAdministradorID(cedula);
            return dato;

        } catch (Exception ex) {
            System.out.printf("Excepción: '%s'%n", ex.getMessage());
            Administrador dato = new Administrador();
            return dato;

        }

    }

    public void crearAdministrador(String administrador) {
        AdministradorDAO dao = AdministradorDAO.obtenerInstancia();
        dao.crearAdministrador(administrador);
    }

    public void editarAdministrador(String administrador) {

        Gson gson = new Gson();
        Administrador newAdministrador = gson.fromJson(administrador, Administrador.class);
        AdministradorDAO dao = AdministradorDAO.obtenerInstancia();
        dao.editarAdministradores(newAdministrador);
    }

    public void eliminarAdministrador(String cedula) {
        AdministradorDAO dao = AdministradorDAO.obtenerInstancia();
        dao.borrar_Administrador(Integer.parseInt(cedula));
    }

    public static void main(String[] args) {

    }

    private static Properties configuracion = null;
}
