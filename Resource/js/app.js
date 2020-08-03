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


//codigo para validar formulario de login
$().ready(()=>{
    let URLactual = window.location.pathname;
    usuarios.userData(URLactual);
 $("#login").validate();
 $(".sidenav").sidenav();
});

