<?php
    require('../fpdf/fpdf.php');
    include('../Library/Conexion.php');
    include('../Library/QueryManager.php');
    //require('../Models/pdfReporte_model.php');

    class PDF extends FPDF
{
// Cabecera de página

public $consultorio ="null";
public $usrReporte ="null";
public $fechaI ="null";
public $fechaF = "null";

function Header()
{
    // Logo
    //$this->Image('logo.png',10,8,33);
    // Arial bold 15
    $this->SetFont('Arial','B',15);
    // Movernos a la derecha
    //$this->Cell(80);
    // Título
    $this->Cell(0,0,utf8_decode('Reporte semanal de consultas médicas UAEM'),0,0,'C');
    $this->Ln(8);
    $this->Cell(0,0,utf8_decode($this->consultorio),0,0,'C');
    $this->Ln(8);
    $this->Cell(0,0,$this->fechaI." al ".$this->fechaF,0,0,'C');
   //  $this->Cell(0,0,utf8_decode('Reporte semanal de consultas médicas UAEM'),0,0,'C');
    // Salto de línea
    $this->Ln(20);
}

public function set($usuario,$consultorioP,$fechaIP,$fechaFP){
    $this->usrReporte = $usuario;
    $this->consultorio = $consultorioP;
    $this->fechaI = $fechaIP;
    $this->fechaF = $fechaFP;

}


// Pie de página
function Footer()
{   
    $hoy = date("Y-m-d H:i:s"); 
    //$fechaactual = getdate();
    //print_r($fechaactual);
    // Posición: a 1,5 cm del final
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Número de página
     $this->Cell(85,10,''.$hoy,0,0,'L');
    $this->Cell(85,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');   
    $this->Cell(85,10,''.$this->usrReporte,0,0,'R');
}

    var $widths;
    var $aligns;

function SetWidths($w){//Set the array of column widths
    $this->widths=$w;
}

function SetAligns($a){//Set the array of column alignments
    $this->aligns=$a;
}

function fill($f){//juego de arreglos de relleno
    $this->fill=$f;
}

function Row($data){//Calculate the height of the row
    $nb=0;
    for($i=0;$i<count($data);$i++)
        $nb=max($nb,$this->NbLines($this->widths[$i],$data[$i]));
        $h=5*$nb;
        //Issue a page break first if needed
        $this->CheckPageBreak($h);
        //Draw the cells of the row
        for($i=0;$i<count($data);$i++){
            $w=$this->widths[$i];
            $a=isset($this->aligns[$i]) ? $this->aligns[$i] : ‘L’;
            //Save the current position
            $x=$this->GetX();
            $y=$this->GetY();
            //Draw the border
            $this->Rect($x,$y,$w,$h,$style);
            //Print the text
            $this->MultiCell($w,5,$data[$i],’LTR’,$a,$fill);
            //Put the position to the right of the cell
            $this->SetXY($x+$w,$y);
        }
        //Go to the next line
        $this->Ln($h);

}

function CheckPageBreak($h){//If the height h would cause an overflow, add a new page immediately
    if($this->GetY()+$h>$this->PageBreakTrigger)
        $this->AddPage($this->CurOrientation);
}

function NbLines($w,$txt){//Computes the number of lines a MultiCell of width w will take
    $cw=&$this->CurrentFont[‘cw’];
    if($w==0)
        $w=$this->w-$this->rMargin-$this->x;
$wmax=($w-2*$this->cMargin)*1000/$this->FontSize;

$s=str_replace(“\r”,”,$txt);

$nb=strlen($s);

if($nb>0 and $s[$nb-1]==”\n”)

$nb–;

$sep=-1;

$i=0;

$j=0;

$l=0;

$nl=1;

while($i<$nb)

{

$c=$s[$i];

if($c==”\n”)

{

$i++;

$sep=-1;

$j=$i;

$l=0;

$nl++;

continue;

}

if($c=="")

$sep=$i;

$l+=$cw[$c];

if($l>$wmax)

{

if($sep==-1)

{

if($i==$j)

$i++;

}

else

$i=$sep+1;

$sep=-1;

$j=$i;

$l=0;

$nl++;

}

else

$i++;

}

return $nl;

}



}

    new Conexion();
    $con = new QueryManager("root","","sistema_consultorios");
    /*variables*/
    $id= $_GET["id"]; 
    $fechaI= $_GET["fecha"]; 
    $fechaF= $_GET["fechaF"]; 
    $nombreC = $_GET["nomC"];
    $nombreU =$_GET["nomU"];
    $total = null;
    $longitud = 0;
    $random = rand(1, 300000);

    if($id == 100){
   /* $Select = " c.edad, ta.nombre_tipo_atencion, conpr.id_poblacion_riesgo, c.descripcion, c.fecha_consulta, con.nombre_consultorio ";
    $From ="consulta c
        Inner JOIN usuario_consultorio uc ON uc.id_usr = c.id_medico
        LEFT JOIN tipo_atencion ta ON c.id_tipo_atencion = ta.id_tipo_atencion 
        LEFT JOIN consulta_poblacion_riesgo conpr ON c.id_consulta = conpr.id_consulta 
        LEFT JOIN consultorios con ON con.id_consultorio = uc.id_consultorio
        LEFT JOIN centro_costos cc ON cc.id_centro_costos = con.id_centro_costo ";
         $where = " WHERE (c.fecha_consulta BETWEEN '".$fechaI."' and '".$fechaF."') GROUP by c.id_consulta;";
         */
        $Select = " con.id_centro_costo, cc.des_centro_costos, con.nombre_consultorio, count(con.id_consultorio) ";
        $From ="consultorios con
            INNER JOIN centro_costos cc on cc.id_centro_costos = con.id_centro_costo
            LEFT JOIN usuario_consultorio uc on uc.id_usr = con.id_consultorio
            LEFT join consulta c on uc.id_usr = c.id_medico ";
        $where = " WHERE (c.fecha_consulta BETWEEN '".$fechaI."' and '".$fechaF."') GROUP by con.id_consultorio;";

        $Select2 = " cons.id_centro_costo, cc.des_centro_costos, cons.nombre_consultorio ";
        $From2 =" consultorios cons LEFT join centro_costos cc on cons.id_centro_costo= cc.id_centro_costos ";
        $where2 = "where cons.id_centro_costo NOT IN (SELECT con.id_centro_costo FROM consultorios con
LEFT JOIN usuario_consultorio uc on uc.id_usr = con.id_consultorio
LEFT join consulta c on uc.id_usr = c.id_medico 
            WHERE c.fecha_consulta BETWEEN '".$fechaI."' and '".$fechaF."' GROUP by con.id_consultorio);";


    }else{
        $Select = " con.id_centro_costo, cc.des_centro_costos, con.nombre_consultorio, count(con.id_consultorio) ";
        $From ="consultorios con
            INNER JOIN centro_costos cc on cc.id_centro_costos = con.id_centro_costo
            LEFT JOIN usuario_consultorio uc on uc.id_usr = con.id_consultorio
            LEFT join consulta c on uc.id_usr = c.id_medico ";
        $where = " WHERE (c.fecha_consulta BETWEEN '".$fechaI."' and '".$fechaF."') and con.id_consultorio = ".$id." GROUP by con.id_consultorio;";

        
    } 

    $data = $con->select1($Select,$From, $where, null);
     //$data2 = $con->select1($Select2,$From2, $where2, null);


    $pdf = new PDF();

    $pdf->set($nombreU,$nombreC, $fechaI,$fechaF);
    //cabecera
        $pdf -> SetTitle('Reporte de consultas');
        $pdf->SetAutoPageBreak(true, 30);
        $pdf->AliasNbPages();
        $pdf->SetMargins(20, 20 , 20);
        $pdf->AddPage('L');  
        $pdf->SetFont('Arial','B',12);    
        $pdf->SetFillColor(2,157,116);//Fondo verde de celda
        //$pdf->SetTextColor(240, 255, 240); //Letra color blanco
        //$pdf->GetY();
        $pdf->Cell(27,7, "No. Espacio",'T' );
        $pdf->Cell(95,7,utf8_decode("Nombre Espacio"),'T');
        $pdf->Cell(95,7, "Nombre consultorio",'T');
       /* if($id == 100){
                $pdf->Cell(100,7, "Total de consultas",1);
                }*/
        $pdf->Cell(37,7, "Total de consultas",'T');
        $pdf->SetFont('Arial','',10); 


        if(is_array($data)){
            // echo json_encode($data);
            $array = $data["results"];
            $longitudArray = count($array);
            $cx = 20;
            $cy = 0;

            foreach ($array as $key => $value) {        

                $pdf->Ln();
                $cx = 20;
                $cy= $pdf->Gety();
                if($cy > 170){
                   $cy =63;
                    $pdf->AddPage('L');}
                if(strlen($value["des_centro_costos"])>45){
                    //$cy = $cy+7;
                    $pdf->MultiCell(27,7, $value["id_centro_costo"],'T',false );
                    $cx = 47;
                    $pdf->SetXY($cx,$cy);
                    $pdf->MultiCell(95,7, utf8_decode($value["des_centro_costos"]),'T',false );
                    $cx = 142;
                    $pdf->SetXY($cx,$cy);
                    $pdf->MultiCell(95,7,  utf8_decode($value["nombre_consultorio"]),'T',false);
                    $cx = 237;
                    $pdf->SetXY($cx,$cy);
                    $pdf->MultiCell(37,7, $value["count(con.id_consultorio)"],'T');  
                  //  $cy =$cy+7;
                }else{
                    $pdf->Cell(27,7, $value["id_centro_costo"],'T',false );
                    $pdf->Cell(95,7, utf8_decode($value["des_centro_costos"]),'T',false );
                    $pdf->Cell(95,7,  utf8_decode($value["nombre_consultorio"]),'T',false);                   
                    $pdf->Cell(37,7, $value["count(con.id_consultorio)"],'T');  
                    $cy =$cy+7;
                }
                if($cy > 180){
                    $pdf->Ln(5);
                }
            }
            
            if($id == 100){
             $data2 = $con->select1($Select2,$From2, $where2, null);
            if(is_array($data2)){
                // echo json_encode($data);
                $array2 = $data2["results"];
                foreach ($array2 as $key => $value2) {  
                    $pdf->Ln();
                    $cx = 20;
                    $cy= $pdf->Gety(); 
                    if($cy > 170){
                   $cy =63;
                    $pdf->AddPage('L');}
                    
                    if(strlen($value2["des_centro_costos"])>45){
                    //$cy =$cy +14;
                     $pdf->SetXY($cx,$cy);
                        $pdf->MultiCell(27,7, $value2["id_centro_costo"],'T',false );
                        $cx = 47;
                        $pdf->SetXY($cx,$cy);
                        $pdf->MultiCell(95,7, utf8_decode($value2["des_centro_costos"]),'T',false );
                        $cx = 142;
                        $pdf->SetXY($cx,$cy);
                        $pdf->MultiCell(95,7, utf8_decode($value2["nombre_consultorio"]),'T',false);
                        $cx = 237;
                        $pdf->SetXY($cx,$cy);
                        $pdf->MultiCell(37,7, 0,'T');  
                        $cy =$cy+7;
                    }else{
                     //$cy =$cy +7;
                     //$pdf->SetXY($cx,$cy);
                        $pdf->Cell(27,7, $value2["id_centro_costo"],'T',false );
                        $pdf->Cell(95,7, utf8_decode($value2["des_centro_costos"]),'T',false );
                        $pdf->Cell(95,7,  utf8_decode($value2["nombre_consultorio"]),'T',false);                   
                        $pdf->Cell(37,7, "0",'T');  
                        $cy =$cy+7;
                    }
                   // $cy =$cy+7;
                   
                
                }

            }else{
            $pdf->Ln(20);
                 $pdf->MultiCell(30,10,'Nada'.$data2);
            }
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