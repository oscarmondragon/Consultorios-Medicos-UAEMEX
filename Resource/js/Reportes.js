class Reportes{
    constructor() {
        //declaracion del input lugarreferencia

    }

    /*Obtiene consultorios*/

    getConsultorios() {
        let count = 1;
        //console.log("getconsultorios Reportes.js");
        $.post(URL + "Consultas/getConsultorios",
            {}, (response) => {
                try {
                    let item = JSON.parse(response);
                   // console.log("item".item);
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

    /*Obtiene Rango sd e fechas desde agosto 2020 semanales*/
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

    /* jhnfasd */

    getDatos() {
       ///console.log("getconsultorios");
        $.post(URL + "Consultas/getConsultasDatos",
            {}, (response) => {
                try {
                    let item = JSON.parse(response);
                    //console.log("item");
                    $("#consultasDatos").html(response);

                } catch (error) { }
        });
    }

    /*Obtiene Reporte semanal por consultorios*/

    getRepConsultasSemanal(id_consultorio, fechaRango, nombre_consultorio) {
        //console.log("getRepConsultasSemanal en Reportes.js");
        document.getElementById('oculta').style.display = 'block';
        //document.getElementById('btnPDFReporte').style.display = 'block';
        var data = new FormData();

        //dia,mes/año
        var fecha = new Date(fechaRango);
        fecha.setDate(fecha.getDate() + 6);
        var fechaFin = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
        //alert("fechaIni" + fechaRango + ":FechaFin:" + fechaFin);
        data.append("id_consultorio", id_consultorio);
        data.append("fechaInicio", fechaRango);
        data.append("fechaFin", fechaFin);
        data.append("nombre_consultorio", nombre_consultorio);

        $.ajax({
            url: URL + "Consultas/reporteConsultas",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
            success: (response) => {
                $("#reporte").html(response);
                $("#clonar").clone().appendTo("#oculta");
                document.getElementById('clonar').style.display = 'none';
               
                // try {
               // let item = JSON.parse(response);
               // console.log(item);
                  //  let item = JSON.parse(response);
                /*    if (item.results.length > 0) {//si jhay consultas en el criterio
                        // $("#historial_consulta").html(response);
                        $("#reporte").html(response);
                        // this.vaciarFormulario();

                        Swal.fire({
                            icon: 'success',
                            title: 'Busqueda hecha',
                            text: ""
                        });
                        getReportes();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response
                        });
                    }*/
             //   } catch (error) {
               //     console.log(error)
             //   }
            }
        });
    }

    /*Obtiene Reporte semanal por consultorios*/

    getImpConsultasSemanal(id_consultorio, fechaRango) {
        //console.log("getImpConsultasSemanal en Reportes.js");
        var data = new FormData();

        //dia,mes/año
        var fecha = new Date(fechaRango);
        fecha.setDate(fecha.getDate() + 6);
        var fechaFin = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
       // alert("fechaIni" + fechaRango + ":FechaFin:" + fechaFin);
        data.append("id_consultorio", id_consultorio);
        data.append("fechaInicio", fechaRango);
        data.append("fechaFin", fechaFin);

        $.ajax({
            url: URL + "Consultas/reporteConsultasImprime",
            data: data,
            cache: false,
           // contentType: "application / pdf",
            contentType: false,
            processData: false,
            type: "POST",
            success: (response) => {
               // $("#reporte").html(response);
                // try {
                // let item = JSON.parse(response);
                // console.log(item);
                //  let item = JSON.parse(response);
                /*    if (item.results.length > 0) {//si jhay consultas en el criterio
                        // $("#historial_consulta").html(response);
                        $("#reporte").html(response);
                        // this.vaciarFormulario();

                        Swal.fire({
                            icon: 'success',
                            title: 'Busqueda hecha',
                            text: ""
                        });
                        getReportes();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response
                        });
                    }*/
                //   } catch (error) {
                //     console.log(error)
                //   }
            }
        });
    }



}