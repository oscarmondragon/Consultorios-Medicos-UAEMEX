class Pacientes {
  constructor() { }

  getEstadoCivil() {
    let count = 1;
    $.post(URL + "Pacientes/getEstadoCivil", {}, (response) => {
      try {
        let item = JSON.parse(response);

        $("#estadoCiv").prepend(
          "<option value='0' disabled selected='selected'  >Elige una opción</option>"
        );
        if (item.results.length > 0) {
          //estamos obteniendo datos
          for (let i = 0; i < item.results.length; i++) {
            document.getElementById("estadoCiv").options[count] = new Option(
              item.results[i].desc_estado_civil,
              item.results[i].id_estado_civil
            );
            count++;
            $("select").formSelect();
          }
        }
      } catch (error) { }
    });
  }
  getCentroCostos() {
    let count = 1;
    $.post(URL + "Pacientes/getCentroCostos", {}, (response) => {
      try {
        let item = JSON.parse(response);

        $("#centroCosto").prepend(
          "<option value='0' disabled selected='selected'  >Elige una opción</option>"
        );
        if (item.results.length > 0) {
          //estamos obteniendo datos
          for (let i = 0; i < item.results.length; i++) {
            document.getElementById("centroCosto").options[count] = new Option(
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

        $("#tipoPaciente").prepend(
          "<option value='0' disabled selected='selected'  >Elige una opción</option>"
        );
        if (item.results.length > 0) {
          //estamos obteniendo datos
          for (let i = 0; i < item.results.length; i++) {
            document.getElementById("tipoPaciente").options[count] = new Option(
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

  registrarPaciente(
    nombre,
    paterno,
    materno,
    fechaNac,
    sexo,
    otro_sexo,
    telefonoCel,
    estadoCiv,
    centroCost,
    tipoPaciente,
    nivelAcademico,
    departamento,
    fecha_alta_pac,
    userId,
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
    horaConsulta
  ) {
    var data = new FormData();
    data.append("nombre_pac", nombre);
    data.append("apPaterno_pac", paterno);
    data.append("apMaterno_pac", materno);
    data.append("fecha_nacimiento_pac", fechaNac);
    data.append("sexo_pac", sexo);
    data.append("otro_sexo_pac", otro_sexo);
    data.append("tel_cel_pac", telefonoCel);
    data.append("id_estado_civil", estadoCiv);
    data.append("id_centro_costos", centroCost);
    data.append("id_tipo_paciente", tipoPaciente);
    data.append("nivel_academico", nivelAcademico);
    data.append("departamento", departamento);
    data.append("fecha_alta_pac", fecha_alta_pac);
    data.append("id_usuario_consultorio", userId);
    //datos de la consulta
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
    data.append("fecha_consulta", fecha_alta_pac);
    data.append("hora_consulta", horaConsulta);
    data.append("id_medico", userId);
    data.append("poblacion_riesgo", poblacionRiesgo);
    data.append("medicina_prev", medicinaPreventiva);
    poblacionRiesgo.forEach(element => {
      console.log("\t" +element);

    });
    console.log("_________________");
    medicinaPreventiva.forEach(element => {
      console.log("\t" +element);

    });
    
    $.ajax({
      url: URL + "Pacientes/registrarPaciente",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: "POST",
      success: (response) => {

        console.log(response);
         /* if (response == 0) {
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
        }  */
 
      }
    });
  }

/* 
  registrarConsulta(nombre,
    paterno,
    materno,
    edad,
    tipoAtencion,
    fcardiaca,
    frespiratoria,
    temperatura,
    tarterial,
    talla,
    peso,
    descripcion,
    diagnostico,
    tratamiento,
    ambulancia,
    referenciado,
    observaciones,
    lugarReferencia,
    fecha_alta_pac,
    horaConsulta,
    userId,
    poblacionRiesgo,
    medicinaPreventiva) {
    var dataConsulta = new FormData();
    dataConsulta.append("nombre_pac", nombre);
    dataConsulta.append("apPaterno_pac", paterno);
    dataConsulta.append("apMaterno_pac", materno);
    dataConsulta.append("fecha_nacimiento_pac", fechaNac);
    dataConsulta.append("tel_cel_pac", telefonoCel);
    dataConsulta.append("sexo_pac", sexo);
    dataConsulta.append("otro_sexo_pac", otro_sexo);
    dataConsulta.append("id_estado_civil", estadoCiv);
    dataConsulta.append("departamento", departamento);
    dataConsulta.append("id_centro_costos", centroCost);
    dataConsulta.append("id_tipo_paciente", tipoPaciente);
    dataConsulta.append("fecha_alta_pac", fecha_alta_pac);
    dataConsulta.append("id_usuario_consultorio", userId);

    $.ajax({
      url: URL + "Pacientes/registrarPaciente",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: "POST",
      success: (response) => {
        if (response == 0) {
          /*  this.vaciarFromulario();
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
            text: response,
          });
        }

      },
    });

  } */

  getPacientes(valor) {
    valor = valor != null ? valor : "";
    $.post(
      URL + "Pacientes/getPacientes", {
      filter: valor
    },
      (response) => {
        $("#resultPaciente").html(response);
        // console.log(response);
      }
    );
  }
  editarPaciente(data) {


    document.getElementById("nombre").value = data.nombre_pac;
    document.getElementById("paterno").value = data.apPaterno_pac;
    document.getElementById("materno").value = data.apMaterno_pac;
    document.getElementById("fechaNac").value = data.fecha_nacimiento_pac;
    document.getElementById("telefonoCel").value = data.tel_cel_pac;
    document.getElementById("departamento").value = data.departamento;


  }

  restablecerPaciente() {
    this.getEstadoCivil();
    this.getCentroCostos();
    this.getTipoPaciente();
  }

  vaciarFormulario() {
    var instance = M.Modal.getInstance($('#modal1'));
    instance.close();
    document.getElementById("nombre").value = "";
    document.getElementById("paterno").value = "";
    document.getElementById("materno").value = "";
    document.getElementById("fechaNac").value = "";
    document.getElementById("telefonoCel").value = "";
    document.getElementById("departamento").value = "";
  }
}
