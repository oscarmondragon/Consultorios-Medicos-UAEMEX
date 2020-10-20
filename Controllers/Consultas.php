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
function getConsultasDatos(){
    alert("estas en controlador");
    $count = 0;
    $dataFilter = null;
    $data = $this->model->getConsultasDatos();
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
                "<a  href= '#modal1'  onclick='pacienteNuevaConsulta(".$dataUser.")' class='btn btn-success modal-trigger'>Nueva</a> | ".
                
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
    function getConsultorios(){
        $data = $this->model->getConsultorios();
        if(is_array($data)){
           echo json_encode($data);
        } else {
            echo $data;
        }
    }
    function consultaMedicinaPreventiva(){
        
        $id_consulta = $_POST["id_consulta"];
        $data = $this->model->consultaMedicinaPreventiva($id_consulta);
         if(is_array($data)){
            echo json_encode($data);
         } else {
             echo $data;
         }
    }
    function consultaPoblacionRiesgo(){
        $id_consulta = $_POST["id_consulta"];
        $data = $this->model->consultaPoblacionRiesgo($id_consulta);
         if(is_array($data)){
            echo json_encode($data);
         } else {
             echo $data;
         }
    }

    function consultaTipoAtencion(){
        $id_tipo_atencion = $_POST["id_tipo_atencion"];
        $data = $this->model->consultaTipoAtencion($id_tipo_atencion);
         if(is_array($data)){
            echo json_encode($data);
         } else {
             echo $data;
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
                    "<a  href= '#modal1'  onclick='pacienteNuevaConsulta(".$dataUser.")' class='btn btn-success modal-trigger'>Nueva</a> | ".
                    
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
                $datosConsulta = json_encode($array[$count]);
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
                            "<td>".
                            "<a  href= '#modal1'  onclick='mostrarConsulta(".$dataUser.")' class='btn btn-success modal-trigger'>Detalles</a>".
                            "</td>".
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
                }else {
                    //convertimos en arreglo los id de poblacion_riesgo y medicina_prev
                    $poblacionRiesgo = explode(",", $_POST["poblacion_riesgo"]);
                    $medicinaPreventiva = explode(",",$_POST["medicina_prev"]);
                    // arreglo para mandar a registrar los datos
                     
                    //insertamos los valore de poblacion de riesgo
                    if($poblacionRiesgo[0] != null){
                         foreach ($poblacionRiesgo as $valor) 
                         {
                            $valores = array($idConsulta, $valor, NULL);
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
                             $valores = array($idConsulta, $valor, NULL);
                             $dataMedicina = $this->model->registroMedicinaPreventiva($this->medicinaClass($valores));
                               if($dataMedicina != 0){
                                    $dataMedicina = 1;
                                    break;
                               }
                         }
                    }
                    //Registro de otra medicina preventiva
                    $omp = $_POST["ompreventiva"] ;
                    
                    if($omp != "" or $omp != NULL){//verificamos que exista otra medicina preventiva
                    
                        $valores = array($idConsulta, 0,$omp);                        
                        $dataPoblacion = $this->model->registroOMedicinaPreventiva($this->omedicinaClass($valores));
                            if($dataPoblacion != 0){
                                $dataPoblacion = 1;
                            }
                    }   
                    //Registro de otra poblacion risgo
                    $oPobRiesgo = $_POST["otraPob"] ;
                    
                    if($oPobRiesgo != "" or $oPobRiesgo != NULL){//verificamos que exista otra medicina preventiva
                    
                        $valores = array($idConsulta, 0,$oPobRiesgo);                        
                        $dataPoblacion = $this->model->registroOPoblacionRiesgo($this->poblacionClass($valores));
                            if($dataPoblacion != 0){
                                $dataPoblacion = 1;
                            }
                    }    
                   
                    echo $idConsulta;
                }
        } else{
            echo dataConsulta;
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



 /*apartado de reportes**/
    function reporteConsultas(){  
        require 'fpdf/fpdf.php';

         $dataFilter = null;
        $total = null;
        $longitud = 0;
        $id_consultorio = $_POST["id_consultorio"];
        $fechaInicial= $_POST["fechaInicio"];
        $fechaFinal= $_POST["fechaFin"];
        $nombre_consultorio = $_POST["nombre_consultorio"];


        $random = rand(1, 300000);

        $pdf=new FPDF();
        //cabecera
        $pdf -> SetTitle('Reporte de consultas');
        $pdf->AliasNbPages();
        $pdf->SetMargins(20, 20 , 20);
        $pdf->AddPage('L');    
        $pdf->SetFont('Arial','B',14);
        // T�tulo
        $pdf->Cell(30,10,utf8_decode('Reporte semanal de consultas de '.$nombre_consultorio));
        // Salto de l�nea
        $pdf->Ln(20);
        $pdf->SetFont('Arial','B',12);    
        $pdf->SetFillColor(2,157,116);//Fondo verde de celda
        //$pdf->SetTextColor(240, 255, 240); //Letra color blanco
        $pdf->Cell(18,7, "Edad",1 );
        $pdf->Cell(160,7, "Tipo de Atenci�n",1 );
        $pdf->Cell(50,7, "Paciente de Riesgo",1);
        // $pdf->Cell(90,7, "Diagnostico");
        $pdf->Cell(30,7, "Fecha",1);
        $pdf->SetFont('Arial','',10); 
   

        $data = $this->model->getRconsultas($id_consultorio,$fechaInicial, $fechaFinal);
        if(is_array($data)){
            // echo json_encode($data);
            $array = $data["results"];
            $longitudArray = count($array);

            foreach ($array as $key => $value) {  
                if($value["id_poblacion_riesgo"] != null){
                    $poblacion_riesgo = "si";
                }else{
                    $poblacion_riesgo = "no";
                }

                $pdf->Ln();
                $pdf->Cell(18,7, $value["edad"] );
                $pdf->Cell(160,7, utf8_decode($value["nombre_tipo_atencion"]) );
                $pdf->Cell(50,7, $poblacion_riesgo);
                $pdf->Cell(30,7, $value["fecha_consulta"]);

                $dataFilter.= "<tr>".                    
                "<td>".$value["edad"]."</td>".
                "<td>".$value["nombre_tipo_atencion"]."</td>".
                "<td>".$poblacion_riesgo."</td>".
                "<td>".$value["fecha_consulta"]."</td>".                
                "</tr>";             
            }
            $longitud = strlen($dataFilter);
            // $dataFilter .= "<tr><td>longitud".$longitud."::</td></tr>";
            if($longitud == 0){
                $dataFilter .= "<tr><td>No existen consultas con tu criterio de b�squeda</td></tr>";
                echo $dataFilter;
            }else{
                $pdf->SetFont('Arial','B',14);
                $pdf->Ln(20);
                $pdf->Cell(30,10,'Total '.$longitudArray.' registros');
               // $dataFilter .= "<tr><th>Total</th><th>".$longitudArray." registros</th></tr>";
                $total .= "Total ".$longitudArray." registros";
                $dataFilter .= "<tr><td><div id='clonar'> <div class='input-field col s6'style='margin: 0rem 0rem;'>
                    <label id='Total' style='color: #000000; font-size: 1.5rem;'>".$total."</label></div><div class='input-field col s6' style='margin: 0rem 0rem;'>
                    <a href='../reporte_semanal_consultorio".$random.".pdf' download='reporte_semanal_consultorio' onclick='borraPDF()' class='btn btn-success modal-trigger'>Descargar Archivo</a></div></div></td></tr>";
                echo $dataFilter;            
            }
            $nombrePDF = 'reporte_semanal_consultorio'.$random.'.pdf';
            $pdf->Output('F',$nombrePDF, true);
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


    public function TablaBasica($header)
    {
    //Cabecera
    foreach($header as $col){
        $this->Cell(40,7,$col,1);}
        $this->Ln();
   
        $this->Cell(40,5,"hola",1);
        $this->Cell(40,5,"hola2",1);
        $this->Cell(40,5,"hola3",1);
        $this->Cell(40,5,"hola4",1);
         $this->Ln();
        $this->Cell(40,5,"linea ",1);
        $this->Cell(40,5,"linea 2",1);
        $this->Cell(40,5,"linea 3",1);
        $this->Cell(40,5,"linea 4",1);
    }






}

?>