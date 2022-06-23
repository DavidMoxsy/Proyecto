
function init() {
    solicitarDatos("http://localhost:8080/Proyecto_2_Version_Final/resources/rest", "tabla1", cargarDatos, cargarTabla);
    console.log("Aplicación inicializada..");
}

function solicitarDatos(url, fn, callback) {
    fn(callback, url);
}

function solicitarDatos2(url, fn, callback) {
    fn(document.getElementById("cedula").value, callback, url, fn);
}

function solicitarDatos3(url, fn, callback, evt) {
    evt.preventDefault();
    fn(document.getElementById("cedula").value, callback, url, fn);
}

function iniciarSesion(datosJSON) {


    if (datosJSON.cedula === parseInt(document.getElementById("cedula").value)) {
        if (datosJSON.clave === document.getElementById("clave").value) {
            window.location.href = "Pantalla_Principal_Administradores.jsp?cedula=" + document.getElementById("cedula").value;
        } else {
            swal('Clave incorrecta', 'Verifique que escribiera correctamente su clave 2 veces', 'error');
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

function administradorIniciado(datosJSON) {
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

function crearAdministrador(url, evt) {

    evt.preventDefault();

    var dat = {};
    dat = {"cedula": parseInt(document.getElementById("cedulaRegistro").value),
        "nombre": document.getElementById("nombre").value,
        "apellido": document.getElementById("apellido").value,
        "clave": document.getElementById("claveRegistro").value,
        "email": document.getElementById("email").value};
    if (document.getElementById("claveRegistro").value === document.getElementById("confirmarClave").value) {
        crearUsuario(url, dat);
        swal("Administrador creado correctamente", "El administrador fue ingresado correctamente", "success")
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

        editarDato(datosJSON, 'http://localhost:8080/Proyecto_2_Version_Final/resources/restfulAdministradores');
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

    document.getElementById('form').submit();
}

function editarAdministrador(datosJSON) {

    if (document.getElementById("password_Editar").value === document.getElementById("confirmar_Password_Editar").value) {

        datosJSON.cedula = document.getElementById("cedula_Editar").value;
        datosJSON.nombre = document.getElementById("nombre_Editar").value;
        datosJSON.apellido = document.getElementById("apellido_Editar").value;
        datosJSON.clave = document.getElementById("password_Editar").value;
        datosJSON.email = document.getElementById("email_Editar").value;
        datosJSON.resena = document.getElementById("descripcion_Editar").value;
        editarDato(datosJSON, 'http://localhost:8080/Proyecto_2_Version_Final/resources/restfulAdministradores');
    } else {
        swal('Clave incorrecta', 'Verifique que escribiera correctamente su clave 2 veces', 'error');
        var confirmar_Password_Editar = document.getElementById("confirmar_Password_Editar");
        confirmar_Password_Editar.value = "";
    }
}

function llenarDatos(datosJSON) {
    let administrador = datosJSON;
    document.getElementById("titulo").innerHTML = administrador.nombre + " " + administrador.apellido;
    document.getElementById("resena").innerHTML = administrador.resena;
    document.getElementById("id").innerHTML = "Cedula: " + administrador.cedula;
    document.getElementById("correo").innerHTML = "Correo: " + administrador.email;
    var nombre = document.getElementById("nombre_Editar");
    nombre.value = administrador.nombre;
    var apellido = document.getElementById("apellido_Editar");
    apellido.value = administrador.apellido;
    var clave = document.getElementById("password_Editar");
    clave.value = administrador.clave;
    var cedula = document.getElementById("cedula_Editar");
    cedula.value = administrador.cedula;
    var email = document.getElementById("email_Editar");
    email.value = administrador.email;
    var descripcion = document.getElementById("descripcion_Editar");
    descripcion.value = administrador.resena;

    var foto = administrador.foto;
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

function conseguirMedicos(datosJSON) {

    let medicosList = datosJSON['lista-medicos']['medico'];
    let table = document.getElementById('Table_Medicos');
    let tr = document.createElement("tr");
    tr.setAttribute('id', 'Encabezado');

    let nombre = document.createElement("th");
    let apellido = document.createElement("th");
    let cedula = document.createElement("th");
    let email = document.createElement("th");
    let estado = document.createElement("th");
    let acciones = document.createElement("th");

    nombre.innerHTML = "Nombre";
    apellido.innerHTML = "Apellido";
    cedula.innerHTML = "Cedula";
    email.innerHTML = "Email";
    estado.innerHTML = "Estado";
    acciones.innerHTML = "Acciones";
    
    acciones.setAttribute('colspan', 3);

    tr.appendChild(nombre);
    tr.appendChild(apellido);
    tr.appendChild(cedula);
    tr.appendChild(email);
    tr.appendChild(estado);
    tr.appendChild(acciones);

    table.appendChild(tr);


    for (var i = 0; i < medicosList.length; i++) {
        let trMedico = document.createElement("tr");
        let tdNombre = document.createElement("td");
        let tdApellido = document.createElement("td");
        let tdCedula = document.createElement("td");
        let tdEmail = document.createElement("td");
        let tdEstado = document.createElement("td");
        let btnAceptar = document.createElement("a");
        let btnEditar = document.createElement("a");
        let btnBorrar = document.createElement("a");

        tdNombre.innerHTML = Object.getOwnPropertyDescriptors(medicosList[i]).nombre.value;
        tdApellido.innerHTML = Object.getOwnPropertyDescriptors(medicosList[i]).apellido.value;
        tdCedula.innerHTML = Object.getOwnPropertyDescriptors(medicosList[i]).cedula.value;
        tdEmail.innerHTML = Object.getOwnPropertyDescriptors(medicosList[i]).email.value;
        tdEstado.innerHTML = Object.getOwnPropertyDescriptors(medicosList[i]).estado.value;

        btnAceptar.setAttribute('href', "#");
        btnAceptar.setAttribute('id', "btn");
        btnAceptar.setAttribute('class', "btn");
        btnAceptar.innerHTML = "Aceptar Medico";
        btnAceptar.setAttribute('style', "border: solid 1px; margin-left: 10px;");


        btnEditar.setAttribute('href', "#");
        btnEditar.setAttribute('id', "btn");
        btnEditar.setAttribute('class', "btn");
        btnEditar.innerHTML = "Editar Medico";
        btnEditar.setAttribute('style', "border: solid 1px; margin-left: 10px;");

        btnBorrar.setAttribute('onclick', "eliminarDato('http://localhost:8080/Proyecto/resources/restfulMedicos', Object.getOwnPropertyDescriptors(medicosList[i]).cedula.value)")
        btnBorrar.setAttribute('id', "btn");
        btnBorrar.setAttribute('class', "btn");
        btnBorrar.innerHTML = "Borrar Medico";
        btnBorrar.setAttribute('style', "border: solid 1px; margin-left: 10px;");


        trMedico.appendChild(tdNombre);
        trMedico.appendChild(tdApellido);
        trMedico.appendChild(tdCedula);
        trMedico.appendChild(tdEmail);
        trMedico.appendChild(tdEstado);
        trMedico.appendChild(btnAceptar);
        trMedico.appendChild(btnEditar);
        trMedico.appendChild(btnBorrar);
        table.appendChild(trMedico);
    }
    console.log(Object.getOwnPropertyDescriptors(medicosList))
}