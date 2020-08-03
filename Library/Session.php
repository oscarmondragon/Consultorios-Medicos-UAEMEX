<?php
class Session {
    
    static function start(){
        @session_start();

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