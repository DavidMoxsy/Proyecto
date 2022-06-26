<%@page import="java.time.LocalDateTime"%>
<%@page import="java.time.LocalDate"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Perfil del paciente</title>
        <link rel="stylesheet" type="text/css" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
        <link href="../css/css_Medicos/Pantalla_Principal_Medico .css" rel="stylesheet" type="text/css"/>
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>
        <script src="../js/js_Pacientes/scripts_Pacientes.js" type="text/javascript"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <link href="../css/css_Pacientes/stylePacientes.css" rel="stylesheet" type="text/css"/>

    </head>

    <%int id = Integer.parseInt(request.getParameter("cedula"));%>
    <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>
    <body onload="solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulPacientes/getPorID', buscarDatoPorId, pacienteIniciado)">
        <div id="particles-js"></div>


        <section class="seccion-perfil-usuario">
            <div class="perfil-usuario-header">
                <div class="perfil-usuario-portada">
                    <div class="perfil-usuario-avatar">
                        <a href="Paciente_Iniciado.jsp?cedula=<%=id%>"><img id="foto" alt="img-avatar"></a>
                    </div>     
                </div>
            </div>
            <div class="perfil-usuario-body">
                <div class="perfil-usuario-bio">
                    
                    
                   <form id="iniciar" class="formulario" onsubmit="registrarCitaDoctor()">
                        <h2 class="crear_cuenta">Registrar cita</h2>
                        <label for="medico">Seleccionar medico:</label>
                        <select id="medico">
                        </select>
                        <input id="medicoId" name="medicoId" type="hidden" value="<%=id%>">
                        <input id="idCita" name="idCita" type="hidden">
                        <input name="hora" id="hora" type="text" required>
                        <input id="fecha" name="fecha" type="text">
                        <input name="tipo" id="tipo" type="text" placeholder="Tipo" required>
                        <input name="motivo" id="motivo" type="number" placeholder="Motivo" required>
                        <input id="registrarCita" type="submit" value="registrarCita">
                    </form>
                </div>
            </div>
        </section>

        <div class="volver">
            <button class="btn_Volver" onclick="enviarBoton('salir_Perfil_Medico')">Salir</button>
        </div>
                  
        <script src="../js/js_General/particles.js" type="text/javascript"></script>
        <script src="../js/js_General/app.js" type="text/javascript"></script>  
      
    </body>
</html>

