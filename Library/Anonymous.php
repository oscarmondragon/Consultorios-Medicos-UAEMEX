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
     public $saturacion;
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
                 $this->saturacion = $array[7];
                 $this->talla = $array[8] ;
                 $this->peso = $array[9] ;
                 $this->descripcion = $array[10] ;
                 $this->diagnostico =$array[11];
                 $this->tratamiento = $array[12] ;
                 $this->ambulancia = $array[13] ;
                 $this->referenciado = $array[14] ;
                 $this->observaciones = $array[15] ;
                 $this->lugar_referencia = $array[16] ;
                 $this->fecha_consulta = $array[17] ;
                 $this->hora_consulta = $array[18] ;
                 $this->id_medico = $array[19] ;

     }
    };
}

public function poblacionClass($array){
    return new class($array){
     public $id_consulta;
     public $id_poblacion_riesgo;
     public $observaciones;

     public function __construct($array) {
                 $this->id_consulta = $array[0];
                 $this->id_poblacion_riesgo = $array[1];
                 $this->observaciones =  $array[2];
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

public function omedicinaClass($array){
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

public function historiaClass($array){
    return new class($array){
     public $id_paciente;
     public $unidad_medica;
     public $num_expediente;
     public $fec_elaboracion;
     public $hra_elaboracion;
     public $nombre_hc;
     public $apPaterno_hc;
     public $apMaterno_hc;
     public $fecNac_hc;
     public $sexo_hc;
     public $otro_sexo_hc;
     public $tipo_paciente;
     public $id_centro_costos;
     public $identificador_uaem;
     public $domicilio;
     public $nombre_padre_tutor;
     public $parentesco;
     public $contacto_emergencia;
     public $tel_contacto_emergencia;
     public $parentesco_contacto_emergencia;
     public $ant_heredo_familiares;
     public $ant_personalesNO_pat;
     public $ant_pesonales_pat;
     public $ant_gineco_obs;
     public $padecimiento_actual;
     public $ipas_cardiovascular;
     public $ipas_respiratorio;
     public $ipas_gastrointestinal;
     public $ipas_genitourinario;
     public $ipas_hematico_linfatico;
     public $ipas_endocrino;
     public $ipas_nervioso;
     public $ipas_musculoesqueletico;
     public $ipas_piel_mucosas;
     public $fc;
     public $fr;
     public $temperatura;
     public $ta;
     public $saturacion;
     public $peso;
     public $talla;
     public $ef_habitus_ext;
     public $ef_cabeza;
     public $ef_cuello;
     public $ef_torax;
     public $ef_abdomen;
     public $ef_genitales;
     public $ef_extremidades;
     public $ef_piel;
     public $resultados;
     public $diagnostico;
     public $pronostico;
     public $id_usuario_consultorio;


     public function __construct($array) {
                 $this->id_paciente = $array[0];
                 $this->unidad_medica = $array[1];
                 $this->num_expediente = $array[2];
                 $this->fec_elaboracion = $array[3];
                 $this->hra_elaboracion =$array[4] ;
                 $this->nombre_hc = $array[5] ;
                 $this->apPaterno_hc = $array[6] ;
                 $this->apMaterno_hc = $array[7] ;
                 $this->fecNac_hc = $array[8] ;
                 $this->sexo_hc =$array[9];
                 $this->otro_sexo_hc =$array[10];
                 $this->tipo_paciente = $array[11] ;
                 $this->id_centro_costos = $array[12] ;
                 $this->identificador_uaem = $array[13] ;
                 $this->domicilio = $array[14] ;
                 $this->nombre_padre_tutor = $array[15] ;
                 $this->parentesco = $array[16] ;
                 $this->contacto_emergencia = $array[17] ;
                 $this->tel_contacto_emergencia = $array[18] ;
                 $this->parentesco_contacto_emergencia = $array[19] ;
                 $this->ant_heredo_familiares = $array[20] ;
                 $this->ant_personalesNO_pat = $array[21] ;
                 $this->ant_pesonales_pat = $array[22] ;
                 $this->ant_gineco_obs = $array[23] ;
                 $this->padecimiento_actual = $array[24] ;
                 $this->ipas_cardiovascular = $array[25] ;
                 $this->ipas_respiratorio = $array[26] ;
                 $this->ipas_gastrointestinal = $array[27] ;
                 $this->ipas_genitourinario = $array[28] ;
                 $this->ipas_hematico_linfatico = $array[29] ;
                 $this->ipas_endocrino = $array[30] ;
                 $this->ipas_nervioso = $array[31] ;
                 $this->ipas_musculoesqueletico = $array[32] ;
                 $this->ipas_piel_mucosas = $array[33] ;
                 $this->fc = $array[34] ;
                 $this->fr = $array[35] ;
                 $this->temperatura = $array[36] ;
                 $this->ta = $array[37] ;
                 $this->saturacion = $array[38] ;
                 $this->peso = $array[39] ;
                 $this->talla = $array[40] ;
                 $this->ef_habitus_ext = $array[41] ;
                 $this->ef_cabeza = $array[42] ;
                 $this->ef_cuello = $array[43] ;
                 $this->ef_torax = $array[44] ;
                 $this->ef_abdomen = $array[45] ;
                 $this->ef_genitales = $array[46] ;
                 $this->ef_extremidades = $array[47] ;
                 $this->ef_piel = $array[48] ;
                 $this->resultados = $array[49] ;
                 $this->diagnostico = $array[50] ;
                 $this->pronostico = $array[51] ;
                 $this->id_usuario_consultorio = $array[52] ;
                 
     }
    };
}

}

?>