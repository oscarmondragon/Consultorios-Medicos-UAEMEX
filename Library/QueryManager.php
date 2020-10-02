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
}
?>