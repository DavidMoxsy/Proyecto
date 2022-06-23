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
    </head>

    <%int id = Integer.parseInt(request.getParameter("cedula"));%>
    <body onload="solicitarDatos2('http://localhost:8080/Proyecto_2_Version_Final/resources/restfulMedicos/getPorID', buscarDatoPorId, medicoIniciado)">
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
                    <ul>
                        <%LocalDateTime hoy = LocalDateTime.now();%>
                        <li><h3 class="fecha" style="margin: 0 auto;">Hoy es: <%=hoy.getDayOfMonth()%> <%=hoy.getMonth()%> <%=hoy.getYear()%></h3></li>

                        <li><i class="fas fa-smile"></i><p style="text-align: center;">No olvides sonreir</p></li>    
                    </ul>
                </div>
            </div>
                        
               <div class="paciente-medico">
                <div class="paciente-medico-bio">
                    <ul id = "pacientes"> 
                        <li><h2 class="medicoPaciente" style="margin: 0 auto;">Pacientes del Doctor</h2></li>
                          
 
                    </ul>
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

