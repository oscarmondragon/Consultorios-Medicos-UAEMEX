<?php
class Descargables extends Controllers {

    public function __construct() {
        parent::__construct();
       
    }
    public function descargables(){
        if(Session::getSession("User") != null){
            $this->view->render($this,"descargables");
        } else {
            header("Location:".URL);
        }
        
    }
}
?>