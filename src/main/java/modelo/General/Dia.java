package modelo.General;

import java.util.List;

public class Dia {
    
    private String nombre;
    private String horaInicio;
    private String horaTermina;
    private int frecuencia;
    private List<Citas> citas;

    public Dia() {
    }

    public Dia(String nombre) {
        this.nombre = nombre;
    }

    public Dia(String nombre, String horaInicio, String horaTermina, int frecuencia, List<Citas> citas) {
        this.nombre = nombre;
        this.horaInicio = horaInicio;
        this.horaTermina = horaTermina;
        this.frecuencia = frecuencia;
        this.citas = citas;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraTermina() {
        return horaTermina;
    }

    public void setHoraTermina(String horaTermina) {
        this.horaTermina = horaTermina;
    }

    public int getFrecuencia() {
        return frecuencia;
    }

    public void setFrecuencia(int frecuencia) {
        this.frecuencia = frecuencia;
    }

    public List<Citas> getCitas() {
        return citas;
    }

    public void setCitas(List<Citas> citas) {
        this.citas = citas;
    }

    @Override
    public String toString() {
        return "Dia{" + "nombre=" + nombre + ", horaInicio=" + horaInicio + ", horaTermina=" + horaTermina + ", frecuencia=" + frecuencia + ", citas=" + citas + '}';
    }
    
    
    
}
