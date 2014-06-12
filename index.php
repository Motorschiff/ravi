<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>RaVi - Die Raumvisualisierung Projekt 1 - VI 2013 - 2014 - HWR-Berlin</title>
	<!-- Inkludierte Stylesheet-Dateien -->
<?php include "css/_includes" ?>	
	<!-- Inkludierte Javascript-Dateien -->
<?php include "js/_includes" ?>  
</head>
<?php
$showNavigation = "";
if (isset($_GET["zeitraum"])) {
	$showNavigation = "display: none";
	$parameter = htmlspecialchars($_GET["zeitraum"]);
	$parameter .= ',' . htmlspecialchars($_GET["raumid"]);
	$parameter .= ',"' . htmlspecialchars($_GET["raumNr"]) . '"';
	$parameter .= ',' . htmlspecialchars($_GET["tag"]);
	$parameter .= ',' . htmlspecialchars($_GET["monat"]);
	$parameter .= ',' . htmlspecialchars($_GET["jahr"]);
	$parameter .= ',' . htmlspecialchars($_GET["mitSamstag"]);
	$parameter .= ',' . htmlspecialchars($_GET["mitSonntag"]);
	$parameter .= ',' . htmlspecialchars($_GET["diagramm1"]);
	$parameter .= ',' . htmlspecialchars($_GET["diagramm2"]);
	$parameter .= ',' . htmlspecialchars($_GET["diagramm3"]);
	$parameter .= ',' . htmlspecialchars($_GET["diagramm4"]);
	$parameter .= ',' . htmlspecialchars($_GET["diagramm5"]);
	echo "<body onLoad='rd1StarteAuswertung(" . $parameter . ")'>\n";
} else {
	echo "<body>\n";
}
?>
	<div id="header">
		<div id="hread">
			<a href=""><img id="logo_ravi" src="Bilder/RaViLogok.jpg" /></a>
			<a href="http://www.hwr-berlin.de" target="_blank"><img id="logo_hwr" src="Bilder/hwr-logo.png" /></a>
		</div>
		
		<div id="grau_div1">
			<table border="0" cellpadding="7">
				<tr>
					<td><a href="index.php">Startseite</td>
					<td><a href="javascript:changeDivKontakt()">Kontakt</td>
					<td><a href="javascript:changeDivContent()">Impressum/Team</td>
				</tr>
			</table>			
		</div>
	</div>		
	
	<div id="content">
		<div id="navigation" style="<?php echo $showNavigation; ?>">
			<div id="menue_div1"><a class="upperHead">Navigation<a></div>
			<div id="menue_div2">
				<!-- Start: Eingabeformular -->
				<form name="menu">   
					<!-- Start: Standort-, Haus-, Raum-Auswahl -->
					<table border="0">
						<tr>
							<td>Standort</td>
							<td><select id="standort" name="standort" style="width:135px;" size="1" onChange="rmrFrageHaeuserAb(this.form)" disabled>
									
									<option>Bitte warten</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>Haus</td>
							<td>
								<select id="haus"name="haus" style="width:135px" size="1" onChange="rmrFrageRaeumeAb(this.form)" disabled>
									<option>Standort auswählen</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>Raum</td>
							<td>
								<select id="raum" name="raum" style="width:135px" size="1" disabled>
									<option>Haus auswählen</option>
								</select>
							</td>
						</tr>
					</table>
					<br>
					<!-- Ende: Standort-, Haus-, Raum-Auswahl -->
					<!-- Start: Datumsauswahl -->
					<p>Datum:&nbsp;&nbsp;&nbsp;<br>	
						<!-- Tag auswählen -->
						<select id="Day" style="width:45px" >
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="13">13</option>
							<option value="14">14</option>
							<option value="15">15</option>
							<option value="16">16</option>
							<option value="17">17</option>
							<option value="18">18</option>
							<option value="19">19</option>
							<option value="20">20</option>
							<option value="21">21</option>
							<option value="22">22</option>
							<option value="23">23</option>
							<option value="24">24</option>
							<option value="25">25</option>
							<option value="26">26</option>
							<option value="27">27</option>
							<option value="28">28</option>
							<option value="29">29</option>
							<option value="30">30</option>
							<option value="31">31</option>								
						</select>
			 
						<!-- Monat auswählen -->
						<select id="Month" "style="width:85px" >
							<option value="1">Jan</option>
							<option value="2">Feb</option>
							<option value="3">M&auml;r</option>
							<option value="4">Apr</option>
							<option value="5">Mai</option>
							<option value="6">Jun</option>
							<option value="7">Jul</option>
							<option value="8">Aug</option>
							<option value="9">Sep</option>
							<option value="10">Okt</option>
							<option value="11">Nov</option>
							<option value="12">Dez</option>
						</select>

						<!-- Jahr auswählen -->
						<select id= "Year">
							<option value="2011">2011</option>
							<option value="2012">2012</option>
							<option value="2013">2013</option>
							<option value="2014">2014</option>
						</select>
						<input type="hidden" id="datepicker"/><br/>	
						<br>
					</p>		
					<!-- Ende: Datumsauswahl -->
					
					<!-- Start: Zeitraum -->
					<p> Zeitraum:<br>
						<input type="radio" name="zeitraum" value="1" onChange="showAllDiagrammtypen();$('#trbalkendiagramm').hide();$('#trflaechendiagramm').hide();"> 1 Tag<br>
						<input type="radio" name="zeitraum" value="2" onChange="showAllDiagrammtypen();$('#trflaechendiagramm').hide();"> 7 Tage<br>
						<input type="radio" name="zeitraum" value="3" onChange="showAllDiagrammtypen();$('#trflaechendiagramm').hide();"> 4 Wochen<br>
						<input type="radio" name="zeitraum" value="4" onChange="showAllDiagrammtypen();"> 6 Monate<br>
						<input type="radio" name="zeitraum" value="5" onChange="showAllDiagrammtypen();"> 12 Monate									
					</p>
					<!-- Ende: Zeitraum -->
					<div id="accordion">
						<h4>Filter</h4>
						<div>
							<table border="0">
								<tr>
								<td><input id="Sa" type="checkbox" name="Sa" value="sa">Samstag</td>
								<td><input id="So" type="checkbox" name="So" value="so">Sonntag</td>
								</tr>
							</table>
						</div>
					</div>
					<br/>
					<!-- Start: Diagrammtyp-->
					Darstellungstyp:<input type="checkbox" class="closeIMG" name="infobox" id="info1"></input>
	<label class="info closeIMG" for="info1"><img class="closeIMG" src="./Bilder/info.png" alt="Grafik 1"></label><br />
	<span class="info1">
		<label class="closeIMG" id="closeIMG" for="info1">schließen</label>
		<p>
			<b>Kreisdiagramm:</b></br>Zeigt die prozentuale Belegung eines Raums zu einem genauen Zeitpunkt in einem Kreisdiagramm an. </br></br>
			<b>Balkendiagramm:</b></br> Zeigt die durchschnittliche Belegung eines Raums f&uuml;r einen ausgew&auml;hlten Zeitraum in einem Balkendiagramm an.</br></br>
			<b>Fl&auml;chendiagramm:</b></br> Zeigt die durchschnittliche Belegung eines Raums f&uuml;r einen ausgew&auml;hlten Zeitraum unter Ber&uuml;cksichtigung der Uhrzeiten in einem Flächendiagramm an.	</br></br>
			<b>Heatmap:</b></br> Zeigt die prozentuale Belegung eines Raums in einem ausgew&auml;hlten Zeitraum zu verschiedenen Uhrzeiten an.</br></br>
		</p>
	</span>
    
					<!--<table>
						<tr>
							<td>	
								<span class="hover"><label for ="Dounut"><img src="./Bilder/logodounut.jpg" ><span class="infobox">&nbsp;Dounutdiagramm&nbsp; </span></span>
							</td>
							<td>	
								<span class="hover"><label for ="Balken"><img src="./Bilder/logobalken.jpg"><span class="infobox">&nbsp;Balkendiagramm&nbsp;</span></span>
							</td>
							<td>	
								<span class="hover"><label for ="Kreis"><img src="./Bilder/logokreis.jpg"><span class="infobox">&nbsp;Kreisdiagramm&nbsp;</span></span>
							</td>
							<td>	
								<span class="hover"><label for ="Linie"><img src="./Bilder/logolinie.jpg"><span class="infobox">&nbsp;Liniendiagramm&nbsp;</span></span>
							</td>
						</tr>
						<tr>
							<td style="text-align:center">
								<input class="Diagrammtyp" type="radio" name="Diagrammtyp" value="doughnut" > 
							</td>
							<td style="text-align:center">
								<input class="Diagrammtyp" type="radio" name="Diagrammtyp" value="column">  
							</td>
							<td style="text-align:center">
								<input class="Diagrammtyp" type="radio" name="Diagrammtyp" value="pie"> 
							</td>
							<td style="text-align:center">
								<input class="Diagrammtyp" type="radio" name="Diagrammtyp" value="line" > 
							</td>
						</tr>
					</table>
					<br>
					</p>
					<!-- Ende: Diagrammtyp -->
					<!--<p>
						<input type="checkbox" name="Diagrammtyp" value="pie" checked>Einzelsicht <span class="hover"><label for ="Kreis"><img src="./Bilder/kreis1.jpg"><span class="infobox">&nbsp;Kreisdiagramm&nbsp;</span><br>
						<input type="checkbox" name="Diagrammtyp" value="column" checked>Gesamtsicht<span class="hover"><label for ="Balken"><img src="./Bilder/logobalken.jpg"><span class="infobox">&nbsp;Balkendiagramm&nbsp;</span><br>
					</p>
					-->
					<table cellpadding="1">
						<tr>
						    <td>
							<input id="Einzelsicht" type="checkbox" name="Diagrammtyp" value="pie" checked>
							</td>
							<td>	
								<span class="hover"><label for ="Dounut"><img src="./Bilder/kreis2.jpg" ><span class="infobox">&nbsp;Kreisdiagramm&nbsp; </span></span>
							</td>
							<td>
							 Kreisdiagramm
							</td>
						</tr>	
						<tr id="trbalkendiagramm">
							<td>
								<input id="Gesamtsicht" type="checkbox" name="Diagrammtyp" value="column" checked>
							</td>
							<td>	
								<span class="hover"><label for ="Balken"><img src="./Bilder/balken1.jpg"><span class="infobox">&nbsp;Balkendiagramm&nbsp;</span></span>
							</td>
							<td>
							 Balkendiagramm
							</td>
						</tr>	
						<tr id="trflaechendiagramm">
							<td>
								<input id="Flaechendiagramm" type="checkbox" name="Diagrammtyp" value="line" checked>
							</td>
							<td>	
								<span class="hover"><label for ="Linie"><img src="./Bilder/logolinie.jpg"><span class="infobox">&nbsp;Liniendiagramm&nbsp;</span></span>
							</td>
							<td>
							 Flächendiagramm
							</td>
						</tr>	
						<tr id="trheatmap">
							<td>
								<input id="Heatmap" type="checkbox" name="Map" value="heat" checked>
							</td>
							<td>	
								<span class="hover"><label for ="Heatmap"><img src="./Bilder/heatmap.jpg"><span class="infobox">&nbsp;Heatmap&nbsp;</span></span>
							</td>
							<td>
							 Heatmap
							</td>
						</tr>	
					</table>
					<br>
					
					<input type="button" onClick="rd1FrageDatenAb(false)" value="anzeigen"/>
					<input type="button" onClick="rd1FrageDatenAb(true)" value="in neuem Tab"/>


				</form>
			</div>
		</div>				
		<div id="main">
			<div id="top">
				<div id="pfad"><a id="standorte" class="upperHead routeMap">Standorte</a></div>
			</div>
			<div id="grafik">
				<div id="grundrisse">
					<div id="vmap" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap2" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap3" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap4" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap5" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap6" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap7" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap8" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap9" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap10" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap11" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap12" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap13" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap14" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap15" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap16" class="map" style="width: 100%; height: 600px;"></div>
					<div id="vmap17" class="map" style="width: 100%; height: 600px;"></div>
				</div>
				<div id="wartebild" style="height: 0px; display: none" align="center">
					<br><br>
					<img src="Bilder\warten.gif">
					<br>
					Die Auswertung wird vorbereitet - Bitte haben Sie Geduld ...					
				</div>
				<div class="diagrdiv" id="diagramm1_ws1" style="height: 0px" ></div>
				<div class="diagrdiv" id="diagramm1" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm1_ws2" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm2_ws1" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm2" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm2_ws2" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm3_ws1" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm3" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm3_ws2" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm4_ws1" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm4" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm4_ws2" style="height: 0px"></div>	
				<div class="diagrdiv" id="diagramm5_ws1" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm5" style="height: 0px"></div>
				<div class="diagrdiv" id="diagramm5_ws2" style="height: 0px"></div>						
			</div>
		</div>
	</div>
</body>
</html> 
