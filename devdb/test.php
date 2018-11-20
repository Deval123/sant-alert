<?php


header('Access-Control-Allow-Origin: *');
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        
            {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
try {
    $strConnection= 'mysql:host=localhost; dbname=sant-alert;
    $pdo = new PDO ($strConnection, "root", "");
}
catch (PDOException $e) {
    $msg = "ERREUR PDO dans" . $e ->getMessage();
    die ($msg);
}

$data = file_get_contents("php://input");
    if (isset($data)) {
        $request = json_decode($data);
        $nom = $request->nom;
        $password = $request->password;
		$datecreate = $request->datecreate;
		$symtome = $request->symtome;
		$traitement = $request->traitement;
		$evaluation = $request->evaluation;
		$observation = $request->observation;
        $cout_traitement = $request->cout_traitement;
	}

$req1 = $pdo->query("select id from patients where nom = "$nom" and password = "$password";");
$id=$req1->fetch();
if ($id)
{
   $req = $pdo->query("INSERT INTO auto_med (datecreate, symtome, traitement, evaluation, observation, cout_traitement, patients_id)
VALUES ("$datecreate", "$symtome", "$traitement", "$evaluation", "$observation", "$cout_traitement", "$id");");

}

?>