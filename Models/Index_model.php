<?php
class Index_model extends Conexion{
    public function __construct() {
       parent::__construct();
    }
    function userLogin($username, $password){
       $where = " WHERE username = :username";
       $param = array('username' => $username);
       $response = $this->db->select1("*", 'usuario',$where,$param);
      if (is_array($response)){
        
         if($response['results']=== false){
            $data = array (
               "id_usr" => 0
            );
            return $data;
         } else {
            $response = $response['results'];
            if(password_verify($password, $response[0]["password_usr"])){
               $data = array(
                  "id_usr" => $response[0]["id_usr"],
                  "nombre_usr" => $response[0]["nombre_usr"],
                  "apPaterno_usr" => $response[0]["apPaterno_usr"],
                  "apMaterno_usr" => $response[0]["apMaterno_usr"],
                  "id_tipo_usuario" => $response[0]["id_tipo_usuario"],
                  "username" => $response[0]["username"]
               );
               Session::setSession("User",$data); 
               return $data;
            } else {
               $data = array (
                  "id_usr" => 0
               );
               return $data;
            }
         
         }
      
    }
   }
}
?>