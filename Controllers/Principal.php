<?php
 class Principal  extends Controllers {
    public function __construct() {
        parent::__construct();
    }

    public function principal(){
        if(Session::getSession("User") != null){
            $this->view->render($this,"principal");
        } else {
            header("Location:".URL);
        }
        
    }
 }
?>