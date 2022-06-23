package modelo.Medicos;

import java.util.ArrayList;
import java.util.List;
import modelo.General.Citas;
import modelo.Localidades.Localidades;
import modelo.General.Persona;

public class Medico extends Persona {
    
    private String clave;
    private String email;
    private List<String> especialidades;
    private float costoConsulta;
    private List<Localidades> localidades;
    private List<Citas> citas;
    private String resena;
    private String foto;
    private String estado;

    public Medico() {
        this.especialidades = new ArrayList();
        this.costoConsulta = 0;
        this.localidades = new ArrayList();
        this.citas = new ArrayList();
        this.estado = "En espera";
    }

    public Medico(int cedula, String clave, String email, List<String> especialidades, float costoConsulta, List<Localidades> localidades, List<Citas> citas, String resena, String estado,String nombre, String apellido) {
        super(nombre, apellido, cedula);
        this.clave = clave;
        this.email = email;
        this.especialidades = especialidades;
        this.costoConsulta = costoConsulta;
        this.localidades = localidades;
        this.citas = citas;
        this.resena = resena;
        this.estado = estado;
    }

    public Medico(int cedula, String nombre, String apellido, String clave, String email) {
        super(nombre, apellido, cedula);
        this.clave = clave;
        this.email = email;
        this.especialidades = new ArrayList();
        this.costoConsulta = 0;
        this.localidades = new ArrayList();
        this.citas = new ArrayList();
        this.resena = "";
        this.estado = "En espera";
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

    public List<String> getEspecialidades() {
        return especialidades;
    }

    public void setEspecialidades(ArrayList<String> especialidades) {
        this.especialidades = especialidades;
    }

    public float getCostoConsulta() {
        return costoConsulta;
    }

    public void setCostoConsulta(float costoConsulta) {
        this.costoConsulta = costoConsulta;
    }

    public List<Localidades> getLocalidades() {
        return localidades;
    }

    public void setLocalidades(List<Localidades> localidades) {
        this.localidades = localidades;
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

    public void setFoto(String  foto) {
        this.foto = foto;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Medico{" + "clave=" + clave + ", email=" + email + ", especialidades=" + especialidades + ", costoConsulta=" + costoConsulta + ", localidades=" + localidades + ", citas=" + citas + ", resena=" + resena + ", foto=" + foto + ", estado=" + estado + '}';
    }  
    
}
