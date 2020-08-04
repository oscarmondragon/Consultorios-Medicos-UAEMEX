<?php
class Pacientes extends Controllers {

    public function __construct() {
        parent::__construct();
    }
    public function pacientes(){
        if(Session::getSession("User") != null){
            $this->view->render($this,"pacientes");
        } else {
            header("Location:".URL);
        }
        
    }
}

?>