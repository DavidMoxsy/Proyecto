package modelo.Especialidades;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "lista-especialidadesW")
public class Conjunto_Especialidades {

    public Conjunto_Especialidades() {
        especialidades = new ArrayList<>();
    }

    public void agregar(Especialidad especialidad) {
        especialidades.add(especialidad);
    }

    public void agregar(List<Especialidad> especialidad) {
        especialidades.addAll(especialidad);
    }

    @Override
    public String toString() {
        StringBuilder r = new StringBuilder("[\n");
        for (Especialidad m : especialidades) {
            r.append(String.format("\t%s%n", m));
        }
        r.append("]");
        return r.toString();
    }

    public String toJSON() {
        throw new UnsupportedOperationException();
    }

    @XmlElement(name = "especialidad")
    @SerializedName("especialidad")
    private final List<Especialidad> especialidades;
}
