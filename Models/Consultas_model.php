<?php
class Consultas_model extends Conexion{
    public function __construct() {
       parent::__construct();
    }

    function getConsultorios(){
        return $response = $this->db->select1("*","consultorios", "", null);
    }
    
    function consultaPoblacionRiesgo($id_consulta){
        //SELECT cpr.id_poblacion_riesgo, catpr.desc_poblacion_riesgo, cpr.observaciones 
        //FROM `consulta_poblacion_riesgo` cpr INNER JOIN `catalogo_poblacion_riesgo` catpr 
        //ON cpr.id_poblacion_riesgo = catpr.id_poblacion_riesgo WHERE cpr.id_consulta = $id_consulta
        $where = " WHERE id_consulta = ".$id_consulta;
        return $response = $this->db->select1(" cpr.id_poblacion_riesgo, catpr.desc_poblacion_riesgo, cpr.observaciones "
            ," consulta_poblacion_riesgo cpr INNER JOIN catalogo_poblacion_riesgo catpr ON cpr.id_poblacion_riesgo = catpr.id_poblacion_riesgo"
            , $where, null);
    }

    function consultaMedicinaPreventiva($id_consulta){
        /*SELECT cmp.id_medicina_preventiva, catmp.desc_medicina_preventiva, cmp.observaciones FROM consulta_medicina_preventiva cmp INNER JOIN catalogo_medicina_preventiva catmp ON cmp.id_medicina_preventiva = catmp.id_medicina_preventiva WHERE id_consulta =*/
         $where = " WHERE id_consulta = ".$id_consulta;
        return $response = $this->db->select1(" cmp.id_medicina_preventiva, catmp.desc_medicina_preventiva, cmp.observaciones "
            ," consulta_medicina_preventiva cmp LEFT JOIN catalogo_medicina_preventiva catmp ON cmp.id_medicina_preventiva = catmp.id_medicina_preventiva"
            , $where, null);
    }

    function consultaTipoAtencion($id_tipo_atencion){
        $where = " WHERE id_tipo_atencion = ".$id_tipo_atencion;
        return $response = $this->db->select1("*","tipo_atencion", $where, null);
    }

    function getTipoAtencion(){
        return $response = $this->db->select1("*","tipo_atencion", " WHERE estatus=1 AND nivel=2", null);
    }

     function getTipoAtencion2($padre){
        $where = " WHERE padre = ".$padre;
        return $response = $this->db->select1("*","tipo_atencion", $where, null);
    }

    function getconsultasDatos(){
        //$where = "";

    }
    
    function obtenerIdConsulta($consulta){
        $where = " WHERE id_paciente = :id_paciente AND  fecha_consulta = 
        :fecha_consulta AND hora_consulta = :hora_consulta";
        //buscamos el paciente anteriormente registrado para obtener su id
        $response = $this->db->select1("id_consulta",'consulta',$where,array('id_paciente' => $consulta->id_paciente,
        'fecha_consulta' => $consulta->fecha_consulta,
        'hora_consulta' => $consulta->hora_consulta));

        if(is_array($response)){
            $response = $response['results'];
            $idConsulta= $response[0]["id_consulta"];
           

            return $idConsulta;

        } else {
            return 0; // no se encontro el paciente
        }
    }


    function getPacientes($filter){
        $where = " WHERE id_paciente LIKE :id_paciente OR nombre_pac LIKE :nombre_pac
        OR apPaterno_pac LIKE :apPaterno_pac OR apMaterno_pac LIKE :apMaterno_pac";
        $array = array(
            'id_paciente' =>'%'.$filter.'%',
            'nombre_pac' => '%'.$filter.'%',
            'apPaterno_pac' => '%'.$filter.'%',
            'apMaterno_pac' => '%'.$filter.'%'
        );
        return $this->db->selectPacientes($where,$array);
    }

    function getHistorico($id_paciente){

        $where = " WHERE id_paciente = ".$id_paciente;
        return $response = $this->db->select1("*","consulta", $where, null);

    }
    function getCatalogotipoatencion($id_tipo){

        $where = " WHERE id_tipo_atencion = ".$id_tipo;
        return $response = $this->db->select1("nombre_tipo_atencion","tipo_atencion", $where, null);

    }

    function getConsulta($id_conuslta){
        $where = " WHERE id_consulta = ".$id_consulta;
        return $response = $this->db->select1("*","consulta", $where, null);

    }

    function registroConsulta($consultaRegistro
    ){
         
        $value = " (id_paciente,
        edad,
        id_tipo_atencion,
        frecuencia_cardiaca,
        frecuencia_respiratoria,
        temperatura,
        tension_arterial,
        talla,
        peso,
        descripcion,
        diagnostico,
        tratamiento,
        ambulancia,
        referenciado,
        observaciones,
        lugar_referencia,
        fecha_consulta,
        hora_consulta,
        id_medico
        ) VALUES (
        :id_paciente,
        :edad,
        :id_tipo_atencion,
        :frecuencia_cardiaca,
        :frecuencia_respiratoria,
        :temperatura,
        :tension_arterial,
        :talla,
        :peso,
        :descripcion,
        :diagnostico,
        :tratamiento,
        :ambulancia,
        :referenciado,
        :observaciones,
        :lugar_referencia,
        :fecha_consulta,
        :hora_consulta,
        :id_medico)";
        $data = $this->db->insert('consulta',$consultaRegistro,$value);
        if($data == true){
             return 0;
        } else {
            return $data;
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

     function registroOMedicinaPreventiva($medicinaPreventiva){
    //insertamos los datos a tabla consulta_poblacion_riesgoforeach ($poblacionRiesgo as &$valor) {

      $value = " (id_consulta,
       id_medicina_preventiva,observaciones 
       ) VALUES (
       :id_consulta,
       :id_medicina_preventiva,
       :observaciones
       )";
       $data = $this->db->insert('consulta_medicina_preventiva',$medicinaPreventiva,$value);
       if($data == 1){
           return 0;
       } else {
           return $data;
       }
  }


  /*Reportes*/
  function getRconsultas($id_consultorio,$fechaInicial, $fechaFinal){
    /*SELECT * FROM consulta c Inner JOIN  `usuario_consultorio` uc 
    ON uc.`id_usr` = c.id_medico 
    WHERE (c.fecha_consulta BETWEEN '2020-09-02' and '2020-09-04') AND uc.id_consultorio = 3*/ 
    $From ="consulta c Inner JOIN usuario_consultorio uc ON uc.id_usr = c.id_medico";
    $where = "WHERE (c.fecha_consulta BETWEEN '".$fechaInicial."' and '".fechaFinal."') AND uc.id_consultorio =".$id_consultorio;
    return $response = $this->db->select1("*","usuario_consultorio", $where, null);
    
    
}

     
}
?>