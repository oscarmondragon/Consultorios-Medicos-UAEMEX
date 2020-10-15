<?php
class Controllers extends Anonymous
{
    public function __construct() {
        $sessionHeader = [
            'cookie_httponly' => true
        ];
        Session::start($sessionHeader);
        $this->view = new Views();
        $this->loadClassmodels();
    }
    //obtner todas las clases de la carpeta models
    function loadClassmodels(){
        $model = get_class($this).'_model';
        $path = 'Models/'.$model.'.php';
        if(file_exists($path)){
            require $path;
            $this->model = new $model();
        }

    }
}



?>