<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Especialidades_Administrador</title>
        <link href="../css/css_Administradores/Pantalla_Especialidad_Administrador.css" rel="stylesheet" type="text/css"/>
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>
        <script src="../js/js_Administradores/scripts_Administradores1.js" type="text/javascript"></script>
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
        <script src="../js/js_General/scriptsFormularios1.js" type="text/javascript"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    </head>

    <%int id = Integer.parseInt(request.getParameter("cedula"));%>
    <body onload="solicitarDatos('http://localhost:8080/Proyecto/resources/resfulEspecialidades', cargarDatos, conseguirEspecialidades), solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulAdministradores/getPorID', buscarDatoPorId, cargarFoto)">
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
        </section>

        <h1>Lista de especialidades disponibles</h1>

        <table id="Table_Especialidades">
            <thead id="thead"></thead>
            <tbody id="tbody"></tbody>
        </table>

        <div class="modal">
            <div class="modal_container">
                <div id="formulario_Editar_Paciente" class="formulario_Editar_Paciente">
                    <form class="formulario" id="formulario" onsubmit="solicitarDatos5('http://localhost:8080/Proyecto/resources/resfulEspecialidades/getPorID', buscarDatoPorId, editarEspecialidades, event)">
                        <button type="button" class="cerrar" id="cerrar" onclick="closeModal()"><i class="fa fa-times" aria-hidden="true" style="font-size: 35px;"></i></button>
                        <h2 class="crear_cuenta">Editar Especialidad</h2>
                        <button id="ced" value="" hidden></button>
                        <input id="nombre_Editar" type="text" placeholder="Ubicacion" required>
                        <input type="submit" value="Guardar Cambios">
                    </form>
                </div>
            </div>
        </div>

        <div class="modalCrear">
            <div class="modal_container">
                <div id="formulario_Editar_Paciente" class="formulario_Editar_Paciente">
                    <form class="formulario" id="formulario" onsubmit="solicitarDatos4('http://localhost:8080/Proyecto/resources/resfulEspecialidades', cargarDatos, crearEspecialidad, event)">
                        <button type="button" class="cerrar" id="cerrar" onclick="closeModalCrear()"><i class="fa fa-times" aria-hidden="true" style="font-size: 35px;"></i></button>
                        <h2 class="crear_cuenta">Agregar Especialidad</h2>
                        <button id="ced" value="" hidden></button>
                        <input id="nombre_Crear" type="text" placeholder="Ubicacion" required>
                        <input type="submit" value="Guardar Cambios">
                    </form>
                </div>
            </div>
        </div>

        <div class="volver">
            <button id="btn_Volver" class="btn_Volver" onclick="enviarBoton('volver_Perfil_Administrador')">Volver</button>
        </div>

        <script src="../js/js_General/particles.js" type="text/javascript"></script>
        <script src="../js/js_General/app.js" type="text/javascript"></script>
    </body>
</html>
