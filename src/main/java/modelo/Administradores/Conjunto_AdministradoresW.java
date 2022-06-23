package modelo.Administradores;

import com.google.gson.annotations.SerializedName;

public class Conjunto_AdministradoresW {

    public Conjunto_AdministradoresW(Conjunto_Administradores administradores) {
        this.administradores = administradores;
    }

    public Conjunto_Administradores getAdministradores() {
        return administradores;
    }

    @SerializedName("lista-administradores")
    private final Conjunto_Administradores administradores;
}
