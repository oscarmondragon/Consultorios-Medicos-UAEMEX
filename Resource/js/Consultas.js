class Consultas {


    constructor() {
        //declaracion del input lugarreferencia

    }

    caracteristicasformulario() {

    }

    registraConsultas(talla) {

    }

    sumarDias(fecha, dias) {
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    getRangosFecha() {
        let count = 1;
        $("#selectRango").prepend(
            "<option value='0' disabled selected='selected'  >Elige una opción</option>"
        );

        var d = new Date('Aug 9, 2020');
        var num = 0;
        var fechaInicio, fechaFin;

        var fechaActual = new Date();
        do {
            fechaInicio = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

            d.setDate(d.getDate() + 6);
            fechaFin = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();


            document.getElementById("selectRango").options[count] = new Option(
                fechaInicio + " al " + fechaFin,
                fechaInicio
            );
            num = d.getDate() + 1;
            d.setDate(num);
            count++;
            $("select").formSelect();
        } while (d < fechaActual);

    }

    getConsultorios() {
        let count = 1;
        //console.log("getconsultorios");
        $.post(URL + "Consultas/getConsultorios",
            {}, (response) => {
                try {
                    let item = JSON.parse(response);
                    //console.log("item");
                    $("#selectConsultorio").prepend(
                        "<option value='0' disabled selected='selected'  >Elige una opción</option>"
                    );
                    if (item.results.length > 0) {
                        //estamos obteniendo datos
                        for (let i = 0; i < item.results.length; i++) {
                            document.getElementById("selectConsultorio").options[count] = new Option(
                                item.results[i].nombre_consultorio,
                                item.results[i].id_consultorio
                            );

                            count++;
                            $("select").formSelect();
                        }
                    }
                } catch (error) { }
            });

    }
    getDatos() {
        console.log("getconsultorios");
        $.post(URL + "Consultas/getConsultasDatos",
            {}, (response) => {
                try {
                    let item = JSON.parse(response);
                    //console.log("item");
                    $("#consultasDatos").html(response);

                } catch (error) { }
            });


    }

    

    consultaAtencionRiesgoMedP(id_consulta, id_tipo_atencion) {
        //alert("en el consultas.js" + id_consulta)
        $.post(URL + "Consultas/consultaTipoAtencion",
            { "id_tipo_atencion": id_tipo_atencion }, (response) => {
                try {
                    let item = JSON.parse(response);
                    if (item.results.length == 1) {
                        //estamos obteniendo datos
                        /*alert("JSON::" + item.results.length + "::" + item.results[0].nombre_tipo_atencion + ":padre:" + item.results[0].padre);
                       */
                        $("#tipoAtencion2").prepend(
                            "<option value='0' disabled selected>" + item.results[0].nombre_tipo_atencion + "</option>"
                        );
                        //  $("#tipoAtencion2").remove();
                        //$('#tipoAtencion2').prop('selectedIndex', 1);
                        if (item.results[0].padre != null) {
                            $.post(URL + "Consultas/consultaTipoAtencion",
                                { "id_tipo_atencion": item.results[0].padre }, (response) => {
                                    try {
                                        let item2 = JSON.parse(response);
                                        if (item2.results.length == 1) {
                                            //estamos obteniendo datos
                                            $("#tipoAtencion").prepend(
                                                "<option value='0' disabled selected='selected'>" + item2.results[0].nombre_tipo_atencion + "</option>"
                                            );
                                        }
                                    } catch (error) { }
                                });
                        }
                    }
                } catch (error) { }
            });
        /*Obtener datos de paciente de riesgo*/
        var value = -1;
        let item;
        $.post(URL + "Consultas/consultaPoblacionRiesgo",
            { "id_consulta": id_consulta }, (response) => {
                try {
                    item = JSON.parse(response);
                    //console.log("Población de riesgo longitud::" + response + "id_consulta:" + id_consulta);//
                    if (item.results.length > 0) {
                        for (let i = 0; i < item.results.length; i++) {
                            console.log("id_consulta" + id_consulta+"id_poblacion riesgo" + item.results[i].id_poblacion_riesgo);
                            //estamos obteniendo id de la población para el value    
                            if (item.results[i].id_poblacion_riesgo == 0) {//otra_población de riesgo
                                //console.log("otra población de riesgo(resultado):" + item.results[i].observaciones);//
                                document.getElementById("otraPoblacionRiesgo").value = item.results[i].observaciones;
                            }else if (item.results[i].id_poblacion_riesgo == 1) {//ninguna poblacion de riesgo
                                //console.log("ninguna población(resultado):" + item.results[i].id_poblacion_riesgo);//
                                console.log("Estas en poblacionde riesgo = 1 ");
                                document.getElementsByName("ninguna").item(0).checked = true;
                                $("input:checkbox[name=poblacionRiesgo]:checked").prop('checked', false);
                                $("input:checkbox[name=poblacionRiesgo]").prop("disabled", true);
                                //deshabilitar campo para otra poblacion riesgo
                                $('#otraPoblacionRiesgoN').val("");
                                $('#otraPoblacionRiesgoN').attr("disabled", true);
                            } else {//elecciones de poblacion de riesgo
                                value = item.results[i].id_poblacion_riesgo - 2;
                                console.log("Población de riesgo(ite.results) " + item.results[i].id_poblacion_riesgo);
                                console.log("Población de riesgo(value) " + value);
                                document.getElementsByName("poblacionRiesgo").item(value).checked = true;
                            }
                        }
                    }
                } catch (error) {
                    //console.log(error);
                }
            });
        /*Obtener datos de medicina preventiva*/
        $.post(URL + "Consultas/consultaMedicinaPreventiva",
            { "id_consulta": id_consulta }, (response) => {
                try {
                    item = JSON.parse(response);
                   // alert("Medicina Preventiva longitud:" + item.results.length);
                    if (item.results.length > 0) {
                        for (let i = 0; i < item.results.length; i++) {
                            //estamos obteniendo datos                            
                            if (item.results[i].id_medicina_preventiva == 0) {
                                document.getElementById("ompreventiva").value = item.results[i].observaciones;
                            } else {
                                value = item.results[i].id_medicina_preventiva - 1;
                                document.getElementsByName("medicinaPrev").item(value).checked = true;
                            }
                        }
                    }
                } catch (error) { }
            });




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
                                 //alert(item.results[i].id_tipo_atencion);
                             };*/
                            count++;
                            $("select").formSelect();
                        }
                    }
                } catch (error) { }
            });
    }

    getTipoAtencion2(padre) {
        //alert("consultas.js_gta2" + padre);
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
                                 //alert(item.results[i].id_tipo_atencion);
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
            { filter: valor },
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
    /*Obtiene el nombre del paciente para ver su historial*/
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
    /*Obtiene el nombre del paciente para ver su consulta en particular*/
    nombrePacienteDetalleConsulta(paciente) {
        localStorage.setItem("nombreCompletoPac", paciente.nombre_pac + " " + paciente.apPaterno_pac + " " + paciente.apMaterno_pac);
        document.getElementById("pacienteHistorial").value = paciente.nombre_pac + " " + paciente.apPaterno_pac + " " + paciente.apMaterno_pac;
        // calcularEdadC(paciente.fecha_nacimiento_pac);
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

    muestraConsulta(idconsulta) {
        let id_consulta = idconsulta.id_consulta;
        $.post(
            URL + "Consultas/getConsulta",
            { "id_paciente": idconsulta },
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
        ompreventiva,
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
        userId,
        otraPoblacion,
        saturacion
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
        data.append("ompreventiva", ompreventiva);
        data.append("otraPob" , otraPoblacion);
        data.append("saturacion" , saturacion);
        //alert("Medicina preventiva:" + ompreventiva);
        $.ajax({
            url: URL + "Consultas/registrarConsulta",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            success: (response) => {
                if (response > 0) {
                    this.vaciarFormularioConsulta();
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso.',
                        text: "Folio de consulta: " + response
                    });
                    getPacientesC();
                } else  {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text:  "Error: " + response
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
        // alert("consultas.js_r" + ta);
        this.getTipoAtencion2(ta);

    }

    vaciarFormularioConsulta() {
        var instance = M.Modal.getInstance($('#modal1'));
        instance.close();

        // document.getElementById("tipoAtencion2").empty();
        
        document.getElementById("nombrePaciente").value = "";
        document.getElementById("edadPaciente").value = "";
        document.getElementById("frecCardiaca").value = "";
        document.getElementById("otraPoblacionRiesgo").value = "";
        document.getElementById("frecRespiratoria").value = "";
        document.getElementById("temperatura").value = "";
        document.getElementById("tarterial").value = "";
        document.getElementById("saturacion").value = "";
        document.getElementById("talla").value = "";
        document.getElementById("peso").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("diagnostico").value = "";
        document.getElementById("tratamiento").value = "";
        document.getElementById("lugarreferencia").value = "";
        document.getElementById("observaciones").value = "";
        document.getElementById("ompreventiva").value = "";
        //$('#tipoAtencion').prop('selectedIndex', 0);
        //$('#tipoAtencion').empty();
        $('#tipoAtencion').children('option').remove();
        $('#tipoAtencion2').empty();
        $('#tipoAtencion2').prop('selectedIndex', 0);
        $('#tipoAtencion2').children('option').remove();
        $("input:checkbox[name=poblacionRiesgo]:checked").prop('checked', false);
        $("input:checkbox[name=medicinaPrev]:checked").prop('checked', false);
        $("input:checkbox[name=ninguna]:checked").prop('checked', false);
        $("input:radio[name=ambulancia]:checked").prop('checked', false);
        $("input:radio[name=referenciado]:checked").prop('checked', false);

        /*$('#ambula input[type="radio"]').prop('checked', false);
        $('#refer input[type="radio"]').prop('checked', false);*/
       // alert("vaciado");
    }

    getRepConsultasSemanal(id_consultorio, fechaRango) {
        //console.log("getconsultorios");
        var data = new FormData();

        //dia,mes/año
        var fecha = new Date(fechaRango);
        fecha.setDate(fecha.getDate() + 6);
        var fechaFin = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
        //alert("fechaIni" + fechaRango + ":FechaFin:" + fechaFin);
        data.append("id_consultorio", id_consultorio);
        data.append("fechaInicio", fechaRango);
        data.append("fechaFin", fechaFin);

        $.ajax({
            url: URL + "Consultas/reporteConsultas",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            success: (response) => {
                try{
                    if (response == 0) {
                        //console.log("No hay nada");
                    }else if (response == 1){
                        //console.log("DATOS");
                    }

                let item = JSON.parse(response);
                if (item.results.length > 0) {//si jhay consultas en el criterio
                   // $("#historial_consulta").html(response);
                    //console.log("Son")
                    // this.vaciarFormulario();

                    Swal.fire({
                        icon: 'success',
                        title: 'Busqueda hecha',
                        text: ""
                    });
                    getPacientesC();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response
                    });
                }
            }catch(error){
                //console.log(error)
            }
            }
        });
    }




}
