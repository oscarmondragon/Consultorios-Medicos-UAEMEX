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

    /*apartado de reportes**/
function reporteConsultas(){    
    $id_consultorio = $_POST["id_consultorio"];
    $fechaInicial= $_POST["fechaInicio"];
    $fechaFinal= $_POST["fechaFin"];

    $data = $this->model->getRconsultas($id_consultorio,$fechaInicial, $fechaFinal);
    if(is_array($data)){
        $array = $data["results"];
        foreach ($array as $key => $value) {                 
            $dataFilter.= "<tr>".                    
                "<td>".$value["fecha_consulta"]."</td>".
                "<td>".$value["hora_consulta"]."</td>".
                "<td>".$valuedt["nombre_tipo_atencion"]."</td>".
                "<td>".
                "<a  href= '#modal1'  onclick='mostrarConsulta(".$dataUser.")' class='btn btn-success modal-trigger'>Detalles</a>".
                "</td>".
                "</tr>";                    
        }
        echo $dataFilter;
     } else {
        echo $data;
     }

}

public function getconsulta(){
    $id_consultorio = $_POST["id_consultorio"];
    $fechaInicial = $_POST["fechaRango"];
    $fechaFinal = $_POST["fechaFin"];

    $data = $this->model->getRconsultas($id_consultorio,$fechaInicial, $fechaFinal);
        if(is_array($data)){ 
            echo 1; 
            /*
            if(is_array($data)){
                $array = $data["results"];
            }          
           echo json_encode($data);*/
       } else {
           echo 0;
        }

}
}

?>