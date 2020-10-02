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
        $response = $response['results'];
        if(count($response) != 0){
            if(password_verify($password, $response[0]["password_usr"])){
               $wh = " WHERE usuario.id_usr = :id_usr AND usuario.id_usr = usuario_consultorio.id_usr AND
               usuario_consultorio.id_consultorio = consultorios.id_consultorio AND usuario.id_tipo_usuario = tipo_usuario.id_tipo_usuario";
               $parametros = array('id_usr' => $response[0]["id_usr"]);
               $res = $this->db->selectDatosUsuario($wh,$parametros);
              $res = $res['results'];
                 $data = array(
                  "id_usr" => $res[0]["id_usr"],
                  "nombre_usr" => $res[0]["nombre_usr"],
                  "apPaterno_usr" => $res[0]["apPaterno_usr"],
                  "apMaterno_usr" => $res[0]["apMaterno_usr"],
                  "nombre_consultorio" => $res[0]["nombre_consultorio"],
                  "tipoUsuario" => $res[0]["descripcion"],
                  "idConsultorio" => $res[0]["id_consultorio"]
               ); 
               Session::setSession("User",$data); 
              return $data;
            } else {
               $data = array (
                  "id_usr" => 0
               );
               return $data;
            }
        } else {
           return "Nombre de usuario o contraseña incorrectos";
        }
        
      } else {
         return $response;   
         
         }
      }
   }
?>