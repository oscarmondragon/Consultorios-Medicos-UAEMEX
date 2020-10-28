/*Codigo de usuarios*/
var consultas = new Consultas();
var pacientes = new Pacientes();
var usuarios = new Usuarios();
var reportes = new Reportes();
var historiasClinicas = new HistoriasClinicas();


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



var restablecerHistoriaClinica = () => {
    historiasClinicas.restablecerHistoriaClinica();
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
        /*solo en caso de que exista una relacion con algún historial clinico*/
        
        let id_historial = localStorage.getItem("id_historial_clinico");
        localStorage.removeItem("id_historial_clinico");
        //console.log("vale"+id_historial);
       // console.log("id_historial_clinico_relacionar:" + id_his.torial);
        //alert("id_HIST:" + localStorage.getItem("id_historial_clinico"));
       // let id_historial = 2;
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
                ambulancia, referenciado, lugarReferencia, horaConsulta, otraMedicina, opoblacionRiesgo, saturacion, id_historial);

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
              // console.log("Vamos a hacer el reporte");
        let consultorios = document.getElementById("selectConsultorio");  
        let id_consultorio = consultorios.options[consultorios.selectedIndex].value;
        let nombre_consultorio = consultorios.options[consultorios.selectedIndex].text;
        console.log("Vamos a hacer el reporte" + nombre_consultorio + ":id:" + id_consultorio);
         let rango = document.getElementById("selectRango");
         let fechaRango = rango.options[rango.selectedIndex].value;
         //console.log("consultorio id;"+id_consultorio+":fechaRango:"+fechaRango);

        //mandamos los datos al metodo Reportes       
        
         if ((id_consultorio != 0 || id_conusltorio != null) && (fechaRango != 0 || fechaRango != null)) {
             //console.log("aqui todo bien");
             //console.log("eligio todos los consultorios"+fechaRango);
             reportes.getRepConsultasSemanal(id_consultorio, fechaRango, nombre_consultorio);       
            // reportes.getPDF(id_consultorio, fechaRango, nombre_consultorio);
             return false; //para evitar reenvio de formulario
         } else {
             Swal.fire({
                 icon: 'error',
                 text: 'Elige una opcion para cada criterio',
 
             })
         }
        reportes.getDatos();
    });
    //BOTON DE REGISTRAR NUEVA HISTORIA CLINICA
    $("#btnNuevaHistoria").click(function () {
       // alert("registro nueva historia");

        //obtenemos id del usuario a registrar la historia clinica
        let user = JSON.parse(localStorage.getItem("user"));
        let userId = user.id_usr;

        //obtenemos el id de consultorio
        let idConsultorioHis = user.idConsultorio;

        //obtenemos fecha y hora actual
        let hoy = new Date();
        let fechaHistoria = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
        let horaHistoria= hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();


        //DATOS DE LA historia clinica
        let nombreHis = document.getElementById("nombreHis").value;
        let paternoHis = document.getElementById("paternoHis").value;
        let maternoHis = document.getElementById("maternoHis").value;
        let fechaNacHis = document.getElementById("fechaNacHis").value;
        

        let sexos = document.getElementById("sexo");
        let sexoHis = sexos.options[sexos.selectedIndex].text;
        let otro_sexo_his = null;
        if (sexoHis === "Otro") {
            otro_sexo_his = document.getElementById("otro_sexo").value;
        }

        let centrosCostHis = document.getElementById("centroCostoHis");

        let centroCostHis = centrosCostHis.options[centrosCostHis.selectedIndex].value;

        let tiposPacienteHis = document.getElementById("tipoPacienteHis");
        let tipoPacienteHis = tiposPacienteHis.options[tiposPacienteHis.selectedIndex].value;
        
        let domicilio = document.getElementById("domicilio").value;
        let nombreTutor = document.getElementById("nombrePadre").value;
        let parentescoTutor = document.getElementById("parentesto").value;

        //En caso de emergencias
        let nombreEmergencia = document.getElementById("nombreEmergencia").value;
        let telefonoEmergencia = document.getElementById("telefonoEmergencia").value;
        let parentescoEmergencia = document.getElementById("parentescoEmergencia").value;

        let anteHFaMiliares = document.getElementById("anteHFaMiliares").value;
        let anteNoPatologicos = document.getElementById("anteNoPatologicos").value;
        let antePatologicos = document.getElementById("antePatologicos").value;
        let anteGinecoObste = document.getElementById("anteGinecoObste").value;
        let padecimientoActual = document.getElementById("padecimientoActual").value;

        //interrogatorio por aparatos y sistemas
        let cardiovascular = document.getElementById("cardiovascular").value;
        let respiratorio = document.getElementById("respiratorio").value;
        let gastrointestinal = document.getElementById("gastrointestinal").value;
        let genitourinario = document.getElementById("genitourinario").value;
        let hematicoLinfatico = document.getElementById("hematicoLinfatico").value;
        let endocrino = document.getElementById("endocrino").value;
        let nervioso = document.getElementById("nervioso").value;
        let musculoesqueletico = document.getElementById("musculoesqueletico").value;
        let pielMucosa = document.getElementById("pielMucosa").value;

        //signos vitales
        let fcardiacaHis = document.getElementById("frecCardiacaHis").value;
        let frespiratoriaHis = document.getElementById("frecRespiratoriaHis").value;
        let temperaturaHis = document.getElementById("temperaturaHis").value;
        let tarterialHis = document.getElementById("tarterialHis").value;
        let saturacionHis = document.getElementById("saturacionHis").value;
        let pesoHis = document.getElementById("pesoHis").value;
        let tallaHis = document.getElementById("tallaHis").value;
        
        //exploracion fisica
        let habitus = document.getElementById("habitus").value;
        let cabeza = document.getElementById("cabeza").value;
        let cuello = document.getElementById("cuello").value;
        let torax = document.getElementById("torax").value;
        let abdomen = document.getElementById("abdomen").value;
        let genitales = document.getElementById("genitales").value;
        let extremidades = document.getElementById("extremidades").value;
        let piel = document.getElementById("piel").value;

        //resultados previos
        let resultadosLab = document.getElementById("resultadosLab").value;
        //diagnosticos
        let diagnosticos = document.getElementById("diagnosticos").value;
        //pronostico
        let pronostico = document.getElementById("pronostico").value;

        //el idPaciente sera 0 si no tiene coincidencias con algun paciente registrado
    
       let idPaciente = document.getElementById("idPacienteRelacionado").value;

       //console.log("id de paciente::"+idPaciente+"::");


       

        //mandamos los datos al metodo registrarHistoria de HistoriasClinicas.js
      
        if (nombreHis != "" && paternoHis != "" && maternoHis != "" && fechaNacHis != "" && sexoHis != "Elige una opción" &&
            otro_sexo_his != "" && tipoPacienteHis != "Elige una opción" && centroCostHis != "Elige una opción" && domicilio != "" && 
            nombreTutor != "" && parentescoTutor != "" && nombreEmergencia != "" && telefonoEmergencia != "" && parentescoEmergencia != "" && 
            anteHFaMiliares != "" && anteNoPatologicos != "" && antePatologicos != "" &&  anteGinecoObste != "" && padecimientoActual != "" && 
            cardiovascular != "" &&  respiratorio != "" && gastrointestinal != "" && genitourinario != "" && hematicoLinfatico != "" && 
            endocrino != "" && nervioso != "" && musculoesqueletico != "" && pielMucosa != "" && fcardiacaHis != "" && frespiratoriaHis
            != "" && temperaturaHis != "" && tarterialHis != "" && saturacionHis != "" &&  pesoHis != "" && tallaHis != "" &&  habitus != "" && 
            cabeza != "" &&  cuello != "" && torax != "" && abdomen != "" && genitales != "" && extremidades != "" && piel != "" && 
            resultadosLab != "" &&  diagnosticos != "" &&  pronostico != ""
        ) {
            //console.log("entre a if de registrohistorialapp.js" + idPaciente + "::");
            //validar que inserten referenciado
            historiasClinicas.registrarHistoria(idPaciente, idConsultorioHis, fechaHistoria, horaHistoria, nombreHis, paternoHis,
                maternoHis, fechaNacHis, sexoHis, otro_sexo_his, tipoPacienteHis, centroCostHis, domicilio, nombreTutor,
                parentescoTutor, nombreEmergencia, telefonoEmergencia, parentescoEmergencia, anteHFaMiliares,
                anteNoPatologicos, antePatologicos, anteGinecoObste, padecimientoActual, cardiovascular,
                respiratorio,gastrointestinal,genitourinario,hematicoLinfatico,endocrino,nervioso,
                musculoesqueletico,pielMucosa,fcardiacaHis, frespiratoriaHis,temperaturaHis,tarterialHis,
                saturacionHis,pesoHis,tallaHis,habitus,cabeza,cuello, torax,abdomen,genitales,extremidades,
                piel, resultadosLab, diagnosticos,pronostico, userId
                );
            return false; //para evitar reenvio de formulario
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Todos los campos son obligatorios. Por favor completalos!',

            })
        }
    });
});



//inicializar Select consultas y select semanas para el reporte*/
//Boton de reportes
var iniciaConsultoriosSemanas = () => {
    //alert("Inicializamos select");
    reportes.getConsultorios();
    //console.log("LLEGUE3");
    reportes.getRangosFecha();
}

//metodo para llamar los pacientes que coicidan con nombre y fecha en formulario de historia clinica

var getCoincidenciasPac = () => {

    
    let nombrePersona = document.getElementById("nombreHis").value;
    let paternoPersona = document.getElementById("paternoHis").value;
    let maternoPersona = document.getElementById("maternoHis").value;
    let fechaNacPersona = document.getElementById("fechaNacHis").value;


    historiasClinicas.getCoincidenciasPac(nombrePersona,paternoPersona,maternoPersona,fechaNacPersona);

}
//metodo que se ejecuta al presionar el boton de Relacionar  en el formulario de Historia clinica cuando hay sugerencia de pacientes registrados

var relacionarPaciente = (data) => { 
    
    document.getElementById("idPacienteRelacionado").value = data.id_paciente; 
    document.getElementById("tableSugerencias").style.display = "none";

}

var relacionarHistorial = (id_historial_clinico) => {
    //console.log("RelacionarHistorial:" + id_historial_clinico);

    /*Guarda el valor de id del historial para relacionarlo uan vez que se registre al paciente*/
   // localStorage.setItem("id_historial_clinico", id_historial_clinico);
   /* var cambiaBoton = document.getElementById("btnRelacionaHist");
    if (cambiaBoton != null) {
        //Oculta el botón del formulario
        cambiaBoton.style.visibility = 'hidden';
    }*/


    
    //document.getElementById("tableSugerencias").style.display = "none";

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

// llama metodo para filtrar historias clinicas
var getHistoriasClinicas = () => {
    
    let valor = document.getElementById("filtrarHistoriaClinica").value;
    historiasClinicas.getHistoriasClinicas(valor);


    try {
        //se verifica si existe un id de paciente previo para crear historial
        let id_pacPhist = localStorage.getItem("id_pacientePhistorial");
        var array = JSON.parse(id_pacPhist);
        //alert("filtrarHC":nombre:"+array.nombre_pac+":");
        if (id_pacPhist != null) {
           // alert("si contiene algo");
            var instance = M.Modal.getInstance($('#modalNHistoria'));
            instance.open();
            //inicializa valores de los combos
            historiasClinicas.restablecerHistoriaClinica();

            //deshabilita metodo que busca coincidencias de pacientes
            var deshabilitaBusqueda = document.getElementById('fechaNacHis');
            if (deshabilitaBusqueda != null) {
                deshabilitaBusqueda.removeEventListener("change", getCoincidenciasPac());
               // alert("se quito onchange");
            }
            //llena los cmapos de nombre, edad y el id_paciente de acuerdo al paciente
            //del que proviene lac reacion del historial
            document.getElementById("nombreHis").value = array.nombre_pac;
            document.getElementById("nombreHis").disabled = true;
            document.getElementById("paternoHis").value = array.apPaterno_pac;
            document.getElementById("paternoHis").disabled = true;
            document.getElementById("maternoHis").value = array.apMaterno_pac;
            document.getElementById("maternoHis").disabled = true;
            document.getElementById("fechaNacHis").value = array.fecha_nacimiento_pac;
            document.getElementById("fechaNacHis").disabled = true;
            document.getElementById("idPacienteRelacionado").value = array.id_paciente;            
        }
        localStorage.removeItem("id_pacientePhistorial");
    } catch (error) {
      //  alert(error);
     // console.log(error);
    }

}

/*Entra a la pagina de reportes*/
var getReportes = () => {
   // alert("hola");
    //console.log("Hola");
    //alert("estamos en la pagina de reportes PRINCIPAL");
    /*  console.log("LLEGUE");
      try{
          cnsultas.getConsultorios();
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
   // alert("YA ENTRO");
    var var2 = "<div class='input-field col s6' id='at2'>"
        + "<select id='tipoAtencion2' required></select ><label>Tipo de atención 2</label></div >";
    var var1 = "<div class='input-field col s6' id='at1'><select id ='tipoAtencion' onchange = 'selectatencion2();' required>"
        + "</select><label>Tipo de atención</label></div >";
    try {
        $("#at2").replaceWith(var2);
        $("#at1").replaceWith(var1);
    } catch (error) {
        console.log("Error:" +error);
    }

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
   // document.getElementById("otraPoblacionRiesgo").value = data.;
    document.getElementById("frecCardiaca").value = data.frecuencia_cardiaca;
    document.getElementById("frecRespiratoria").value = data.frecuencia_respiratoria;
    document.getElementById("temperatura").value = data.temperatura;
    document.getElementById("tarterial").value = data.tension_arterial;
    document.getElementById("saturacion").value = data.saturacion;
    document.getElementById("talla").value = data.talla;
    document.getElementById("peso").value = data.peso;
    document.getElementById("descripcion").value = data.descripcion;
    document.getElementById("diagnostico").value = data.diagnostico;
    document.getElementById("tratamiento").value = data.tratamiento;
    //trae datos para medicina preventiva, población de riesgo, tipo de atencion, otra medicina preventiva
    consultas.consultaAtencionRiesgoMedP(data.id_consulta, data.id_tipo_atencion);
    //ambulancia
    if (data.ambulancia == 0) {
        document.getElementById("ambulanciaNO").checked = true;
    } else if (data.ambulancia == 1) {
        document.getElementById("ambulanciaSI").checked = true;
    }
    //referenciado
    if (data.referenciado == 0) {
        document.getElementById("noreferenciado").checked = true;
    } else if (data.referenciado == 1) {
        document.getElementById("referenciado").checked = true;
    }
    document.getElementById("lugarreferencia").value = data.lugar_referencia;
    document.getElementById("observaciones").value = data.observaciones;

}

//metodo que muestra los detalles de una historia clinica
 var mostrarDetallesHistoria = (data) => {
    historiasClinicas.vaciarFormulario();
   // historiasClinicas.restablecerHistoriaClinica();
    //Se borra el boton del fromulario(REGISTRO)
    let cambiaBoton = document.getElementById('btnNuevaHistoria');
    if (cambiaBoton != null) {
        /*Oculta el botón del formulario*/
        cambiaBoton.style.visibility = 'hidden';
    }
    //console.log(data.des_centro_costos);
    //console.log(data.tipo);
    //ocultar tabla de sugerencias
    $("#tableSugerencias").css("display", "none");
    //document.getElementById("frecCardiaca").value = data.frecuencia_cardiaca;
    document.getElementById("nombreHis").value = data.nombre_hc;
      document.getElementById("paternoHis").value = data.apPaterno_hc;
      document.getElementById("maternoHis").value = data.apMaterno_hc;
      document.getElementById("fechaNacHis").value = data.fecNac_hc;
      if(data.otro_sexo_hc == "null"){
        document.getElementById("otro_sexo").value = "";
        
      } else {
        document.getElementById("otro_sexo").value = data.otro_sexo_hc;
      }
      
      document.getElementById("domicilio").value = data.domicilio;
      document.getElementById("nombrePadre").value = data.nombre_padre_tutor;
      document.getElementById("parentesto").value = data.parentesco;
      //En caso de emergencias
      document.getElementById("nombreEmergencia").value = data.contacto_emergencia;
      document.getElementById("telefonoEmergencia").value = data.tel_contacto_emergencia;
      document.getElementById("parentescoEmergencia").value = data.parentesco_contacto_emergencia;

      document.getElementById("anteHFaMiliares").value = data.ant_heredo_familiares;
      document.getElementById("anteNoPatologicos").value = data.ant_personalesNO_pat;
      document.getElementById("antePatologicos").value = data.ant_pesonales_pat;
      document.getElementById("anteGinecoObste").value = data.ant_gineco_obs;
      document.getElementById("padecimientoActual").value = data.padecimiento_actual;
      //interrogatorio por aparatos y sistemas
      document.getElementById("cardiovascular").value = data.ipas_cardiovascular;
      document.getElementById("respiratorio").value = data.ipas_respiratorio;
      document.getElementById("gastrointestinal").value = data.ipas_gastrointestinal;
      document.getElementById("genitourinario").value = data.ipas_genitourinario;
      document.getElementById("hematicoLinfatico").value = data.ipas_hematico_linfatico;
      document.getElementById("endocrino").value = data.ipas_endocrino;
      document.getElementById("nervioso").value = data.ipas_nervioso;
      document.getElementById("musculoesqueletico").value = data.ipas_musculoesqueletico;
      document.getElementById("pielMucosa").value = data.ipas_piel_mucosas;
      //signos vitales
      document.getElementById("frecCardiacaHis").value = data.fc;
      document.getElementById("frecRespiratoriaHis").value = data.fr;
      document.getElementById("temperaturaHis").value = data.temperatura;
      document.getElementById("tarterialHis").value = data.ta;
      document.getElementById("saturacionHis").value = data.saturacion;
      document.getElementById("tallaHis").value = data.talla;
      document.getElementById("pesoHis").value = data.peso;
      //exploracion fisica
      document.getElementById("habitus").value = data.ef_habitus_ext;
      document.getElementById("cabeza").value = data.ef_cabeza;
      document.getElementById("cuello").value = data.ef_cuello;
      document.getElementById("torax").value = data.ef_torax;
      document.getElementById("abdomen").value = data.ef_abdomen;
      document.getElementById("genitales").value = data.ef_genitales;
      document.getElementById("extremidades").value = data.ef_extremidades;
      document.getElementById("piel").value = data.ef_piel;
//resultados previos
document.getElementById("resultadosLab").value = data.resultados;
//diagnosticos
document.getElementById("diagnosticos").value = data.diagnostico;
//pronostico
document.getElementById("pronostico").value = data.pronostico;

let sexoId = 0;
if(data.sexo_hc == "Mujer"){
    sexoId = 1;
} else if(data.sexo_hc == "Hombre"){
    sexoId = 2;
} else if(data.sexo_hc == "Otro"){
    sexoId = 3;
}

      $('#sexo').prop('selectedIndex',sexoId);
    //  $('#centroCostoHis').prop('selectedIndex',3);
    //  $('#tipoPacienteHis').prop('selectedIndex',2);
      $('#centroCostoHis').prepend("<option value='1' >"+data.des_centro_costos +"</option>");
      $('#tipoPacienteHis').prepend("<option value='1' >"+data.tipo +"</option>");




}

/**/
// evento para eltipo de atencion
/*document.getElementById('tipoAtencion').addEventListener("change", function (e) {
    console.log('click en el tipo');
  /* lugarreferencia.value = "";
    lugarreferencia.disabled = true;*./
});*/

var abrirmodal = (data) => {
   // principal.linkPrincipal(URLactual);
   // alert("Abrir modal:" + data.id_paciente + ":");
    localStorage.setItem("id_pacientePhistorial", JSON.stringify(data));
   // alert("variable:" + data + ":");

}



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
            getHistoriasClinicas();
            break;
        case PATHNAME + "Descargables/descargables":
            
            break;
        case PATHNAME + "Reportes/reportes":
            getReportes();
            break;
    }


});

