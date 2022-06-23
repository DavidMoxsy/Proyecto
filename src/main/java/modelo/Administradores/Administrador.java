package modelo.Administradores;

import java.util.List;
import modelo.General.Persona;
import modelo.Medicos.Medico;

public class Administrador extends Persona {

    private String clave;
    private String email;
    private String resena;
    private String foto;

    public Administrador() {
    }

    public Administrador(String clave, String email, List<Medico> medicos, String resena, String foto, String nombre, String apellido, int cedula) {
        super(nombre, apellido, cedula);
        this.clave = clave;
        this.email = email;
        this.resena = resena;
        this.foto = foto;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getResena() {
        return resena;
    }

    public void setResena(String resena) {
        this.resena = resena;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }



    @Override
    public String toString() {
        return "Administrador{" + "clave=" + clave + ", email=" + email + '}';
    }

}
