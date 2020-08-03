<?php 
class Errors extends Controllers
{
    public function error(){
        $this->view->render($this,"error");
    }   
    
}

?>