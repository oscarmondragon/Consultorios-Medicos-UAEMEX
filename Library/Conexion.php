<?php
class Conexion {
    public function __construct() {
       $this->db = new QueryManager("root","","sistema_consultorios");
    }
}


?>