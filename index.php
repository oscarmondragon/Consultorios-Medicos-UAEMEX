<?php
require "config.php";
$url = $_GET["url"] ?? "Index/index";
$url = explode("/", $url); //divide la url
$controller = "";
$method = "";
if(isset($url[0])){
    $controller = $url[0];
}
if(isset($url[1])){
    if($url[1] != ''){
        $method = $url[1];
    }
}
//para invocar a todos los controladores y no usar un require para cada uno
spl_autoload_register(function($class){
    if (file_exists(LBS.$class.".php")) {
        require LBS.$class.".php";
    } 
});
require 'Controllers/Error.php';
$error = new Errors();
//iNVOCAR TODOS LOS CONTROLADORES DE /Controllers
$controllersPath = "Controllers/".$controller.'.php';
if (file_exists($controllersPath)) {
    require $controllersPath;
    //instanciamos de la clase
    $controller = new $controller();
    if(isset($method)){
        if(method_exists($controller, $method)){
            $controller->{$method}();
        } else {
            $error->error();
        }

    }
} else {
    $error->error();
    
}

?>