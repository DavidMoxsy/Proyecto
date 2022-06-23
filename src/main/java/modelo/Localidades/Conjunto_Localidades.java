package modelo.Localidades;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "lista-localidadesW")
public class Conjunto_Localidades {

    public Conjunto_Localidades() {
        localidades = new ArrayList<>();
    }

    public void agregar(Localidades localidad) {
        localidades.add(localidad);
    }

    public void agregar(List<Localidades> localidad) {
        localidades.addAll(localidad);
    }

    @Override
    public String toString() {
        StringBuilder r = new StringBuilder("[\n");
        for (Localidades m : localidades) {
            r.append(String.format("\t%s%n", m));
        }
        r.append("]");
        return r.toString();
    }

    public String toJSON() {
        throw new UnsupportedOperationException();
    }

    @XmlElement(name = "localidad")
    @SerializedName("localidad")
    private final List<Localidades> localidades;
}
