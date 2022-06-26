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
        <script src="../js/js_Medicos/scripts_Medicos.js" type="text/javascript"></script>
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <link href="../css/css_Medicos/Citas_Medico.css" rel="stylesheet" type="text/css"/>
    </head>

    <%int id = Integer.parseInt(request.getParameter("cedula"));%>


    <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>
    <input id="cedulaMedico" value="<%=request.getParameter("cedulaMedico")%>" hidden>
    <body onload="solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, cargarFoto)">

        <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>

        <div id="particles-js"></div>

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


            <section class="seccion-perfil-usuario">

                <div class="perfil-usuario-body">
                    <div class="perfil-usuario-bio">
                        <ul>
                            <li><h3 class="fecha" style="margin: 0 auto;"> Citas disponibles </h3></li>
                            <li><i class="fas fa-smile"></i><p style="text-align: center;">
                            <li>
                                <h1 class="title">Calendario</h1>
                                <div class="calendar">

                                    <div class="calendar_info">
                                        <div class="calendar__prev" id="prev-month">&#9664;</div>
                                        <div class="calendar__month" id="month"></div>
                                        <div class="calendar__year" id="year"></div>
                                        <div class="calendar__next" id="next-month"> &#9654;</div>
                                    </div>

                                    <div class="calendar__week">
                                        <div class="calendar_day">Lunes</div>
                                        <div class="calendar_day">Martes</div>
                                        <div class="calendar_day">Miercoles</div>
                                        <div class="calendar_day">Jueves</div>
                                        <div class="calendar_day">Viernes</div>
                                        <div class="calendar_day">Sabado</div>
                                        <div class="calendar_day">Domingo</div>

                                    </div>
                                    <div class="calendar_dates" id="dates"></div>  
                                </div>  
                            </li>

                        </ul>

                    </div>
                </div>
            </section>


            <div class="volver">
                <button class="btn_Volver" onclick="enviarBoton('volver_Perfil_Medico')">Volver</button>
            </div>

            <script src="../js/js_General/particles.js" type="text/javascript"></script>
            <script src="../js/js_General/app.js" type="text/javascript"></script>
            <script src="../js/js_General/calendario.js" type="text/javascript"></script> 
    </body>
</html>

