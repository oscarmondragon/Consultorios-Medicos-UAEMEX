<?php
    require('../fpdf/fpdf.php');
    include('../Library/Conexion.php');
    include('../Library/QueryManager.php');
    //require('../Models/pdfReporte_model.php');
    new Conexion();
    $con = new QueryManager("root","","sistema_consultorios");
    /*variables*/
    $id= $_GET["id"]; 
    $fechaI= $_GET["fecha"]; 
    $fechaF= $_GET["fechaF"]; 
    $nombreC = $_GET["nomC"];
    $total = null;
    $longitud = 0;
    $random = rand(1, 300000);

    if($id == 100){
    $Select = " c.edad, ta.nombre_tipo_atencion, conpr.id_poblacion_riesgo, c.descripcion, c.fecha_consulta, con.nombre_consultorio ";
    $From ="consulta c
        Inner JOIN usuario_consultorio uc ON uc.id_usr = c.id_medico
        LEFT JOIN tipo_atencion ta ON c.id_tipo_atencion = ta.id_tipo_atencion 
        LEFT JOIN consulta_poblacion_riesgo conpr ON c.id_consulta = conpr.id_consulta 
        LEFT JOIN consultorios con ON con.id_consultorio = uc.id_consultorio";
         $where = " WHERE (c.fecha_consulta BETWEEN '".$fechaI."' and '".$fechaF."') GROUP by c.id_consulta;";
    }else{
    $Select = " c.edad, ta.nombre_tipo_atencion, conpr.id_poblacion_riesgo, c.descripcion, c.fecha_consulta ";
    $From ="consulta c
        Inner JOIN usuario_consultorio uc ON uc.id_usr = c.id_medico
        LEFT JOIN tipo_atencion ta ON c.id_tipo_atencion = ta.id_tipo_atencion 
        LEFT JOIN consulta_poblacion_riesgo conpr ON c.id_consulta = conpr.id_consulta ";
        $where = " WHERE (c.fecha_consulta BETWEEN '".$fechaI."' and '".$fechaF."') AND uc.id_consultorio = ".$id." GROUP by c.id_consulta;";
    } 

    $data = $con->select1($Select,$From, $where, null);


    $pdf = new FPDF();
    //cabecera
        $pdf -> SetTitle('Reporte de consultas');
        $pdf->AliasNbPages();
        $pdf->SetMargins(20, 20 , 20);
        $pdf->AddPage('L');    
        $pdf->SetFont('Arial','B',14);
        // T�tulo
        $pdf->Cell(30,10,utf8_decode('Reporte semanal de consultas de '.$nombreC));
        // Salto de l�nea
        $pdf->Ln(20);
        $pdf->SetFont('Arial','B',12);    
        $pdf->SetFillColor(2,157,116);//Fondo verde de celda
        //$pdf->SetTextColor(240, 255, 240); //Letra color blanco
        $pdf->Cell(13,7, "Edad",1 );
        $pdf->Cell(150,7,utf8_decode("Tipo de atención"),1);
        $pdf->Cell(20,7, "P.Riesgo",1);
         if($id == 100){
                $pdf->Cell(50,7, "Lugar Consultorio",1);
                }
        // $pdf->Cell(90,7, "Diagnostico");
        $pdf->Cell(30,7, "Fecha",1);
        $pdf->SetFont('Arial','',10); 


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
                           
                $pdf->Cell(13,7, $value["edad"],1,false );
               $pdf->Cell(150,7, utf8_decode($value["nombre_tipo_atencion"]),1,false );
               $pdf->Cell(20,7, $poblacion_riesgo,1);
                if($id == 100){
                $pdf->Cell(50,7,  utf8_decode($value["nombre_consultorio"]),1);
                }
                $pdf->Cell(30,7, $value["fecha_consulta"],1);           
            }
           
            if($longitudArray == 0){
             $pdf->SetFont('Arial','B',14);
                $pdf->Ln(20);
                $pdf->Cell(30,10,'Total '.$longitudArray.' registros');
            }else{
                $pdf->SetFont('Arial','B',14);
                $pdf->Ln(20);
                $pdf->Cell(30,10,'Total '.$longitudArray.' registros');          
            }
            $nombrePDF = 'reporte_semanal_consultorio'.$random.'.pdf';
            $pdf->Output();
        } else {
            echo $data;
        }

    $pdf->Output();

?>