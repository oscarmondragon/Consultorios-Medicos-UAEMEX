<?php
class Historia_model extends Conexion{
    public function __construct() {
       parent::__construct();
    }
    
    function getCoincidenciasPac($nombre, $paterno,$materno, $fechaNac){
        $where = " WHERE nombre_pac = :nombre_pac AND apPaterno_pac = :apPaterno_pac 
        AND apMaterno_pac = :apMaterno_pac AND fecha_nacimiento_pac = :fecha_nacimiento_pac";
        $array = array(
            'nombre_pac' => $nombre,
            'apPaterno_pac' => $paterno,
            'apMaterno_pac' => $materno,
            'fecha_nacimiento_pac' => $fechaNac
        );

        return $this->db->selectPacientes($where,$array);

    }
    

}
?>