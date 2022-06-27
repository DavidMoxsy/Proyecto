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
        <link href="../css/css_Medicos/Registro_Pacientes_Medico.css" rel="stylesheet" type="text/css"/>
        <script src="../js/js_Pacientes/scripts_Pacientes.js" type="text/javascript"></script>
    </head>


    <%int id = Integer.parseInt(request.getParameter("cedula"));%>


    <body onload="solicitarDatos('http://localhost:8080/Proyecto/resources/restfulPacientes', cargarDatos, conseguirPacientes), solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, cargarFoto)">
        <div id="particles-js" style="z-index: -1;"></div>

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

            <h1>Lista de medicos disponibles</h1>

            <table id="Table_Pacientes">
                <thead id="thead"></thead>
                <tbody id="tbody"></tbody>
            </table>

            <div class="modal">
                <div class="modal_container">
                    <div id="formulario_Editar_Paciente" class="formulario_Editar_Paciente">
                        <form class="formulario" onsubmit="solicitarDatos3('http://localhost:8080/Proyecto/resources/restfulPacientes/getPorID', buscarDatoPorId, editarPaciente, event)">
                            <button type="button" class="cerrar" id="cerrar" onclick="closeModal()"><i class="fa fa-times" aria-hidden="true" style="font-size: 35px;"></i></button>
                            <h2 class="crear_cuenta">Editar Cuenta</h2>           
                            <input id="nombre_Editar" type="text" placeholder="Nombre" required>
                            <input id="apellido_Editar" type="text" placeholder="Apellido" required>
                            <input id="cedula_Editar" type="number" placeholder="Cedula" required>
                            <input id="email_Editar" type="email" placeholder="Email" required>
                            <input id="password_Editar" type="password" placeholder="Contraseña" required>
                            <input id="confirmar_Password_Editar" type="password" placeholder="Confirmar Contraseña" required>
                            <input type="submit" value="Guardar Cambios">
                        </form>
                    </div>
                </div>
            </div>

            <div class="modalCrear">
                <div class="modal_container">
                    <div id="formulario_Editar_Paciente" class="formulario_Editar_Paciente">
                        <form class="formulario" id="formulario" onsubmit="crearPaciente('http://localhost:8080/Proyecto/resources/restfulPacientes', event)">
                            <button type="button" class="cerrar" onclick="closeModalCrear()"><i class="fa fa-times" aria-hidden="true" style="font-size: 35px;"></i></button>
                            <h2 class="crear_cuenta">Crear Cuenta</h2>           
                            <input id="nombre" type="text" placeholder="Nombre" required>
                            <input id="apellido" type="text" placeholder="Apellido" required>
                            <input id="cedulaRegistro" type="number" placeholder="Cedula" required>
                            <input id="email" type="email" placeholder="Email" required>
                            <input id="claveRegistro" type="password" placeholder="Contraseña" required>
                            <input id="confirmarClave" type="password" placeholder="Confirmar Contraseña" required>
                            <input type="submit" value="Guardar Cambios">
                        </form>
                    </div>
                </div>
            </div>


            <div class="volver">
                <button class="btn_Volver" onclick="enviarBoton('volver_Perfil_Medico')">Volver</button>
            </div>
            <script src="../js/js_General/scriptsFormularios1.js" type="text/javascript"></script>
            <script src="../js/js_General/particles.js" type="text/javascript"></script>
            <script src="../js/js_General/app.js" type="text/javascript"></script>
    </body>
</html>
