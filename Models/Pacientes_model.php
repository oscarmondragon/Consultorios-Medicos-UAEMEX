<?php
class Pacientes_model extends Conexion{
    public function __construct() {
       parent::__construct();
    }
    
    function getEstadoCivil(){
        return $response = $this->db->select1("*","catalogo_estado_civil", null, null);
    }
    function getCentroCostos(){
        $where = " WHERE subnivel = 0 AND  estatus = 1";

        return $response = $this->db->select1("*","centro_costos", $where, null);
    }
    function getTipoPaciente(){
        return $response = $this->db->select1("*","tipo_paciente", null, null);
    }


    function registroPaciente($paciente
    ){
        $where = " WHERE nombre_pac = :nombre_pac AND  apPaterno_pac = 
        :apPaterno_pac AND apMaterno_pac = :apMaterno_pac AND fecha_nacimiento_pac = :fecha_nacimiento_pac";
      
        $response = $this->db->select1("*",'paciente',$where,array('nombre_pac' => $paciente->nombre_pac,
        'apPaterno_pac' => $paciente->apPaterno_pac,
        'apMaterno_pac' => $paciente->apMaterno_pac,
        'fecha_nacimiento_pac' => $paciente->fecha_nacimiento_pac));

        if(is_array($response)){
            $response = $response['results'];
            if(count($response)===0){ // si es true el telefono no esta registrado
               $value = " (nombre_pac,
                apPaterno_pac,
                apMaterno_pac,
                fecha_nacimiento_pac,
                sexo_pac,
                otro_sexo_pac,
                tel_cel_pac,
                id_estado_civil,
                id_centro_costos,
                id_tipo_paciente,
                nivel_academico,
                departamento,
                fecha_alta_pac,
                id_usuario_consultorio) VALUES (
                :nombre_pac,
                :apPaterno_pac,
                :apMaterno_pac,
                :fecha_nacimiento_pac,
                :sexo_pac,
                :otro_sexo_pac,
                :tel_cel_pac,
                :id_estado_civil,
                :id_centro_costos,
                :id_tipo_paciente,
                :nivel_academico,
                :departamento,
                :fecha_alta_pac,
                :id_usuario_consultorio)";
                $data = $this->db->insert('paciente',$paciente,$value);
            if($data == true){
                return 0;
            } else {
                return $data;
            }
               
            } else {
                return 1;//indica que ya esta registrado el telefono
            }
        }  else {
            return $response;
        }
    }

    

    function obtenerIdPaciente($consulta){
        $where = " WHERE nombre_pac = :nombre_pac AND  apPaterno_pac = 
        :apPaterno_pac AND apMaterno_pac = :apMaterno_pac AND fecha_nacimiento_pac = :fecha_nacimiento_pac";
       //buscamos el paciente anteriormente registrado para obtener su id
        $response = $this->db->select1("id_paciente",'paciente',$where,array('nombre_pac' => $consulta->nombre_pac,
        'apPaterno_pac' => $consulta->apPaterno_pac,
        'apMaterno_pac' => $consulta->apMaterno_pac,
        'fecha_nacimiento_pac' => $consulta->fecha_nacimiento_pac));

        if(is_array($response)){
            $response = $response['results'];
            $idPaciente= $response[0]["id_paciente"];
           
            return $idPaciente;

        } else {
            return 0; // no se encontro el paciente
        }

       

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
       id_medicina_preventiva,
       observaciones
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
    

}
?>