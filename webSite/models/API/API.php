<?php
require_once(PATH_MODELS.'ConnectionSingleton.php');
require_once(PATH_MODELS.'DAO.php');
require_once(PATH_ENTITIES.'User.ts');

class API extends DAO {

    public function findUserIdByName($userName) {

        $sqlOrder = "SELECT * FROM user WHERE name LIKE ?";

        $result = $this->queryRow($sqlOrder, array($userName));

        if ($result) {
            return $result["id"];
        } else {
            return -12;
        }
    }
}