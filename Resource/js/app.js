/*Codigo de usuarios*/
var consultas = new Consultas();
var pacientes = new Pacientes();
var usuarios = new Usuarios();
var reportes = new Reportes();

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

        //console.log(poblacionRiesgo);



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

        let opoblacionRiesgo = document.getElementById("otraPoblacionRiesgoN").value;
        let otraMedicina = document.getElementById("ompreventivaN").value;
        let saturacion = document.getElementById("saturacionN").value;



        //mandamos los datos al metod registrarPaciente de Paciente.js
        if (nombre != "" && paterno != "" && materno != "" && fechaNac != "" && telefonoCel != ""
            && sexo != "Elige una opción" && estadoCiv != "Elige una opción" && centroCost != "Elige una opción"
            && tipoPaciente != "Elige una opción" && tipoAtencion !="Elige una opción" && poblacionRiesgo.length != 0 && peso != "" && talla != "" && tarterial != ""
            && saturacion != "" && temperatura != "" && fcardiaca != "" && frespiratoria != "" && descripcion != ""
            && diagnostico != "" && tratamiento != "" && ambulancia != undefined && referenciado != undefined) {

            pacientes.registrarPaciente(nombre, paterno, materno, fechaNac, sexo, otro_sexo,
                telefonoCel, estadoCiv, centroCost, tipoPaciente, nivelAcademico, departamento, fecha_alta_pac, userId,
                edad, tipoAtencion, poblacionRiesgo, medicinaPreventiva, fcardiaca, frespiratoria, temperatura,
                tarterial, talla, peso, descripcion, diagnostico, tratamiento, observaciones,
                ambulancia, referenciado, lugarReferencia, horaConsulta, otraMedicina, opoblacionRiesgo, saturacion);

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
        let opoblacionRiesgo = document.getElementById("otraPoblacionRiesgo").value;

        let medicinaPreventiva = [];
        $("input:checkbox[name=medicinaPrev]:checked").each(function () {
            medicinaPreventiva.push($(this).val());
        });

        let ompreventiva = document.getElementById("ompreventiva").value;

        let fcardiaca = document.getElementById("frecCardiaca").value;
        let frespiratoria = document.getElementById("frecRespiratoria").value;
        let temperatura = document.getElementById("temperatura").value;
        let tarterial = document.getElementById("tarterial").value;
        let saturacion = document.getElementById("saturacion").value;
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
            && temperatura != "" && fcardiaca != "" && frespiratoria != ""&& saturacion != "" && descripcion != ""
            && diagnostico != "" && tratamiento != "" && ambulancia != undefined && referenciado != undefined) {
            //alert("aqui todo bien");
            //validar que inserten referenciado
            consultas.registrarConsulta(id_paciente, edad, tipoAtencion2, poblacionRiesgo, medicinaPreventiva, ompreventiva,
                fcardiaca, frespiratoria, temperatura, tarterial, talla, peso, descripcion, diagnostico,
                tratamiento, observaciones, ambulancia, referenciado, lugarReferencia,
                fecha_consulta, horaConsulta, userId, opoblacionRiesgo, saturacion);
            return false; //para evitar reenvio de formulario
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Completa todos los campos obligatorios!',

            })
        }
    });
    $("#btnMuestraReporte").click(function () {
                //console.log("Vamos a hacer el reporte");
        let consultorios = document.getElementById("selectConsultorio");  
        let id_consultorio = consultorios.options[consultorios.selectedIndex].value;
        let nombre_consultorio = consultorios.options[consultorios.selectedIndex].text;
        //console.log("Vamos a hacer el reporte" + nombre_consultorio);
         let rango = document.getElementById("selectRango");
         let fechaRango = rango.options[rango.selectedIndex].value;
         //console.log("consultorio id;"+id_consultorio+":fechaRango:"+fechaRango);

        //mandamos los datos al metodo Reportes
        
         if ((id_consultorio != 0 || id_conusltorio != null) && (fechaRango != 0 || fechaRango != null)) {
             //console.log("aqui todo bien");
             reportes.getRepConsultasSemanal(id_consultorio, fechaRango, nombre_consultorio);           
             return false; //para evitar reenvio de formulario
         } else {
             Swal.fire({
                 icon: 'error',
                 text: 'Elige una opcion para cada criterio',
 
             })
         }
        reportes.getDatos();
    });

});
//inicializar Select consultas y select semanas para el reporte*/

var iniciaConsultoriosSemanas = () => {
   // alert("Inicializamos select");
    consultas.getConsultorios();
    //console.log("LLEGUE3");
    consultas.getRangosFecha();
}


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
        //console.log('Vamos a habilitar el input text');
        lugarreferencia.disabled = false;
    });

    // evento para el input radio del "no referenciado"
    document.getElementById('noreferenciado').addEventListener('click', function (e) {
        //console.log('Vamos a deshabilitar el input text');
        lugarreferencia.value = "";
        lugarreferencia.disabled = true;
    });

    document.getElementById('ninguna').addEventListener('change', function (e) {
        if (document.getElementById('ninguna').checked) {
            //console.log('Vamos a habilitar los checkPR');
            $("input:checkbox[name=poblacionRiesgo]:checked").prop('checked', false);
            $("input:checkbox[name=poblacionRiesgo]").prop("disabled", true);
             //deshabilitar campo para otra poblacion riesgo
             $('#otraPoblacionRiesgo').val("");
             $('#otraPoblacionRiesgo').attr("disabled", true);
        } else {
            $("input:checkbox[name=poblacionRiesgo]").prop("disabled", false);
            $('#otraPoblacionRiesgo').attr("disabled", false);
        }

    }
    );

    let valor = document.getElementById("filtrarPacienteC").value;

    //alert("hola");
    consultas.getPacientesConsulta(valor);

}

/*Entra a la pagina de reportes*/
var getReportes = () => {
    //alert("estamos en la pagina de reportes PRINCIPAL");
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
    //console.log(data);
    //pacientes.editarPaciente(data);
}

/*funcion que envia datos de paciente para generar NUEVA consulta*/
var pacienteNuevaConsulta = (data) => {
    consultas.reestablecerUsuario();
    consultas.vaciarFormularioConsulta();
    consultas.nombrePaciente(data);
   // console.log(data);
    var cambiaBoton = document.getElementById('btnRConsulta');
    if (cambiaBoton != null) {
        /*Oculta el botón del formulario*/
        cambiaBoton.style.visibility = 'visible';
    }
}

/*funcion que se ejecuta cuando se pulsa el botón VER TODAS, 
-- envia datos de paciente para generar HISTORIAL de consultas*/
var pacienteHistorial = (data) => {
    consultas.vaciarFormularioConsulta();
    consultas.nombrePacienteDetalleConsulta(data);
   // console.log("datosVERTODAS");
   // console.log(data);
    //pacientes.editarPaciente(data);
}

var mostrarConsulta = (data) => {
    consultas.vaciarFormularioConsulta();
    //Se borra el boton del fromulario(RGISTRO)
    var cambiaBoton = document.getElementById('btnRConsulta');
    if (cambiaBoton != null) {
        /*Oculta el botón del formulario*/
        cambiaBoton.style.visibility = 'hidden';
    }
   // alert("muestra datos:" + data);
   // console.log(data);
   // console.log(data.edad);
    /*Se llenan datos del paciente*/
    let nombre_paciente = localStorage.getItem("nombreCompletoPac");
    document.getElementById("nombrePaciente").value = nombre_paciente;
    document.getElementById("edadPaciente").value = data.edad;

    /*Sellenan datos de consulta*/
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
    //trae datos para medicina preventiva, población de riesgo, tipo de atencion, otra medicina preventiva
    consultas.consultaAtencionRiesgoMedP(data.id_consulta, data.id_tipo_atencion);
    //ambulancia
    if (data.ambulancia = 0) {
        document.getElementById("ambulanciaNO").checked = true;
    } else if (data.ambulancia = 1) {
        document.getElementById("ambulanciaSI").checked = true;
    }
    //referenciado
    if (data.referenciado = 0) {
        document.getElementById("noreferenciado").checked = true;
    } else if (data.referenciado = 1) {
        document.getElementById("referenciado").checked = true;
    }
    document.getElementById("lugarreferencia").value = data.lugar_referencia;
    document.getElementById("observaciones").value = data.observaciones;

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
            if(localStorage.getItem("user") != null){
                let user = JSON.parse(localStorage.getItem("user"));
            document.getElementById('messageBienvenida').innerHTML = "Bienvenid@ " +
             "<strong>" +user.nombre_usr + "</strong> al Sistema de Control de Consultorios UAEM";
            }
            break;
        case PATHNAME + "Pacientes/pacientes":
            getPacientes();
            break;
        case PATHNAME + "Consultas/consultas":
            getPacientesC();
            break;
            case PATHNAME + "Historia/historia":
            getPacientesC();
            break;
        case PATHNAME + "Reportes/reportes":
            getReportes();
            break;
    }


});

