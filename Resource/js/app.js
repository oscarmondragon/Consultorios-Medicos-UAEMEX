/*Codigo de usuarios*/
var usuarios = new Usuarios();
var loginUser = () =>{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
     usuarios.loginUser(username, password);

}

var sessionClose = () =>{
    usuarios.sessionClose();
}

var registrarPaciente = () =>{

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

    let tiposUser = document.getElementById("tipoUser");
    let tipoUser = tiposUser.options[tiposUser.selectedIndex].text;
    
   // pacientes.registrarPaciente(nombre,paterno,materno,fechaNac,
     //   telefonoCel,sexo,estadoCiv,departamento,centroCost,tipoUser);


}

/*PRINCIPAL: para cambiar color a la opcion seleccionada del menu*/
var principal = new Principal();


//codigo para validar formulario de login
$().ready(()=>{
    let URLactual = window.location.pathname;
    usuarios.userData(URLactual);
    principal.linkPrincipal(URLactual);
    $("#validate").validate();
    $(".sidenav").sidenav();
    $(".modal").modal();
    $('select').formSelect();
 
});

