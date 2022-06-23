<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Medicos_Administrador</title>
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>
        <script src="../js/js_Administradores/scripts_Administradores1.js" type="text/javascript"></script>
    </head>
    <body onload="solicitarDatos('http://localhost:8080/Proyecto_2_Version_Final/resources/restfulMedicos', cargarDatos, conseguirMedicos)">
        <h1>Lista de medicos disponibles</h1>
        <table id="Table_Medicos" class="Table_Medicos"></table>
    </body>
</html>
