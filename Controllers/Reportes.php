<?php
class Reportes extends Controllers {

    public function __construct() {
        parent::__construct();
    }
    public function reportes(){
        if(Session::getSession("User") != null){
            $this->view->render($this,"reportes");
        } else {
            header("Location:".URL);
        }
        
    }
    public function destroySesion(){
        Session::destroy();
        header("Location:".URL);
    }
}

?>