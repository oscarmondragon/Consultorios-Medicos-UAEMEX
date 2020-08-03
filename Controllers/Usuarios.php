<?php
class Usuarios extends Controllers {

    public function __construct() {
        parent::__construct();
    }
    public function destroySession(){
        Session::destroy();
        header("Location:".URL);
    }
}

?>