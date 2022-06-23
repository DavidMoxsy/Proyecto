<%@page import="java.time.LocalDateTime"%>
<%@page import="java.time.LocalDate"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Perfil del administrador</title>
        <link rel="stylesheet" type="text/css" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
        <link href="../css/css_Administradores/Pantalla_Principal_Administrador.css" rel="stylesheet" type="text/css"/>
        <script src="../js/js_Administradores/scripts_Administradores.js" type="text/javascript"></script>
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
    </head>

    <%int id = Integer.parseInt(request.getParameter("cedula"));%>
    <body onload="solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulAdministradores/getPorID', buscarDatoPorId, administradorIniciado)">
        <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>

        <div id="particles-js"></div>

        <input type="checkbox" id="btn-nav" class="checkbox">
        <header>
            <div class="header-container">
                <p id="bienvenida"></p>
                <label for="btn-nav" class="btn-label">
                    <div class="header-button"></div>
                </label>
            </div>
        </header>

        <nav class="menu">
            <ul>
                <li><a href="Pantalla_Principal_Administradores.jsp?cedula=<%=id%>">Inicio</a></li>
                <li><a href="Administrador_Iniciado.jsp?cedula=<%=id%>">Perfil</a></li>
                <li><a href="Pantalla_Medicos_Administrador.jsp?cedula =<%=id%>">Medicos</a></li>
                <li><a href="#">Especialidades</a></li>
                <li><a href="#">Localidades</a></li>

            </ul>           
        </nav>

        <section class="seccion-perfil-usuario">
            <div class="perfil-usuario-header">
                <div class="perfil-usuario-portada">
                    <div class="perfil-usuario-avatar">
                        <a href="Administrador_Iniciado.jsp?cedula=<%=id%>"><img id="foto" alt="img-avatar"></a>
                    </div>     
                </div>
            </div>
            <div class="perfil-usuario-body">
                <div class="perfil-usuario-bio">
                    <ul>
                        <%LocalDateTime hoy = LocalDateTime.now();%>
                        <li><h3 class="fecha" style="margin: 0 auto;">Hoy es: <%=hoy.getDayOfMonth()%> <%=hoy.getMonth()%> <%=hoy.getYear()%></h3></li>

                        <li><i class="fas fa-smile"></i><p style="text-align: center;">No olvides sonreir</p></li>    
                    </ul>
                </div>
            </div>
        </section>
        <div class="volver">
            <button class="btn_Volver" onclick="enviarBoton('salir_Perfil_Administrador')">Salir</button>
        </div>
        <script src="../js/js_General/particles.js" type="text/javascript"></script>
        <script src="../js/js_General/app.js" type="text/javascript"></script>
    </body>
</html>

