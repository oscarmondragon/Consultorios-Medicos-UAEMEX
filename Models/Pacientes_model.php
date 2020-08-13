<?php
class Pacientes_model extends Conexion{
    public function __construct() {
       parent::__construct();
    }
    
    function getEstadoCivil(){
        return $response = $this->db->select1("*","catalogo_estado_civil", null, null);
    }
    function getCentroCostos(){
        return $response = $this->db->select1("*","centro_costos", null, null);
    }
    function getTipoPaciente(){
        return $response = $this->db->select1("*","tipo_paciente", null, null);
    }


    function registroPaciente($paciente
    ){
        $where = " WHERE tel_cel_pac = :tel_cel_pac";
    
        $response = $this->db->select1("*",'paciente',$where,array('tel_cel_pac' => $paciente->tel_cel_pac));
        if(is_array($response)){
            $response = $response['results'];
            if(count($response)===0){ // si es true el telefono no esta registrado
               $value = " (nombre_pac,
                apPaterno_pac,
                apMaterno_pac,
                fecha_nacimiento_pac,
                tel_cel_pac,
                sexo_pac,
                otro_sexo_pac,
                id_estado_civil,
                departamento,
                id_centro_costos,
                id_tipo_paciente,
                fecha_alta_pac,
                id_usuario_consultorio) VALUES (
                :nombre_pac,
                :apPaterno_pac,
                :apMaterno_pac,
                :fecha_nacimiento_pac,
                :tel_cel_pac,
                :sexo_pac,
                :otro_sexo_pac,
                :id_estado_civil,
                :departamento,
                :id_centro_costos,
                :id_tipo_paciente,
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