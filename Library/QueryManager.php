<?php
class QueryManager {
    private $pdo;
    public function __construct($USER,$PASS,$DB) {
        try {
            $this->pdo = new PDO('mysql:host=localhost;dbname='.$DB.
            ';charset=utf8',$USER,$PASS, [
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]
        );
        } catch (PDOException $e) {
            print "¡Error!: ".$e->getMessage();
            die();
           
        }
    }

    function select1($attr,$table,$where,$param){
        try {
            $where = $where ?? "";
            $query = "SELECT ".$attr." FROM ".$table.$where;

            $sth = $this->pdo->prepare($query);
            $sth->execute($param);    
            $response = $sth->fetchAll(PDO::FETCH_ASSOC); // ARREGLO DE LOS ELEMENTOS QUE OBTENEMOS DE LA TABLA   
            return array("results" => $response);
        } catch (PDOException $e) {
            return $e->getMessage();
            //throw $th;
        }
        $pdo = null; // cerrar la conexion
    }
    //selecciona los atributos id_paciente,nombre_pac,apPaterno_pac, apMaterno_pac,tel_cel_pac,id_centro_costos,id_tipo_paciente de los pacientes
    function selectPacientes($where,$param){
        try {
            $where = $where ?? "";
            $query = "SELECT pac.id_paciente,pac.nombre_pac,pac.apPaterno_pac, pac.apMaterno_pac,
            pac.fecha_nacimiento_pac,pac.sexo_pac, pac.otro_sexo_pac, pac.tel_cel_pac,
            pac.id_estado_civil,(select des_centro_costos FROM centro_costos centro where pac.id_centro_costos = centro.id_centro_costos) AS des_centro_costos,
            (select tipo FROM tipo_paciente tipo_pac where pac.id_tipo_paciente = tipo_pac.id_tipo_paciente) AS tipo, pac.departamento FROM paciente pac".$where;
            $sth = $this->pdo->prepare($query);
            $sth->execute($param);    
            $response = $sth->fetchAll(PDO::FETCH_ASSOC); // ARREGLO DE LOS ELEMENTOS QUE OBTENEMOS DE LA TABLA   
            return array("results" => $response);
        } catch (PDOException $e) {
            return $e->getMessage();
            //throw $th;
        }
        $pdo = null; // cerrar la conexion
    }

    function selectHistoriasClinicas($where,$param){
        try {
            $where = $where ?? "";
            $query = "SELECT his.id_historial_clinico, his.id_paciente,his.unidad_medica,his.num_expediente,his.nombre_hc,his.apPaterno_hc, his.apMaterno_hc, his.fecNac_hc,
            his.sexo_hc, his.otro_sexo_hc, his.tipo_paciente, his.id_centro_costos, his.domicilio,
            his.nombre_padre_tutor, his.parentesco, his.contacto_emergencia, his.tel_contacto_emergencia,
            his.parentesco_contacto_emergencia, his.ant_heredo_familiares, his.ant_personalesNO_pat, his.ant_pesonales_pat,
            his.ant_gineco_obs, his.padecimiento_actual, his.ipas_cardiovascular, his.ipas_respiratorio,
            his.ipas_gastrointestinal, his.ipas_genitourinario, his.ipas_hematico_linfatico, his.ipas_endocrino,
            his.ipas_nervioso, his.ipas_musculoesqueletico, his.ipas_piel_mucosas, his.fc, his.fr,
            his.temperatura, his.ta, his.saturacion, his.peso, his.talla, his.ef_habitus_ext,
            his.ef_cabeza, his.ef_cuello, his.ef_torax, his.ef_abdomen, his.ef_genitales, his.ef_extremidades,
            his.ef_piel, his.resultados, his.diagnostico, his.pronostico, (select des_centro_costos FROM centro_costos centro where his.id_centro_costos = centro.id_centro_costos) AS des_centro_costos,
            (select tipo FROM tipo_paciente tipo_pac where his.tipo_paciente = tipo_pac.id_tipo_paciente) AS tipo FROM historial_clinico his".$where;
            $sth = $this->pdo->prepare($query);
            $sth->execute($param);    
            $response = $sth->fetchAll(PDO::FETCH_ASSOC); // ARREGLO DE LOS ELEMENTOS QUE OBTENEMOS DE LA TABLA   
            return array("results" => $response);
        } catch (PDOException $e) {
            return $e->getMessage();
            //throw $th;
        }
        $pdo = null; // cerrar la conexion
    }

    
    function insert($table,$param,$value){
        try {
            $query = "INSERT INTO ".$table.$value;
            $sth = $this->pdo->prepare($query);
            $sth->execute((array)$param);
            return true;
        } catch (PDOException $e) {
            //throw $th;
            return $e->getMessage();
        }
        $pdo = null; // cerrar la conexion
    }

    //Funcion para obtener datos del Usuario, para la interfaz principal
    function selectDatosUsuario($where,$param){
        try {
            $where = $where ?? "";
            $query = "SELECT usuario.id_usr,usuario.nombre_usr,usuario.apPaterno_usr,usuario.apMaterno_usr,consultorios.id_consultorio, consultorios.nombre_consultorio, tipo_usuario.descripcion FROM usuario,usuario_consultorio,consultorios,tipo_usuario".$where;
            $sth = $this->pdo->prepare($query);
            $sth->execute($param);    
            $response = $sth->fetchAll(PDO::FETCH_ASSOC); // ARREGLO DE LOS ELEMENTOS QUE OBTENEMOS DE LA TABLA   
            return array("results" => $response);
        } catch (PDOException $e) {
            return $e->getMessage();
            //throw $th;
        }
        $pdo = null; // cerrar la conexion
    }

   function selectLastId(){
    try {
        
        $query = "SELECT MAX(id_historial_clinico ) AS id FROM historial_clinico";
        $sth = $this->pdo->prepare($query);
        $sth->execute();    
        $response = $sth->fetchAll(PDO::FETCH_ASSOC); // ARREGLO DE LOS ELEMENTOS QUE OBTENEMOS DE LA TABLA   
        return array("results" => $response);
    } catch (PDOException $e) {
        return $e->getMessage();
        //throw $th;
    }
    }
}
?>