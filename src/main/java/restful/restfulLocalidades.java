package restful;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import modelo.DAO.Localidades.Gestor_Localidades;

@Path("restfulLocalidades")
@RequestScoped
public class restfulLocalidades {

    public restfulLocalidades() {
    }

    @Context
    private UriInfo context;

    @GET
    public Response getAll() {
        Gestor_Localidades g = new Gestor_Localidades();

        return Response
                .ok(g.datosJSON())
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void crearLocalidad(String localidad) {
        Gestor_Localidades g = new Gestor_Localidades();
        g.crearLocalidad(localidad);
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void edit(String localidad) {

        Gestor_Localidades g = new Gestor_Localidades();

        g.editarLocalidades(localidad);

    }

    @PUT
    @Path("/getPorID")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPorID(String id) {

        Gestor_Localidades g = new Gestor_Localidades();

        return Response
                .ok(g.datosJSON(id))
                .build();
    }

    @PUT
    @Path("/delete")
    @Consumes(MediaType.APPLICATION_JSON)
    public void delete(String id) {

        Gestor_Localidades g = new Gestor_Localidades();

        g.eliminarMedicoLocalidades(id);
    }
}
