<?php
include("dbconnect.php");

// Zeitraum ausw�hlen
$zeitraum = $_POST["Zeitraum"];

if ($zeitraum == 2) // Auswertung f�r 7 Tage
	include("auswertung1Raum7Tage.php");
 
include("dbdisconnect.php");  
?>