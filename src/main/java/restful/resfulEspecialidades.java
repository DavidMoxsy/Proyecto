package restful;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.DELETE;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import modelo.DAO.Especialidades.Gestor_Especialidades;

@Path("resfulEspecialidades")
@RequestScoped
public class resfulEspecialidades {

    public resfulEspecialidades() {
    }

    @GET
    public Response getAll() {
        Gestor_Especialidades g = new Gestor_Especialidades();
        
        return Response
                .ok(g.datosJSON())
                .build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void edit(String especialidad) {

        Gestor_Especialidades g = new Gestor_Especialidades();

        g.editarEspecialidad(especialidad);

    }

    @PUT
    @Path("/getPorID")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPorID(String id) {

        Gestor_Especialidades g = new Gestor_Especialidades();

        return Response
                .ok(g.datosJSON(id))
                .build();
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void delete(String id) {

        Gestor_Especialidades g = new Gestor_Especialidades();

        g.eliminarMedicoEspecialidad(id);
    }
}
