package modelo.Medicos;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "lista-medicosW")
public class Conjunto_Medicos {

    public Conjunto_Medicos() {
        medicos = new ArrayList<>();
    }

    public void agregar(Medico medico) {
        medicos.add(medico);
    }

    public void agregar(List<Medico> medicos) {
        medicos.addAll(medicos);
    }

    @Override
    public String toString() {
        StringBuilder r = new StringBuilder("[\n");
        for (Medico m : medicos) {
            r.append(String.format("\t%s%n", m));
        }
        r.append("]");
        return r.toString();
    }

    public String toJSON() {
        throw new UnsupportedOperationException();
    }

    @XmlElement(name = "medico")
    @SerializedName("medico")
    private final List<Medico> medicos;
}
