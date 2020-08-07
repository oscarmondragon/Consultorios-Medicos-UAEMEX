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