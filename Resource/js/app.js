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
    
        let estadosCiv = document.getElementById("estadoCiv");
        let estadoCiv = estadosCiv.options[estadosCiv.selectedIndex].text;
    
        let departamento = document.getElementById("departamento").value;
    
        let centrosCost = document.getElementById("centroCosto");
        let centroCost = centrosCost.options[centrosCost.selectedIndex].text;
    
        let tiposPaciente = document.getElementById("tipoPaciente");
        let tipoPaciente = tiposPaciente.options[tiposPaciente.selectedIndex].text;

         //obtenemos fecha actual
        let fecha_alta_pac = new Date().toLocaleDateString();
    
        //obtenemos datos de usuario que registra
        let user = JSON.parse(localStorage.getItem("user"));
        let userId = user.id_usr;
     

        //mandamos los datos al metod registrarPaciente de Paciente.js
        if(nombre !="" && paterno !="" && materno !="" && fechaNac !="" && telefonoCel !=""
        && sexo !="" && estadoCiv != "Elige una opción" && departamento !="" && centroCost != "Elige una opción"
        && tipoPaciente !="Elige una opción"){
        pacientes.registrarPaciente(nombre,paterno,materno,fechaNac,
            telefonoCel,sexo,estadoCiv,departamento,centroCost,tipoPaciente,fecha_alta_pac,userId);
            
            return false; //para evitar reenvio de formulario
        }
    });
});




/*PRINCIPAL: para cambiar color a la opcion seleccionada del menu*/
var principal = new Principal();


//codigo para validar formulario de login
$().ready(()=>{
    let URLactual = window.location.pathname;
    usuarios.userData(URLactual);
    principal.linkPrincipal(URLactual);
    $('select').formSelect();
    $("#validate").validate();
    $(".sidenav").sidenav();
    $(".modal").modal();

 
});

