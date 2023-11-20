<?php
class Connection
{
  private $dataBase;
  private static $instance = null;

  //appelée par new
  private function __construct ()
  {
    $this->dataBase = new PDO('mysql:host='.DATABASE_HOST.'; dbname='.DATABASE_NAME.'; charset=utf8', DATABASE_USER, DATABASE_PASSWORD);
    $this->dataBase->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }


  public static function getInstance()
  {
    if(is_null(self::$instance))
      self::$instance = new Connection();
    return self::$instance;
  }

  public function getDataBase()
  {
    return $this->dataBase;
  }

}
?>