<?php
    try{
        header('Content-Type: application/json');
        $Output = array(
           "error" => false,
           "message" => "N/A",
           "output" => "N/A"
        );

        if(isset($_POST['module']) && isset($_POST['method'])){
			$Module = $_POST['module'];
			$Method = $_POST['method'];

            switch($Module){
                case 'API':
                    switch($Method){
                        case 'findUserNameById':
                            if(!isset($_POST['id']) | !isset($_POST['login'])) throw new Exception("Paramètres manquant");

                            $Response = "Error : -12";

							$sqlOrder = "SELECT * FROM player WHERE name LIKE ?";

                                $result = $this->queryRow($sqlOrder, array($userName));

                                if ($result) {
                                    $Response = $result["id"];
                                }

							$Output["output"] = $Response;
							http_response_code(200);
                        break;
                        default:
							throw new Exception("Méthode inéxistante");
                          break;
                    }
                break;
                default:
					throw new Exception("Module inéxistant");
                  break;
            }
        }
    } catch (\Throwable $e) {
        $Output["error"] = true;
        $Output["message"] = $e->getMessage();
    } finally {
        echo json_encode($Output, JSON_FORCE_OBJECT);
        die();
    }
?>
