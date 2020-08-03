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
            if(password_verify($password, $response["password_usr"])){
               $data = array(
                  "id_usr" => $response["id_usr"],
                  "nombre_usr" => $response["nombre_usr"],
                  "apPaterno_usr" => $response["apPaterno_usr"],
                  "apMaterno_usr" => $response["apMaterno_usr"],
                  "id_tipo_usuario" => $response["id_tipo_usuario"],
                  "username" => $response["username"]
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