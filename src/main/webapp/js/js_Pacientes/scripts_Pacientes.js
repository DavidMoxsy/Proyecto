
function init() {
    solicitarDatos("http://localhost:8080/Proyecto_2_Version_Final/resources/rest", "tabla1", cargarDatos, cargarTabla);
    console.log("Aplicación inicializada..");
}

function solicitarDatos(url, fn, callback) {
    fn(callback, url);
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

function conseguirPacientes(datosJSON) {

    let pacientesList = datosJSON['lista-pacientes']['paciente'];
    let table = document.getElementById('Table_Pacientes');
    let thead = document.createElement("thead");
    thead.setAttribute('id', 'thead');
    let tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    let tr = document.createElement("tr");
    tr.setAttribute('id', 'Encabezado');
    let crear = document.createElement("button");
    crear.innerHTML = "Agregar Paciente";
    crear.setAttribute('id', "Agregar");
    crear.setAttribute('onclick', "openModalCrear()");

    let nombre = document.createElement("th");
    let apellido = document.createElement("th");
    let cedula = document.createElement("th");
    let email = document.createElement("th");
    let estado = document.createElement("th");
    let acciones = document.createElement("th");
    let iconoOrdenarNombre = document.createElement("i");

    iconoOrdenarNombre.setAttribute("class", "fa fa-sort");
    iconoOrdenarNombre.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/restfulPacientes', cargarDatos, ordenarPorNombre)");

    let iconoOrdenarApellido = document.createElement("i");
    iconoOrdenarApellido.setAttribute("class", "fa fa-sort");
    iconoOrdenarApellido.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/restfulPacientes', cargarDatos, ordenarPorApellido)");

    let iconoOrdenarCedula = document.createElement("i");
    iconoOrdenarCedula.setAttribute("class", "fa fa-sort");
    iconoOrdenarCedula.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/restfulPacientes', cargarDatos, ordenarPorCedula)");

    let iconoOrdenarEmail = document.createElement("i");
    iconoOrdenarEmail.setAttribute("class", "fa fa-sort");
    iconoOrdenarEmail.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/restfulPacientes', cargarDatos, ordenarPorEmail)");

    let iconoOrdenarEstado = document.createElement("i");
    iconoOrdenarEstado.setAttribute("class", "fa fa-sort");
    iconoOrdenarEstado.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/restfulPacientes', cargarDatos, ordenarPorEstado)");

    nombre.innerHTML = "Nombre";
    nombre.appendChild(iconoOrdenarNombre);
    nombre.setAttribute("class", "column1");
    apellido.innerHTML = "Apellido";
    apellido.appendChild(iconoOrdenarApellido);
    apellido.setAttribute("class", "column2");
    cedula.innerHTML = "Cedula";
    cedula.appendChild(iconoOrdenarCedula);
    cedula.setAttribute("class", "column3");
    email.innerHTML = "Email";
    email.appendChild(iconoOrdenarEmail);
    email.setAttribute("class", "column4");
    acciones.innerHTML = "Acciones";
    acciones.setAttribute("class", "column6");

    tr.appendChild(nombre);
    tr.appendChild(apellido);
    tr.appendChild(cedula);
    tr.appendChild(email);
    tr.appendChild(acciones);

    thead.appendChild(tr);
    table.replaceChild(thead, document.getElementById('thead'));

    for (var i = 0; i < pacientesList.length; i++) {
        let trPaciente = document.createElement("tr");
        let tdNombre = document.createElement("td");
        let tdApellido = document.createElement("td");
        let tdCedula = document.createElement("td");
        let tdEmail = document.createElement("td");
        let btnAceptar = document.createElement("a");

        let btnBorrar = document.createElement("a");

        tdNombre.innerHTML = Object.getOwnPropertyDescriptors(pacientesList[i]).nombre.value;
        tdNombre.setAttribute("class", "column1");
        tdApellido.innerHTML = Object.getOwnPropertyDescriptors(pacientesList[i]).apellido.value;
        tdApellido.setAttribute("class", "column2");
        tdCedula.innerHTML = Object.getOwnPropertyDescriptors(pacientesList[i]).cedula.value;
        tdCedula.setAttribute("class", "column3");
        tdEmail.innerHTML = Object.getOwnPropertyDescriptors(pacientesList[i]).email.value;
        tdEmail.setAttribute("class", "column4");


        btnAceptar.setAttribute('href', "#");
        btnAceptar.setAttribute('id', "btn");
        btnAceptar.setAttribute('class', "btn");
        btnAceptar.setAttribute('onclick', "openModal()");
        btnAceptar.innerHTML = "Editar Paciente";
        btnAceptar.setAttribute("class", "column6");

        btnBorrar.setAttribute('onclick', "eliminarDato('http://localhost:8080/Proyecto/resources/restfulPacientes/delete', " + Object.getOwnPropertyDescriptors(pacientesList[i]).cedula.value + ")")
        btnBorrar.setAttribute('id', "btn");
        btnBorrar.setAttribute('class', "btn");
        btnBorrar.innerHTML = "Borrar Paciente";
        btnBorrar.setAttribute("class", "column6");



        trPaciente.appendChild(tdNombre);
        trPaciente.appendChild(tdApellido);
        trPaciente.appendChild(tdCedula);
        trPaciente.appendChild(tdEmail);
        trPaciente.appendChild(btnAceptar);
        trPaciente.appendChild(btnBorrar);
        tr.setAttribute("class", "table100-head");
        tbody.appendChild(trPaciente);
        table.replaceChild(tbody, document.getElementById('tbody'));
    }
    if (document.getElementById('Agregar') === null) {
        table.appendChild(crear);
    } else {
        table.replaceChild(crear, document.getElementById('Agregar'));
    }
}

function ordenarPorNombre(datosJSON) {

    function SortArray(x, y) {
        return x.nombre.localeCompare(y.nombre);
    }
    datosJSON['lista-pacientes']['paciente'] = datosJSON['lista-pacientes']['paciente'].sort(SortArray);
    conseguirMedicos(datosJSON);
}
function ordenarPorApellido(datosJSON) {

    function SortArray(x, y) {
        return x.apellido.localeCompare(y.apellido);
    }
    datosJSON['lista-pacientes']['paciente'] = datosJSON['lista-pacientes']['paciente'].sort(SortArray);
    conseguirMedicos(datosJSON);
}
function ordenarPorCedula(datosJSON) {

    function SortArray(x, y) {
        return x.cedula.toString().localeCompare(y.cedula.toString());
    }
    datosJSON['lista-pacientes']['paciente'] = datosJSON['lista-pacientes']['paciente'].sort(SortArray);
    conseguirMedicos(datosJSON);
}
function ordenarPorEmail(datosJSON) {

    function SortArray(x, y) {
        return x.email.localeCompare(y.email);
    }
    datosJSON['lista-pacientes']['paciente'] = datosJSON['lista-pacientes']['paciente'].sort(SortArray);
    conseguirMedicos(datosJSON);
}