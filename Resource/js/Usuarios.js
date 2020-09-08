class Usuarios{
    constructor(){

    }

    loginUser(username, password){
        if(username=== ""){
            document.getElementById("username").focus();
            M.toast({html:"Ingrese su nombre de usuario", classes: 'rounded'});
        } else{
            if(password ===""){
                document.getElementById("password").focus();
            M.toast({html:"Ingrese su contraseña", classes: 'rounded'});
            } else {
                    if(6<=password.length){
                        $.post(
                            "Index/userLogin",
                            {username,password},
                            (response)=>{
                                try{
                                    var item = JSON.parse(response);
                                   
                                    if(item.id_usr>0){
                                        //almacenamos informacion de usuario localmente
                                        localStorage.setItem("user", response);
                                        //mandamos la vista principal por que se logueo correctamente
                                        window.location.href = URL +"Principal/principal";

                                    } else {
                                        document.getElementById("indexMessage").innerHTML =
                                        'Nombre de usuario o contraseña incorrectos';
                                    }
                                } catch(error) {
                                    document.getElementById("indexMessage").innerHTML = response;
                                }
                            }
                        );
                    } else {
                        document.getElementById("password").focus();
                        M.toast({html:"Introduzca al menos 6 caracteres", classes: 'rounded'});
                    }
               
            }
        }
    }
userData(URLactual){
    if (PATHNAME === URLactual) {
        localStorage.removeItem("user");
        document.getElementById('menuNavbar1').style.display = 'none';
        document.getElementById('menuNavbar2').style.display = 'none';


    } else {
        if(localStorage.getItem("user") != null){
            var user = JSON.parse(localStorage.getItem("user"));
            if (user.id_usr > 0) {
                
                document.getElementById('menuNavbar1').style.display = 'block';
                document.getElementById('menuNavbar2').style.display = 'block';

                document.getElementById("name1").innerHTML = user.nombre_usr + " " + user.apPaterno_usr + " " + user.apMaterno_usr;
                document.getElementById("consultorio1").innerHTML = user.nombre_consultorio;
                document.getElementById("role1").innerHTML = user.tipoUsuario;

                document.getElementById("name2").innerHTML = user.nombre_usr + " " + user.apPaterno_usr + " " + user.apMaterno_usr;
                document.getElementById("consultorio2").innerHTML = user.nombre_consultorio;
                document.getElementById("role2").innerHTML = user.tipoUsuario;

               // document.getElementById("messageBienvenida").innerHTML = "Bienvenid@ " + "<strong>" +user.nombre_usr + "</strong> al Sistema de Control de Consultorios UAEM";
                
               

            }

        }
        
    }
}

sessionClose(){
    localStorage.removeItem("user");
    document.getElementById('menuNavbar1').style.display = 'none';
    document.getElementById('menuNavbar2').style.display = 'none';
}

}