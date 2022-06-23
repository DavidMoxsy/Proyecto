package restful;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import modelo.DAO.Administradores.Gestor_Administradores;

@Path("restfulAdministradores")
@RequestScoped
public class restfulAdministradores {

    @Context
    private UriInfo context;

    public restfulAdministradores() {
    }

    @GET
    public Response getAll() {
        Gestor_Administradores g = new Gestor_Administradores();
        return Response
                .ok(g.datosJSON())
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void crearAdministrador(String administrador) {
        System.out.print(administrador);
        Gestor_Administradores g = new Gestor_Administradores();
        g.crearAdministrador(administrador);
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public void edit(String administrador) {
        Gestor_Administradores g = new Gestor_Administradores();
        g.editarAdministrador(administrador);
    }

    @PUT
    @Path("/getPorID")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPorID(String id) {

        Gestor_Administradores g = new Gestor_Administradores();

        return Response
                .ok(g.datosJSON(id))
                .build();
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void delete(String id) {

        Gestor_Administradores g = new Gestor_Administradores();

        g.eliminarAdministrador(id);
    }
}
