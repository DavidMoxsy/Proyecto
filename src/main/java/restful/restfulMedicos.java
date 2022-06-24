package restful;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import modelo.DAO.Medicos.Gestor_Medicos;

@Path("restfulMedicos")
@RequestScoped
public class restfulMedicos {
    
    public restfulMedicos() {
    }
    
    @GET
    public Response getAll() {
        Gestor_Medicos g = new Gestor_Medicos();
        return Response
                .ok(g.datosJSON())
                .build();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void crearMedico(String medico) {
        System.out.print(medico);
        Gestor_Medicos g = new Gestor_Medicos();
        g.crearMedico(medico);
    }
    
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public void edit(String medico) {
        Gestor_Medicos g = new Gestor_Medicos();
        g.editarMedico(medico);
    }
    
    @PUT
    @Path("/getPorID")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPorID(String id) {
        
        Gestor_Medicos g = new Gestor_Medicos();
        
        return Response
                .ok(g.datosJSON(id))
                .build();
    }
    
    @PUT
    @Path("/delete")
    @Consumes(MediaType.APPLICATION_JSON)
    public void delete(String id) {
        
        Gestor_Medicos g = new Gestor_Medicos();
        g.eliminarMedico(id);
        
    }
}
