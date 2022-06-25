function incializarREST() {
    fetch('http://localhost:8080/Proyecto/resources/restfulPacientes')
            .then(resultados => resultados.json())
    fetch('http://localhost:8080/Proyecto/resources/restfulMedicos')
            .then(resultados => resultados.json())
    fetch('http://localhost:8080/Proyecto/resources/restfulAdministradores')
            .then(resultados => resultados.json())
    fetch('http://localhost:8080/Proyecto/resources/restfulLocalidades')
            .then(resultados => resultados.json())
    fetch('http://localhost:8080/Proyecto/resources/resfulEspecialidades')
            .then(resultados => resultados.json())
}

function cargarDatos(callback, url) {
    fetch(url)
            .then(resultados => resultados.json())
            .then(datosJSON => callback(datosJSON));
}

function crearUsuario(url, datos) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

}

function buscarDatoPorId(id, callback, url) {

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(id),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
            .then(resultados => resultados.json())
            .then(datosJSON => callback(datosJSON))
            .catch(function (e) {
                console.log(e);
            });
}

function eliminarDato(url, id) {

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(id),
        headers: {
            'Content-Type': 'application/json'
        }
    })
            .then(location.reload())
            .catch(function (e) {
                console.log(e);
            });
}

function editarDato(dato, url) {
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(dato),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
            .then(location.reload())
            .catch(function (e) {
                console.log(e);
            });
}