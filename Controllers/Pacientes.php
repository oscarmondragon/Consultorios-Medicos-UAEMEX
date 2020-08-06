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
     function getEstadoCivil(){
         $data = $this->model->getEstadoCivil();
         if(is_array($data)){
            echo json_encode($data);
         } else {
             echo $data;
         }
     }

     function registrarPaciente(){
         echo $_POST["userId"];
     }
}

?>