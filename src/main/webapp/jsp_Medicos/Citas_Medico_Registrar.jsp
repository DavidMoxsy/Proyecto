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
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <link href="../css/css_Medicos/Citas_Medico_Registrar.css" rel="stylesheet" type="text/css"/>
    </head>

    <%int id = Integer.parseInt(request.getParameter("cedula"));%>
    <%String hora = request.getParameter("hora");%>
    <%String fecha = request.getParameter("fecha");%>
    <%int idCita = Integer.parseInt(request.getParameter("idCita"));%>

    <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>
    <body  onload="cargarDatosPaciente('http://localhost:8080/Proyecto/resources/restfulPacientes', llenarPacientes)">

        <div id="particles-js" style="z-index: -10;"></div>


        <input type="checkbox" id="btn-nav" class="checkbox">
        <header>
            <div class="header-container">
                <label for="btn-nav" class="btn-label">
                    <div class="header-button"></div>
                </label>
            </div>
        </header>

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

            <div>
                <form id="iniciar" class="formulario" onsubmit="registrarCitaMedico(event);">
                    <h2 class="crear_cuenta">Registrar cita</h2>
                    <label for="pacientes">Seleccione un paciente:</label>
                    <select id="pacientes" required>
                        <option value="">Seleccione un paciente</option>
                    </select>

                    <input id="cedula" name="cedula" type="hidden" value="<%=id%>">
                    <input id="idCita" name="idCita" type="hidden" value="<%=idCita%>">
                    
                    <label for="hora">Hora de la cita:</label>
                    <input name="hora" id="hora" type="text" value="<%=hora%>" required>
                    
                    <label for="fecha">Fecha de la cita</label>
                    <input id="fecha" name="fecha" type="text" value="<%=fecha%>" required>
                    
                    <label for="tipo">Tipo de la cita:</label>
                    <input name="tipo" id="tipo" type="text" placeholder="Tipo" required>
                    
                    <label for="motivo">Motivo de la cita</label>
                    <input name="motivo" id="motivo" type="text" placeholder="Motivo" required>

                    <input id="registrarCita" type="submit" value="Registrar la Cita">
                </form>
            </div>

            <div class="volver">
                <button class="btn_Volver" onclick="enviarBoton('volver_citas_medico')">Volver</button>
            </div>

            <script src="../js/js_General/particles.js" type="text/javascript"></script>
            <script src="../js/js_General/app.js" type="text/javascript"></script>
            <script src="../js/js_General/scriptsFormularios1.js" type="text/javascript"></script>
            <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>      
            <script src="../js/js_Medicos/scripts_Medicos.js" type="text/javascript"></script>

    </body>
</html>

