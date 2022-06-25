<%-- 
    Document   : Citas_Medico_Diagnostico
    Created on : 25 jun. 2022, 01:21:01
    Author     : Alfredo
--%>

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

    </head><!-- comment -->
    
    
    <%int id = Integer.parseInt(request.getParameter("cedula"));%>
    <body>

        <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>

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
                    <form id="formulario" class="formulario" onsubmit="crearPaciente('http://localhost:8080/Proyecto/resources/restfulPacientes', event)">
                        <h2 class="crear_cuenta">Resultados</h2>           
                        <input name="Signos" id="signos" type="text" placeholder="Signos" required>
                        <input name="diagnostico" id="diagnostico" type="text" placeholder="Diagnóstico" required>
                        <input name="prescripciones" id="prescripciones" type="number" placeholder="prescripciones" required>
                        <input id="Guardar" type="submit" value="Guardar">
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