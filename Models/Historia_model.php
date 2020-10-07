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

    function registroHistoria($historiaClinica
    ){
        $where = " WHERE nombre_hc = :nombre_hc AND  apPaterno_hc = 
        :apPaterno_hc AND apMaterno_hc = :apMaterno_hc AND fecNac_hc = :fecNac_hc";
      
        $response = $this->db->select1("*",'historial_clinico',$where,array('nombre_hc' => $historiaClinica->nombre_hc,
        'apPaterno_hc' => $historiaClinica->apPaterno_hc,
        'apMaterno_hc' => $historiaClinica->apMaterno_hc,
        'fecNac_hc' => $historiaClinica->fecNac_hc));

        if(is_array($response)){
            $response = $response['results'];
            if(count($response)===0){ // si es true el historial clinico no se ha registrado antes
               $value = " (id_paciente,
               unidad_medica,
               num_expediente,
               fec_elaboracion,
               hra_elaboracion,
               nombre_hc,
               apPaterno_hc,
               apMaterno_hc,
               fecNac_hc,
               sexo_hc,
               otro_sexo_hc,
               tipo_paciente,
               id_centro_costos,
               identificador_uaem,
               domicilio,
               nombre_padre_tutor,
               parentesco,
               contacto_emergencia,
               tel_contacto_emergencia,
               parentesco_contacto_emergencia,
               ant_heredo_familiares,
               ant_personalesNO_pat,
               ant_pesonales_pat,
               ant_gineco_obs,
               padecimiento_actual,
               ipas_cardiovascular,
               ipas_respiratorio,
               ipas_gastrointestinal,
               ipas_genitourinario,
               ipas_hematico_linfatico,
               ipas_endocrino,
               ipas_nervioso,
               ipas_musculoesqueletico,
               ipas_piel_mucosas,
               fc,
               fr,
               temperatura,
               ta,
               saturacion,
               peso,
               talla,
               ef_habitus_ext,
               ef_cabeza,
               ef_cuello,
               ef_torax,
               ef_abdomen,
               ef_genitales,
               ef_extremidades,
               ef_piel,
               resultados,
               diagnostico,
               pronostico,
               id_usuario_consultorio) VALUES (
                :id_paciente,
                :unidad_medica,
                :num_expediente,
                :fec_elaboracion,
                :hra_elaboracion,
                :nombre_hc,
                :apPaterno_hc,
                :apMaterno_hc,
                :fecNac_hc,
                :sexo_hc,
                :otro_sexo_hc,
                :tipo_paciente,
                :id_centro_costos,
                :identificador_uaem,
                :domicilio,
                :nombre_padre_tutor,
                :parentesco,
                :contacto_emergencia,
                :tel_contacto_emergencia,
                :parentesco_contacto_emergencia,
                :ant_heredo_familiares,
                :ant_personalesNO_pat,
                :ant_pesonales_pat,
                :ant_gineco_obs,
                :padecimiento_actual,
                :ipas_cardiovascular,
                :ipas_respiratorio,
                :ipas_gastrointestinal,
                :ipas_genitourinario,
                :ipas_hematico_linfatico,
                :ipas_endocrino,
                :ipas_nervioso,
                :ipas_musculoesqueletico,
                :ipas_piel_mucosas,
                :fc,
                :fr,
                :temperatura,
                :ta,
                :saturacion,
                :peso,
                :talla,
                :ef_habitus_ext,
                :ef_cabeza,
                :ef_cuello,
                :ef_torax,
                :ef_abdomen,
                :ef_genitales,
                :ef_extremidades,
                :ef_piel,
                :resultados,
                :diagnostico,
                :pronostico,
                :id_usuario_consultorio
                )";
                $data = $this->db->insert('historial_clinico',$historiaClinica,$value);
            if($data == true){
                return 0;
            } else {
                return $data;
            }
               
            } else {
                return 1;//indica que ya esta registrado la historia clinica
            }
        }  else {
            return $response;
        }
    }
    
    function getHistoriasClinicas($filter){
        $where = " WHERE id_historial_clinico  LIKE :id_historial_clinico  OR nombre_hc LIKE :nombre_hc
        OR apPaterno_hc LIKE :apPaterno_hc OR apMaterno_hc LIKE :apMaterno_hc OR num_expediente LIKE :num_expediente";
        $array = array(
            'id_historial_clinico' =>'%'.$filter.'%',
            'nombre_hc' => '%'.$filter.'%',
            'apPaterno_hc' => '%'.$filter.'%',
            'apMaterno_hc' => '%'.$filter.'%',
            'num_expediente' => '%'.$filter.'%'
        );

        return $this->db->selectHistoriasClinicas($where,$array);

    }

    function ultimoIdHistoria(){
        
       //buscamos el paciente anteriormente registrado para obtener su id
        $response = $this->db->selectLastId();

        return $response;

    }

}
?>