
function init() {
    solicitarDatos("http://localhost:8080/Proyecto/resources/rest", "tabla1", cargarDatos, cargarTabla);
    console.log("Aplicación inicializada..");
}

function solicitarDatos(url, fn, callback, ) {
    fn(callback, url);
}

function solicitarDatos2(url, fn, callback) {
    fn(document.getElementById("cedula").value, callback, url, fn);
}

function solicitarDatos3(url, fn, callback, evt) {
    evt.preventDefault();
    fn(document.getElementById("cedula").value, callback, url, fn);
}

function solicitarDatos4(url, fn, callback, evt) {
    evt.preventDefault();
    fn(callback, url);
}


function solicitarDatos5(url, fn, callback, evt) {
    evt.preventDefault();
    fn(document.getElementById("ced").value, callback, url, fn);
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

function editarEspecialidades(datosJSON) {
    datosJSON.nombre = document.getElementById("nombre_Editar").value;
    swal("Especialidad actualizada correctamente", "La especialidad fue actualizada correctamente", "success")
            .then(() => {
                editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/resfulEspecialidades');
            });
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

function crearEspecialidad(datosJSON) {
    let especialidad = datosJSON['lista-especialidades']['especialidad'];
    var dat = {};
    dat = {"id": especialidad.length + 1,
        "nombre": document.getElementById("nombre_Crear").value
    };

    crearUsuario('http://localhost:8080/Proyecto/resources/resfulEspecialidades', dat);
    swal("Especialidad ingresada correctamente", "La especialidad fue ingresada correctamente", "success")
            .then(() => {
                location.reload();
            });
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

        editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulAdministradores');
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
        editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulAdministradores');
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

function cargarFoto(datosJSON) {
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

function cambiarEstado(datosJSON) {
    datosJSON.estado = "Aceptado";
    console.log(datosJSON.estado)
    editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulMedicos');
}

function conseguirMedicos(datosJSON) {

    let medicosList = datosJSON['lista-medicos']['medico'];
    let table = document.getElementById('Table_Medicos');
    let thead = document.createElement("thead");
    thead.setAttribute('id', 'thead');
    let tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    let tr = document.createElement("tr");
    tr.setAttribute('id', 'Encabezado');

    let nombre = document.createElement("th");
    let apellido = document.createElement("th");
    let cedula = document.createElement("th");
    let email = document.createElement("th");
    let estado = document.createElement("th");
    let acciones = document.createElement("th");
    let iconoOrdenarNombre = document.createElement("i");

    iconoOrdenarNombre.setAttribute("class", "fa fa-sort");
    iconoOrdenarNombre.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/restfulMedicos', cargarDatos, ordenarPorNombre)");

    let iconoOrdenarApellido = document.createElement("i");
    iconoOrdenarApellido.setAttribute("class", "fa fa-sort");
    iconoOrdenarApellido.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/restfulMedicos', cargarDatos, ordenarPorApellido)");

    let iconoOrdenarCedula = document.createElement("i");
    iconoOrdenarCedula.setAttribute("class", "fa fa-sort");
    iconoOrdenarCedula.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/restfulMedicos', cargarDatos, ordenarPorCedula)");

    let iconoOrdenarEmail = document.createElement("i");
    iconoOrdenarEmail.setAttribute("class", "fa fa-sort");
    iconoOrdenarEmail.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/restfulMedicos', cargarDatos, ordenarPorEmail)");

    let iconoOrdenarEstado = document.createElement("i");
    iconoOrdenarEstado.setAttribute("class", "fa fa-sort");
    iconoOrdenarEstado.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/restfulMedicos', cargarDatos, ordenarPorEstado)");

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
    estado.innerHTML = "Estado";
    estado.appendChild(iconoOrdenarEstado);
    estado.setAttribute("class", "column5");
    acciones.innerHTML = "Acciones";
    acciones.setAttribute("class", "column6");

    tr.appendChild(nombre);
    tr.appendChild(apellido);
    tr.appendChild(cedula);
    tr.appendChild(email);
    tr.appendChild(estado);
    tr.appendChild(acciones);

    thead.appendChild(tr);
    table.replaceChild(thead, document.getElementById('thead'));

    for (var i = 0; i < medicosList.length; i++) {
        let trMedico = document.createElement("tr");
        let tdNombre = document.createElement("td");
        let tdApellido = document.createElement("td");
        let tdCedula = document.createElement("td");
        let tdEmail = document.createElement("td");
        let tdEstado = document.createElement("td");
        let btnAceptar = document.createElement("a");

        let btnBorrar = document.createElement("a");

        tdNombre.innerHTML = Object.getOwnPropertyDescriptors(medicosList[i]).nombre.value;
        tdNombre.setAttribute("class", "column1");
        tdApellido.innerHTML = Object.getOwnPropertyDescriptors(medicosList[i]).apellido.value;
        tdApellido.setAttribute("class", "column2");
        tdCedula.innerHTML = Object.getOwnPropertyDescriptors(medicosList[i]).cedula.value;
        tdCedula.setAttribute("class", "column3");
        tdEmail.innerHTML = Object.getOwnPropertyDescriptors(medicosList[i]).email.value;
        tdEmail.setAttribute("class", "column4");
        tdEstado.innerHTML = Object.getOwnPropertyDescriptors(medicosList[i]).estado.value;
        tdEstado.setAttribute("class", "column5");


        btnAceptar.setAttribute('href', "#");
        btnAceptar.setAttribute('id', "btn");
        btnAceptar.setAttribute('class', "btn");
        btnAceptar.setAttribute('onclick', "solicitarDatos4('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, cambiarEstado," + Object.getOwnPropertyDescriptors(medicosList[i]).cedula.value + ")");
        btnAceptar.innerHTML = "Aceptar Medico";
        btnAceptar.setAttribute("class", "column6");

        btnBorrar.setAttribute('onclick', "eliminarDato('http://localhost:8080/Proyecto/resources/restfulMedicos/delete', " + Object.getOwnPropertyDescriptors(medicosList[i]).cedula.value + ")")
        btnBorrar.setAttribute('id', "btn");
        btnBorrar.setAttribute('class', "btn");
        btnBorrar.innerHTML = "Borrar Medico";
        btnBorrar.setAttribute("class", "column6");



        trMedico.appendChild(tdNombre);
        trMedico.appendChild(tdApellido);
        trMedico.appendChild(tdCedula);
        trMedico.appendChild(tdEmail);
        trMedico.appendChild(tdEstado);
        trMedico.appendChild(btnAceptar);
        trMedico.appendChild(btnBorrar);
        tr.setAttribute("class", "table100-head");
        tbody.appendChild(trMedico);
        table.replaceChild(tbody, document.getElementById('tbody'));
    }
}

function ordenarPorNombre(datosJSON) {

    function SortArray(x, y) {
        return x.nombre.localeCompare(y.nombre);
    }
    datosJSON['lista-medicos']['medico'] = datosJSON['lista-medicos']['medico'].sort(SortArray);
    conseguirMedicos(datosJSON);
}
function ordenarPorApellido(datosJSON) {

    function SortArray(x, y) {
        return x.apellido.localeCompare(y.apellido);
    }
    datosJSON['lista-medicos']['medico'] = datosJSON['lista-medicos']['medico'].sort(SortArray);
    conseguirMedicos(datosJSON);
}
function ordenarPorCedula(datosJSON) {

    function SortArray(x, y) {
        return x.cedula.toString().localeCompare(y.cedula.toString());
    }
    datosJSON['lista-medicos']['medico'] = datosJSON['lista-medicos']['medico'].sort(SortArray);
    conseguirMedicos(datosJSON);
}
function ordenarPorEmail(datosJSON) {

    function SortArray(x, y) {
        return x.email.localeCompare(y.email);
    }
    datosJSON['lista-medicos']['medico'] = datosJSON['lista-medicos']['medico'].sort(SortArray);
    conseguirMedicos(datosJSON);
}
function ordenarPorEstado(datosJSON) {

    function SortArray(x, y) {
        return x.estado.localeCompare(y.estado);
    }
    datosJSON['lista-medicos']['medico'] = datosJSON['lista-medicos']['medico'].sort(SortArray);
    conseguirMedicos(datosJSON);
}

function conseguirEspecialidades(datosJSON) {

    let especialidadList = datosJSON['lista-especialidades']['especialidad'];
    let table = document.getElementById('Table_Especialidades');
    let thead = document.createElement("thead");
    thead.setAttribute('id', 'thead');
    let tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    let tr = document.createElement("tr");
    tr.setAttribute('id', 'Encabezado');
    let crear = document.createElement("button");
    crear.innerHTML = "Agregar Especialidad"
    crear.setAttribute('id', "Agregar");
    crear.setAttribute('onclick', "openModalCrear()");


    let nombre = document.createElement("th");
    let acciones = document.createElement("th");
    let iconoOrdenarNombre = document.createElement("i");
    iconoOrdenarNombre.setAttribute("class", "fa fa-sort");
    iconoOrdenarNombre.setAttribute('onclick', "solicitarDatos('http://localhost:8080/Proyecto/resources/resfulEspecialidades', cargarDatos, ordenarPorNombreEspecialidad)");

    nombre.innerHTML = "Nombre";
    nombre.appendChild(iconoOrdenarNombre);
    nombre.setAttribute("class", "column1");
    acciones.innerHTML = "Acciones";
    acciones.setAttribute("class", "column2");

    tr.appendChild(nombre);
    tr.appendChild(acciones);

    thead.appendChild(tr);
    table.replaceChild(thead, document.getElementById('thead'));

    for (var i = 0; i < especialidadList.length; i++) {
        let trMedico = document.createElement("tr");
        let tdNombre = document.createElement("td");
        let btnAceptar = document.createElement("a");
        let btnBorrar = document.createElement("a");

        tdNombre.innerHTML = Object.getOwnPropertyDescriptors(especialidadList[i]).nombre.value;
        tdNombre.setAttribute("class", "column1");

        btnAceptar.setAttribute('href', "#");
        btnAceptar.setAttribute('id', "btn");
        btnAceptar.setAttribute('class', "btn");
        btnAceptar.setAttribute('onclick', "openModal(), document.getElementById('ced').setAttribute('value', " + Object.getOwnPropertyDescriptors(especialidadList[i]).id.value + "), document.getElementById('nombre_Editar').value = " + JSON.stringify(Object.getOwnPropertyDescriptors(especialidadList[i]).nombre.value));
        btnAceptar.innerHTML = "Editar Especialidad";
        btnAceptar.setAttribute("class", "column2");
        console.log(document.getElementById('nombre_Editar').value)

        btnBorrar.setAttribute('onclick', "eliminarDato('http://localhost:8080/Proyecto/resources/resfulEspecialidades/delete', " + Object.getOwnPropertyDescriptors(especialidadList[i]).id.value + ")")
        btnBorrar.setAttribute('id', "btn");
        btnBorrar.setAttribute('class', "btn");
        btnBorrar.innerHTML = "Borrar Especialidad";
        btnBorrar.setAttribute("class", "column2");



        trMedico.appendChild(tdNombre);

        trMedico.appendChild(btnAceptar);
        trMedico.appendChild(btnBorrar);
        tr.setAttribute("class", "table100-head");
        tbody.appendChild(trMedico);
        table.replaceChild(tbody, document.getElementById('tbody'));
    }
    if (document.getElementById('Agregar') === null) {
        table.appendChild(crear);
    }else{
        table.replaceChild(crear, document.getElementById('Agregar'));
    }

}

function ordenarPorNombreEspecialidad(datosJSON) {

    function SortArray(x, y) {
        return x.nombre.localeCompare(y.nombre);
    }
    datosJSON['lista-especialidades']['especialidad'] = datosJSON['lista-especialidades']['especialidad'].sort(SortArray);
    conseguirEspecialidades(datosJSON);
}
