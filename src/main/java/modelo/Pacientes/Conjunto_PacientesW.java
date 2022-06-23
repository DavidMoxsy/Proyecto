package modelo.Pacientes;

import com.google.gson.annotations.SerializedName;

public class Conjunto_PacientesW {

    public Conjunto_PacientesW(Conjunto_Pacientes pacientes) {
        this.pacientes = pacientes;
    }

    public Conjunto_Pacientes getPacientes() {
        return pacientes;
    }

    @SerializedName("lista-pacientes")
    private final Conjunto_Pacientes pacientes;
}
