<?php
ini_set('display_errors', 1);

//database login info
$host = '41.185.93.18';
$port = '5432';
$dbname = 'seshat';
$user = 'seshat';
$password = 'seshat@#123';
$TypeDesc = $_GET["hazard_type"];
$lat = $_GET["latitude1"];
$long = $_GET ["longitude1"];

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password"); //connection string
if (!$conn) {
	echo "Not connected : " . pg_error();
	exit;
} //connection check

if ($TypeDesc = "default"){
  echo "Please select a valid hazard type";
  exit;
} elseif ($TypeDesc = "Ground_Electrical"){
  $Type_ID = 4
} elseif ($TypeDesc = "Overhead_Electrical"){
  $Type_ID = 1
} elseif ($TypeDesc = "Open_Pit"){
  $Type_ID = 3
} elseif ($TypeDesc = "Dump_Site"){
  $Type_ID = 2
} else{
  echo "Error detected";
  exit;
}//Type_ID is assinged

$result = pg_query($conn, "INSERT INTO public."Hazard" ("Type_ID", "Admin_ID", "User_ID", "Verified", "Latitude", "Longitude", "Timestamp") VALUES ($Type_ID, 1, 1, FALSE, $lat, $long, '$DateTime'),"); //
if (!$result) {
  echo "An error occurred.\n";
  exit;
}//query success check

?>
