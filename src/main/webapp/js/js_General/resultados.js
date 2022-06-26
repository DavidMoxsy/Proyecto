function guardarResultados(event) {
    event.preventDefault();
    solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, guardar)
    //console.log("pruebaaaa")
    function guardar(datosJSON) {
        let signos = document.getElementById("signos").value;
        let diagnostico = document.getElementById("diagnostico").value;
        let prescripciones = document.getElementById("prescripciones").value;
        var citasList = datosJSON.citas;
        var citaID = parseInt(document.getElementById("citaID").value);
        console.log(citaID)
        for (var i = 0; i < citasList.length; i++) {

            if (citaID === citasList[i].id) {

                if (signos !== "") {
                    citasList[i].signos = signos;
                }
                if (diagnostico !== "") {
                    citasList[i].diagnostico = diagnostico;
                }
                if (prescripciones !== "") {
                    citasList[i].prescripciones = prescripciones;
                }



            }
            var numCit = document.getElementById('citaID');

            //Read File
            var selectedFile = document.getElementById("file").files;

            //Check File is not Empty
            if (selectedFile.length > 0) {
                // Select the very first file from list
                var fileToLoad = selectedFile[0];
                // FileReader function for read the file.
                var fileReader = new FileReader();
                var base64;
                // Onload of file read the file content
                fileReader.onload = function (fileLoadedEvent) {
                    base64 = fileLoadedEvent.target.result;
                    // Print data in console
                    var base64Converted = base64.replace(/^data:application\/[a-z]+;base64,/, "");

                    datosJSON.citas[parseInt(numCit.value) - 1].resultadosLaboratorio.push(base64Converted);
                    editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulMedicos');
                };
                // Convert data to base64
                fileReader.readAsDataURL(fileToLoad);
            }

            swal({
                title: "Se ha guardado!",
                text: "Informacion guardada.",
                timer: 6000

            });

        }

    }

}
