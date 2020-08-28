<?php
class Anonymous {

   public function pacienteClass($array){
       return new class($array){
        public $nombre_pac;
        public $apPaterno_pac;
        public $apMaterno_pac;
        public $fecha_nacimiento_pac;
        public $sexo_pac;
        public $otro_sexo_pac;
        public $tel_cel_pac;
        public $id_estado_civil;
        public $id_centro_costos;
        public $id_tipo_paciente;
        public $nivel_academico;
        public $departamento;
        public $fecha_alta_pac;
        public $id_usuario_consultorio;
        public function __construct($array) {
                    $this->nombre_pac = $array[0];
                    $this->apPaterno_pac = $array[1];
                    $this->apMaterno_pac = $array[2];
                    $this->fecha_nacimiento_pac = $array[3];
                    $this->sexo_pac =$array[4] ;
                    $this->otro_sexo_pac = $array[5] ;
                    $this->tel_cel_pac = $array[6] ;
                    $this->id_estado_civil = $array[7] ;
                    $this->id_centro_costos = $array[8] ;
                    $this->id_tipo_paciente =$array[9];
                    $this->nivel_academico =$array[10];
                    $this->departamento = $array[11] ;
                    $this->fecha_alta_pac = $array[12] ;
                    $this->id_usuario_consultorio = $array[13] ;
        }
       };
   }

   public function consultaClass($array){
    return new class($array){
     public $id_paciente;
     public $edad;
     public $id_tipo_atencion;
     public $frecuencia_cardiaca;
     public $frecuencia_respiratoria;
     public $temperatura;
     public $tension_arterial;
     public $talla;
     public $peso;
     public $descripcion;
     public $diagnostico;
     public $tratamiento;
     public $ambulancia;
     public $referenciado;
     public $observaciones;
     public $lugar_referencia;
     public $fecha_consulta;
     public $hora_consulta;
     public $id_medico;



     public function __construct($array) {
                 $this->id_paciente = $array[0];
                 $this->edad = $array[1];
                 $this->id_tipo_atencion = $array[2];
                 $this->frecuencia_cardiaca = $array[3];
                 $this->frecuencia_respiratoria = $array[4] ;
                 $this->temperatura =$array[5] ;
                 $this->tension_arterial = $array[6] ;
                 $this->talla = $array[7] ;
                 $this->peso = $array[8] ;
                 $this->descripcion = $array[9] ;
                 $this->diagnostico =$array[10];
                 $this->tratamiento = $array[11] ;
                 $this->ambulancia = $array[12] ;
                 $this->referenciado = $array[13] ;
                 $this->observaciones = $array[14] ;
                 $this->lugar_referencia = $array[15] ;
                 $this->fecha_consulta = $array[16] ;
                 $this->hora_consulta = $array[17] ;
                 $this->id_medico = $array[18] ;

     }
    };
}

public function poblacionClass($array){
    return new class($array){
     public $id_consulta;
     public $id_poblacion_riesgo;

     public function __construct($array) {
                 $this->id_consulta = $array[0];
                 $this->id_poblacion_riesgo = $array[1];
     }
    };
}

public function medicinaClass($array){
    return new class($array){
     public $id_consulta;
     public $id_medicina_preventiva;
     public $observaciones;

     public function __construct($array) {
                 $this->id_consulta = $array[0];
                 $this->id_medicina_preventiva = $array[1];
                 $this->observaciones = $array[2];
     }
    };
}

}

?>