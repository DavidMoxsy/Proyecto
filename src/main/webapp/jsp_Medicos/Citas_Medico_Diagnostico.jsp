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
        <script src="../js/js_General/resultados.js" type="text/javascript"></script>
        <link href="../css/css_Medicos/Citas_Medico_Diagnostico.css" rel="stylesheet" type="text/css"/>
    </head>


    <%int id = Integer.parseInt(request.getParameter("cedula"));%>


    <body onload="solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, cargarFoto)">
        <input id="citaID" value="<%=request.getParameter("citaID")%>" hidden>
        <input id="cedula" value="<%=id%>" hidden>

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
                <li><a href="Registro_Pacientes_Medico.jsp?cedula=<%=id%>">Registro de Pacientes</a></li>
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
                <form id="formulario" class="formulario" onsubmit="guardarResultados(event)">
                    <h2 class="crear_cuenta">Resultados</h2>           

                    <label for="Signos">Signos</label>
                    <input name="Signos" id="signos" type="text" placeholder="Signos">

                    <label for="diagnostico">Diagnostico</label>
                    <textarea name="diagnostico" id="diagnostico" type="text" placeholder="Diagnóstico" ></textarea>

                    <label for="prescripciones">Prescripciones</label>
                    <textarea name="prescripciones" id="prescripciones" type="text" placeholder="Prescripciones" ></textarea>

                    <label for="file">Resultados laboratorio (PDF)</label>                       
                    <input name="file" id="file" class="custom-file-input" type="file" accept="application/pdf" required/>

                    <input id="Guardar" type="submit" value="Guardar">
                </form>
            </div>

            <div class="volver">
                <button class="btn_Volver" onclick="enviarBoton('volver_citas_medico')">Volver</button>
            </div>

            <script src="../js/js_General/particles.js" type="text/javascript"></script>
            <script src="../js/js_General/app.js" type="text/javascript"></script>
    </body>
</html>
