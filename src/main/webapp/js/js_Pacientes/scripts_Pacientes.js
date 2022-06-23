
function init() {
    solicitarDatos("http://localhost:8080/Proyecto_2_Version_Final/resources/rest", "tabla1", cargarDatos, cargarTabla);
    console.log("Aplicación inicializada..");
}

function solicitarDatos(url, tabla, fn, callback) {
    fn(callback, url, tabla);
}

function solicitarDatos2(url, fn, callback, evt) {
    fn(document.getElementById("cedula").value, callback, url, fn);
}

function solicitarDatos3(url, fn, callback, evt) {
    evt.preventDefault();
    fn(document.getElementById("cedula").value, callback, url, fn);
}

function iniciarSesion(datosJSON) {


    if (datosJSON.cedula === parseInt(document.getElementById("cedula").value)) {
        if (datosJSON.clave === document.getElementById("clave").value) {
            window.location.href = "Pantalla_Principal_Pacientes.jsp?cedula=" + document.getElementById("cedula").value;
        } else {
            swal('Clave incorrecta', 'La clave ingresada no es correcta', 'error');
            var clave = document.getElementById("clave");
            clave.value = "";
        }
    } else {
        swal('Usuario incorrecto', 'El usuario ingresado no es correcto', 'error');
        var cedula = document.getElementById("cedula");
        cedula.value = "";
        var clave = document.getElementById("clave");
        clave.value = "";
    }
}

function pacienteIniciado(datosJSON) {
    var bienvenida = document.getElementById("bienvenida");
    bienvenida.innerHTML = "Bienvenido(a) " + datosJSON.nombre + " " + datosJSON.apellido;
    var foto = datosJSON.foto;
    if (foto !== undefined) {
        const byteCharacters = atob(foto);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'image/*'});
        const imagenPrevisualizacion = document.querySelector("#foto");
        imagenPrevisualizacion.src = URL.createObjectURL(blob);
    }
}

function crearPaciente(url, evt) {

    evt.preventDefault();

    var dat = {};
    dat = {"cedula": parseInt(document.getElementById("cedulaRegistro").value),
        "nombre": document.getElementById("nombre").value,
        "apellido": document.getElementById("apellido").value,
        "clave": document.getElementById("claveRegistro").value,
        "email": document.getElementById("email").value};

    if (document.getElementById("claveRegistro").value === document.getElementById("confirmarClave").value) {
        crearUsuario(url, dat);
        swal("Paciente creado correctamente", "El paciente fue ingresado correctamente", "success")
                .then(() => {
                    location.reload();
                });
    } else {
        swal('Clave incorrecta', 'Verifique que escribiera correctamente su clave 2 veces', 'error');
        var confirmar_Password_Editar = document.getElementById("confirmar_Password_Editar");
        confirmar_Password_Editar.value = "";
    }

}

function cambiarFoto(datosJSON) {

    const file = document.getElementById('file-input').files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        var base64 = reader.result;
        var base64Converted = base64.replace(/^data:image\/[a-z]+;base64,/, "");

        datosJSON.foto = base64Converted;

        editarDato(datosJSON, 'http://localhost:8080/Proyecto_2_Version_Final/resources/restfulPacientes');
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

    document.getElementById('form').submit();
}

function editarPaciente(datosJSON) {

    if (document.getElementById("password_Editar").value === document.getElementById("confirmar_Password_Editar").value) {

        datosJSON.cedula = document.getElementById("cedula_Editar").value;
        datosJSON.nombre = document.getElementById("nombre_Editar").value;
        datosJSON.apellido = document.getElementById("apellido_Editar").value;
        datosJSON.clave = document.getElementById("password_Editar").value;
        datosJSON.email = document.getElementById("email_Editar").value;
        datosJSON.resena = document.getElementById("descripcion_Editar").value;
        editarDato(datosJSON, 'http://localhost:8080/Proyecto_2_Version_Final/resources/restfulPacientes');
    } else {
        swal('Clave incorrecta', 'Verifique que escribiera correctamente su clave 2 veces', 'error');
        var confirmar_Password_Editar = document.getElementById("confirmar_Password_Editar");
        confirmar_Password_Editar.value = "";
    }
}

function llenarDatos(datosJSON) {
    let paciente = datosJSON;
    document.getElementById("titulo").innerHTML = paciente.nombre + " " + paciente.apellido;
    document.getElementById("resena").innerHTML = paciente.resena;
    document.getElementById("id").innerHTML = "Cedula: " + paciente.cedula;
    document.getElementById("correo").innerHTML = "Correo: " + paciente.email;
    var nombre = document.getElementById("nombre_Editar");
    nombre.value = paciente.nombre;
    var apellido = document.getElementById("apellido_Editar");
    apellido.value = paciente.apellido;
    var clave = document.getElementById("password_Editar");
    clave.value = paciente.clave;
    var cedula = document.getElementById("cedula_Editar");
    cedula.value = paciente.cedula;
    var email = document.getElementById("email_Editar");
    email.value = paciente.email;
    var descripcion = document.getElementById("descripcion_Editar");
    descripcion.value = paciente.resena;

    var foto = paciente.foto;
    if (foto !== undefined) {
        const byteCharacters = atob(foto);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'image/*'});

        const imagenPrevisualizacion = document.querySelector("#foto");

        imagenPrevisualizacion.src = URL.createObjectURL(blob);
    }
}