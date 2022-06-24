<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Medicos_Administrador</title>
        <link href="../css/css_Administradores/Pantalla_Medico_Administrador.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>
        <script src="../js/js_Administradores/scripts_Administradores1.js" type="text/javascript"></script>
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
    </head>

    <%int id = Integer.parseInt(request.getParameter("cedula"));%>
    <body onload="solicitarDatos('http://localhost:8080/Proyecto/resources/restfulMedicos', cargarDatos, conseguirMedicos), solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulAdministradores/getPorID', buscarDatoPorId, cargarFoto)">
        <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>
        <div id="particles-js" style="z-index: -10"></div>

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
                <li><a href="Pantalla_Principal_Administradores.jsp?cedula=<%=id%>">Inicio</a></li>
                <li><a href="Administrador_Iniciado.jsp?cedula=<%=id%>">Perfil</a></li>
                <li><a href="Pantalla_Medicos_Administrador.jsp?cedula=<%=id%>">Medicos</a></li>
                <li><a href="Pantalla_Especialidades_Administrador.jsp?cedula=<%=id%>">Especialidades</a></li>
                <li><a href="Pantalla_Localidades_Administrador.jsp?cedula=<%=id%>">Localidades</a></li>

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
        </section>

        <h1>Lista de medicos disponibles</h1>

        <table id="Table_Medicos">
            <thead id="thead"></thead>
            <tbody id="tbody"></tbody>
        </table>

        <div class="volver">
            <button id="btn_Volver" class="btn_Volver" onclick="enviarBoton('volver_Perfil_Administrador')">Volver</button>
        </div>

        <script src="../js/js_General/particles.js" type="text/javascript"></script>
        <script src="../js/js_General/app.js" type="text/javascript"></script>
    </body>
</html>
