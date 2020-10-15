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
            if(count($array)===0){
                return 0;
            }   else {
            /* foreach ($array as $key => $value) {
                $dataUser = json_encode($array[$count]);
                $dataFilter.= "<tr>".
                    "<td>".$value["nombre_pac"]."</td>".
                    "<td>".$value["apPaterno_pac"]."</td>".
                    "<td>".$value["apMaterno_pac"]."</td>".
                    "<td>".$value["des_centro_costos"]."</td>".
                    "<td>".$value["tipo"]."</td>".
                    "<td>".
                    "<a  href= '#modalNHistoria'  onclick='relacionarPaciente(".$dataUser.")' class='btn btn-success modal-trigger'>Relacionar</a>".
                    "</td>".
                "</tr>";
                $count++;
            } */
           echo $array[0]["id_paciente"];
        //    echo $data["results"][0]['id_centro_costos'] ;
        }
    }  else {
        echo 0; //envia 0 si no encuentra sugerenecias
    }

}

     public function getCoincidenciasHistorial()
    {
        $count = 0;
        $dataFilter = null;
        $data = $this->model->getCoincidenciasHistorial($_POST["nombre"], $_POST["paterno"],
        $_POST["materno"],$_POST["fechaNac"]);
        if(is_array($data)){
            $array = $data["results"];
            foreach ($array as $key => $value) {
                $dataUser = json_encode($array[$count]);
                /* $dataFilter.= "<tr>".
                   "<td>".$value["id_historial_clinico"]."</td>".
                     "<td>".$value["num_expediente"]."</td>".
                     "<td>".$value["id_paciente"]."</td>".
                     "<td>".$value["nombre_hc"]."</td>".
                     "<td>".$value["apPaterno_hc"]."</td>".
                     "<td>".$value["apMaterno_hc"]."</td>".
                     "<td>".$value["des_centro_costos"]."</td>".
                    "<td>".
                    "<a id='btnRelacionaHist' href= '#modalNPaciente'  onclick='relacionarHistorial(".$value['id_historial_clinico'].")' class='btn btn-success modal-trigger'>Relacionar Historial</a>".
                    "</td>".
                "</tr>";*/
                $dataFilter.= $value["id_historial_clinico"];
                $count++;
            }
           echo $dataFilter;
        //    echo $data["results"][0]['id_centro_costos'] ;
        } else {
            echo 0; //envia 0 si no encuentra sugerenecias
        }
       
     }

     public function getHistoriasClinicas()
     {
         $count = 0;
         $dataFilter = null;
         $data = $this->model->getHistoriasClinicas($_POST["filter"]);
         if(is_array($data)){
             $array = $data["results"];
             foreach ($array as $key => $value) {
                 $dataUser = json_encode($array[$count]);
                 if($value["id_paciente"] == 0){
                     $value["id_paciente"] = "Sin consultas";
                 }
                 $dataFilter.= "<tr>".
                     "<td>".$value["id_historial_clinico"]."</td>".
                     "<td>".$value["num_expediente"]."</td>".
                     "<td>".$value["id_paciente"]."</td>".
                     "<td>".$value["nombre_hc"]."</td>".
                     "<td>".$value["apPaterno_hc"]."</td>".
                     "<td>".$value["apMaterno_hc"]."</td>".
                     "<td>".$value["des_centro_costos"]."</td>".
                     "<td>".$value["tipo"]."</td>".
                     "<td>".
                     "<a  href= '#modalNHistoria'  onclick='mostrarDetallesHistoria(".$dataUser.")' class='btn btn-success modal-trigger'>Detalles</a>".
                     "</td>".

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
 
     function registrarHistoria(){


        //Creamos el identificador_uaem que por ahora sera 0 para todos 
        $identificadorUaem = 0;

        //generamos el numero de expediente
        $expediente = "EXP-";
        $nombre = $_POST["nombre_hc"];
        $paterno = $_POST["apPaterno_hc"];
        $materno = $_POST["apMaterno_hc"];
        //obtenemos el ultimo id insertado en historia clinica
        $dataId = $this->model->ultimoIdHistoria();
        $lastId = $dataId["results"];
        $ultimoID= $lastId[0]["id"] + 1;
        $numeroExpediente =$expediente.$nombre[0].$paterno[0].$materno[0].$ultimoID;  
        //$numeroExpediente = 1;
        //echo $numeroExpediente;
    
        //array para historia clinica
        $array = array(
           $_POST["id_paciente"],
           $_POST["unidad_medica"],
           $numeroExpediente,
           $_POST["fec_elaboracion"],
           $_POST["hra_elaboracion"],
           $_POST["nombre_hc"],
           $_POST["apPaterno_hc"],
           $_POST["apMaterno_hc"],
           $_POST["fecNac_hc"],
           $_POST["sexo_hc"],
           $_POST["otro_sexo_hc"],
           $_POST["tipo_paciente"],
           $_POST["id_centro_costos"],
           $identificadorUaem,
           $_POST["domicilio"],
           $_POST["nombre_padre_tutor"],
           $_POST["parentesco"],
           $_POST["contacto_emergencia"],
           $_POST["tel_contacto_emergencia"],
           $_POST["parentesco_contacto_emergencia"],
           $_POST["ant_heredo_familiares"],
           $_POST["ant_personalesNO_pat"],
           $_POST["ant_pesonales_pat"],
           $_POST["ant_gineco_obs"],
           $_POST["padecimiento_actual"],
           $_POST["ipas_cardiovascular"],
           $_POST["ipas_respiratorio"],
           $_POST["ipas_gastrointestinal"],
           $_POST["ipas_genitourinario"],
           $_POST["ipas_hematico_linfatico"],
           $_POST["ipas_endocrino"],
           $_POST["ipas_nervioso"],
           $_POST["ipas_musculoesqueletico"],
           $_POST["ipas_piel_mucosas"],
           $_POST["fc"],
           $_POST["fr"],
           $_POST["temperatura"],
           $_POST["ta"],
           $_POST["saturacion"],
           $_POST["peso"],
           $_POST["talla"],
           $_POST["ef_habitus_ext"],
           $_POST["ef_cabeza"],
           $_POST["ef_cuello"],
           $_POST["ef_torax"],
           $_POST["ef_abdomen"],
           $_POST["ef_genitales"],
           $_POST["ef_extremidades"],
           $_POST["ef_piel"],
           $_POST["resultados"],
           $_POST["diagnostico"],
           $_POST["pronostico"],
           $_POST["id_usuario_consultorio"]
        );
        
        //llamamos metodo para registrar historia clinica
        $data = $this->model->registroHistoria($this->historiaClass($array));


        if($data == 1){
            echo "Ya se ha registrado una historia clínica con ese nombre y fecha de nacimiento anteriormente.";
            
        } else if($data === 0){ //se registro la historia clinica
            echo 0;
                 
        } else{
           echo $data;
        }
    }
 }
?>