<?php
class Consultas extends Controllers {

    public function __construct() {
        parent::__construct();
    }
    public function consultas(){
        if(Session::getSession("User") != null){
            $this->view->render($this,"consultas");
        } else {
            header("Location:".URL);
        }
        
    }
}

?>