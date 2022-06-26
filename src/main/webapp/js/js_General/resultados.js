/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

function guardarResultados(event){
    event.preventDefault();
    solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, guardar)
    console.log("pruebaaaa")
    function guardar(datosJSON) {
    let signos = document.getElementById("signos").value;
    let diagnostico = document.getElementById("diagnostico").value;
    let prescripciones = document.getElementById("prescripciones").value;
    var citasList = datosJSON.citas;
    var citaID = parseInt(document.getElementById("citaID").value);
console.log(citaID)
    for (var i = 0; i < citasList.length; i++) {
        
        if(citaID===citasList[i].id){
           
                citasList[i].signos = signos;
                citasList[i].diagnosticos = diagnostico;
                citasList[i].prescripciones = prescripciones;
                
            
        }
        editarDato(datosJSON, 'http://localhost:8080/Proyecto/resources/restfulMedicos');
        
     swal({
  title: "Se ha guardado!",
  text: "Informacion guardada.",
  timer: 6000
  
});
        
    }

    }
}
