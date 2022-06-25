<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="../css/css_Pacientes/stylePacientes.css" rel="stylesheet" type="text/css"/>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>
        <script src="../js/js_Pacientes/scripts_Pacientes.js" type="text/javascript"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <title>Menu Pacientes</title>
    </head>

    <body>
        <div class="container-form sign-up">
            <div class="bienvenido">
                <div class="mensaje">
                    <h2>Bienvenido</h2>
                    <p>Si ya tienes una cuenta por favor inicie sesion</p>
                    <button class="btn_iniciar_Sesion">Iniciar Sesion</button>
                </div>
            </div>
            <form id="formulario" class="formulario" onsubmit="crearPaciente('http://localhost:8080/Proyecto/resources/restfulPacientes', event)">
                <h2 class="crear_cuenta">Crear una cuenta</h2>           
                <input name="nombre" id="nombre" type="text" placeholder="Nombre" required>
                <input name="apellido" id="apellido" type="text" placeholder="Apellido" required>
                <input name="cedula" id="cedulaRegistro" type="number" placeholder="Cedula" required>
                <input name="email" id="email" type="email" placeholder="Email" required>
                <input name="claveRegistro" id="claveRegistro" type="password" placeholder="Contraseña" required>
                <input id="confirmarClave" type="password" placeholder="Confirmar Contraseña" required>
                <input id="registrarse" type="submit" value="Registrarse">
            </form>
        </div>
        <div class="container-form sign-in">
            <form id="iniciar" class="formulario" onsubmit="solicitarDatos3('http://localhost:8080/Proyecto/resources/restfulPacientes/getPorID', buscarDatoPorId, iniciarSesion, event)">
                <h2 class="crear_cuenta">Iniciar Sesion</h2>
                <p class="cuenta_gratis">Ingrese su usuario y contraseña</p>
                <input type="number" placeholder="Cedula" id="cedula" required autocomplete="off">
                <input type="password" placeholder="Contraseña" id="clave" required autocomplete="new-password">
                <input type="submit" value="Iniciar Sesion">
            </form>
            <div class="bienvenido">
                <div class="mensaje">
                    <h2>Bienvenido de nuevo</h2>
                    <p>Si aun no tienes una cuenta por favor registrese aqui</p>
                    <button class="btn_Registrarse">Registrarse</button>
                </div>
            </div>            
        </div>
        <div class="volver">
            <button class="btn_Volver" onclick="enviarBoton('volver_Seleccion')">Volver</button>
        </div>
        <div class="burbujas">
            <div class="burbuja"></div>
            <div class="burbuja"></div>
            <div class="burbuja"></div>
            <div class="burbuja"></div>
            <div class="burbuja"></div>
            <div class="burbuja"></div>
            <div class="burbuja"></div>
            <div class="burbuja"></div>
            <div class="burbuja"></div>
            <div class="burbuja"></div>
        </div>

        <script src="../js/js_General/scriptsFormularios1.js" type="text/javascript"></script>

    </body>

</html>