<?php
 class Historia  extends Controllers {
    public function __construct() {
        parent::__construct();
    }

    public function historia(){
        if(Session::getSession("User") != null){
            $this->view->render($this,"historia");
        } else {
            header("Location:".URL);
        }
        
    }
 }
?>