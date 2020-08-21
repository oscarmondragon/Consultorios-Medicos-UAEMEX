class Consultas {
    

    constructor() {}

    registraConsultas(talla){

    }

    getTipoAtencion() {
        let count = 1;

        $.post(URL + "Consultas/getTipoAtencion",
            {}, (response) => {
            try {
                let item = JSON.parse(response);

                $("#tipoAtencion").prepend(
                    "<option value='0' disabled selected='selected'  >Elige una opción</option>"
                );
                if (item.results.length > 0) {
                    //estamos obteniendo datos
                    for (let i = 0; i < item.results.length; i++) {
                        document.getElementById("tipoAtencion").options[count] = new Option(
                            item.results[i].nombre_tipo_atencion,
                            item.results[i].id_tipo_atencion
                        );

                       /* document.getElementById("tipoAtencion").options[count].onclick = function () {
                            alert(item.results[i].id_tipo_atencion);
                        };*/
                        count++;
                        $("select").formSelect();
                    }
                }
            } catch (error) { }
        });
    }

    getTipoAtencion2(padre) {
        alert("consultas.js_gta2" + padre);
        let count = 1;

        $.post(URL + "Consultas/getTipoAtencion2",
            { "padre": padre }, (response) => {
                try {
                    let item = JSON.parse(response);

                    $("#tipoAtencion2").prepend(
                        "<option value='0' disabled selected='selected'  >Elige una opción</option>"
                    );
                    if (item.results.length > 0) {
                        //estamos obteniendo datos
                        for (let i = 0; i < item.results.length; i++) {
                            document.getElementById("tipoAtencion2").options[count] = new Option(
                                item.results[i].nombre_tipo_atencion,
                                item.results[i].id_tipo_atencion
                            );

                            /* document.getElementById("tipoAtencion").options[count].onclick = function () {
                                 alert(item.results[i].id_tipo_atencion);
                             };*/
                            count++;
                            $("select").formSelect();
                        }
                    }
                } catch (error) { }
            });
    }


    getPacientesConsulta(valor) {
        valor = valor != null ? valor : "";
        //alert("estas en consulta.js"+valor);
        /*Se comunica con el controlador de consultas*/
        $.post(
            URL + "Consultas/getPacientesConsultas",
            {filter: valor},
            (response) => {
                $("#resultPacienteC").html(response);
                // console.log(response);
            }
        );
    }

    nombrePaciente(paciente) {
        //alert("consultas.js" + paciente.id_paciente + "..");
        localStorage.setItem("id_paciente", paciente.id_paciente);
        document.getElementById("nombrePaciente").value = paciente.nombre_pac + " " + paciente.apPaterno_pac + " " + paciente.apMaterno_pac;
         calcularEdadC(paciente.fecha_nacimiento_pac);

    }

    nombrePacienteH(paciente) {
        document.getElementById("pacienteHistorial").value = paciente.nombre_pac + " " + paciente.apPaterno_pac + " " + paciente.apMaterno_pac;
        document.getElementById("fechaNac").value = paciente.fecha_nacimiento_pac;

        let idPaciente = paciente.id_paciente;
        $.post(
            URL + "Consultas/getConsultasHistorico",
            { "id_paciente": idPaciente },
            (response) => {
                $("#historial_consulta").html(response);
                // console.log(response);
            }
        );
    }

    registrarConsulta(
        id_paciente,
        edad,
        tipoAtencion,
        poblacionRiesgo,
        medicinaPreventiva,
        fcardiaca,
        frespiratoria,
        temperatura,
        tarterial,
        talla,
        peso,
        descripcion,
        diagnostico,
        tratamiento,
        observaciones,
        ambulancia,
        referenciado,
        lugarReferencia,
        fecha_consulta,
        horaConsulta,
        userId
    ) {
        var data = new FormData();
        //datos de la consulta
        data.append("id_paciente", id_paciente);
        data.append("edad", edad);
        data.append("id_tipo_atencion", tipoAtencion);
        data.append("frecuencia_cardiaca", fcardiaca);
        data.append("frecuencia_respiratoria", frespiratoria);
        data.append("temperatura", temperatura);
        data.append("tension_arterial", tarterial);
        data.append("talla", talla);
        data.append("peso", peso);
        data.append("descripcion", descripcion);
        data.append("diagnostico", diagnostico);
        data.append("tratamiento", tratamiento);
        data.append("ambulancia", ambulancia);
        data.append("referenciado", referenciado);
        data.append("observaciones", observaciones);
        data.append("lugar_referencia", lugarReferencia);
        data.append("fecha_consulta", fecha_consulta);
        data.append("hora_consulta", horaConsulta);
        data.append("id_medico", userId);
        data.append("poblacion_riesgo", poblacionRiesgo);
        data.append("medicina_prev", medicinaPreventiva);
        alert("CONSULTAS.js");
        $.ajax({
            url: URL + "Consultas/registrarConsulta",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            success: (response) => {
                if (response == 0) {
                    this.vaciarFormulario();
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso.',
                        text: ""
                    });
                    getPacientes();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response
                    });
                }

            }
        });
    }

    generaHistorialConsultas(paciente) {

    }

    reestablecerUsuario() {
        this.getTipoAtencion();
        
    }
    reestablecerUsuario2(ta) {
        alert("consultas.js_r" + ta);
        this.getTipoAtencion2(ta);

    }

    vaciarFormulario() {
        var instance = M.Modal.getInstance($('#modal1'));
        instance.close();
        document.getElementById("nombrePaciente").value = "";
        document.getElementById("edadPaciente").value = "";
        document.getElementById("frecCardiaca").value = "";
        document.getElementById("frecRespiratoria").value = "";
        document.getElementById("temperatura").value = "";
        document.getElementById("tarterial").value = "";
        document.getElementById("talla").value = "";
        document.getElementById("peso").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("diagnostico").value = "";
        document.getElementById("tratamiento").value = "";
        document.getElementById("lugarreferencia").value = "";
        document.getElementById("observaciones").value = "";
        document.getElementById("ompreventiva").value = "";
        $('#tipoAtencion').prop('selectedIndex', 0);
        $('#tipoAtencion2').prop('selectedIndex', 0);
        $("#poblacion input[type=checkbox]").prop('checked', false);
        $("#medicina input[type=checkbox]").prop('checked', false);
        $('#ambula input[type="radio"]').prop('checked', false);
        $('#refer input[type="radio"]').prop('checked', false);
    }

   
}
