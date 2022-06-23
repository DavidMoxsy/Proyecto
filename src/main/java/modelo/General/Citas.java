package modelo.General;

public class Citas {

    private String fecha;
    private String hora;
    private String lugarDeCita;
    private String disponibilidad;
    private int cedulaMedico;
    private int cedulaPaciente;

    public Citas() {
    }

    public Citas(String fecha, String hora, String lugarDeCita, String disponibilidad) {
        this.fecha = fecha;
        this.hora = hora;
        this.lugarDeCita = lugarDeCita;
        this.disponibilidad = disponibilidad;
        this.cedulaMedico = 0;
        this.cedulaPaciente = 0;
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


    @Override
    public String toString() {
        return fecha + ", " + hora + ", " + lugarDeCita + ", "+ disponibilidad +", " + "Cedula del Medico{" + this.cedulaMedico + "}";
    }    
}
