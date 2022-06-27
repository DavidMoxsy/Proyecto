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
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
        <script src="../js/js_General/scriptsFormularios1.js" type="text/javascript"></script>
        <link href="../css/css_Medicos/Medico_Paciente_Citas.css" rel="stylesheet" type="text/css"/>
    </head>


    <%int id = Integer.parseInt(request.getParameter("cedula"));%>

    <body onload="solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, muestraDatosPacientes), solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, cargarFoto)">

        <input id="cedulaPaciente" value="<%=request.getParameter("cedulaPaciente")%>" hidden>
        <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>
        
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

            <div class="grid">
                <div></div> 

                <div id = "div_tabla" ></div>
                <div></div>
            </div>

            <div class="modal">
                <div class="modal_container">
                    <div id="formulario_Editar_Paciente" class="formulario_Editar_Paciente">
                        <form class="formulario" id="formulario" onsubmit="solicitarDatos3('http://localhost:8080/Proyecto/resources/restfulPacientes/getPorID', buscarDatoPorId, editarAntecedentes, event)">
                            <button type="button" class="cerrar" id="cerrar" onclick="closeModal()"><i class="fa fa-times" aria-hidden="true" style="font-size: 35px;"></i></button>
                            <h2 class="crear_cuenta">Editar antecedentes medicos</h2>           
                            <textarea  id="antecedentes_Editar" type="text" placeholder="Antecedentes Medicos" required></textarea>
                            <input type="submit" value="Guardar Cambios">
                        </form>
                    </div>
                </div>
            </div>

            <div class="edit">
                <button class="btn_Edit" onclick="openModal()">Editar Antecendentes Medicos</button>
            </div>
            <div class="volver">
                <button class="btn_Volver" onclick="enviarBoton('volver_Perfil_Medico')">Volver</button>
            </div>
    </body>
</html>
