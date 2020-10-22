<?php
require('../Library/Controllers.php');
class PdfReporte_model extends Conexion{
    public function __construct() {
       parent::__construct();
    }



   /*Reportes*/
  function getRconsultas($id_consultorio,$fechaInicial, $fechaFinal){
    /*SELECT c.edad, ta.nombre_tipo_atencion, conpr.id_poblacion_riesgo, c.descripcion, c.fecha_consulta 
    FROM consulta c 
    Inner JOIN usuario_consultorio uc ON uc.id_usr = c.id_medico
    LEFT JOIN tipo_atencion ta ON c.id_tipo_atencion = ta.id_tipo_atencion 
    LEFT JOIN consulta_poblacion_riesgo conpr ON c.id_consulta = conpr.id_consulta 
    WHERE (c.fecha_consulta BETWEEN '2020-08-23' and '2020-08-29') AND uc.id_consultorio = 3 GROUP by c.id_consulta*/
    $Select = " c.edad, ta.nombre_tipo_atencion, conpr.id_poblacion_riesgo, c.descripcion, c.fecha_consulta ";
    $From ="consulta c
    Inner JOIN usuario_consultorio uc ON uc.id_usr = c.id_medico
    LEFT JOIN tipo_atencion ta ON c.id_tipo_atencion = ta.id_tipo_atencion 
    LEFT JOIN consulta_poblacion_riesgo conpr ON c.id_consulta = conpr.id_consulta ";

    if($id_consultorio == 100){
         $where = " WHERE (c.fecha_consulta BETWEEN '".$fechaInicial."' and '".$fechaFinal."') GROUP by c.id_consulta;";
    }else{
        $where = " WHERE (c.fecha_consulta BETWEEN '".$fechaInicial."' and '".$fechaFinal."') AND uc.id_consultorio = ".$id_consultorio." GROUP by c.id_consulta;";
    }
    return $response = $this->db->select1($Select,$From, $where, null);
    
    
}

     
}
?>