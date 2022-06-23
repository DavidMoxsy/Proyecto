package modelo.Localidades;

import com.google.gson.annotations.SerializedName;

public class Conjunto_LocalidadesW {

    public Conjunto_LocalidadesW(Conjunto_Localidades localidades) {
        this.localidades = localidades;
    }

    public Conjunto_Localidades getEspecialidades() {
        return localidades;
    }

    @SerializedName("lista-localidades")
    private final Conjunto_Localidades localidades;
}
