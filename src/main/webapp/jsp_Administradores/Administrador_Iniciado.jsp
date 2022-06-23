<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Administrador Inciado</title>
        <link href="../css/css_Administradores/styleAdministrador_Iniciado.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>
        <script src="../js/js_General/scriptsFormularios.js" type="text/javascript"></script>
        <script src="../js/js_Administradores/scripts_Administradores.js" type="text/javascript"></script>
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
    </head>

    <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>
    <body onload="solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulAdministradores/getPorID', buscarDatoPorId, llenarDatos)">

        <div id="particles-js"></div>

        <form name="mi_Formulario">
            <section class="seccion-perfil-usuario">
                <div class="perfil-usuario-header">
                    <div class="perfil-usuario-portada" style="background-image: url(../img/3.jpg);">
                        <div class="perfil-usuario-avatar">
                            <img id="foto" alt="img-avatar">
                            <button type="button" class="boton-avatar">
                                <form id="form">
                                    <div class="image-upload">
                                        <label for="file-input">
                                            <i class="far fa-image"></i>
                                        </label>                               
                                        <input id="file-input" name="imagen" type="file" accept="image/*" onchange="solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulAdministradores/getPorID', buscarDatoPorId, cambiarFoto)"/>                                     
                                    </div>
                                </form>
                            </button>                        
                        </div>
                        <button type="button" class="boton-portada" onclick="openModal()">
                            <i class="fas fa-edit">Editar el perfil</i>
                        </button>
                    </div>
                </div>
        </form>

        <div class="perfil-usuario-body">
            <div class="perfil-usuario-bio">
                <h3 id="titulo" class="titulo"></h3>
                <p id="resena" class="texto"></p>
            </div>
            <div class="perfil-usuario-footer">
                <ul class="lista-datos">
                    <li><i class="icono fa fa-id-card"></i><p id="id"></p></li>
                    <li><i class="icono fa fa-envelope"></i><p id="correo"></p> </li>
                </ul>
            </div>
        </div>

        <div class="modal">
            <div class="modal_container">
                <div id="formulario_Editar_Administrador" class="formulario_Editar_Administrador">
                    <form class="formulario" id="formulario" onsubmit="solicitarDatos3('http://localhost:8080/Proyecto/resources/restfulAdministradores/getPorID', buscarDatoPorId, editarAdministrador, event)">
                        <h2 class="crear_cuenta">Editar Cuenta</h2>           
                        <input id="nombre_Editar" type="text" placeholder="Nombre" required>
                        <input id="apellido_Editar" type="text" placeholder="Apellido" required>
                        <input id="cedula_Editar" type="number" placeholder="Cedula" required>
                        <input id="email_Editar" type="email" placeholder="Email" required>
                        <input id="password_Editar" type="password" placeholder="Contraseña" required>
                        <input id="confirmar_Password_Editar" type="password" placeholder="Confirmar Contraseña" required>
                        <input id="descripcion_Editar" type="text" placeholder="Descripción" required>
                        <input type="submit" value="Guardar Cambios">
                    </form>
                    <button type="button" class="cerrar" id="cerrar" onclick="closeModal()"><i class="fa fa-times" aria-hidden="true" style="font-size: 35px;"></i></button>
                </div>
            </div>
        </div>
    </section>

    <div class="volver">
        <button id="btn_Volver" class="btn_Volver" onclick="enviarBoton('volver_Perfil_Administrador')">Volver</button>
    </div>
    <script src="../js/js_General/particles.js" type="text/javascript"></script>
    <script src="../js/js_General/app.js" type="text/javascript"></script>
</body>
</html>
