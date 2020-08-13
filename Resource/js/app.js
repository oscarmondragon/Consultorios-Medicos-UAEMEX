/*Codigo de usuarios*/
var pacientes = new Pacientes();
var usuarios = new Usuarios();

var loginUser = () =>{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
     usuarios.loginUser(username, password);

}

var sessionClose = () =>{
    usuarios.sessionClose();
    
}

var restablecerPaciente = () => {
    pacientes.restablecerPaciente();
}



$(function(){
    $("#btnLogin").click( function(){
        let nombre = document.getElementById("nombre").value;
        let paterno = document.getElementById("paterno").value;
        let materno = document.getElementById("materno").value;
        let fechaNac = document.getElementById("fechaNac").value;
        let telefonoCel = document.getElementById("telefonoCel").value;
    
        let sexos = document.getElementById("sexo");
        let sexo = sexos.options[sexos.selectedIndex].text;
        let otro_sexo = null;
        if(sexo==="Otro"){
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
        }
    });
});

// llama metodo para filtrar pacientes
var getPacientes = () => {
    let valor = document.getElementById("filtrarPaciente").value;
    pacientes.getPacientes(valor);

}

//funcion para obtener datos del paciente para editar
var dataPaciente = (data) => {
    console.log(data);
    pacientes.editarPaciente(data);
}



/*PRINCIPAL: para cambiar color a la opcion seleccionada del menu*/
var principal = new Principal();


//codigo para validar formulario de login
$().ready(()=>{
    let URLactual = window.location.pathname;
    usuarios.userData(URLactual);
    principal.linkPrincipal(URLactual);
   
     $("#validate").validate();
    // $(".sidenav").sidenav();
    // $(".modal").modal();
    // $('select').formSelect();
    M.AutoInit();

    switch(URLactual){
        case PATHNAME + "Principal/principal":
            break;
        case PATHNAME + "Pacientes/pacientes":
            getPacientes();
        break;
    }

 
});

