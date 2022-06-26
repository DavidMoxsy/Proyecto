function enviarBoton(dato) {

    if (dato === "medico") {
        document.location.href = "jsp_Medicos/Medicos.jsp";
    } else if (dato === "paciente") {
        document.location.href = "jsp_Pacientes/Pacientes.jsp";
    } else if (dato === "administrador") {
        document.location.href = "jsp_Administradores/Administradores.jsp";
    } else if (dato === "volver_Seleccion") {
        document.location.href = "../index.jsp";
    } else if (dato === "volver_Perfil_Medico") {
        document.location.href = "Pantalla_Principal_Medicos.jsp?cedula=" + document.getElementById("cedula").value;
    } else if (dato === "volver_Perfil_Paciente") {
        document.location.href = "Pantalla_Principal_Pacientes.jsp?cedula=" + document.getElementById("cedula").value;
    }else if (dato === "volver_Perfil_Administrador") {
        document.location.href = "Pantalla_Principal_Administradores.jsp?cedula=" + document.getElementById("cedula").value;
    } else if (dato === "salir_Perfil_Medico") {
        document.location.href = "Medicos.jsp";
    } else if (dato === "salir_Perfil_Paciente") {
        document.location.href = "Pacientes.jsp";
    }else if (dato === "salir_Perfil_Administrador") {
        document.location.href = "Administradores.jsp";
    }else if (dato === "volver_citas_medico") {
        document.location.href = "Citas_Medico.jsp?cedula=" + document.getElementById("cedula").value;
    }
}