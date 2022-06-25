
let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();



let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

let nextMonthDOM = document.getElementById('next-month');
let prevMonthDOM = document.getElementById('prev-month');

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click', () => lastMonth());
nextMonthDOM.addEventListener('click', () => nextMonth());

let listaCitas = document.querySelectorAll('.divCita');
let listaDias = document.querySelectorAll('.calendar__dateCalendar__item');
let draggedItem = null;

writeMonth(monthNumber);
getCitas();
function writeMonth(month) {
    for (let i = startDay(); i > 0; i--) {
        dates.innerHTML += '<div class="calendar__dateCalendar__item_calendar__last_days">' + (getTotalDays(monthNumber - 1) - (i - 1)) + '</div>';
    }

    for (let i = 1; i <= getTotalDays(month); i++) {
        dates.innerHTML += '<div class="calendar__dateCalendar__item" id="dia' + i + '">' + i + '</div>';
    }
}

function getTotalDays(month) {
    if (month === -1)
        month = 11;
    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return 31;
    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;
    } else {
        return isLeap() ? 29 : 28;
    }


}

function isLeap() {
    return((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
}
function startDay() {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}
function lastMonth() {
    if (monthNumber !== 0) {
        monthNumber--;
    } else {
        monthNumber = 11;
        currentYear--;
    }
    setNewDate();
}
function nextMonth() {
    if (monthNumber !== 11) {
        monthNumber++;
    } else {
        monthNumber = 0;
        currentYear++;
    }
    setNewDate();
}
function setNewDate() {
    currentDate.setFullYear(currentYear, monthNumber, currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeMonth(monthNumber);
}

function getCitas() {
    solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, llenarCalendario)
}

function llenarCalendario(datosJson) {

    var citasList = datosJson.citas;

    for (var i = 0; i < citasList.length; i++) {

        let date = new Date(citasList[i].fecha);
        let dayN = date.getDate();
        let divDia = document.getElementById("dia" + dayN);

        var div = document.createElement("div");
        div.setAttribute("class", "divCita");
        div.innerHTML += citasList[i].hora + '&nbsp;&nbsp;&nbsp;&nbsp;';
        //div.innerHTML += citasList[i].lugarDeCita + "<br>";
        if (citasList[i].disponibilidad === "Disponible") {
            div.classList.add("divCitaDisponible");
        } else {
            div.classList.add("divCitaCompletada");
            div.setAttribute("draggable", "true");

            div.addEventListener('dblclick', function () {
                document.location.href = "Citas_Medico_Diagnostico.jsp?cedula=" + document.getElementById("cedula").value;
            });
        }

        let bor = document.createElement("i");
        bor.setAttribute("class", "fa fa-trash");
        bor.setAttribute("aria-hidden", "true");
        bor.classList.add("borrar");
        bor.addEventListener('click', function () {
            swal("Cita borrada correctamente", "Cita borrada correctamente", "success");
            this.parentNode.remove(this);
        });

        div.appendChild(bor)
        divDia.appendChild(div);

    }
    eventoDragCitas();
}

function eventoDragCitas() {
    listaCitas = document.querySelectorAll('.divCitaDisponible');
    listaDias = document.querySelectorAll('.divCitaCompletada');
    for (let i = 0; i < listaDias.length; i++) {
        const item = listaDias[i];

        item.addEventListener('dragstart', function () {
            draggedItem = item;
            setTimeout(function () {
                item.style.display = 'none';
            }, 0)
        });

        item.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        })

        for (let j = 0; j < listaCitas.length; j++) {
            const list = listaCitas[j];

            list.addEventListener('dragover', function (e) {
                e.preventDefault();
            });

            list.addEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            });

            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            });

            list.addEventListener('drop', function (e) {
                e.preventDefault();
                this.replaceWith(draggedItem);
            });
        }
    }
}
