<?php
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");

$idDesenv = $_GET['desenvId'];
$idSprint = $_GET['sprintId'];

$url ='https://redmine.capes.gov.br/projects/plataformafreire/issues.json?assigned_to_id='.$idDesenv.'&key=06666c7cf65dfe4d1ee5e5ffb0c2e70a7518422f&offset=0&limit=100&sprint_id='.$idSprint.'';
// $url ='https://redmine.capes.gov.br/projects/plataformafreire/issues.json?cf_6='.$idDesenv.'&key=06666c7cf65dfe4d1ee5e5ffb0c2e70a7518422f&offset=0&limit=100&sprint_id='.$idSprint.'';
$ch = curl_init();

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);

$result=curl_exec($ch);

curl_close($ch);    

echo $result;
