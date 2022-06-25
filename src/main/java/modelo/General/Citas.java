package modelo.General;

public class Citas {

    private String fecha;
    private String hora;
    private String lugarDeCita;
    private String disponibilidad;
    private int cedulaMedico;
    private int cedulaPaciente;
    private String signos;
    private String diagnostico;
    private String prescripciones;

    public Citas() {
    }

    public Citas(String fecha, String hora, String lugarDeCita, String disponibilidad) {
        this.fecha = fecha;
        this.hora = hora;
        this.lugarDeCita = lugarDeCita;
        this.disponibilidad = disponibilidad;
        this.cedulaMedico = 0;
        this.cedulaPaciente = 0;
        this.signos = "";
        this.diagnostico = "";
        this.prescripciones = "";
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getLugarDeCita() {
        return lugarDeCita;
    }

    public void setLugarDeCita(String lugarDeCita) {
        this.lugarDeCita = lugarDeCita;
    }

    public String getDisponibilidad() {
        return disponibilidad;
    }

    public void setDisponibilidad(String disponibilidad) {
        this.disponibilidad = disponibilidad;
    }

    public int getCedulaMedico() {
        return cedulaMedico;
    }

    public void setCedulaMedico(int cedulaMedico) {
        this.cedulaMedico = cedulaMedico;
    }

    public int getCedulaPaciente() {
        return cedulaPaciente;
    }

    public void setCedulaPaciente(int cedulaPaciente) {
        this.cedulaPaciente = cedulaPaciente;
    }

    public String getSignos() {
        return signos;
    }

    public void setSignos(String signos) {
        this.signos = signos;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public String getPrescripciones() {
        return prescripciones;
    }

    public void setPrescripciones(String prescripciones) {
        this.prescripciones = prescripciones;
    }
}
