class HistoriasClinicas {
    constructor() { }
  
    getCentroCostos() {
      let count = 1;
      $.post(URL + "Pacientes/getCentroCostos", {}, (response) => {
        try {
          let item = JSON.parse(response);
  
          $("#centroCostoHis").prepend(
            "<option value='0' disabled selected='selected'  >Elige una opción</option>"
          );
          if (item.results.length > 0) {
            //estamos obteniendo datos
            for (let i = 0; i < item.results.length; i++) {
              document.getElementById("centroCostoHis").options[count] = new Option(
                item.results[i].des_centro_costos,
                item.results[i].id_centro_costos
              );
              count++;
              $("select").formSelect();
            }
          }
        } catch (error) { }
      });
    }
    getTipoPaciente() {
      let count = 1;
      $.post(URL + "Pacientes/getTipoPaciente", {}, (response) => {
        try {
          let item = JSON.parse(response);
  
          $("#tipoPacienteHis").prepend(
            "<option value='0' disabled selected='selected'  >Elige una opción</option>"
          );
          if (item.results.length > 0) {
            //estamos obteniendo datos
            for (let i = 0; i < item.results.length; i++) {
              document.getElementById("tipoPacienteHis").options[count] = new Option(
                item.results[i].tipo,
                item.results[i].id_tipo_paciente
              );
              count++;
              $("select").formSelect();
            }
          }
        } catch (error) { }
      });
    }

    getCoincidenciasPac(nombrePersona,paternoPersona,maternoPersona,fechaNacPersona) {

      $.post(
        URL + "Historia/getCoincidenciasPac", {
        nombre: nombrePersona,
        paterno: paternoPersona,
        materno: maternoPersona,
        fechaNac: fechaNacPersona
      },
        (response) => {
          if(response != 0){
            $("#tableSugerencias").css("display", "block");

            $("#resultCoincidencias").html(response);
          
          } else {
            $("#tableSugerencias").css("display", "none");

          }
         
        }
      );
    }

    getHistoriasClinicas(valor) {
      valor = valor != null ? valor : "";
      $.post(
        URL + "Historia/getHistoriasClinicas", {
        filter: valor
      },
        (response) => {
          $("#resultHistoria").html(response);
          // console.log(response);
        }
      );
    }

    getCoincidenciasHistorialClinico(nombreH, paternoH, maternoH, fechaNacH) {
        $.post(
            URL + "Historia/getCoincidenciasHistorial", {
            nombre: nombreH,
            paterno: paternoH,
            materno: maternoH,
            fechaNac: fechaNacH
        },
            (response) => {
                if (response != 0) {
                    console.log("hay conicidencias");
                    $("#tableSugerencias").css("display", "block");

                    $("#registrosCHistorial").html(response);

                } else {
                    console.log("no hay conicidencias");
                    $("#tableSugerencias").css("display", "none");

                }

            }
        );
    }

    registrarHistoria(idPaciente, idConsultorioHis, fechaHistoria, horaHistoria, nombreHis, paternoHis,
      maternoHis, fechaNacHis, sexoHis, otro_sexo_his, tipoPacienteHis, centroCostHis, domicilio, nombreTutor,
      parentescoTutor, nombreEmergencia, telefonoEmergencia, parentescoEmergencia, anteHFaMiliares,
      anteNoPatologicos, antePatologicos, anteGinecoObste, padecimientoActual, cardiovascular,
      respiratorio,gastrointestinal,genitourinario,hematicoLinfatico,endocrino,nervioso,
      musculoesqueletico,pielMucosa,fcardiacaHis, frespiratoriaHis,temperaturaHis,tarterialHis,
      saturacionHis,pesoHis,tallaHis,habitus,cabeza,cuello, torax,abdomen,genitales,extremidades,
      piel, resultadosLab, diagnosticos,pronostico, userId
    ) {
      var data = new FormData();
      data.append("id_paciente", idPaciente);
      data.append("unidad_medica", idConsultorioHis);
      data.append("fec_elaboracion", fechaHistoria);
      data.append("hra_elaboracion", horaHistoria);
      data.append("nombre_hc", nombreHis);
      data.append("apPaterno_hc", paternoHis);
      data.append("apMaterno_hc", maternoHis);
      data.append("fecNac_hc", fechaNacHis);
      data.append("sexo_hc", sexoHis);
      data.append("otro_sexo_hc", otro_sexo_his);
      data.append("tipo_paciente", tipoPacienteHis);
      data.append("id_centro_costos", centroCostHis);
      data.append("domicilio", domicilio);
      data.append("nombre_padre_tutor", nombreTutor);
      data.append("parentesco", parentescoTutor);
      data.append("contacto_emergencia", nombreEmergencia);
      data.append("tel_contacto_emergencia", telefonoEmergencia);
      data.append("parentesco_contacto_emergencia", parentescoEmergencia);
      data.append("ant_heredo_familiares", anteHFaMiliares);
      data.append("ant_personalesNO_pat", anteNoPatologicos);
      data.append("ant_pesonales_pat", antePatologicos);
      data.append("ant_gineco_obs", anteGinecoObste);
      data.append("padecimiento_actual", padecimientoActual);
      data.append("ipas_cardiovascular", cardiovascular);
      data.append("ipas_respiratorio", respiratorio);
      data.append("ipas_gastrointestinal", gastrointestinal);
      data.append("ipas_genitourinario", genitourinario);
      data.append("ipas_hematico_linfatico", hematicoLinfatico);
      data.append("ipas_endocrino", endocrino);
      data.append("ipas_nervioso", nervioso);
      data.append("ipas_musculoesqueletico", musculoesqueletico);
      data.append("ipas_piel_mucosas", pielMucosa);
      data.append("fc", fcardiacaHis);
      data.append("fr" , frespiratoriaHis);
      data.append("temperatura" , temperaturaHis);
      data.append("ta" , tarterialHis);
      data.append("saturacion" , saturacionHis);
      data.append("peso" , pesoHis);
      data.append("talla" , tallaHis);
      data.append("ef_habitus_ext" , habitus);
      data.append("ef_cabeza" , cabeza);
      data.append("ef_cuello" , cuello);
      data.append("ef_torax" , torax);
      data.append("ef_abdomen" , abdomen);
      data.append("ef_genitales" , genitales);
      data.append("ef_extremidades" , extremidades);
      data.append("ef_piel" , piel);
      data.append("resultados" , resultadosLab);
      data.append("diagnostico" , diagnosticos);
      data.append("pronostico" , pronostico);
      data.append("id_usuario_consultorio" , userId);
      $.ajax({
        url: URL + "Historia/registrarHistoria",
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
              title: 'Registro de historia clínica exitoso.',
              text: ""
            });
            //getPacientes();
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
  
    abrirmodal() {
        try {
            alert("si");
            console.log("si entra ala funcion");
            var $myModal = $('#modalNHistoria');
            console.log("si entra ala funcion1.5");
            $('#modalNHistoria').modal();
            console.log("si entra ala funcion2");
            //principal.linkPrincipal(URLactual);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
  
    restablecerHistoriaClinica() {
     
      this.getCentroCostos();
      this.getTipoPaciente();
    }
  
  
    vaciarFormulario() {
        var instance = M.Modal.getInstance($('#modalNHistoria'));
        
      instance.close();
       //DATOS DE LA historia clinica
      document.getElementById("nombreHis").value = "";
      document.getElementById("paternoHis").value = "";
      document.getElementById("maternoHis").value = "";
      document.getElementById("fechaNacHis").value = "";
      document.getElementById("otro_sexo").value = "";
      
      document.getElementById("domicilio").value = "";
      document.getElementById("nombrePadre").value = "";
      document.getElementById("parentesto").value = "";
      //En caso de emergencias
      document.getElementById("nombreEmergencia").value = "";
      document.getElementById("telefonoEmergencia").value = "";
      document.getElementById("parentescoEmergencia").value = "";

      document.getElementById("anteHFaMiliares").value = "";
      document.getElementById("anteNoPatologicos").value = "";
      document.getElementById("antePatologicos").value = "";
      document.getElementById("anteGinecoObste").value = "";
      document.getElementById("padecimientoActual").value = "";
      //interrogatorio por aparatos y sistemas
      document.getElementById("cardiovascular").value = "";
      document.getElementById("respiratorio").value = "";
      document.getElementById("gastrointestinal").value = "";
      document.getElementById("genitourinario").value = "";
      document.getElementById("hematicoLinfatico").value = "";
      document.getElementById("endocrino").value = "";
      document.getElementById("nervioso").value = "";
      document.getElementById("musculoesqueletico").value = "";
      document.getElementById("pielMucosa").value = "";
      //signos vitales
      document.getElementById("frecCardiacaHis").value = "";
      document.getElementById("frecRespiratoriaHis").value = "";
      document.getElementById("temperaturaHis").value = "";
      document.getElementById("tarterialHis").value = "";
      document.getElementById("saturacionHis").value = "";
      document.getElementById("tallaHis").value = "";
      document.getElementById("pesoHis").value = "";
      //exploracion fisica
      document.getElementById("habitus").value = "";
      document.getElementById("cabeza").value = "";
      document.getElementById("cuello").value = "";
      document.getElementById("torax").value = "";
      document.getElementById("abdomen").value = "";
      document.getElementById("genitales").value = "";
      document.getElementById("extremidades").value = "";
      document.getElementById("piel").value = "";
//resultados previos
document.getElementById("resultadosLab").value = "";
//diagnosticos
document.getElementById("diagnosticos").value = "";
//pronostico
document.getElementById("pronostico").value = "";

      $('#sexo').prop('selectedIndex',0);
      
    }
  }
  