<?php
class Index  extends Controllers 
{

    public function __construct() {
       parent::__construct();
    }
    public function index(){
      
      $user = $_SESSION["User"] ?? null;
      
      if(  $user != null){
        header("Location:").URL."Principal/principal";
      } else {
        $this->view->render($this,"index");
      }
      
    }

    public function userLogin(){
      if(isset($_POST["username"]) && isset($_POST["password"])){
       $data = $this->model->userLogin($_POST["username"], $_POST["password"]);
      // echo password_hash($_POST["password"], PASSWORD_DEFAULT);
        if(is_array($data)){
          echo json_encode($data);
        } else {
          echo $data;
        }
    }
    }
}
?>