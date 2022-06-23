package modelo.Administradores;

import modelo.Administradores.*;
import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "lista-administradoresW")
public class Conjunto_Administradores {

    public Conjunto_Administradores() {
        administradores = new ArrayList<>();
    }

    public void agregar(Administrador administrador) {
        administradores.add(administrador);
    }

    public void agregar(List<Administrador> administradores) {
        administradores.addAll(administradores);
    }

    @Override
    public String toString() {
        StringBuilder r = new StringBuilder("[\n");
        for (Administrador m : administradores) {
            r.append(String.format("\t%s%n", m));
        }
        r.append("]");
        return r.toString();
    }

    public String toJSON() {
        throw new UnsupportedOperationException();
    }

    @XmlElement(name = "administrador")
    @SerializedName("administrador")
    private final List<Administrador> administradores;
}
