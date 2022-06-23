package modelo.General;

public class Persona {
    
    private String nombre;
    private String apellido;
    private int cedula;

    public Persona() {
    }

    public Persona(String nombre, String apellido, int cedula) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public int getCedula() {
        return cedula;
    }

    public void setCedula(int cedula) {
        this.cedula = cedula;
    }

    @Override
    public String toString() {
        
        int contador = 0;
        return "Persona #"+ contador++ + "\t" 
                                     + "nombre=" + nombre + "\t" 
                                     + ", apellido=" + apellido + "\t" 
                                     + ", cedula=" + cedula;
    }
    
    
    
}
