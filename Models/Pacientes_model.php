<?php
class Pacientes_model extends Conexion{
    public function __construct() {
       parent::__construct();
    }
    
    function getEstadoCivil(){
        return $response = $this->db->select1("*","catalogo_estado_civil", null, null);
    }
    

}
?>