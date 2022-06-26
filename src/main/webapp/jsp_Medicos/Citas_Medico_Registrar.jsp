<%@page import="java.time.LocalDateTime"%>
<%@page import="java.time.LocalDate"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Perfil del medico</title>
        <link rel="stylesheet" type="text/css" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
        <link href="../css/css_Medicos/Pantalla_Principal_Medico .css" rel="stylesheet" type="text/css"/>
        <script src="../js/js_Medicos/scripts_Medicos.js" type="text/javascript"></script>
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <link href="../css/css_Pacientes/stylePacientes.css" rel="stylesheet" type="text/css"/>

    </head>

    <%int id = Integer.parseInt(request.getParameter("cedula"));%>
    <%String hora = request.getParameter("hora");%>
    <%String fecha = request.getParameter("fecha");%>
    <%int idCita = Integer.parseInt(request.getParameter("idCita"));%>

    <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>
    <body  onload="cargarDatos('http://localhost:8080/Proyecto/resources/restfulPacientes', llenarPacientes)">
        <div id="particles-js"></div>

        <nav class="menu">
            <ul>
                <li><a href="Pantalla_Principal_Medicos.jsp?cedula=<%=id%>">Inicio</a></li>
                <li><a href="Medico_Iniciado.jsp?cedula=<%=id%>">Perfil</a></li>
                <li><a href="Citas_Medico.jsp?cedula=<%=id%>">Citas</a></li>
            </ul>           
        </nav>

        <section class="seccion-perfil-usuario">
            <div class="perfil-usuario-header">
                <div class="perfil-usuario-portada">
                    <div class="perfil-usuario-avatar">
                        <a href="Medico_Iniciado.jsp?cedula=<%=id%>"><img id="foto" alt="img-avatar"></a>
                    </div>     
                </div>
            </div>
            <div class="perfil-usuario-body">
                <div class="perfil-usuario-bio">
                    
                    
                   <form id="iniciar" class="formulario" onsubmit="registrarCitaMedico()">
                        <h2 class="crear_cuenta">Registrar cita</h2>
                        <label for="pacientes">Seleccione un paciente:</label>

                        <select id="pacientes">
                          <option value="">Seleccione un paciente</option>
                        </select>
                        <input id="medicoId" name="medicoId" type="hidden" value="<%=id%>">
                        <input id="idCita" name="idCita" type="hidden" value="<%=idCita%>">
                        <input name="hora" id="hora" type="text" value="<%=hora%>" required>
                        <input id="fecha" name="fecha" type="text" value="<%=fecha%>">
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
                    
        <script src="../js/js_General/scriptsFormularios1.js" type="text/javascript"></script>
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>      
      
    </body>
</html>

