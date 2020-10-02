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

    public function getCoincidenciasPac()
    {
        $count = 0;
        $dataFilter = null;
        $data = $this->model->getCoincidenciasPac($_POST["nombre"], $_POST["paterno"],
        $_POST["materno"],$_POST["fechaNac"]);
        if(is_array($data)){
            $array = $data["results"];
            foreach ($array as $key => $value) {
                $dataUser = json_encode($array[$count]);
                $dataFilter.= "<tr>".
                    "<td>".$value["id_paciente"]."</td>".
                    "<td>".$value["nombre_pac"]."</td>".
                    "<td>".$value["apPaterno_pac"]."</td>".
                    "<td>".$value["apMaterno_pac"]."</td>".
                    "<td>".$value["des_centro_costos"]."</td>".
                    "<td>".$value["tipo"]."</td>".
                     "<td>".
                    "<a  href= '#modal'  class='btn 
                    btn-success modal-trigger'>Relacionar</a>".
                    "</td>". 
                "</tr>";
                $count++;
            }
           echo $dataFilter;
        //    echo $data["results"][0]['id_centro_costos'] ;
        } else {
            echo $data;
        }
       
     }
 }
?>