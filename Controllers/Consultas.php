<?php
class Consultas extends Controllers {

    public function __construct() {
        parent::__construct();
        //this.getTipoAtencion2();
        
    }
    public function consultas(){
        if(Session::getSession("User") != null){
            $this->view->render($this,"consultas");
        } else {
            header("Location:".URL);
        }
        
    }

    function getTipoAtencion(){
         $data = $this->model->getTipoAtencion();
         if(is_array($data)){
            echo json_encode($data);
         } else {
             echo $data;
         }
     }

     function getTipoAtencion2(){
        $padre = $_POST["padre"];
        //if(isset($_POST["padre"])){
       // echo "Estamos aui";
          //  $data = $this->model->getTipoAtencion2($_POST["padre"]);
          $data = $this->model->getTipoAtencion2($padre);
             if(is_array($data)){
                echo json_encode($data);
            } else {
                echo $data;
             }
         //}
     }


      public function getPacientesConsultas()
    {
    //alert("estas en controlador");
        $count = 0;
        $dataFilter = null;
        $data = $this->model->getPacientes($_POST["filter"]);
        if(is_array($data)){
            $array = $data["results"];
            foreach ($array as $key => $value) {
                $dataUser = json_encode($array[$count]);
                $dataFilter.= "<tr>".
                    "<td>".$value["id_paciente"]."</td>".
                    "<td>".$value["nombre_pac"]."</td>".
                    "<td>".$value["apPaterno_pac"]."</td>".
                    "<td>".$value["apMaterno_pac"]."</td>".
                    "<td>".$value["tel_cel_pac"]."</td>".
                    "<td>".$value["des_centro_costos"]."</td>".
                    "<td>".$value["tipo"]."</td>".
                    "<td>".
                    "<a  href= '#modal1'  onclick='pacienteNConsulta(".$dataUser.")' class='btn btn-success modal-trigger'>Nueva</a> | ".
                    
                    "<a href= '#modal2' onclick='pacienteHistorial(".$dataUser.")'  class='btn btn-success modal-trigger'> Ver todas</a>".
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

     public function getConsultasHistorico()
    {
        $id_paciente = $_POST["id_paciente"];
        $count = 0;
        $dataFilter = null;
        $data = $this->model->getHistorico($id_paciente);
        if(is_array($data)){
            $array = $data["results"];
            foreach ($array as $key => $value) {
                $dataUser = json_encode($array[$count]);
                $idtipoA = $value["id_tipo_atencion"];
                $descTipo = $this->model->getCatalogotipoatencion($idtipoA);
                echo $idtipoA;
                if(is_array($descTipo)){
                    $arrayDescTipo = $descTipo["results"];
                    foreach($arrayDescTipo as $key => $valuedt){
                        $dataFilter.= "<tr>".                    
                            "<td>".$value["fecha_consulta"]."</td>".
                            "<td>".$value["hora_consulta"]."</td>".
                            "<td>".$valuedt["nombre_tipo_atencion"]."</td>".
                            "</tr>";
                    }
                }else{
                    echo $descTipo;
                }
                $count++;
            }
           echo $dataFilter;
        //    echo $data["results"][0]['id_centro_costos'] ;
        } else {
            echo $data;
        }       
     }

     



     function registrarConsulta()
     {         
        //array para dar alta consulta
        $arrayConsulta = array(
            $_POST["id_paciente"],
            $_POST["edad"],$_POST["id_tipo_atencion"],
            $_POST["frecuencia_cardiaca"],$_POST["frecuencia_respiratoria"],
            $_POST["temperatura"],$_POST["tension_arterial"],
            $_POST["talla"],$_POST["peso"],
            $_POST["descripcion"],$_POST["diagnostico"],
            $_POST["tratamiento"],$_POST["ambulancia"],
            $_POST["referenciado"],$_POST["observaciones"],
            $_POST["lugar_referencia"],$_POST["fecha_consulta"],
            $_POST["hora_consulta"],$_POST["id_medico"] 
        ); 
        $dataConsulta = $this->model->registroConsulta($this->consultaClass($arrayConsulta));
             
        if($dataConsulta== 0){ // indica que se inserto el paciente y la consulta, falta poblacion_riesgo y medicina_prev
               //enviamos arreglo de consulta, nos devuelve el id_consulta
               $idConsulta = $this->model->obtenerIdConsulta($this->consultaClass($arrayConsulta)); 
               if($idConsulta===0){ // si es igual a 0 no se encontro el id usuario
                    echo "No se registro la consulta en la Base de datos";
                }else {
                    //convertimos en arreglo los id de poblacion_riesgo y medicina_prev
                    $poblacionRiesgo = explode(",", $_POST["poblacion_riesgo"]);
                    $medicinaPreventiva = explode(",",$_POST["medicina_prev"]);
                    // arreglo para mandar a registrar los datos
                     
                    //insertamos los valore de poblacion de riesgo
                    if($poblacionRiesgo[0] != 0){
                         foreach ($poblacionRiesgo as $valor) 
                         {
                            $valores = array($idConsulta, $valor);
                            $dataPoblacion = $this->model->registroPoblacionRiesgo($this->poblacionClass($valores));
                            if($dataPoblacion != 0){
                                $dataPoblacion = 1;
                                break;
                            }
                         }
                    }
                    //insertamos valores de medicina preventiva
                    if($medicinaPreventiva[0] != 0){
                         foreach ($medicinaPreventiva as $valor)
                         {
                             $valores = array($idConsulta, $valor);
                             $dataMedicina = $this->model->registroMedicinaPreventiva($this->medicinaClass($valores));
                               if($dataMedicina != 0){
                                    $dataMedicina = 1;
                                    break;
                               }
                         }
                    }
                           
                    echo 0;
                }
        } else{
            echo $dataConsulta;
        }
     }

     function registroPoblacionRiesgo($poblacionRiesgo){
     //insertamos los datos a tabla consulta_poblacion_riesgoforeach ($poblacionRiesgo as &$valor) {

       $value = " (id_consulta,
        id_poblacion_riesgo
        ) VALUES (
        :id_consulta,
        :id_poblacion_riesgo
        )";
        $data = $this->db->insert('consulta_poblacion_riesgo',$poblacionRiesgo,$value);
        if($data == 1){
            return 0;
        } else {
            return $data;
        }
   }
    
   function registroMedicinaPreventiva($medicinaPreventiva){
    //insertamos los datos a tabla consulta_poblacion_riesgoforeach ($poblacionRiesgo as &$valor) {

      $value = " (id_consulta,
       id_medicina_preventiva
       ) VALUES (
       :id_consulta,
       :id_medicina_preventiva
       )";
       $data = $this->db->insert('consulta_medicina_preventiva',$medicinaPreventiva,$value);
       if($data == 1){
           return 0;
       } else {
           return $data;
       }
  }



    public function destroySesion(){
        Session::destroy();
        header("Location:".URL);
    }
}

?>