var validarEmail = (email)=>{
    let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if(regex.test(email)){
        return true;
    } else {
        return false;
    }
}

 var habilitarSexo = ()=> {
   
        $(document).on('change', '#sexo', function(event) {

           let sexo= $("#sexo option:selected").text();
           if(sexo==="Otro"){
            
            $('#otro_sexo').attr("disabled", false);
           } else {
            $('#otro_sexo').attr("disabled", true);
           }
            
       });
 
}

var copiarNombre = () => {
    let nombre =  document.getElementById("nombre").value;
    let apPaterno = document.getElementById("paterno").value;
    let apMaterno = document.getElementById("materno").value;

    document.getElementById("nombrePaciente").value = nombre + " " + apPaterno + " " + apMaterno;
}

var calcularEdad = (fecha) => {

    let fechaNace =  new Date(fecha.target.value);
    let fechaActual = new Date()

    let mes = fechaActual.getMonth();
    let dia = fechaActual.getDate();
    let año = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
    document.getElementById("edadPaciente").value = edad;
  
}