//var consultas = new Consultas();
function sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}

var validarEmail = (email) => {
    let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regex.test(email)) {
        return true;
    } else {
        return false;
    }
}

var habilitarSexo = () => {

    $(document).on('change', '#sexo', function (event) {

        let sexo = $("#sexo option:selected").text();
        if (sexo === "Otro") {

            $('#otro_sexo').attr("disabled", false);
        } else {
            $('#otro_sexo').val("");
            $('#otro_sexo').attr("disabled", true);
        }

    });

}


var deshabilitarPoblacion = document.getElementById('ningunaN');
if (deshabilitarPoblacion != null) {
    deshabilitarPoblacion.addEventListener("change", compruebaPoblacion, false);
    function compruebaPoblacion() {
        if (deshabilitarPoblacion.checked) {
            $("input:checkbox[name=poblacionRiesgo]:checked").prop('checked', false);
            $("input:checkbox[name=poblacionRiesgo]").prop("disabled", true);
            //deshabilitar campo para otra poblacion riesgo
            $('#otraPoblacionRiesgoN').val("");
            $('#otraPoblacionRiesgoN').attr("disabled", true);

        } else {
            $("input:checkbox[name=poblacionRiesgo]").prop("disabled", false);
            $('#otraPoblacionRiesgoN').attr("disabled", false);
        }
    }
}
var selectatencion2Nuevo = () => {
    let paciente = new Pacientes();

    $(document).on('change', '#tipoAtencionN', function (event) {

        let tipoAtencion = $("#tipoAtencionN option:selected").val();
        // alert("El tipo de atencion es:" + tipoAtencion);
        paciente.restablecerPacienteAtencion2(tipoAtencion);
        /* if (sexo === "Otro") {
 
             $('#otro_sexo').attr("disabled", false);
         } else {
             $('#otro_sexo').attr("disabled", true);
         }*/
    });
}


/*
  document.getElementById('transplantes').addEventListener("change", checaPR, false);
  
  function checaPR() {
    console.log('Vamos a habilitar los checkPR');
    $("input:checkbox[name=poblacionRiesgo]:checked").prop('checked', false);
        $("input:checkbox[name=poblacionRiesgo]").prop("disabled", true);
    }


*/


var selectatencion2 = () => {
    let consulta = new Consultas();

    $(document).on('change', '#tipoAtencion', function (event) {
        let tipoAtencion = $("#tipoAtencion option:selected").val();
        // alert("El tipo de atencion es:" + tipoAtencion);
        consulta.reestablecerUsuario2(tipoAtencion);
        /* if (sexo === "Otro") {
             $('#otro_sexo').attr("disabled", false);
         } else {
             $('#otro_sexo').attr("disabled", true);
         }*/
    });

}

var copiarNombre = () => {
    let nombre = document.getElementById("nombre").value;
    let apPaterno = document.getElementById("paterno").value;
    let apMaterno = document.getElementById("materno").value;

    document.getElementById("nombrePacienteN").value = nombre + " " + apPaterno + " " + apMaterno;
}

var calcularEdad = (fecha) => {

    let fechaNace = new Date(fecha.target.value);
    let fechaActual = new Date()

    let mes = fechaActual.getMonth();
    let dia = fechaActual.getDate();
    let año = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
    document.getElementById("edadPacienteN").value = edad;

}

var calcularEdadC = (fecha) => {

    let fechaNace = new Date(fecha);
    let fechaActual = new Date();
    //alert("fn" + fechaNace + "fa" + fechaActual);
    let mes = fechaActual.getMonth();
    let dia = fechaActual.getDate();
    let año = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
    document.getElementById("edadPaciente").value = edad;

}


/*//funcion para obtener datos del paciente para editar
var dataPaciente = (data) => {
    console.log(data);
    //pacientes.editarPaciente(data);
}*/