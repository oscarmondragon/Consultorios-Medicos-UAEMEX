/*Codigo de usuarios*/
var consultas = new Consultas();
var pacientes = new Pacientes();
var usuarios = new Usuarios();

var loginUser = () => {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    usuarios.loginUser(username, password);

}

var sessionClose = () => {
    usuarios.sessionClose();

}

var restablecerPaciente = () => {
    pacientes.restablecerPaciente();
}



//registro de pacientes
$(function () {
    $("#btnNuevoPac").click(function () {

        //capturamos en variables los datos del paciente a registrar
        let nombre = document.getElementById("nombre").value;
        let paterno = document.getElementById("paterno").value;
        let materno = document.getElementById("materno").value;
        let fechaNac = document.getElementById("fechaNac").value;
        let telefonoCel = document.getElementById("telefonoCel").value;

        let sexos = document.getElementById("sexo");
        let sexo = sexos.options[sexos.selectedIndex].text;
        let otro_sexo = null;
        if (sexo === "Otro") {
            otro_sexo = document.getElementById("otro_sexo").value;
        }

        let estadosCiv = document.getElementById("estadoCiv");

        let estadoCiv = estadosCiv.options[estadosCiv.selectedIndex].value;



        let departamento = document.getElementById("departamento").value;

        let centrosCost = document.getElementById("centroCosto");

        let centroCost = centrosCost.options[centrosCost.selectedIndex].value;



        let tiposPaciente = document.getElementById("tipoPaciente");
        let tipoPaciente = tiposPaciente.options[tiposPaciente.selectedIndex].value;

        let niveles = document.getElementById("nivelAcademico");
        let nivelAcademico = niveles.options[niveles.selectedIndex].text;
        //obtenemos fecha actual

        let hoy = new Date();
        let fecha_alta_pac = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();


        //obtenemos datos de usuario que registra
        let user = JSON.parse(localStorage.getItem("user"));
        let userId = user.id_usr;

        //DATOS DE LA CONSULTA CONSULTA
        let edad = document.getElementById("edadPacienteN").value;

        let atencion = document.getElementById("tipoAtencion2N");
        let tipoAtencion = atencion.options[atencion.selectedIndex].value;

        //poblacion de riesgo
        let poblacionRiesgo = [];
        let ningunaPoblacion = document.getElementById("ningunaN");
        if (ningunaPoblacion.checked) {
            poblacionRiesgo.push($(ningunaPoblacion).val());
        } else {
            $("input:checkbox[name=poblacionRiesgo]:checked").each(function () {
                poblacionRiesgo.push($(this).val());
            });
        }

        console.log(poblacionRiesgo);



        let medicinaPreventiva = [];
        $("input:checkbox[name=medicinaPrev]:checked").each(function () {
            medicinaPreventiva.push($(this).val());
        });

        let fcardiaca = document.getElementById("frecCardiacaN").value;
        let frespiratoria = document.getElementById("frecRespiratoriaN").value;
        let temperatura = document.getElementById("temperaturaN").value;
        let tarterial = document.getElementById("tarterialN").value;
        let talla = document.getElementById("tallaN").value;
        let peso = document.getElementById("pesoN").value;

        let descripcion = document.getElementById("descripcionN").value;
        let diagnostico = document.getElementById("diagnosticoN").value;
        let tratamiento = document.getElementById("tratamientoN").value;

        let observaciones = document.getElementById("observacionesN").value;

        let ambulancia = $('input:radio[name=ambulanciaN]:checked').val();
        let referenciado = $('input:radio[name=referenciadoN]:checked').val();
        let lugarReferencia = document.getElementById("lugarreferenciaN").value;

        let horaConsulta = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();

        let otraMedicina = document.getElementById("ompreventivaN").value;

        //mandamos los datos al metod registrarPaciente de Paciente.js
        if (nombre != "" && paterno != "" && materno != "" && fechaNac != "" && telefonoCel != ""
            && sexo != "Elige una opción" && estadoCiv != "Elige una opción" && centroCost != "Elige una opción"
            && tipoPaciente != "Elige una opción" && poblacionRiesgo.length != 0 && peso != "" && talla != "" && tarterial != ""
            && temperatura != "" && fcardiaca != "" && frespiratoria != "" && descripcion != ""
            && diagnostico != "" && tratamiento != "" && ambulancia != undefined && referenciado != undefined) {

            pacientes.registrarPaciente(nombre, paterno, materno, fechaNac, sexo, otro_sexo,
                telefonoCel, estadoCiv, centroCost, tipoPaciente, nivelAcademico, departamento, fecha_alta_pac, userId,
                edad, tipoAtencion, poblacionRiesgo, medicinaPreventiva, fcardiaca, frespiratoria, temperatura,
                tarterial, talla, peso, descripcion, diagnostico, tratamiento, observaciones,
                ambulancia, referenciado, lugarReferencia, horaConsulta, otraMedicina);

            return false; //para evitar reenvio de formulario
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Completa todos los campos obligatorios!',

            })
        }
    });

    $("#btnRConsulta").click(function () {
        //obtenemos id del paciente a registrar consulta
        let id_paciente = localStorage.getItem("id_paciente");

        //obtenemos fecha actual
        let hoy = new Date();
        let fecha_consulta = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();

        //obtenemos datos de usuario que registra
        let user = JSON.parse(localStorage.getItem("user"));
        let userId = user.id_usr;

        //DATOS DE LA CONSULTA CONSULTA
        let edad = document.getElementById("edadPaciente").value;

        let atencion = document.getElementById("tipoAtencion");
        let tipoAtencion = atencion.options[atencion.selectedIndex].value;

        let atencion2 = document.getElementById("tipoAtencion2");
        let tipoAtencion2 = atencion2.options[atencion2.selectedIndex].value;

        //poblacion de riesgo

        let poblacionRiesgo = [];
        let ningunaPoblacion = document.getElementById("ninguna");
        if (ningunaPoblacion.checked) {
            poblacionRiesgo.push($(ningunaPoblacion).val());
        } else {
            $("input:checkbox[name=poblacionRiesgo]:checked").each(function () {
                poblacionRiesgo.push($(this).val());
            });
        }

        let medicinaPreventiva = [];
        $("input:checkbox[name=medicinaPrev]:checked").each(function () {
            medicinaPreventiva.push($(this).val());
        });

        let ompreventiva = document.getElementById("ompreventiva").value;

        let fcardiaca = document.getElementById("frecCardiaca").value;
        let frespiratoria = document.getElementById("frecRespiratoria").value;
        let temperatura = document.getElementById("temperatura").value;
        let tarterial = document.getElementById("tarterial").value;
        let talla = document.getElementById("talla").value;
        let peso = document.getElementById("peso").value;

        let descripcion = document.getElementById("descripcion").value;
        let diagnostico = document.getElementById("diagnostico").value;
        let tratamiento = document.getElementById("tratamiento").value;

        let observaciones = document.getElementById("observaciones").value;

        let ambulancia = $('input:radio[name=ambulancia]:checked').val();
        let referenciado = $('input:radio[name=referenciado]:checked').val();
        let lugarReferencia = document.getElementById("lugarreferencia").value;

        let horaConsulta = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();

        //mandamos los datos al metod registrarPaciente de Paciente.js
        if (edad != "" && poblacionRiesgo.length != 0 && peso != "" && talla != "" && tarterial != ""
            && temperatura != "" && fcardiaca != "" && frespiratoria != "" && descripcion != ""
            && diagnostico != "" && tratamiento != "" && ambulancia != undefined && referenciado != undefined) {
            //alert("aqui todo bien");
            consultas.registrarConsulta(id_paciente, edad, tipoAtencion2, poblacionRiesgo, medicinaPreventiva, ompreventiva,
                fcardiaca, frespiratoria, temperatura, tarterial, talla, peso, descripcion, diagnostico,
                tratamiento, observaciones, ambulancia, referenciado, lugarReferencia,
                fecha_consulta, horaConsulta, userId);
            return false; //para evitar reenvio de formulario
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Completa todos los campos obligatorios!',

            })
        }
    });
    $("#btnMuestraReporte").click(function () {  
       /* let consultorios = document.getElementById("selectConsultorio");        
        let id_consultorio = consultorios.options[consultorios.selectedIndex].value;
        alert("llegue3"+id_consultorio);

        let rango = document.getElementById("selectRango");
        let fechaRango = rango.options[rango.selectedIndex].value;
        alert("llegue3"+fechaRango);

       */

        //mandamos los datos al metod registrarPaciente de Paciente.js
       /* if (id_consultorio != 0 && fechaRango != 0 ) {
            alert("aqui todo bien");
            consultas.getConsultas(id_consultorio,fechaRango);
          
            return false; //para evitar reenvio de formulario
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Elige una opcion para cada criterio',

            })
        }*/
        consultas.getDatos();
    });

});

// llama metodo para filtrar pacientes
var getPacientes = () => {
    let lugarreferencia = document.getElementById('lugarreferenciaN');
    lugarreferencia.disabled = true;

    // evento para el input radio del "si referenciado paciente"
    document.getElementById('referenciadoN').addEventListener('click', function (e) {
        lugarreferencia.disabled = false;
    });

    // evento para el input radio del "no referenciado paciente"
    document.getElementById('noreferenciadoN').addEventListener('click', function (e) {
        lugarreferencia.value = "";
        lugarreferencia.disabled = true;
    });

    let valor = document.getElementById("filtrarPaciente").value;

    pacientes.getPacientes(valor);

}

var getPacientesC = () => {
    var lugarreferencia = document.getElementById('lugarreferencia');

    // evento para el input radio del "si referenciado"
    document.getElementById('referenciado').addEventListener('click', function (e) {
        console.log('Vamos a habilitar el input text');
        lugarreferencia.disabled = false;
    });

    // evento para el input radio del "no referenciado"
    document.getElementById('noreferenciado').addEventListener('click', function (e) {
        console.log('Vamos a deshabilitar el input text');
        lugarreferencia.value = "";
        lugarreferencia.disabled = true;
    });

    document.getElementById('ninguna').addEventListener('change', function (e) {
        if (document.getElementById('ninguna').checked) {
            console.log('Vamos a habilitar los checkPR');
            $("input:checkbox[name=poblacionRiesgo]:checked").prop('checked', false);
            $("input:checkbox[name=poblacionRiesgo]").prop("disabled", true);
        } else {
            $("input:checkbox[name=poblacionRiesgo]").prop("disabled", false);
        }

    }
    );

    let valor = document.getElementById("filtrarPacienteC").value;

    //alert("hola");
    consultas.getPacientesConsulta(valor);

}


var getReportes = () => {
  /*  console.log("LLEGUE");
    try{
        consultas.getConsultorios();
        console.log("LLEGUE3");
    }catch(err){
        console.log(err);

    } 
      console.log("LLEGUE2");
    consultas.getRangosFecha();*/
}


//funcion para obtener datos del paciente para editar
var dataPaciente = (data) => {
    console.log(data);
    //pacientes.editarPaciente(data);
}

/*funcion que envia datos de paciente para generar NUEVA consulta*/
var pacienteNConsulta = (data) => {
    //alert("hola" + data.nombre_pac);
    consultas.reestablecerUsuario();
    consultas.nombrePaciente(data);
    console.log(data);
}
/*funcion que envia datos de paciente para generar HISTORIAL de consultas*/
var pacienteHistorial = (data) => {
    consultas.nombrePacienteH(data);
    console.log(data);
    //pacientes.editarPaciente(data);
}

var mostrarConsulta = (data) => {
    alert("muestra datos:" + data);
    console.log(data);
    console.log(data.edad);
    document.getElementById("edadPaciente").value = data.edad;
    //poblacion de riesgo
    document.getElementById("frecCardiaca").value = data.frecuencia_cardiaca;
    document.getElementById("frecRespiratoria").value = data.frecuencia_respiratoria;
    document.getElementById("temperatura").value = data.temperatura;
    document.getElementById("tarterial").value = data.tension_arterial;
    document.getElementById("talla").value = data.talla;
    document.getElementById("peso").value = data.peso;
    document.getElementById("descripcion").value = data.descripcion;
    document.getElementById("diagnostico").value = data.diagnostico;
    document.getElementById("tratamiento").value = data.tratamiento;
    //medicina preventiva
    //otra_medicina preventiva
    //document.getElementById("omp").value
    //ambulancia
    //referenciado
    document.getElementById("lugarreferencia").value = data.lugar_referencia;
    document.getElementById("observaciones").value = data.observaciones;

    //document.getElementById("frecCardiaca").value = paciente.nombre_pac + " " + paciente.apPaterno_pac + " " + paciente.apMaterno_pac;
    // document.getElementById("fechaNac").value = paciente.fecha_nacimiento_pac;
}

/**/
// evento para eltipo de atencion
/*document.getElementById('tipoAtencion').addEventListener("change", function (e) {
    console.log('click en el tipo');
  /* lugarreferencia.value = "";
    lugarreferencia.disabled = true;*./
});*/





/*PRINCIPAL: para cambiar color a la opcion seleccionada del menu*/
var principal = new Principal();


//codigo para validar formulario de login
$().ready(() => {
    let URLactual = window.location.pathname;
    usuarios.userData(URLactual);
    principal.linkPrincipal(URLactual);

    // $("#validate").validate();
    // $(".sidenav").sidenav();
    // $(".modal").modal();
    // $('select').formSelect();
    M.AutoInit();

    switch (URLactual) {
        case PATHNAME + "Principal/principal":
            break;
        case PATHNAME + "Pacientes/pacientes":
            getPacientes();
            break;
        case PATHNAME + "Consultas/consultas":
            getPacientesC();
            break;
        case PATHNAME + "Reportes/reportes":
            getReportes();
            break;
    }


});

