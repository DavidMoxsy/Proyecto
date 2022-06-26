function init() {
    solicitarDatos("http://localhost:8080/Proyecto/resources/rest", "tabla1", cargarDatos, cargarTabla);
    console.log("Aplicación inicializada..");
}


function solicitarDatos(url, tabla, fn, callback) {
    fn(callback, url, tabla);
}

function solicitarDatos2(url, fn, callback) {
    fn(document.getElementById("cedula").value, callback, url, fn);
}

function solicitarDatos3(url, fn, callback, evt) {
    evt.preventDefault();
    fn(document.getElementById("cedula").value, callback, url, fn);
}

function solicitarDatos4(url, fn, callback) {
    fn(document.getElementById("cedulaPaciente").value, callback, url, fn);
}

function solicitarDatos5(url, fn, callback, id) {
    fn(id, callback, url, fn);
}

function iniciarSesion(datosJSON) {


    if (datosJSON.cedula === parseInt(document.getElementById("cedula").value)) {
        if (datosJSON.clave === document.getElementById("clave").value) {
            if (datosJSON.estado === "Aceptado") {
                window.location.href = "Pantalla_Principal_Medicos.jsp?cedula=" + document.getElementById("cedula").value;
            } else {
                swal('Usuario en espera', 'El usuario no ha sido aceptado por un administrador, por favor espere a ser aceptado para iniciar sesion', 'warning');
                var cedula = document.getElementById("cedula");
                cedula.value = "";
                var clave = document.getElementById("clave");
                clave.value = "";
            }
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

function medicoIniciado(datosJSON) {
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
    mustraPacientes();
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

function crearMedico(url, evt) {

    evt.preventDefault();

    var dat = {};
    dat = {"cedula": parseInt(document.getElementById("cedulaRegistro").value),
        "nombre": document.getElementById("nombre").value,
        "apellido": document.getElementById("apellido").value,
        "clave": document.getElementById("claveRegistro").value,
        "email": document.getElementById("email").value};

    if (document.getElementById("claveRegistro").value === document.getElementById("confirmarClave").value) {
        crearUsuario(url, dat);
        swal("Medico creado correctamente", "El medico fue ingresado correctamente", "success")
                .then(() => {
                    location.reload();
                });
    } else {
        swal('Clave incorrecta', 'Verifique que escribiera correctamente su clave 2 veces', 'error');
        var confirmar_Password_Editar = document.getElementById("confirmar_Password_Editar");
        confirmar_Password_Editar.value = "";
    }
}


function mustraPacientes() {
    //pacientes es el metodo que recibe los datos JSON
    cargarDatos(pacientes, 'http://localhost:8080/Proyecto/resources/restfulMedicos')

}

function pacientes(datosJSON) {

    let medicosList = datosJSON['lista-medicos']['medico'];
    var medicoId = parseInt(document.getElementById("cedula").value);

    var pacienteList = [];

    for (var i = 0; i < medicosList.length; i++) {
        if (medicoId === medicosList[i].cedula) {
            var citasList = medicosList[i].citas;
        }
    }
    for (var j = 0; j < citasList.length; j++) {
        if (citasList[j].cedulaPaciente !== 0) {
            if (!pacienteList.includes(citasList[j].cedulaPaciente)) {
                pacienteList.push(citasList[j].cedulaPaciente);
            }
        }
    }

    var lista = document.getElementById("pacientes");
    for (var k = 0; k < pacienteList.length; k++) {
        cldiv = document.createElement("div");
        cldiv.className = "cldiv";

        clp = document.createElement("li");
        clp2 = document.createElement("a");
        clp2.href = "Medico_Paciente_Citas.jsp?cedula=" + medicoId + "&cedulaPaciente=" + pacienteList[k];
        //muestraDatosPacientes(pacienteList[k]);
        clp2.className = "cita-paciente";

        clp.appendChild(clp2);
        clp2.appendChild(document.createTextNode(pacienteList[k]));
        lista.appendChild(clp);
    }
}

function editarAntecedentes(datosJSON) {
    datosJSON.resena = document.getElementById("antecedentes_Editar").value;
    console.log(datosJSON.resena)
    editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulPacientes');
}

function verResLab(num, id) {

    solicitarDatos5('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, ver, id);

    function ver(datosJSON) {

        let medico = datosJSON;

        function _base64ToArrayBuffer(base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }

        var bytes = _base64ToArrayBuffer(medico.citas[num].resultadosLaboratorio[0]);


        var blob = new Blob([bytes], {type: 'application/pdf'});
        var blobURL = URL.createObjectURL(blob);
        window.open(blobURL);

        console.log(medico.citas[num].resultadosLaboratorio[0])
    }
}


function muestraDatosPacientes(datosJSON) {

    var pacienteID = parseInt(document.getElementById("cedulaPaciente").value);
    var citasList = datosJSON.citas;
    //datosJSON.forEach( p => { 
    var div = document.getElementById("div_tabla");

    let antecedentes = document.getElementById("antecedentes_Editar");
    antecedentes.innerHTML = datosJSON.resena;

    var tabla = document.createElement("table");
    tabla.className = "tabla_citas";
    var trHea0 = document.createElement("tr");
    var trHea = document.createElement("tr");
    var thHea0 = document.createElement("th");

    var thHea1 = document.createElement("th");
    var thHea2 = document.createElement("th");
    var thHea3 = document.createElement("th");
    var thHea4 = document.createElement("th");
    var thHea5 = document.createElement("th");
    var thHea6 = document.createElement("th");
    var thHea7 = document.createElement("th");
    var thHea8 = document.createElement("th");
    var thHea9 = document.createElement("th");

    //thHea0.innerHTML = "Historial de Citas del Paciente: " + datosJSON.nombre + " " + datosJSON.apellido;
    thHea0.innerHTML = "Historial de Citas del Paciente: " + pacienteID;
    thHea1.innerHTML = "Dia";
    thHea2.innerHTML = "Hora";
    thHea3.innerHTML = "ID del Paciente";
    thHea4.innerHTML = "Lugar";
    thHea5.innerHTML = "Estado";
    thHea6.innerHTML = "Acciones";
    thHea7.innerHTML = "Signos";
    thHea8.innerHTML = "Diagnóstico";
    thHea9.innerHTML = "Prescripciones";
    trHea0.append(thHea0);
    trHea.append(thHea1, thHea2, thHea3, thHea4, thHea7, thHea8, thHea9, thHea5, thHea6);
    tabla.append(trHea0, trHea);
   // tabla.setAttribute("border-button", "2");
    thHea0.setAttribute("colspan", "9");
    div.appendChild(tabla);
    for (var i = 0; i < citasList.length; i++) {
        if (citasList[i].cedulaPaciente === pacienteID) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var td5 = document.createElement("td");
            var td6 = document.createElement("td");
            var td7 = document.createElement("td");
            var td8 = document.createElement("td");
            var td9 = document.createElement("td");

            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.innerHTML = "Completar";
            a.value = i;
            a.onclick = function () {
                cambiarEstado(this.value, datosJSON);
            };

            var a2 = document.createElement("a");
            a2.setAttribute("href", "#");
            a2.innerHTML = "Resultados de Laboratorio";
            a2.value = i;
            a2.setAttribute('onclick', 'verResLab(' + i + ', ' + datosJSON.cedula + ')');
            // event.preventDefault();

            td9.appendChild(a);
            td9.appendChild(a2);


            td1.innerHTML = citasList[i].fecha;
            td2.innerHTML = citasList[i].hora;
            // td3.innerHTML = datosJSON.nombre + " " + datosJSON.apellido;
            td3.innerHTML = citasList[i].cedulaPaciente;
            td4.innerHTML = citasList[i].lugarDeCita;
            td5.innerHTML = citasList[i].signos;
            td6.innerHTML = citasList[i].diagnostico;
            td7.innerHTML = citasList[i].prescripciones;
            td8.innerHTML = citasList[i].estadoCita;

            tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9);
            tabla.appendChild(tr);
        }
    }



}


function cambiarEstado(ini, datosJSON) {

    if (datosJSON.citas[ini].estadoCita !== "Completada") {
        datosJSON.citas[ini].estadoCita = "Completada";
        editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulMedicos');
    }
}


function citas(paciID, pacientesList) {

    // let pacientesList = datosJSON['lista-pacientes']['paciente'];
    pacientesList.forEach(p => {
        if (paciID == p.cedula) {
            var lista = document.getElementById("cldiv");

            cldiv = document.createElement("div");
            clp = document.createElement("li");
            cpp = document.textContent("prueba");
            clp.appendChild(cpp);
            cldiv.appendChild(clp);

        }


    })

}



function cambiarFoto(datosJSON) {

    const file = document.getElementById('file-input').files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        var base64 = reader.result;
        var base64Converted = base64.replace(/^data:image\/[a-z]+;base64,/, "");

        datosJSON.foto = base64Converted;

        editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulMedicos');
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

    document.getElementById('form').submit();
}

function actualizarCitas(datosJSON) {

    editarDato1(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulMedicos');
}

function editarMedico(datosJSON) {


    if (document.getElementById("password_Editar").value === document.getElementById("confirmar_Password_Editar").value) {

        datosJSON.cedula = document.getElementById("cedula_Editar").value;
        datosJSON.nombre = document.getElementById("nombre_Editar").value;
        datosJSON.apellido = document.getElementById("apellido_Editar").value;
        datosJSON.clave = document.getElementById("password_Editar").value;
        datosJSON.email = document.getElementById("email_Editar").value;
        datosJSON.costoConsulta = document.getElementById("costoConsulta_Editar").value;
        datosJSON.resena = document.getElementById("descripcion_Editar").value;
        cargarDatos(modificarEspecialidades, 'http://localhost:8080/Proyecto/resources/resfulEspecialidades');
        function modificarEspecialidades(datosJSON2) {

            let datos = datosJSON2['lista-especialidades']['especialidad'];
            datosJSON.especialidades.splice(0, datosJSON.especialidades.length);
            for (var i = 0; i < datos.length; i++) {

                if (document.getElementById(datos[i].nombre).checked === true) {
                    datosJSON.especialidades.push(datos[i].nombre);
                }
            }
            editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulMedicos');
        }

        cargarDatos(modificarLocalidades, 'http://localhost:8080/Proyecto/resources/restfulLocalidades');
        function modificarLocalidades(datosJSON2) {

            let datos = datosJSON2['lista-localidades']['localidad'];
            datosJSON.localidades.splice(0, datosJSON.localidades.length);
            for (var i = 0; i < datos.length; i++) {

                if (document.getElementById(datos[i].ubicacion).checked === true) {

                    var horasLunes;
                    var horasMartes;
                    var horasMiercoles;
                    var horasJueves;
                    var horasViernes;
                    var horasSabado;
                    var horasDomingo;
                    var horas = [];
                    if (document.getElementById("lunes" + i).checked === true) {
                        horasLunes = {"nombre": "Lunes", "horaInicio": document.getElementById("horaEntradaLunes" + i).value, "horaTermina": document.getElementById("horaSalidaLunes" + i).value, "frecuencia": parseInt(document.getElementById("frecuenciaLunes" + i).value)};
                        horas.push(horasLunes);
                    }
                    if (document.getElementById("martes" + i).checked === true) {
                        horasMartes = {"nombre": "Martes", "horaInicio": document.getElementById("horaEntradaMartes" + i).value, "horaTermina": document.getElementById("horaSalidaMartes" + i).value, "frecuencia": parseInt(document.getElementById("frecuenciaMartes" + i).value)};
                        horas.push(horasMartes);
                    }
                    if (document.getElementById("miercoles" + i).checked === true) {
                        horasMiercoles = {"nombre": "Miercoles", "horaInicio": document.getElementById("horaEntradaMiercoles" + i).value, "horaTermina": document.getElementById("horaSalidaMiercoles" + i).value, "frecuencia": parseInt(document.getElementById("frecuenciaMiercoles" + i).value)};
                        horas.push(horasMiercoles);
                    }
                    if (document.getElementById("jueves" + i).checked === true) {
                        horasJueves = {"nombre": "Jueves", "horaInicio": document.getElementById("horaEntradaJueves" + i).value, "horaTermina": document.getElementById("horaSalidaJueves" + i).value, "frecuencia": parseInt(document.getElementById("frecuenciaJueves" + i).value)};
                        horas.push(horasJueves);
                    }
                    if (document.getElementById("viernes" + i).checked === true) {
                        horasViernes = {"nombre": "Viernes", "horaInicio": document.getElementById("horaEntradaViernes" + i).value, "horaTermina": document.getElementById("horaSalidaViernes" + i).value, "frecuencia": parseInt(document.getElementById("frecuenciaViernes" + i).value)};
                        horas.push(horasViernes);
                    }
                    if (document.getElementById("sabado" + i).checked === true) {
                        horasSabado = {"nombre": "Sabado", "horaInicio": document.getElementById("horaEntradaSabado" + i).value, "horaTermina": document.getElementById("horaSalidaSabado" + i).value, "frecuencia": parseInt(document.getElementById("frecuenciaSabado" + i).value)};
                        horas.push(horasSabado);
                    }
                    if (document.getElementById("domingo" + i).checked === true) {
                        horasDomingo = {"nombre": "Domingo", "horaInicio": document.getElementById("horaEntradaDomingo" + i).value, "horaTermina": document.getElementById("horaSalidaDomingo" + i).value, "frecuencia": parseInt(document.getElementById("frecuenciaDomingo" + i).value)};
                        horas.push(horasDomingo);
                    }

                    let localidad = {"id": i, "ubicacion": datos[i].ubicacion, "horarioSemanal": horas};
                    datosJSON.localidades.push(localidad);
                    editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulMedicos');
                }
            }
        }
    } else {
        swal('Clave incorrecta', 'Verifique que escribiera correctamente su clave 2 veces', 'error');
        var confirmar_Password_Editar = document.getElementById("confirmar_Password_Editar");
        confirmar_Password_Editar.value = "";
    }
}

function llenarDatos(datosJSON) {
    let medico = datosJSON;
    document.getElementById("titulo").innerHTML = medico.nombre + " " + medico.apellido;
    document.getElementById("resena").innerHTML = medico.resena;
    document.getElementById("id").innerHTML = "Cedula: " + medico.cedula;
    document.getElementById("correo").innerHTML = "Correo: " + medico.email;
    var foto = medico.foto;
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

function datosEditar(datosJSON) {
    let medico = datosJSON;

    var nombre = document.getElementById("nombre_Editar");
    nombre.value = medico.nombre;
    var apellido = document.getElementById("apellido_Editar");
    apellido.value = medico.apellido;
    var clave = document.getElementById("password_Editar");
    clave.value = medico.clave;
    var cedula = document.getElementById("cedula_Editar");
    cedula.value = medico.cedula;
    var email = document.getElementById("email_Editar");
    email.value = medico.email;
    var costoConsulta = document.getElementById("costoConsulta_Editar");
    costoConsulta.value = medico.costoConsulta;
    var descripcion = document.getElementById("descripcion_Editar");
    descripcion.value = medico.resena;

    var especialidades = document.getElementById("Especialidades");
    var localidades = document.getElementById("Localidades");
    cargarDatos(arrayEspecialidades, 'http://localhost:8080/Proyecto/resources/resfulEspecialidades');
    function arrayEspecialidades(datosJSON) {

        let datos = datosJSON['lista-especialidades']['especialidad'];
        for (var i = 0; i < datos.length; i++) {

            var input = document.createElement("INPUT");
            var span = document.createElement("SPAN");
            var label = document.createElement("LABEL");
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", datos[i].nombre);
            span.setAttribute("class", "checkmark");
            label.setAttribute("class", "container");
            label.innerHTML = datos[i].nombre;
            label.appendChild(input);
            label.appendChild(span);
            for (var j = 0; j < medico.especialidades.length; j++) {
                if (medico.especialidades[j] === datos[i].nombre) {
                    input.setAttribute("checked", "true");
                }
            }

            especialidades.appendChild(label);
        }
    }

    cargarDatos(arrayLocalidades, 'http://localhost:8080/Proyecto/resources/restfulLocalidades');
    function arrayLocalidades(datosJSON) {

        let datos = datosJSON['lista-localidades']['localidad'];
        for (var i = 0; i < datos.length; i++) {

            //Lunes
            //Creacion de datos
            var labelHoraEntradaLunes = document.createElement("LABEL");
            var inputHoraEntradaLunes = document.createElement("INPUT");
            var labelFrecuenciaLunes = document.createElement("LABEL");
            var inputFrecuenciaLunes = document.createElement("INPUT");
            var labelHoraSalidaLunes = document.createElement("LABEL");
            var inputHoraSalidaLunes = document.createElement("INPUT");
            var divLunes = document.createElement("DIV");
            var labelLunes = document.createElement("LABEL");
            var inputLunes = document.createElement("INPUT");
            var contenedorLunes = document.createElement("DIV");
            //Asignación de datos al input y label del dia
            labelLunes.setAttribute("for", "lunes");
            labelLunes.innerHTML = "Lunes";
            inputLunes.setAttribute("id", "lunes" + i);
            inputLunes.setAttribute("name", "lunes" + i);
            inputLunes.setAttribute("type", "checkbox");
            //Asignación de datos a las horas del dia
            labelHoraEntradaLunes.setAttribute("for", "horaEntradaLunes");
            labelHoraEntradaLunes.innerHTML = "Hora de entrada:";
            inputHoraEntradaLunes.setAttribute("id", "horaEntradaLunes" + i);
            inputHoraEntradaLunes.setAttribute("name", "horaEntradaLunes" + i);
            inputHoraEntradaLunes.setAttribute("type", "time");
            labelFrecuenciaLunes.setAttribute("for", "frecuencia");
            labelFrecuenciaLunes.innerHTML = "Frecuencia de citas:";
            inputFrecuenciaLunes.setAttribute("id", "frecuenciaLunes" + i);
            inputFrecuenciaLunes.setAttribute("name", "frecuenciaLunes" + i);
            inputFrecuenciaLunes.setAttribute("type", "number");
            labelHoraSalidaLunes.setAttribute("for", "horaSalida");
            labelHoraSalidaLunes.innerHTML = "Hora de salida:";
            inputHoraSalidaLunes.setAttribute("id", "horaSalidaLunes" + i);
            inputHoraSalidaLunes.setAttribute("name", "horaSalidaLunes" + i);
            inputHoraSalidaLunes.setAttribute("type", "time");
            //Asignación de valores al contenedor del dia
            divLunes.appendChild(labelHoraEntradaLunes);
            divLunes.appendChild(inputHoraEntradaLunes);
            divLunes.appendChild(labelHoraSalidaLunes);
            divLunes.appendChild(inputHoraSalidaLunes);
            divLunes.appendChild(labelFrecuenciaLunes);
            divLunes.appendChild(inputFrecuenciaLunes);
            //Asignación de datos al contenedor del dia
            contenedorLunes.appendChild(labelLunes);
            contenedorLunes.appendChild(inputLunes);
            contenedorLunes.appendChild(divLunes);
            //Martes
            //Creacion de datos
            var labelHoraEntradaMartes = document.createElement("LABEL");
            var inputHoraEntradaMartes = document.createElement("INPUT");
            var labelFrecuenciaMartes = document.createElement("LABEL");
            var inputFrecuenciaMartes = document.createElement("INPUT");
            var labelHoraSalidaMartes = document.createElement("LABEL");
            var inputHoraSalidaMartes = document.createElement("INPUT");
            var divMartes = document.createElement("DIV");
            var labelMartes = document.createElement("LABEL");
            var inputMartes = document.createElement("INPUT");
            var contenedorMartes = document.createElement("DIV");
            //Asignación de datos al input y label del dia
            labelMartes.setAttribute("for", "martes");
            labelMartes.innerHTML = "Martes";
            inputMartes.setAttribute("id", "martes" + i);
            inputMartes.setAttribute("name", "martes" + i);
            inputMartes.setAttribute("type", "checkbox");
            //Asignación de datos a las horas del dia
            labelHoraEntradaMartes.setAttribute("for", "horaEntradaMartes");
            labelHoraEntradaMartes.innerHTML = "Hora de entrada:";
            inputHoraEntradaMartes.setAttribute("id", "horaEntradaMartes" + i);
            inputHoraEntradaMartes.setAttribute("name", "horaEntradaMartes" + i);
            inputHoraEntradaMartes.setAttribute("type", "time");
            labelFrecuenciaMartes.setAttribute("for", "frecuenciaMartes");
            labelFrecuenciaMartes.innerHTML = "Frecuencia de citas:";
            inputFrecuenciaMartes.setAttribute("id", "frecuenciaMartes" + i);
            inputFrecuenciaMartes.setAttribute("name", "frecuencia" + i);
            inputFrecuenciaMartes.setAttribute("type", "number");
            labelHoraSalidaMartes.setAttribute("for", "horaSalidaMartes");
            labelHoraSalidaMartes.innerHTML = "Hora de salida:";
            inputHoraSalidaMartes.setAttribute("id", "horaSalidaMartes" + i);
            inputHoraSalidaMartes.setAttribute("name", "horaSalidaMartes" + i);
            inputHoraSalidaMartes.setAttribute("type", "time");
            //Asignación de valores al contenedor del dia                
            divMartes.appendChild(labelHoraEntradaMartes);
            divMartes.appendChild(inputHoraEntradaMartes);
            divMartes.appendChild(labelHoraSalidaMartes);
            divMartes.appendChild(inputHoraSalidaMartes);
            divMartes.appendChild(labelFrecuenciaMartes);
            divMartes.appendChild(inputFrecuenciaMartes);
            //Asignación de datos al contenedor del dia                
            contenedorMartes.appendChild(labelMartes);
            contenedorMartes.appendChild(inputMartes);
            contenedorMartes.appendChild(divMartes);
            //Miercoles
            //Creacion de datos
            var labelHoraEntradaMiercoles = document.createElement("LABEL");
            var inputHoraEntradaMiercoles = document.createElement("INPUT");
            var labelFrecuenciaMiercoles = document.createElement("LABEL");
            var inputFrecuenciaMiercoles = document.createElement("INPUT");
            var labelHoraSalidaMiercoles = document.createElement("LABEL");
            var inputHoraSalidaMiercoles = document.createElement("INPUT");
            var divMiercoles = document.createElement("DIV");
            var labelMiercoles = document.createElement("LABEL");
            var inputMiercoles = document.createElement("INPUT");
            var contenedorMiercoles = document.createElement("DIV");
            //Asignación de datos al input y label del dia
            labelMiercoles.setAttribute("for", "miercoles");
            labelMiercoles.innerHTML = "Miercoles";
            inputMiercoles.setAttribute("id", "miercoles" + i);
            inputMiercoles.setAttribute("name", "miercoles" + i);
            inputMiercoles.setAttribute("type", "checkbox");
            //Asignación de datos a las horas del dia
            labelHoraEntradaMiercoles.setAttribute("for", "horaEntradaMiercoles");
            labelHoraEntradaMiercoles.innerHTML = "Hora de entrada:";
            inputHoraEntradaMiercoles.setAttribute("id", "horaEntradaMiercoles" + i);
            inputHoraEntradaMiercoles.setAttribute("name", "horaEntradaMiercoles" + i);
            inputHoraEntradaMiercoles.setAttribute("type", "time");
            labelFrecuenciaMiercoles.setAttribute("for", "frecuenciaMiercoles");
            labelFrecuenciaMiercoles.innerHTML = "Frecuencia de citas:";
            inputFrecuenciaMiercoles.setAttribute("id", "frecuenciaMiercoles" + i);
            inputFrecuenciaMiercoles.setAttribute("name", "frecuenciaMiercoles" + i);
            inputFrecuenciaMiercoles.setAttribute("type", "number");
            labelHoraSalidaMiercoles.setAttribute("for", "horaSalidaMiercoles");
            labelHoraSalidaMiercoles.innerHTML = "Hora de salida:";
            inputHoraSalidaMiercoles.setAttribute("id", "horaSalidaMiercoles" + i);
            inputHoraSalidaMiercoles.setAttribute("name", "horaSalidaMiercoles" + i);
            inputHoraSalidaMiercoles.setAttribute("type", "time");
            //Asignación de valores al contenedor del dia
            divMiercoles.appendChild(labelHoraEntradaMiercoles);
            divMiercoles.appendChild(inputHoraEntradaMiercoles);
            divMiercoles.appendChild(labelHoraSalidaMiercoles);
            divMiercoles.appendChild(inputHoraSalidaMiercoles);
            divMiercoles.appendChild(labelFrecuenciaMiercoles);
            divMiercoles.appendChild(inputFrecuenciaMiercoles);
            //Asignación de datos al contenedor del dia
            contenedorMiercoles.appendChild(labelMiercoles);
            contenedorMiercoles.appendChild(inputMiercoles);
            contenedorMiercoles.appendChild(divMiercoles);
            //Jueves
            //Creacion de datos
            var labelHoraEntradaJueves = document.createElement("LABEL");
            var inputHoraEntradaJueves = document.createElement("INPUT");
            var labelFrecuenciaJueves = document.createElement("LABEL");
            var inputFrecuenciaJueves = document.createElement("INPUT");
            var labelHoraSalidaJueves = document.createElement("LABEL");
            var inputHoraSalidaJueves = document.createElement("INPUT");
            var divJueves = document.createElement("DIV");
            var labelJueves = document.createElement("LABEL");
            var inputJueves = document.createElement("INPUT");
            var contenedorJueves = document.createElement("DIV");
            //Asignación de datos al input y label del dia
            labelJueves.setAttribute("for", "jueves");
            labelJueves.innerHTML = "Jueves";
            inputJueves.setAttribute("id", "jueves" + i);
            inputJueves.setAttribute("name", "jueves" + i);
            inputJueves.setAttribute("type", "checkbox");
            //Asignación de datos a las horas del dia
            labelHoraEntradaJueves.setAttribute("for", "horaEntradaJueves");
            labelHoraEntradaJueves.innerHTML = "Hora de entrada:";
            inputHoraEntradaJueves.setAttribute("id", "horaEntradaJueves" + i);
            inputHoraEntradaJueves.setAttribute("name", "horaEntradaJueves" + i);
            inputHoraEntradaJueves.setAttribute("type", "time");
            labelFrecuenciaJueves.setAttribute("for", "frecuenciaJueves");
            labelFrecuenciaJueves.innerHTML = "Frecuencia de citas:";
            inputFrecuenciaJueves.setAttribute("id", "frecuenciaJueves" + i);
            inputFrecuenciaJueves.setAttribute("name", "frecuenciaJueves" + i);
            inputFrecuenciaJueves.setAttribute("type", "number");
            labelHoraSalidaJueves.setAttribute("for", "horaSalidaJueves");
            labelHoraSalidaJueves.innerHTML = "Hora de salida:";
            inputHoraSalidaJueves.setAttribute("id", "horaSalidaJueves" + i);
            inputHoraSalidaJueves.setAttribute("name", "horaSalidaJueves" + i);
            inputHoraSalidaJueves.setAttribute("type", "time");
            //Asignación de valores al contenedor del dia
            divJueves.appendChild(labelHoraEntradaJueves);
            divJueves.appendChild(inputHoraEntradaJueves);
            divJueves.appendChild(labelHoraSalidaJueves);
            divJueves.appendChild(inputHoraSalidaJueves);
            divJueves.appendChild(labelFrecuenciaJueves);
            divJueves.appendChild(inputFrecuenciaJueves);
            //Asignación de datos al contenedor del dia
            contenedorJueves.appendChild(labelJueves);
            contenedorJueves.appendChild(inputJueves);
            contenedorJueves.appendChild(divJueves);
            //Viernes
            //Creacion de datos
            var labelHoraEntradaViernes = document.createElement("LABEL");
            var inputHoraEntradaViernes = document.createElement("INPUT");
            var labelFrecuenciaViernes = document.createElement("LABEL");
            var inputFrecuenciaViernes = document.createElement("INPUT");
            var labelHoraSalidaViernes = document.createElement("LABEL");
            var inputHoraSalidaViernes = document.createElement("INPUT");
            var divViernes = document.createElement("DIV");
            var labelViernes = document.createElement("LABEL");
            var inputViernes = document.createElement("INPUT");
            var contenedorViernes = document.createElement("DIV");
            //Asignación de datos al input y label del dia
            labelViernes.setAttribute("for", "Viernes");
            labelViernes.innerHTML = "Viernes";
            inputViernes.setAttribute("id", "viernes" + i);
            inputViernes.setAttribute("name", "viernes" + i);
            inputViernes.setAttribute("type", "checkbox");
            //Asignación de datos a las horas del dia
            labelHoraEntradaViernes.setAttribute("for", "horaEntradaViernes");
            labelHoraEntradaViernes.innerHTML = "Hora de entrada:";
            inputHoraEntradaViernes.setAttribute("id", "horaEntradaViernes" + i);
            inputHoraEntradaViernes.setAttribute("name", "horaEntradaViernes" + i);
            inputHoraEntradaViernes.setAttribute("type", "time");
            labelFrecuenciaViernes.setAttribute("for", "frecuenciaViernes");
            labelFrecuenciaViernes.innerHTML = "Frecuencia de citas:";
            inputFrecuenciaViernes.setAttribute("id", "frecuenciaViernes" + i);
            inputFrecuenciaViernes.setAttribute("name", "frecuenciaViernes" + i);
            inputFrecuenciaViernes.setAttribute("type", "number");
            labelHoraSalidaViernes.setAttribute("for", "horaSalidaViernes");
            labelHoraSalidaViernes.innerHTML = "Hora de salida:";
            inputHoraSalidaViernes.setAttribute("id", "horaSalidaViernes" + i);
            inputHoraSalidaViernes.setAttribute("name", "horaSalidaViernes" + i);
            inputHoraSalidaViernes.setAttribute("type", "time");
            //Asignación de valores al contenedor del dia
            divViernes.appendChild(labelHoraEntradaViernes);
            divViernes.appendChild(inputHoraEntradaViernes);
            divViernes.appendChild(labelHoraSalidaViernes);
            divViernes.appendChild(inputHoraSalidaViernes);
            divViernes.appendChild(labelFrecuenciaViernes);
            divViernes.appendChild(inputFrecuenciaViernes);
            //Asignación de datos al contenedor del dia
            contenedorViernes.appendChild(labelViernes);
            contenedorViernes.appendChild(inputViernes);
            contenedorViernes.appendChild(divViernes);
            //Sabado
            //Creacion de datos
            var labelHoraEntradaSabado = document.createElement("LABEL");
            var inputHoraEntradaSabado = document.createElement("INPUT");
            var labelFrecuenciaSabado = document.createElement("LABEL");
            var inputFrecuenciaSabado = document.createElement("INPUT");
            var labelHoraSalidaSabado = document.createElement("LABEL");
            var inputHoraSalidaSabado = document.createElement("INPUT");
            var divSabado = document.createElement("DIV");
            var labelSabado = document.createElement("LABEL");
            var inputSabado = document.createElement("INPUT");
            var contenedorSabado = document.createElement("DIV");
            //Asignación de datos al input y label del dia
            labelSabado.setAttribute("for", "sabado");
            labelSabado.innerHTML = "Sabado";
            inputSabado.setAttribute("id", "sabado" + i);
            inputSabado.setAttribute("name", "sabado" + i);
            inputSabado.setAttribute("type", "checkbox");
            //Asignación de datos a las horas del dia
            labelHoraEntradaSabado.setAttribute("for", "horaEntradaSabado");
            labelHoraEntradaSabado.innerHTML = "Hora de entrada:";
            inputHoraEntradaSabado.setAttribute("id", "horaEntradaSabado" + i);
            inputHoraEntradaSabado.setAttribute("name", "horaEntradaSabado" + i);
            inputHoraEntradaSabado.setAttribute("type", "time");
            labelFrecuenciaSabado.setAttribute("for", "frecuenciaSabado");
            labelFrecuenciaSabado.innerHTML = "Frecuencia de citas:";
            inputFrecuenciaSabado.setAttribute("id", "frecuenciaSabado" + i);
            inputFrecuenciaSabado.setAttribute("name", "frecuenciaSabado" + i);
            inputFrecuenciaSabado.setAttribute("type", "number");
            labelHoraSalidaSabado.setAttribute("for", "horaSalidaSabado");
            labelHoraSalidaSabado.innerHTML = "Hora de salida:";
            inputHoraSalidaSabado.setAttribute("id", "horaSalidaSabado" + i);
            inputHoraSalidaSabado.setAttribute("name", "horaSalidaSabado" + i);
            inputHoraSalidaSabado.setAttribute("type", "time");
            //Asignación de valores al contenedor del dia
            divSabado.appendChild(labelHoraEntradaSabado);
            divSabado.appendChild(inputHoraEntradaSabado);
            divSabado.appendChild(labelHoraSalidaSabado);
            divSabado.appendChild(inputHoraSalidaSabado);
            divSabado.appendChild(labelFrecuenciaSabado);
            divSabado.appendChild(inputFrecuenciaSabado);
            //Asignación de datos al contenedor del dia
            contenedorSabado.appendChild(labelSabado);
            contenedorSabado.appendChild(inputSabado);
            contenedorSabado.appendChild(divSabado);
            //Domingo
            //Creacion de datos
            var labelHoraEntradaDomingo = document.createElement("LABEL");
            var inputHoraEntradaDomingo = document.createElement("INPUT");
            var labelFrecuenciaDomingo = document.createElement("LABEL");
            var inputFrecuenciaDomingo = document.createElement("INPUT");
            var labelHoraSalidaDomingo = document.createElement("LABEL");
            var inputHoraSalidaDomingo = document.createElement("INPUT");
            var divDomingo = document.createElement("DIV");
            var labelDomingo = document.createElement("LABEL");
            var inputDomingo = document.createElement("INPUT");
            var contenedorDomingo = document.createElement("DIV");
            //Asignación de datos al input y label del dia
            labelDomingo.setAttribute("for", "domingo");
            labelDomingo.innerHTML = "Domingo";
            inputDomingo.setAttribute("id", "domingo" + i);
            inputDomingo.setAttribute("name", "domingo" + i);
            inputDomingo.setAttribute("type", "checkbox");
            //Asignación de datos a las horas del dia
            labelHoraEntradaDomingo.setAttribute("for", "horaEntradaDomingo");
            labelHoraEntradaDomingo.innerHTML = "Hora de entrada:";
            inputHoraEntradaDomingo.setAttribute("id", "horaEntradaDomingo" + i);
            inputHoraEntradaDomingo.setAttribute("name", "horaEntradaDomingo" + i);
            inputHoraEntradaDomingo.setAttribute("type", "time");
            labelFrecuenciaDomingo.setAttribute("for", "frecuenciaDomingo");
            labelFrecuenciaDomingo.innerHTML = "Frecuencia de citas:";
            inputFrecuenciaDomingo.setAttribute("id", "frecuenciaDomingo" + i);
            inputFrecuenciaDomingo.setAttribute("name", "frecuenciaDomingo" + i);
            inputFrecuenciaDomingo.setAttribute("type", "number");
            labelHoraSalidaDomingo.setAttribute("for", "horaSalidaDomingo");
            labelHoraSalidaDomingo.innerHTML = "Hora de salida:";
            inputHoraSalidaDomingo.setAttribute("id", "horaSalidaDomingo" + i);
            inputHoraSalidaDomingo.setAttribute("name", "horaSalidaDomingo" + i);
            inputHoraSalidaDomingo.setAttribute("type", "time");
            //Asignación de valores al contenedor del dia
            divDomingo.appendChild(labelHoraEntradaDomingo);
            divDomingo.appendChild(inputHoraEntradaDomingo);
            divDomingo.appendChild(labelHoraSalidaDomingo);
            divDomingo.appendChild(inputHoraSalidaDomingo);
            divDomingo.appendChild(labelFrecuenciaDomingo);
            divDomingo.appendChild(inputFrecuenciaDomingo);
            //Asignación de datos al contenedor del dia
            contenedorDomingo.appendChild(labelDomingo);
            contenedorDomingo.appendChild(inputDomingo);
            contenedorDomingo.appendChild(divDomingo);
            //Creación del contenedor de los dias
            var divDias = document.createElement("DIV");
            divDias.setAttribute("id", "dias");
            divDias.setAttribute("class", "dias");
            //Asignación de dias al contenedor de dias
            divDias.appendChild(contenedorLunes);
            divDias.appendChild(contenedorMartes);
            divDias.appendChild(contenedorMiercoles);
            divDias.appendChild(contenedorJueves);
            divDias.appendChild(contenedorViernes);
            divDias.appendChild(contenedorSabado);
            divDias.appendChild(contenedorDomingo);
            //Creación de label y checkbox del contenedor de los horarios
            var input = document.createElement("INPUT");
            var span = document.createElement("SPAN");
            var label = document.createElement("LABEL");
            //Asignación de datos
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", datos[i].ubicacion);
            label.setAttribute("class", "container");
            label.innerHTML = datos[i].ubicacion;
            label.appendChild(input);
            span.setAttribute("class", "checkmark");
            label.appendChild(span);
            label.appendChild(divDias);
            //Verificación de si el medico tiene ya asignada una localidad y un horario
            for (var j = 0; j < medico.localidades.length; j++) {
                if (medico.localidades[j].ubicacion === datos[i].ubicacion) {
                    input.setAttribute("checked", "true");
                    for (var k = 0; k < medico.localidades[j].horarioSemanal.length; k++) {

                        if (labelLunes.innerHTML === medico.localidades[j].horarioSemanal[k].nombre) {
                            inputLunes.setAttribute("checked", "true");
                            inputHoraEntradaLunes.value = medico.localidades[j].horarioSemanal[k].horaInicio;
                            inputHoraSalidaLunes.value = medico.localidades[j].horarioSemanal[k].horaTermina;
                            inputFrecuenciaLunes.value = medico.localidades[j].horarioSemanal[k].frecuencia;

                            let horaEntrada = parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(0, 2));
                            let minutosEntrada = (parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(6, 3)));
                            let horaSalida;
                            let minutosSalida;
                            if (horaEntrada > 12 && parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)) < horaEntrada) {
                                horaSalida = 24 + (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            } else {
                                horaSalida = parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            }
                            let frecuencia = medico.localidades[j].horarioSemanal[k].frecuencia;
                            let cantidadDeCitas = (((horaSalida - horaEntrada) * 60) / frecuencia) + (minutosSalida - minutosEntrada) / frecuencia;
                            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
                            var f = new Date();
                            let fechaCita;
                            var proximo = new Date(f);
                            switch (diasSemana[f.getDay()]) {
                                case 'Lunes':
                                    fechaCita = proximo;
                                    break;
                                case 'Martes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 6)
                                    fechaCita = proximo
                                    break;
                                case 'Miercoles':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 5)
                                    fechaCita = proximo
                                    break;
                                case 'Jueves':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 4)
                                    fechaCita = proximo
                                    break;
                                case 'Viernes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 3)
                                    fechaCita = proximo
                                    break;
                                case 'Sábado':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 2)
                                    fechaCita = proximo;
                                    break;
                                case 'Domingo':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 1)
                                    fechaCita = proximo
                                    break;
                            }

                            const formatDate = (date) => {
                                let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                                return formatted_date;
                            }

                            var hor = horaEntrada;
                            var min = minutosEntrada;
                            for (var l = 0; l < cantidadDeCitas; l++) {

                                var cita = {};
                                cita = {"id": medico.citas.length + 1,
                                    "fecha": formatDate(proximo),
                                    "hora": hor + ':' + (min),
                                    "lugarDeCita": medico.localidades[j].ubicacion,
                                    "disponibilidad": "Disponible",
                                    "cedulaMedico": medico.cedula,
                                    "cedulaPaciente": null,
                                    "signos": "",
                                    "diagnostico": "",
                                    "prescripciones": "",
                                    "resultadosLaboratorio": [],
                                    "estadoCita": "No completado"
                                };

                                if ((min + 15) > 59) {
                                    if (hor + 1 <= 24) {
                                        hor += 1;
                                    } else {
                                        hor = 0;
                                    }
                                    min = 0;
                                } else {
                                    min = (min + 15);
                                }

                                var z = 0;
                                var num = 0;

                                while (z < medico.citas.length && num === 0) {
                                    if (cita.fecha === medico.citas[z].fecha && cita.hora === medico.citas[z].hora && cita.lugarDeCita === medico.citas[z].lugarDeCita) {
                                        num = 1;
                                    }
                                    z++;
                                }
                                if (num === 0) {
                                    medico.citas.push(cita);
                                    actualizarCitas(medico);
                                }
                            }
                        }

                        if (labelMartes.innerHTML === medico.localidades[j].horarioSemanal[k].nombre) {
                            inputMartes.setAttribute("checked", "true");
                            inputHoraEntradaMartes.value = medico.localidades[j].horarioSemanal[k].horaInicio;
                            inputHoraSalidaMartes.value = medico.localidades[j].horarioSemanal[k].horaTermina;
                            inputFrecuenciaMartes.value = medico.localidades[j].horarioSemanal[k].frecuencia;

                            let horaEntrada = parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(0, 2));
                            let minutosEntrada = (parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(6, 3)));
                            let horaSalida;
                            let minutosSalida;
                            if (horaEntrada > 12 && parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)) < horaEntrada) {
                                horaSalida = 24 + (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            } else {
                                horaSalida = parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            }
                            let frecuencia = medico.localidades[j].horarioSemanal[k].frecuencia;
                            let cantidadDeCitas = (((horaSalida - horaEntrada) * 60) / frecuencia) + (minutosSalida - minutosEntrada) / frecuencia;
                            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
                            var f = new Date();
                            let fechaCita;
                            var proximo = new Date(f);
                            switch (diasSemana[f.getDay()]) {
                                case 'Lunes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 1)
                                    fechaCita = proximo
                                    break;
                                case 'Martes':
                                    fechaCita = proximo;
                                    break;
                                case 'Miercoles':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 6)
                                    fechaCita = proximo
                                    break;
                                case 'Jueves':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 5)
                                    fechaCita = proximo
                                    break;
                                case 'Viernes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 4)
                                    fechaCita = proximo
                                    break;
                                case 'Sábado':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 3)
                                    fechaCita = proximo
                                    break;
                                case 'Domingo':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 2)
                                    fechaCita = proximo
                                    break;
                            }

                            const formatDate = (date) => {
                                let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                                return formatted_date;
                            }

                            var hor = horaEntrada;
                            var min = minutosEntrada;
                            for (var l = 0; l < cantidadDeCitas; l++) {

                                var cita = {};
                                cita = {"id": medico.citas.length + 1,
                                    "fecha": formatDate(proximo),
                                    "hora": hor + ':' + (min),
                                    "lugarDeCita": medico.localidades[j].ubicacion,
                                    "disponibilidad": "Disponible",
                                    "cedulaMedico": medico.cedula,
                                    "cedulaPaciente": null,
                                    "signos": "",
                                    "diagnostico": "",
                                    "prescripciones": "",
                                    "resultadosLaboratorio": [],
                                    "estadoCita": "No completado"
                                };

                                if ((min + 15) > 59) {
                                    if (hor + 1 <= 24) {
                                        hor += 1;
                                    } else {
                                        hor = 0;
                                    }
                                    min = 0;
                                } else {
                                    min = (min + 15);
                                }

                                var z = 0;
                                var num = 0;

                                while (z < medico.citas.length && num === 0) {
                                    if (cita.fecha === medico.citas[z].fecha && cita.hora === medico.citas[z].hora && cita.lugarDeCita === medico.citas[z].lugarDeCita) {
                                        num = 1;
                                    }
                                    z++;
                                }
                                if (num === 0) {
                                    medico.citas.push(cita);
                                    actualizarCitas(medico);
                                }
                            }
                        }

                        if (labelMiercoles.innerHTML === medico.localidades[j].horarioSemanal[k].nombre) {
                            inputMiercoles.setAttribute("checked", "true");
                            inputHoraEntradaMiercoles.value = medico.localidades[j].horarioSemanal[k].horaInicio;
                            inputHoraSalidaMiercoles.value = medico.localidades[j].horarioSemanal[k].horaTermina;
                            inputFrecuenciaMiercoles.value = medico.localidades[j].horarioSemanal[k].frecuencia;

                            let horaEntrada = parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(0, 2));
                            let minutosEntrada = (parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(6, 3)));
                            let horaSalida;
                            let minutosSalida;
                            if (horaEntrada > 12 && parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)) < horaEntrada) {
                                horaSalida = 24 + (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            } else {
                                horaSalida = parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            }
                            let frecuencia = medico.localidades[j].horarioSemanal[k].frecuencia;
                            let cantidadDeCitas = (((horaSalida - horaEntrada) * 60) / frecuencia) + (minutosSalida - minutosEntrada) / frecuencia;
                            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
                            var f = new Date();
                            let fechaCita;
                            var proximo = new Date(f);
                            switch (diasSemana[f.getDay()]) {
                                case 'Lunes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 2)
                                    fechaCita = proximo
                                    break;
                                case 'Martes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 1)
                                    fechaCita = proximo
                                    break;
                                case 'Miercoles':
                                    fechaCita = proximo;
                                    break;
                                case 'Jueves':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 6)
                                    fechaCita = proximo
                                    break;
                                case 'Viernes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 5)
                                    fechaCita = proximo
                                    break;
                                case 'Sábado':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 4)
                                    fechaCita = proximo
                                    break;
                                case 'Domingo':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 3)
                                    fechaCita = proximo
                                    break;
                            }

                            const formatDate = (date) => {
                                let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                                return formatted_date;
                            }

                            var hor = horaEntrada;
                            var min = minutosEntrada;
                            for (var l = 0; l < cantidadDeCitas; l++) {

                                var cita = {};
                                cita = {"id": medico.citas.length + 1,
                                    "fecha": formatDate(proximo),
                                    "hora": hor + ':' + (min),
                                    "lugarDeCita": medico.localidades[j].ubicacion,
                                    "disponibilidad": "Disponible",
                                    "cedulaMedico": medico.cedula,
                                    "cedulaPaciente": null,
                                    "signos": "",
                                    "diagnostico": "",
                                    "prescripciones": "",
                                    "resultadosLaboratorio": [],
                                    "estadoCita": "No completado"
                                };

                                if ((min + 15) > 59) {
                                    if (hor + 1 <= 24) {
                                        hor += 1;
                                    } else {
                                        hor = 0;
                                    }
                                    min = 0;
                                } else {
                                    min = (min + 15);
                                }

                                var z = 0;
                                var num = 0;

                                while (z < medico.citas.length && num === 0) {
                                    if (cita.fecha === medico.citas[z].fecha && cita.hora === medico.citas[z].hora && cita.lugarDeCita === medico.citas[z].lugarDeCita) {
                                        num = 1;
                                    }
                                    z++;
                                }
                                if (num === 0) {
                                    medico.citas.push(cita);
                                    actualizarCitas(medico);
                                }
                            }
                        }

                        if (labelJueves.innerHTML === medico.localidades[j].horarioSemanal[k].nombre) {
                            inputJueves.setAttribute("checked", "true");
                            inputHoraEntradaJueves.value = medico.localidades[j].horarioSemanal[k].horaInicio;
                            inputHoraSalidaJueves.value = medico.localidades[j].horarioSemanal[k].horaTermina;
                            inputFrecuenciaJueves.value = medico.localidades[j].horarioSemanal[k].frecuencia;

                            let horaEntrada = parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(0, 2));
                            let minutosEntrada = (parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(6, 3)));
                            let horaSalida;
                            let minutosSalida;
                            if (horaEntrada > 12 && parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)) < horaEntrada) {
                                horaSalida = 24 + (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            } else {
                                horaSalida = parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            }
                            let frecuencia = medico.localidades[j].horarioSemanal[k].frecuencia;
                            let cantidadDeCitas = (((horaSalida - horaEntrada) * 60) / frecuencia) + (minutosSalida - minutosEntrada) / frecuencia;
                            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
                            var f = new Date();
                            let fechaCita;
                            var proximo = new Date(f);
                            switch (diasSemana[f.getDay()]) {
                                case 'Lunes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 3)
                                    fechaCita = proximo
                                    break;
                                case 'Martes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 2)
                                    fechaCita = proximo
                                    break;
                                case 'Miercoles':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 1)
                                    fechaCita = proximo
                                    break;
                                case 'Jueves':
                                    fechaCita = proximo;
                                    break;
                                case 'Viernes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 6)
                                    fechaCita = proximo
                                    break;
                                case 'Sábado':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 5)
                                    fechaCita = proximo
                                    break;
                                case 'Domingo':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 4)
                                    fechaCita = proximo
                                    break;
                            }

                            const formatDate = (date) => {
                                let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                                return formatted_date;
                            }

                            var hor = horaEntrada;
                            var min = minutosEntrada;
                            for (var l = 0; l < cantidadDeCitas; l++) {

                                var cita = {};
                                cita = {"id": medico.citas.length + 1,
                                    "fecha": formatDate(proximo),
                                    "hora": hor + ':' + (min),
                                    "lugarDeCita": medico.localidades[j].ubicacion,
                                    "disponibilidad": "Disponible",
                                    "cedulaMedico": medico.cedula,
                                    "cedulaPaciente": null,
                                    "signos": "",
                                    "diagnostico": "",
                                    "prescripciones": "",
                                    "resultadosLaboratorio": [],
                                    "estadoCita": "No completado"
                                };

                                if ((min + 15) > 59) {
                                    if (hor + 1 <= 24) {
                                        hor += 1;
                                    } else {
                                        hor = 0;
                                    }
                                    min = 0;
                                } else {
                                    min = (min + 15);
                                }

                                var z = 0;
                                var num = 0;

                                while (z < medico.citas.length && num === 0) {
                                    if (cita.fecha === medico.citas[z].fecha && cita.hora === medico.citas[z].hora && cita.lugarDeCita === medico.citas[z].lugarDeCita) {
                                        num = 1;
                                    }
                                    z++;
                                }
                                if (num === 0) {
                                    medico.citas.push(cita);
                                    actualizarCitas(medico);
                                }
                            }
                        }

                        if (labelViernes.innerHTML === medico.localidades[j].horarioSemanal[k].nombre) {
                            inputViernes.setAttribute("checked", "true");
                            inputHoraEntradaViernes.value = medico.localidades[j].horarioSemanal[k].horaInicio;
                            inputHoraSalidaViernes.value = medico.localidades[j].horarioSemanal[k].horaTermina;
                            inputFrecuenciaViernes.value = medico.localidades[j].horarioSemanal[k].frecuencia;

                            let horaEntrada = parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(0, 2));
                            let minutosEntrada = (parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(6, 3)));
                            let horaSalida;
                            let minutosSalida;
                            if (horaEntrada > 12 && parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)) < horaEntrada) {
                                horaSalida = 24 + (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            } else {
                                horaSalida = parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            }
                            let frecuencia = medico.localidades[j].horarioSemanal[k].frecuencia;
                            let cantidadDeCitas = (((horaSalida - horaEntrada) * 60) / frecuencia) + (minutosSalida - minutosEntrada) / frecuencia;
                            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
                            var f = new Date();
                            let fechaCita;
                            var proximo = new Date(f);
                            switch (diasSemana[f.getDay()]) {
                                case 'Lunes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 4)
                                    fechaCita = proximo
                                    break;
                                case 'Martes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 3)
                                    fechaCita = proximo
                                    break;
                                case 'Miercoles':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 2)
                                    fechaCita = proximo
                                    break;
                                case 'Jueves':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 1)
                                    fechaCita = proximo
                                    break;
                                case 'Viernes':
                                    fechaCita = proximo;
                                    break;
                                case 'Sábado':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 6)
                                    fechaCita = proximo
                                    break;
                                case 'Domingo':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 5)
                                    fechaCita = proximo
                                    break;
                            }

                            const formatDate = (date) => {
                                let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                                return formatted_date;
                            }


                            var hor = horaEntrada;
                            var min = minutosEntrada;
                            for (var l = 0; l < cantidadDeCitas; l++) {

                                var cita = {};
                                cita = {"id": medico.citas.length + 1,
                                    "fecha": formatDate(proximo),
                                    "hora": hor + ':' + (min),
                                    "lugarDeCita": medico.localidades[j].ubicacion,
                                    "disponibilidad": "Disponible",
                                    "cedulaMedico": medico.cedula,
                                    "cedulaPaciente": null,
                                    "signos": "",
                                    "diagnostico": "",
                                    "prescripciones": "",
                                    "resultadosLaboratorio": [],
                                    "estadoCita": "No completado"
                                };

                                if ((min + 15) > 59) {
                                    if (hor + 1 <= 24) {
                                        hor += 1;
                                    } else {
                                        hor = 0;
                                    }
                                    min = 0;
                                } else {
                                    min = (min + 15);
                                }

                                var z = 0;
                                var num = 0;

                                while (z < medico.citas.length && num === 0) {
                                    if (cita.fecha === medico.citas[z].fecha && cita.hora === medico.citas[z].hora && cita.lugarDeCita === medico.citas[z].lugarDeCita) {
                                        num = 1;
                                    }
                                    z++;
                                }
                                if (num === 0) {
                                    medico.citas.push(cita);
                                    actualizarCitas(medico);
                                }
                            }
                        }

                        if (labelSabado.innerHTML === medico.localidades[j].horarioSemanal[k].nombre) {
                            inputSabado.setAttribute("checked", "true");
                            inputHoraEntradaSabado.value = medico.localidades[j].horarioSemanal[k].horaInicio;
                            inputHoraSalidaSabado.value = medico.localidades[j].horarioSemanal[k].horaTermina;
                            inputFrecuenciaSabado.value = medico.localidades[j].horarioSemanal[k].frecuencia;

                            let horaEntrada = parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(0, 2));
                            let minutosEntrada = (parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(6, 3)));
                            let horaSalida;
                            let minutosSalida;
                            if (horaEntrada > 12 && parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)) < horaEntrada) {
                                horaSalida = 24 + (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            } else {
                                horaSalida = parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            }
                            let frecuencia = medico.localidades[j].horarioSemanal[k].frecuencia;
                            let cantidadDeCitas = (((horaSalida - horaEntrada) * 60) / frecuencia) + (minutosSalida - minutosEntrada) / frecuencia;
                            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
                            var f = new Date();
                            let fechaCita;
                            var proximo = new Date(f);
                            switch (diasSemana[f.getDay()]) {
                                case 'Lunes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 5)
                                    fechaCita = proximo
                                    break;
                                case 'Martes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 4)
                                    fechaCita = proximo
                                    break;
                                case 'Miercoles':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 3)
                                    fechaCita = proximo
                                    break;
                                case 'Jueves':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 2)
                                    fechaCita = proximo
                                    break;
                                case 'Viernes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 1)
                                    fechaCita = proximo
                                    break;
                                case 'Sábado':
                                    fechaCita = proximo;
                                    break;
                                case 'Domingo':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 6)
                                    fechaCita = proximo
                                    break;
                            }

                            const formatDate = (date) => {
                                let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                                return formatted_date;
                            }

                            var hor = horaEntrada;
                            var min = minutosEntrada;
                            for (var l = 0; l < cantidadDeCitas; l++) {

                                var cita = {};
                                cita = {"id": medico.citas.length + 1,
                                    "fecha": formatDate(proximo),
                                    "hora": hor + ':' + (min),
                                    "lugarDeCita": medico.localidades[j].ubicacion,
                                    "disponibilidad": "Disponible",
                                    "cedulaMedico": medico.cedula,
                                    "cedulaPaciente": null,
                                    "signos": "",
                                    "diagnostico": "",
                                    "prescripciones": "",
                                    "resultadosLaboratorio": [],
                                    "estadoCita": "No completado"
                                };

                                if ((min + 15) > 59) {
                                    if (hor + 1 <= 24) {
                                        hor += 1;
                                    } else {
                                        hor = 0;
                                    }
                                    min = 0;
                                } else {
                                    min = (min + 15);
                                }

                                var z = 0;
                                var num = 0;

                                while (z < medico.citas.length && num === 0) {
                                    if (cita.fecha === medico.citas[z].fecha && cita.hora === medico.citas[z].hora && cita.lugarDeCita === medico.citas[z].lugarDeCita) {
                                        num = 1;
                                    }
                                    z++;
                                }
                                if (num === 0) {
                                    medico.citas.push(cita);
                                    actualizarCitas(medico);
                                }
                            }
                        }

                        if (labelDomingo.innerHTML === medico.localidades[j].horarioSemanal[k].nombre) {
                            inputDomingo.setAttribute("checked", "true");
                            inputHoraEntradaDomingo.value = medico.localidades[j].horarioSemanal[k].horaInicio;
                            inputHoraSalidaDomingo.value = medico.localidades[j].horarioSemanal[k].horaTermina;
                            inputFrecuenciaDomingo.value = medico.localidades[j].horarioSemanal[k].frecuencia;

                            let horaEntrada = parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(0, 2));
                            let minutosEntrada = (parseInt(medico.localidades[j].horarioSemanal[k].horaInicio.substring(6, 3)));
                            let horaSalida;
                            let minutosSalida;
                            if (horaEntrada > 12 && parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)) < horaEntrada) {
                                horaSalida = 24 + (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2)));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            } else {
                                horaSalida = parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(0, 2));
                                minutosSalida = (parseInt(medico.localidades[j].horarioSemanal[k].horaTermina.substring(6, 3)));
                            }
                            let frecuencia = medico.localidades[j].horarioSemanal[k].frecuencia;
                            let cantidadDeCitas = (((horaSalida - horaEntrada) * 60) / frecuencia) + (minutosSalida - minutosEntrada) / frecuencia;
                            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
                            var f = new Date();
                            let fechaCita;
                            var proximo = new Date(f);
                            switch (diasSemana[f.getDay()]) {
                                case 'Lunes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 6)
                                    fechaCita = proximo
                                    break;
                                case 'Martes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 5)
                                    fechaCita = proximo
                                    break;
                                case 'Miercoles':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 4)
                                    fechaCita = proximo
                                    break;
                                case 'Jueves':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 3)
                                    fechaCita = proximo
                                    break;
                                case 'Viernes':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 2)
                                    fechaCita = proximo
                                    break;
                                case 'Sábado':
                                    proximo = new Date(f)
                                    proximo.setDate(proximo.getDate() + 1)
                                    fechaCita = proximo
                                    break;
                                case 'Domingo':
                                    fechaCita = proximo;
                                    break;
                            }

                            const formatDate = (date) => {
                                let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
                                return formatted_date;
                            }

                            var hor = horaEntrada;
                            var min = minutosEntrada;
                            for (var l = 0; l < cantidadDeCitas; l++) {

                                var cita = {};
                                cita = {"id": medico.citas.length + 1,
                                    "fecha": formatDate(proximo),
                                    "hora": hor + ':' + (min),
                                    "lugarDeCita": medico.localidades[j].ubicacion,
                                    "disponibilidad": "Disponible",
                                    "cedulaMedico": medico.cedula,
                                    "cedulaPaciente": null,
                                    "signos": "",
                                    "diagnostico": "",
                                    "prescripciones": "",
                                    "resultadosLaboratorio": [],
                                    "estadoCita": "No completado"
                                };

                                if ((min + 15) > 59) {
                                    if (hor + 1 <= 24) {
                                        hor += 1;
                                    } else {
                                        hor = 0;
                                    }
                                    min = 0;
                                } else {
                                    min = (min + 15);
                                }

                                var z = 0;
                                var num = 0;

                                while (z < medico.citas.length && num === 0) {
                                    if (cita.fecha === medico.citas[z].fecha && cita.hora === medico.citas[z].hora && cita.lugarDeCita === medico.citas[z].lugarDeCita) {
                                        num = 1;
                                    }
                                    z++;
                                }
                                if (num === 0) {
                                    medico.citas.push(cita);
                                    actualizarCitas(medico);
                                }
                            }
                        }
                    }
                }
            }
            localidades.appendChild(label);
        }
    }
}

function registrarCitaMedico(event) {
    event.preventDefault();

    var idPaciente = document.getElementById("pacientes").value;
    var cedula = document.getElementById("cedula").value;
    var idCita = document.getElementById("idCita").value;
    var hora = document.getElementById("hora").value;
    var fecha = document.getElementById("fecha").value;
    var tipo = document.getElementById("tipo").value;
    var motivo = document.getElementById("motivo").value;

    function registrarCitaMedico1(datosJson) {

        for (var i = 0; i < datosJson.citas.length; i++) {
            if (datosJson.citas[i].hora === hora && datosJson.citas[i].fecha === fecha) {
                datosJson.citas[i].cedulaPaciente = idPaciente;
                datosJson.citas[i].cedulaMedico = cedula;
                datosJson.citas[i].fecha = fecha;
                datosJson.citas[i].hora = hora;
                datosJson.citas[i].disponibilidad = "Completada";
                datosJson.citas[i].id = idCita;
            }
        }
        editarDato(datosJson, 'http://localhost:8080/Proyecto/resources/restfulMedicos');
        location.href = "Citas_Medico.jsp?cedula=" + cedula;
    }
    swal("Cita registrada correctamente", "Cita registrada correctamente", "success")
            .then(() => {
                buscarDatoPorId(cedula, registrarCitaMedico1, 'http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID');
            });
}

function llenarPacientes(datosJson) {

    var listaPacientes = datosJson['lista-pacientes']['paciente'];
    var select = document.getElementById("pacientes");
    for (var i = 0; i < listaPacientes.length; i++) {
        select.innerHTML += '<option value="' + listaPacientes[i].cedula + '">' + listaPacientes[i].nombre + ' ' + listaPacientes[i].apellido + '</option>';
    }
}

function cargarDatosPaciente(url, callback) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
            .then(resultados => resultados.json())
            .then(datosJSON => callback(datosJSON));
}
