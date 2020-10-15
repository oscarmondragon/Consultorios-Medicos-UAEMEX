<?php
class Session {
    
    static function start($params){
        @session_start($params);

    }
    static function getSession($name){
        return $_SESSION[$name];
    }

    static function setSession($name, $data){
        return $_SESSION[$name] = $data;
    }

    static function destroy(){
        @session_destroy();
    }
}


?>