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
         //array para paciente
         $array = array(
            $_POST["nombre_pac"],$_POST["apPaterno_pac"],
            $_POST["apMaterno_pac"],$_POST["fecha_nacimiento_pac"],$_POST["sexo_pac"],
            $_POST["otro_sexo_pac"],$_POST["tel_cel_pac"],$_POST["id_estado_civil"],
            $_POST["id_centro_costos"],$_POST["id_tipo_paciente"],$_POST["nivel_academico"],
            $_POST["departamento"],
            $_POST["fecha_alta_pac"],
            $_POST["id_usuario_consultorio"]
         );
         
         //llamamos metodo para registrar paciente
         $data = $this->model->registroPaciente($this->pacienteClass($array));

         if($data ===1){
             echo "Ya se ha registrado un paciente con ese nombre y fecha de nacimiento anteriormente.";
         } else if($data=== 0){ //se registro el usuario falta consulta
            //enviamos arreglo de consulta, nos devuelve el id_paciente en $dataCon
            $dataCon = $this->model->obtenerIdPaciente($this->pacienteClass($array)); 
            
            if($dataCon===0){ // si es igual a 0 no se encontro el id usuario
                echo "No se encontro el paciente en la base de datos";
            }  else {
              
                  //array para dar alta consulta
          $arrayConsulta = array(
            $dataCon,
            $_POST["edad"],$_POST["id_tipo_atencion"],
            $_POST["frecuencia_cardiaca"],$_POST["frecuencia_respiratoria"],
            $_POST["temperatura"],$_POST["tension_arterial"],
            $_POST["saturacion"],
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
                        }  else {
                            //convertimos en arreglo los id de poblacion_riesgo y medicina_prev
                            $poblacionRiesgo = explode(",", $_POST["poblacion_riesgo"]);
                            $medicinaPreventiva = explode(",",$_POST["medicina_prev"]);
                        
                       //insertamos los valore de poblacion de riesgo
                       if($poblacionRiesgo[0] != null){
                         foreach ($poblacionRiesgo as $valor) {
                             $valores = array(
                                 $idConsulta,
                                 $valor, NULL
                             );
                            $dataPoblacion = $this->model->registroPoblacionRiesgo($this->poblacionClass($valores));
                            if($dataPoblacion != 0){
                                $dataPoblacion = 1;
                            break;
                            }
                         }
                        }
                        
                  //insertamos valores de medicina preventiva
                  if($medicinaPreventiva[0] != 0){
                         foreach ($medicinaPreventiva as $valor) {
                            $valores = array(
                                $idConsulta,
                                $valor, NULL
                            );
                           $dataMedicina = $this->model->registroMedicinaPreventiva($this->medicinaClass($valores));
                           if($dataMedicina != 0){
                               $dataMedicina = 1;
                           break;
                           }
                        }
                  } 

                  //guardamos en una variable la otra medicina preventiva
                 // el id para otra medicina siempre será 0, posteriormente podemos hacer el metodo para obtener el id desde la db
                 if($_POST["otraMedicina"] != ""){
                    $idOtraMedicina = 0;
                    $otraMedicinaPrev = array($idConsulta,$idOtraMedicina,$_POST["otraMedicina"]); // arreglo para mandar a registrar
                //insertamos valores de otra medicina
                $dataMedicina = $this->model->registroMedicinaPreventiva($this->medicinaClass($otraMedicinaPrev));

                 }

                  //guardamos en una variable la otra poblacion riesgo
                 // el id para otra poblacion siempre será 0, posteriormente podemos hacer el metodo para obtener el id desde la db
                 if($_POST["otraPoblacion"] != ""){
                    $idOtraPoblacion = 0;
                    $otraPobRiesgo = array($idConsulta,$idOtraPoblacion,$_POST["otraPoblacion"]); // arreglo para mandar a registrar
                //insertamos valores de otra medicina
                $dataPoblacion = $this->model->registroPoblacionRiesgo($this->poblacionClass($otraPobRiesgo));

                 }
                   
                           
                echo 0;
                      
             }
             } else{
                 echo $dataConsulta;
             }

            }
          
         } else{
            echo $data;
         }
     }

    public function getPacientes()
    {
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
                    "<td>".$value["des_centro_costos"]."</td>".
                    "<td>".$value["tipo"]."</td>".
                    /* "<td>".
                    "<a  href= '#modal'  class='btn 
                    btn-success modal-trigger'>Editar</a> |".
                    
                    "<a href= '#modal1' onclick='dataPaciente(".$dataUser.")'  class='btn red lighten-1'>Eliminar</a>".
                    "</td>". */
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