package modelo.Pacientes;

import java.util.ArrayList;
import java.util.List;
import modelo.General.Citas;
import modelo.General.Persona;

public class Paciente extends Persona {

    private String clave;
    private String email;
    private List<Citas> citas;
    private String resena;
    private String foto;

    public Paciente() {
        this.citas = new ArrayList();
    }

    public Paciente(String clave, String email, List<Citas> citas, String resena, String foto, String nombre, String apellido, int cedula) {
        super(nombre, apellido, cedula);
        this.clave = clave;
        this.email = email;
        this.citas = citas;
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

    public List<Citas> getCitas() {
        return citas;
    }

    public void setCitas(List<Citas> citas) {
        this.citas = citas;
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

}
