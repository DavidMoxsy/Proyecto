<%-- 
    Document   : Medico_Paciente_Citas
    Created on : 12 jun. 2022, 23:15:09
    Author     : Alfredo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Perfil del medico</title>
        <link rel="stylesheet" type="text/css" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
        <link href="../css/css_Medicos/Pantalla_Principal_Medico .css" rel="stylesheet" type="text/css"/>
        <script src="../js/js_Medicos/scripts_Medicos.js" type="text/javascript"></script>
        <link href="../css/css_Medicos/Medico_Paciente_Citas.css" rel="stylesheet" type="text/css"/>
        <script src="../js/js_General/datosJSON.js" type="text/javascript"></script>
        <script src="../js/js_General/enviarBotones.js" type="text/javascript"></script>
    </head>

    
    
    <input id="cedula" value="<%=request.getParameter("cedula")%>" hidden>
    <input id="cedulaMedico" value="<%=request.getParameter("cedulaMedico")%>" hidden>
    <body onload="solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulPacientes/getPorID', buscarDatoPorId, muestraDatosPacientes)">
        
        <div class="grid">
           <div></div> 
       
       <div id = "div_tabla" ></div>
          <div></div>
        </div>

                    
    </body>
</html>
