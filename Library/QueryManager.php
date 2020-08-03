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
            $response = $sth->fetch(PDO::FETCH_ASSOC); // ARREGLO DE LOS ELEMENTOS QUE OBTENEMOS DE LA TABLA   
            return array("results" => $response);
        } catch (PDOException $e) {
            return $e->getMessage();
            //throw $th;
        }
        $pdo = null; // cerrar la conexion
    }
    
}
?>