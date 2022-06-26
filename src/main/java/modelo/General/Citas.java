package modelo.General;

import java.util.ArrayList;
import java.util.List;

public class Citas {

    private int id;
    private String fecha;
    private String hora;
    private String lugarDeCita;
    private String disponibilidad;
    private int cedulaMedico;
    private int cedulaPaciente;
    private String signos;
    private String diagnostico;
    private String prescripciones;
    private List<String> resultadosLaboratorio;
    private String estadoCita;

    public Citas() {
    }

    public Citas(String fecha, String hora, String lugarDeCita, String disponibilidad) {
        this.id = 0;
        this.fecha = fecha;
        this.hora = hora;
        this.lugarDeCita = lugarDeCita;
        this.disponibilidad = disponibilidad;
        this.cedulaMedico = 0;
        this.cedulaPaciente = 0;
        this.signos = "";
        this.diagnostico = "";
        this.prescripciones = "";
        this.resultadosLaboratorio = new ArrayList();
        this.estadoCita = "No aceptado";
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<String> getResultadosLaboratorio() {
        return resultadosLaboratorio;
    }

    public void setResultadosLaboratorio(List<String> resultadosLaboratorio) {
        this.resultadosLaboratorio = resultadosLaboratorio;
    }

    public String getEstadoCita() {
        return estadoCita;
    }

    public void setEstadoCita(String estadoCita) {
        this.estadoCita = estadoCita;
    }


}
