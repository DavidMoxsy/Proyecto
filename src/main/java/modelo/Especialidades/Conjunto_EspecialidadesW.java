package modelo.Especialidades;

import com.google.gson.annotations.SerializedName;

public class Conjunto_EspecialidadesW {

    public Conjunto_EspecialidadesW(Conjunto_Especialidades especialidades) {
        this.especialidades = especialidades;
    }

    public Conjunto_Especialidades getEspecialidades() {
        return especialidades;
    }

    @SerializedName("lista-especialidades")
    private final Conjunto_Especialidades especialidades;
}
