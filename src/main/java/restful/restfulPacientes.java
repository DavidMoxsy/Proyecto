package restful;

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
import modelo.DAO.Pacientes.Gestor_Pacientes;

@Path("restfulPacientes")
@RequestScoped
public class restfulPacientes {

    public restfulPacientes() {
    }

    @GET
    public Response getAll() {
        Gestor_Pacientes g = new Gestor_Pacientes();
        return Response
                .ok(g.datosJSON())
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void crearPaciente(String paciente) {
        Gestor_Pacientes g = new Gestor_Pacientes();
        g.crearPaciente(paciente);
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public void edit(String paciente) {
        Gestor_Pacientes g = new Gestor_Pacientes();
        g.editarPaciente(paciente);
    }

    @PUT
    @Path("/getPorID")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPorID(String id) {

        Gestor_Pacientes g = new Gestor_Pacientes();

        return Response
                .ok(g.datosJSON(id))
                .build();
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void delete(String cedula) {

        Gestor_Pacientes g = new Gestor_Pacientes();

        g.eliminarPaciente(cedula);
    }
}
