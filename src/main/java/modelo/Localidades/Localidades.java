package modelo.Localidades;

import java.util.List;
import modelo.General.Dia;

public class Localidades {
    
    private int id;
    private String ubicacion;
    private List<Dia> horarioSemanal;
    private String frecuenciaDeCitas;

    public Localidades() {
    }

    public Localidades(int id, List<Dia> horarioSemanal, String frecuenciaDeCitas) {
        this.id = id;
        this.horarioSemanal = horarioSemanal;
        this.frecuenciaDeCitas = frecuenciaDeCitas;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public List<Dia> getHorarioSemanal() {
        return horarioSemanal;
    }

    public void setHorarioSemanal(List<Dia> horarioSemanal) {
        this.horarioSemanal = horarioSemanal;
    }

    public String getFrecuenciaDeCitas() {
        return frecuenciaDeCitas;
    }

    public void setFrecuenciaDeCitas(String frecuenciaDeCitas) {
        this.frecuenciaDeCitas = frecuenciaDeCitas;
    }

    @Override
    public String toString() {
        return "Localidades{" + "id=" + id + ", ubicacion=" + ubicacion + ", horarioSemanal=" + horarioSemanal + ", frecuenciaDeCitas=" + frecuenciaDeCitas + '}';
    }  
    
    
}
