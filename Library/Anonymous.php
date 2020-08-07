<?php
class Anonymous {

   public function pacienteClass($array){
       return new class($array){
        public $nombre_pac;
        public $apPaterno_pac;
        public $apMaterno_pac;
        public $fecha_nacimiento_pac;
        public $tel_cel_pac;
        public $sexo_pac;
        public $otro_sexo_pac;
        public $id_estado_civil;
        public $departamento;
        public $id_centro_costos;
        public $id_tipo_paciente;
        public $fecha_alta_pac;
        public $id_usuario_consultorio;
        public function __construct($array) {
                    $this->nombre_pac = $array[0];
                    $this->apPaterno_pac = $array[1];
                    $this->apMaterno_pac = $array[2];
                    $this->fecha_nacimiento_pac = $array[3];
                    $this->tel_cel_pac = $array[4] ;
                    $this->sexo_pac =$array[5] ;
                    $this->otro_sexo_pac = $array[6] ;
                    $this->id_estado_civil = $array[7] ;
                    $this->departamento = $array[8] ;
                    $this->id_centro_costos = $array[9] ;
                    $this->id_tipo_paciente =$array[10];
                    $this->fecha_alta_pac = $array[11] ;
                    $this->id_usuario_consultorio = $array[12] ;
        }
       };
   }
}

?>