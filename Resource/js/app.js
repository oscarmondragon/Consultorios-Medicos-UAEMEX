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

var registraconsulta = () => {
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;

    let atencion = document.getElementById("tipoAtencion");
    let tipoAtencion = atencion.options[atencion.selectedIndex].text;


    let fcardiaca = document.getElementById("frecCardiaca").value;
    let frespiratoria = document.getElementById("frecRespiratoria").value;
    let temperatura = document.getElementById("temperatura").value;
    let tarterial = document.getElementById("tarterial").value;
    let talla = document.getElementById("talla").value;
    let peso = document.getElementById("peso").value;

    let descripcion = document.getElementById("descripcion");
    let diagnostico = document.getElementById("diagnostico");
    let tratamiento = document.getElementById("tratamiento");

    //obtenemos fecha actual
    let fecha_alta_pac = new Date().toLocaleDateString();

    //obtenemos datos de usuario que registra
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.id_usr;

    if (talla != "") {
        pacientes.registrarPaciente(nombre, paterno, materno, fechaNac,
            telefonoCel, sexo, otro_sexo, estadoCiv, departamento, centroCost, tipoPaciente, fecha_alta_pac, userId);

        return false; //para evitar reenvio de formulario
    } else {
        Swal.fire({
            icon: 'error',
            text: 'Completa todos los campos!',

        })
    }
    /*mandamos los datos al metod registrarPaciente de Paciente.js
    if(nombre !="" && paterno !="" && materno !="" && fechaNac !="" && telefonoCel !=""
    && sexo !="Elige una opción" && estadoCiv != "Elige una opción" && departamento !="" && centroCost != "Elige una opción"
    && tipoPaciente !="Elige una opción"){
    pacientes.registrarPaciente(nombre,paterno,materno,fechaNac,
        telefonoCel,sexo, otro_sexo,estadoCiv,departamento,centroCost,tipoPaciente,fecha_alta_pac,userId);
        
        return false; //para evitar reenvio de formulario
    } else {
        Swal.fire({
            icon: 'error',
            text: 'Completa todos los campos!',
            
          })
    }*/

}

//registro de pacientes
$(function () {
    $("#btnLogin").click(function () {

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

        //obtenemos fecha actual
        let fecha_alta_pac = new Date().toLocaleDateString();

        //obtenemos datos de usuario que registra
        let user = JSON.parse(localStorage.getItem("user"));
        let userId = user.id_usr;



        //mandamos los datos al metod registrarPaciente de Paciente.js
        if (nombre != "" && paterno != "" && materno != "" && fechaNac != "" && telefonoCel != ""
            && sexo != "Elige una opción" && estadoCiv != "Elige una opción" && departamento != "" && centroCost != "Elige una opción"
            && tipoPaciente != "Elige una opción") {
            pacientes.registrarPaciente(nombre, paterno, materno, fechaNac,
                telefonoCel, sexo, otro_sexo, estadoCiv, departamento, centroCost, tipoPaciente, fecha_alta_pac, userId);

            return false; //para evitar reenvio de formulario
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Completa todos los campos!',

            })
        }
    });
    
    $("#btnRConsulta").click(function () {
        let nombre = document.getElementById("nombre").value;
        let edad = document.getElementById("edad").value;

        let atencion = document.getElementById("tipoAtencion");
        let tipoAtencion = atencion.options[atencion.selectedIndex].text;

        let fcardiaca = document.getElementById("frecCardiaca").value;
        let frespiratoria = document.getElementById("frecRespiratoria").value;
        let temperatura = document.getElementById("temperatura").value;
        let tarterial = document.getElementById("tarterial").value;
        let talla = document.getElementById("talla").value;
        let peso = document.getElementById("peso").value;

        let descripcion = document.getElementById("descripcion").value;
        let diagnostico = document.getElementById("diagnostico").value;
        let tratamiento = document.getElementById("tratamiento").value;

        //obtenemos fecha actual
    /*    let fecha_alta_pac = new Date().toLocaleDateString();

        //obtenemos datos de usuario que registra
        let user = JSON.parse(localStorage.getItem("user"));
        let userId = user.id_usr;
        */
        //Si se pulsa el botón enviar, se procesa la información

        //Si el checkbox condiciones tiene valor y es igual a 1

        if (talla != "") {
             // consultas.registraConsultas(talla);
             Swal.fire({
                icon: 'error',
                text: `Clleno!${edad},${tipoAtencion},${talla}`,

            })
  
            //  return false; //para evitar reenvio de formulario
          } else {
              Swal.fire({
                  icon: 'error',
                  text: `Completa todos los campos!${edad},${tipoAtencion},${talla}`,
  
              })
          }



        /*mandamos los datos al metod registrarPaciente de Paciente.js
        if(nombre !="" && paterno !="" && materno !="" && fechaNac !="" && telefonoCel !=""
        && sexo !="Elige una opción" && estadoCiv != "Elige una opción" && departamento !="" && centroCost != "Elige una opción"
        && tipoPaciente !="Elige una opción"){
        pacientes.registrarPaciente(nombre,paterno,materno,fechaNac,
            telefonoCel,sexo, otro_sexo,estadoCiv,departamento,centroCost,tipoPaciente,fecha_alta_pac,userId);
            
            return false; //para evitar reenvio de formulario
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Completa todos los campos!',
                
              })
        }.....*/
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
        $("input:checkbox[name=poblacionRiesgo]:checked").each(function () {
            poblacionRiesgo.push($(this).val());
        });

        let medicinaPreventiva = [];
        $("input:checkbox[name=medicinaPrev]:checked").each(function () {
            medicinaPreventiva.push($(this).val());
        });

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
            alert("aqui todo bien");
            consultas.registrarConsulta(id_paciente, edad, tipoAtencion2, poblacionRiesgo, medicinaPreventiva,
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

});

// llama metodo para filtrar pacientes
var getPacientes = () => {
    let valor = document.getElementById("filtrarPaciente").value;
   
    pacientes.getPacientes(valor);
   
    //consultas.getPacientesConsulta(valor);

}

var getPacientesC = () => {
    
    let valor = document.getElementById("filtrarPacienteC").value;
   // pacientes.getPacientes(valor);
    //alert("hola");
    consultas.getPacientesConsulta(valor);

}

//funcion para obtener datos del paciente para editar
var dataPaciente = (data) => {
    console.log(data);
    //pacientes.editarPaciente(data);
}

/*funcion que envia datos de paciente para generar NUEVA consulta*/
var pacienteNConsulta = (data) => {   
    alert("hola" + data.nombre_pac);
    consultas.reestablecerUsuario();
    consultas.nombrePaciente(data);
    console.log(data);
   // consultas.nombrePaciente(data);
    //pacientes.editarPaciente(data);
}
/*funcion que envia datos de paciente para generar HISTORIAL de consultas*/
var pacienteHistorial = (data) => {
    consultas.nombrePacienteH(data);
    console.log(data);
    //pacientes.editarPaciente(data);
}

//declaracion del input lugarreferencia
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

    $("#validate").validate();
    // $(".sidenav").sidenav();
    // $(".modal").modal();
    // $('select').formSelect();
    M.AutoInit();

    switch (URLactual) {
        case PATHNAME + "Principal/principal":
            break;
        case PATHNAME + "Pacientes/pacientes":
            getPacientes();
        case PATHNAME + "Consultas/consultas":
            getPacientesC();
            break;
    }


});

