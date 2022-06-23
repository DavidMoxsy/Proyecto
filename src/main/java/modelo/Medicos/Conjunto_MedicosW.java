package modelo.Medicos;

import com.google.gson.annotations.SerializedName;

public class Conjunto_MedicosW {

    public Conjunto_MedicosW(Conjunto_Medicos medicos) {
        this.medicos = medicos;
    }

    public Conjunto_Medicos getMedicos() {
        return medicos;
    }

    @SerializedName("lista-medicos")
    private final Conjunto_Medicos medicos;
}
