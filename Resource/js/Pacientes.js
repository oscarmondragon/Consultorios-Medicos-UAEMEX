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
    estadoCiv,
    departamento,
    centroCost,
    tipoPaciente,
    fecha_alta_pac,
    userId
  ) {
    var data = new FormData();
    data.append("nombre", nombre);
    data.append("paterno", paterno);
    data.append("materno", materno);
    data.append("fechaNac", fechaNac);
    data.append("telefonoCel", telefonoCel);
    data.append("sexo", sexo);
    data.append("estadoCiv", estadoCiv);
    data.append("departamento", departamento);
    data.append("centroCost", centroCost);
    data.append("tipoPaciente", tipoPaciente);
    data.append("fecha_alta_pac", fecha_alta_pac);
    data.append("userId", userId);

    $.ajax({
      url: URL + "Pacientes/registrarPaciente",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: "POST",
      success: (response) => {
        console.log(response);
      },
    });
  }

  restablecerPaciente() {
    this.getEstadoCivil();
  }
}
