<?php
require_once('ConnectionSingleton.php');
abstract class DAO
{

    private $daoError;
    private $debug;



    private function request($sqlOrder, $argument = null)
    {
        if ($argument == null)
        {
            $pdoStatment = Connection::getInstance()->getDataBase()->query($sqlOrder);// exécution directe
        }
        else
        {
            $pdoStatment = Connection::getInstance()->getDataBase()->prepare($sqlOrder);// requête préparée
            $pdoStatment->execute($argument);
        }
        return $pdoStatment;
    }

    public function queryRow($sqlOrder, $arguments = null)
    {
        try
        {
            $pdoStatment = $this->request($sqlOrder, $arguments);
            $response = $pdoStatment->fetch();
            $pdoStatment->closeCursor();
        }
        catch(PDOException $e)
        {
            if($this->debug)
                die($e->getMessage());
            $this->daoError = 'query';
            $response = false;
        }
        return $response;
    }

    public function queryAll($sqlOrder, $arguments = null)
    {
        try
        {
            $pdoStatment = $this->request($sqlOrder, $arguments);
            $response = $pdoStatment->fetchAll();
            $pdoStatment->closeCursor();
        }
        catch(PDOException $e)
        {
            if($this->debug)
                die($e->getMessage());
            $this->daoError = 'query';
            $response = false;
        }
        return $response;
    }
}