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
     function getCentroCostos(){
        $data = $this->model->getCentroCostos();
        if(is_array($data)){
           echo json_encode($data);
        } else {
            echo $data;
        }
    }
    function getTipoPaciente(){
        $data = $this->model->getTipoPaciente();
        if(is_array($data)){
           echo json_encode($data);
        } else {
            echo $data;
        }
    }

     function registrarPaciente(){
         $array = array(
            $_POST["nombre_pac"],$_POST["apPaterno_pac"],
            $_POST["apMaterno_pac"],$_POST["fecha_nacimiento_pac"],$_POST["tel_cel_pac"],$_POST["sexo_pac"],
            $_POST["otro_sexo_pac"],$_POST["id_estado_civil"],$_POST["departamento"],
            $_POST["id_centro_costos"],$_POST["id_tipo_paciente"],$_POST["fecha_alta_pac"],
            $_POST["id_usuario_consultorio"]
         );
         $data = $this->model->registroPaciente($this->pacienteClass($array));
         if($data ===1){
             echo "Ya se ha registrado un paciente con este número telefónico anteriormente.";
         } else{
             echo $data;
         }
         

         //echo $_POST["tel_cel_pac"];
     }

    public function getPacientes(){
        $dataFilter = null;
        $data = $this->model->getPacientes($_POST["filter"]);
        if(is_array($data)){
            $array = $data["results"];
            foreach ($array as $key => $value) {
                $dataFilter.= "<tr>".
                    "<td>".$value["id_paciente"]."</td>".
                    "<td>".$value["nombre_pac"]."</td>".
                    "<td>".$value["apPaterno_pac"]."</td>".
                    "<td>".$value["apMaterno_pac"]."</td>".
                    "<td>".$value["tel_cel_pac"]."</td>".
                    "<td>".$value["id_centro_costos"]."</td>".
                    "<td>".$value["id_tipo_paciente"]."</td>".
                    "<td>".
                    "<a data-toggle= 'modal' data-target= '#modalEdit' onclick='' class='btn 
                    btn-success'>Editar</a>".
                    "</td>".
                    "<td>".
                    "<a data-toggle= 'modal' data-target= '#modalDelete' onclick='' class='btn waves-effect waves-light
 red'>Eliminar</a>".
                    "</td>".
                "</tr>";
            }
            echo $dataFilter;
        } else {
            echo $data;
        }
       
     }

}

?>