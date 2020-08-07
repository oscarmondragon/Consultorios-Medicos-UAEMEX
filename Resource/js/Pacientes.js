class Pacientes {
  constructor() {}

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
      } catch (error) {}
    });
  }

  registrarPaciente(
    nombre,
    paterno,
    materno,
    fechaNac,
    telefonoCel,
    sexo,
    otro_sexo,
    estadoCiv,
    departamento,
    centroCost,
    tipoPaciente,
    fecha_alta_pac,
    userId
  ) {
    var data = new FormData();
    data.append("nombre_pac", nombre);
    data.append("apPaterno_pac", paterno);
    data.append("apMaterno_pac", materno);
    data.append("fecha_nacimiento_pac", fechaNac);
    data.append("tel_cel_pac", telefonoCel);
    data.append("sexo_pac", sexo);
    data.append("otro_sexo_pac", otro_sexo);
    data.append("id_estado_civil", estadoCiv);
    data.append("departamento", departamento);
    data.append("id_centro_costos", centroCost);
    data.append("id_tipo_paciente", tipoPaciente);
    data.append("fecha_alta_pac", fecha_alta_pac);
    data.append("id_usuario_consultorio", userId);

    $.ajax({
      url: URL + "Pacientes/registrarPaciente",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: "POST",
      success: (response) => {
        if(response == 0){
         
          this.vaciarFromulario();
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso.',
            text: ""
          });
          
        } else {
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response,
        });
        }
      
      },
    });
  }

  restablecerPaciente() {
    this.getEstadoCivil();
   
  }

  vaciarFromulario(){
    var instance = M.Modal.getInstance($('#modal1'));
   instance.close();
   document.getElementById("nombre").value = "";
   document.getElementById("paterno").value  = "";
   document.getElementById("materno").value  = "";
   document.getElementById("fechaNac").value  = "";
   document.getElementById("telefonoCel").value  = "";
   document.getElementById("departamento").value = "";
  }
}
