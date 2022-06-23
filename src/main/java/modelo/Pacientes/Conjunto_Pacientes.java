package modelo.Pacientes;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "lista-pacientesW")
public class Conjunto_Pacientes {

    public Conjunto_Pacientes() {
        pacientes = new ArrayList<>();
    }

    public void agregar(Paciente paciente) {
        pacientes.add(paciente);
    }

    public void agregar(List<Paciente> pacientes) {
        pacientes.addAll(pacientes);
    }

    @Override
    public String toString() {
        StringBuilder r = new StringBuilder("[\n");
        for (Paciente m : pacientes) {
            r.append(String.format("\t%s%n", m));
        }
        r.append("]");
        return r.toString();
    }

    public String toJSON() {
        throw new UnsupportedOperationException();
    }

    @XmlElement(name = "paciente")
    @SerializedName("paciente")
    private final List<Paciente> pacientes;
}
