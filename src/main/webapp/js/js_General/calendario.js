
let monthNames =  ['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

let currentDate =new Date();
let currentDay = currentDate.getDate();
let monthNumber =currentDate.getMonth();
let currentYear = currentDate.getFullYear();

console.log(currentDay + '---'+monthNumber+'---'+currentYear);

let dates=document.getElementById('dates');
let month=document.getElementById('month');
let year=document.getElementById('year');

let nextMonthDOM=document.getElementById('next--month');
let prevMonthDOM=document.getElementById('prev-month');

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click',()=>lastMonth());
nextMonthDOM.addEventListener('click',()=>nextMonth());

writeMonth(monthNumber);
getCitas();

function writeMonth(month){
    
    for(let i = startDay(); i>0 ;i--){
        dates.innerHTML += '<div class="calendar__dateCalendar__item calendar__last-days">'+getTotalDays(monthNumber-1)-(i-1)+'</div>';
    }
    
    for(let i =1; i<=getTotalDays(month); i++){
        dates.innerHTML += '<div class="calendar__dateCalendar__item" id="dia'+i+'">'+i+'</div>';
    }
}

function getTotalDays(month){
    if(month === -1)month =11;
    if(month==0||month==2||month==4||month==6||month==7||month==9||month==11){
        return 31;
    }else if(month==3||month==5||month==8||month==10){
        return 30;
    }else{
        return isLeap() ? 29:28;
    }
    
    
}

function isLeap(){
    return((currentYear %100 !==0)&&(currentYear % 4===0)||(currentYear % 400===0));  
}
function startDay(){
    let start=new Date(currentYear, monthNumber,1);
    return ((start.getDay()-1) ===-1) ? 6:start.getDay()-1;
}
function lastMonth(){
    if(monthNumber !==0){
        monthNumber--;
    }else{
        monthNumber =11;
        currentYear--;
    }
    setNewDate();
}
function nextMonth(){
      if(monthNumber !==11){
        monthNumber++;
    }else{
        monthNumber =0;
        currentYear++;
    }
}
function setNewDate(){
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent=monthNames[monthNumber];
    year.textContent=currentYear.toString();
    dates.textContent='';
    writeMonth(monthNumber);
}

function getCitas(){
    console.log("1");
    solicitarDatos2('http://localhost:8080/Proyecto/resources/restfulMedicos/getPorID', buscarDatoPorId, llenarCalendario)
}

function llenarCalendario(datosJson){
    
    console.log("2");
    console.log(datosJson);
    var citasList = datosJson.citas;
    console.log(citasList);
    for (var i = 0; i < citasList.length; i++) {
        
        let date = new Date(citasList[i].fecha);
        console.log(date);
        let dayN = date.getDate() + 1;
        console.log(dayN);
        let divDia = document.getElementById("dia"+dayN);
        
        var div = document.createElement("div");
        div.setAttribute("class", "divCita");
        div.innerHTML += citasList[i].hora + "<br>";
        div.innerHTML += citasList[i].lugarDeCita + "<br>";
        
        divDia.appendChild(div);

        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.innerHTML = "Eliminar";
        a.value = i;
        a.onclick = function () {
        };
        // event.preventDefault();
        divDia.appendChild(a);
        
        a = document.createElement("a");
        a.setAttribute("href", "#");
        a.innerHTML = citasList[i].disponibilidad;
        a.value = i;
        a.onclick = function () {
        };
        // event.preventDefault();
        divDia.appendChild(a);

    }
}