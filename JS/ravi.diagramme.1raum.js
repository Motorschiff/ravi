function rd1PruefeEingabe() {
	if ((($("#Einzelsicht").is(":visible") && ($("#Einzelsicht").is(":checked") == false)) || ($("#Gesamtsicht").is(":visible") && ($("#Gesamtsicht").is(":checked") == false))) || ($("#Heatmap").is(":visible") && ($("#Heatmap").is(":checked") == false)) || ($("#Flaechendiagramm").is(":visible") && ($("#Flaechendiagramm").is(":checked") == false))) {
		$('#grundrisse').show();
		alertRavi("Bitte w\u00e4hlen Sie den Darstellungstyp!", true);
		return false;
	}
	else if (document.menu.raum.selectedIndex == 0) {
		$('#grundrisse').show();
		alertRavi("Bitte w\u00e4hlen Sie zuerst einen Raum!", true);
		return false;
	}
	else if ($("input[name='zeitraum']:checked").length == 0) {
		$('#grundrisse').show();
		alertRavi("Bitte w\u00e4hlen Sie noch einen Zeitraum!", true);
		return false;
	}
	
	return true;
}

function rd1FrageDatenAb(auswertung_in_neuem_tab){
	// Eingaben pr�fen
	if (!rd1PruefeEingabe()) {
		return;
	}
	// Dokumentenparameter abfragen
	var f = document.menu;
	var zeitraum = $("input[name='zeitraum']:checked").val();
	var raumid = document.menu.raum.value;
	var raumNr = $("#raum option:selected").text();
	var tag = document.menu.Day.value;
	var monat = document.menu.Month.value;
	var jahr = document.menu.Year.value;		
	var mitSamstag = $("#Sa").is(":checked");
	var mitSonntag = $("#So").is(":checked");	
	var diagramm1 = $("#Einzelsicht").is(":checked");
	var diagramm2 = $("#Gesamtsicht").is(":checked");
	var diagramm3 = $("#Flaechendiagramm").is(":checked");
	var diagramm4 = $("#Heatmap").is(":checked");
	var diagramm5 = diagramm4;
	if (auswertung_in_neuem_tab) {
		var link = 'index.php?zeitraum=' + zeitraum + '&raumid=' + raumid + '&raumNr=' + raumNr 
			+ '&tag=' + tag + '&monat=' + monat + '&jahr=' + jahr + '&mitSamstag=' + mitSamstag + '&mitSonntag=' + mitSonntag 
			+ '&diagramm1=' + diagramm1 + '&diagramm2=' + diagramm2 + '&diagramm3=' + diagramm3 + '&diagramm4=' + diagramm4 + '&diagramm5='+ diagramm5;	
		// neuen Tab mit den �bergabeparametern �ffnen		 
		window.open(link);	
	} else {
		rd1StarteAuswertung(zeitraum, raumid, raumNr, tag, monat, jahr, mitSamstag, mitSonntag, diagramm1, diagramm2, diagramm3, diagramm4, diagramm5);
	}
	return;	
}

// Fragt die Daten zu einem ausgew�hlten Raum und Zeitraum ab
function rd1StarteAuswertung(zeitraum, raumid, raumNr, tag, monat, jahr, mitSamstag, mitSonntag, diagramm1, diagramm2, diagramm3, diagramm4, diagramm5) {
	rd1HideAllContainer();
	$('#grundrisse').hide();	
	$('#wartebild').css("height", "275px");
	$('#wartebild').show();
	// Daten an Server senden
	$.ajax({
		// pfad zur PHP Datei (ab HTML Datei)
		url: "PHP/diagrammeRaumZeitraumAuswahl.php",	
		// Daten, die an Server gesendet werden soll in JSON Notation
		data: {Zeitraum: zeitraum, RaumID: raumid, Tag: tag, Monat: monat, Jahr: jahr, RaumNr: raumNr, Samstag: mitSamstag, Sonntag: mitSonntag,
				Diagramm1: diagramm1, Diagramm2: diagramm2, Diagramm3: diagramm3, Diagramm4: diagramm4, Diagramm5: diagramm5
		},
		datatype: "json",	
		// Methode POST oder GET
		type: "POST",
		// Callback-Funktion, die nach der Antwort des Servers ausgefuehrt wird
		success: function(data) { rd1InitialisiereDiagram(data); }
	});
	return;
}

function rd1InitialisiereDiagram(data) {	
	// Wartebild entfernen
	$('#wartebild').css("height", "0px");
	$('#wartebild').hide();
//	if ($("#Einzelsicht").is(":checked")){
	// bla bla show 
//	}
	
	
	// Daten parsen
	var response = $.parseJSON(data);	
	if (response.length == 0)
		return;
	// Pfad aktualisieren
	if ($("#diagr").length) {
		$("#pfad #diagr").text("> Auswertung f\u00fcr Raum " + response.raumnr);
	} else {
		$("#pfad").append("<a class='routeMap' id='diagr'>> Auswertung f&uuml;r Raum " + response.raumnr + "</a>");
	}	
	var zeitraum = response.zeitraum;
	// Aussehen der Diagramme
	var daten, titel, hoehe, legende, y_max, x_format;
	// Daten der Diagramme
	var belegung_absolut, kategorien_y, belegt, nicht_belegt, belegung_pro_stunde, kategorien_x;
	// Puffer
	var i, j, y_wert, a_proz, a_stunden;
	// Belegung absolut f�r den Zeitraum im Kuchendiagramm
	// aktuell f�r: 1 Tag, 7 Tage, 4 Wochen, 6 Monate, 1 Jahr
	if ((zeitraum == 1 || zeitraum == 2 || zeitraum == 3 || zeitraum == 4 || zeitraum == 5) && response.diagramm1 == true) {
		daten =  new Array();
		daten.push({name: "nicht belegt", y: 100 - response.belegt_gesamt});
		daten.push({name: "belegt", y: response.belegt_gesamt});	 
		 if (zeitraum == 1) {
			titel = "Absolute Belegung des Raumes " + response.raumnr + "<br/>" + response.datum_begin + "";
		} else {
			titel = "Absolute Belegung des Raumes " + response.raumnr + "<br/>im Zeitraum " + response.datum_begin + " - "	+ response.datum_ende + "";
			titel = rd1ExpandTitle(titel, response.mitSamstag, response.mitSonntag);
		}
		rd3DPie("diagramm1", titel , "Durchschnitt", daten);
	}
	// Belegung nach Tage / Wochen / Monate aufgeschl�sselt in einer StackedBar
	// aktuell f�r: 7 Tage, 4 Wochen, 6 Monate, 1 Jahr
	if ((zeitraum == 2 || zeitraum == 3 || zeitraum == 4 || zeitraum == 5) && response.diagramm2 == true) {
		if (zeitraum == 2) {
			belegung_absolut = response.belegung_absolut_pro_tag;
		} else if (zeitraum == 3) {
			belegung_absolut = response.belegung_absolut_pro_woche;
		} else if (zeitraum == 4) {
			belegung_absolut = response.belegung_absolut_pro_monat;
		} else if (zeitraum == 5) {
			belegung_absolut = response.belegung_absolut_pro_monat;
		}
		kategorien_y =  new Array();
		belegt = new Array();
		nicht_belegt = new Array();
		for (i = 0; i < belegung_absolut.length; i++) {
			// Daten aus �bergabearray holen
			y_wert = belegung_absolut[i].Buchung_fuer;
			a_proz = belegung_absolut[i].ProzBelegung;
			// Arrays f�r Balkendiagramm f�llen
			kategorien_y.push(y_wert);
			belegt.push(a_proz);
			nicht_belegt.push(100-a_proz);			
		}	
		daten = new Array();	
		daten.push({name: "nicht belegt", data: nicht_belegt});
		daten.push({name: "belegt", data: belegt});
		titel = "Durchschnittliche Belegung des Raumes " + response.raumnr + "<br/>im Zeitraum " + response.datum_begin + " - " + response.datum_ende + "";
		titel = rd1ExpandTitle(titel, response.mitSamstag, response.mitSonntag);
		rdStackedBar("diagramm2", titel, "Belegung in %", kategorien_y, daten, 100);	
	}
	// Belegung nach Tagen aufgeschl�sselt in einer ColumnChart
	// aktuell f�r: 4 Wochen
	if ((zeitraum == 3) && response.diagramm2 == true) {
		belegung_absolut = response.belegung_absolut_pro_tag;	
		daten = new Array();
		for (i = 0; i < belegung_absolut.length; i++) {
			// Daten aus �bergabearray holen
			y_wert = belegung_absolut[i].Buchung_fuer;
			a_proz = belegung_absolut[i].ProzBelegung;
			// Arrays f�r Balkendiagramm f�llen
			daten.push([y_wert, a_proz]);
		}	
		titel = "Durchschnittliche Belegung des Raumes " + response.raumnr + "<br/>im Zeitraum " + response.datum_begin + " - " + response.datum_ende + "";
		titel = rd1ExpandTitle(titel, response.mitSamstag, response.mitSonntag);
		rdColumn("diagramm3", titel, "Belegung in %", daten, 100);
	}
	// Belegung nach Tagen aufgeschl�sselt in einer LineChart
	// aktuell f�r: 6 Monate, 1 Jahr
	if ((zeitraum == 4 || zeitraum == 5) && response.diagramm3 == true) {
		belegung_absolut = response.belegung_absolut_pro_tag;	
		daten = new Array();
		for (i = 0; i < belegung_absolut.length; i++) {
			// Daten aus �bergabearray holen
			a_proz = belegung_absolut[i].ProzBelegung;
			// Arrays f�r Balkendiagramm f�llen
			daten.push(a_proz);
		}	
		titel = "Durchschnittliche Belegung des Raumes " + response.raumnr + "<br/> im Zeitraum " + response.datum_begin + " - " + response.datum_ende + "";
		titel = rd1ExpandTitle(titel, response.mitSamstag, response.mitSonntag);
		rdLine("diagramm3", titel, "Belegung in %", daten, 100, response.tag, response.monat-1, response.jahr);
	}
	// Belegung nach Tagen und Uhrzeiten aufgeschl�sselt in einer HeatMap
	// aktuell f�r: 1 Tag, 7 Tage, 4 Wochen, 6 Monate, 1 Jahr
	if ((zeitraum == 1 || zeitraum == 2 || zeitraum == 3 || zeitraum == 4 || zeitraum == 5) && response.diagramm4 == true) {
		if (zeitraum == 1 || zeitraum == 2) {
			belegung_pro_stunde = response.belegung_pro_tag_pro_stunde;
		} else if (zeitraum == 3 || zeitraum == 4 || zeitraum == 5) {
			belegung_pro_stunde = response.belegung_pro_tag_pro_woche;
		}
		kategorien_x = new Array();
		kategorien_y = new Array();
		daten = new Array();
		y_max = 0;
		for (i = 0; i < belegung_pro_stunde.length; i++) {
			// Daten aus �bergabearray holen
			y_wert = belegung_pro_stunde[i].Buchung_fuer;
			a_stunden = belegung_pro_stunde[i].StundenBelegung;
			// Arrays f�r Heatmap f�llen
			for (j = 0; j < a_stunden.length; j++) {
				// im ersten Durchlauf die X-Achse noch belegen
				if (i == 0) {
					kategorien_x.push(a_stunden[j].Stunde + " Uhr");						
				}
				daten.push([j,i,a_stunden[j].Belegt]);	
			}				
			kategorien_y.push(y_wert);
			y_max++;
		}	
		if (zeitraum == 1) {
			hoehe = 165;
			legende = false;
			titel = "Belegung des Raumes " + response.raumnr + " pro Stunde <br/>am " + response.datum_begin + "";
		} else if (zeitraum == 2) {
			hoehe = null;			
			legende = false;
			titel = "Belegung des Raumes " + response.raumnr + " pro Tag und Stunde <br/>im Zeitraum " + response.datum_begin + " - " + response.datum_ende + "";
		} else if (zeitraum == 3) {
			hoehe = null;			
			legende = true;
			titel = "Belegung des Raumes " + response.raumnr + " pro Wochentag und Stunde <br/>im Zeitraum " + response.datum_begin + " - " + response.datum_ende + "";
		} else if (zeitraum == 4) {
			hoehe = null;			
			legende = true;
			titel = "Belegung des Raumes " + response.raumnr + " pro Wochentag und Stunde <br/>im Zeitraum " + response.datum_begin + " - " + response.datum_ende + "";
		} else if (zeitraum == 5) {
			hoehe = null;			
			legende = true;
			titel = "Belegung des Raumes " + response.raumnr + " pro Wochentag und Stunde <br/>im Zeitraum " + response.datum_begin + " - " + response.datum_ende + "";
		}
		titel = rd1ExpandTitle(titel, response.mitSamstag, response.mitSonntag);
		rdHeatMap("diagramm4", titel, kategorien_x, kategorien_y, daten, 0, 100, legende, hoehe, true, y_max, null, null);
	}
	// Belegung aller Tagen und Uhrzeiten aufgeschl�sselt in einer HeatMap
	// aktuell f�r: 4 Wochen, 6 Monate, 1 Jahr
	if (((zeitraum == 3) || (zeitraum == 4) || (zeitraum == 5)) && response.diagramm5 == true) {
		belegung_pro_stunde = response.belegung_pro_tag_pro_stunde;		
		kategorien_x = new Array();
		kategorien_y = new Array();
		daten = new Array();
		y_max = 0;
		for (i = 0; i < belegung_pro_stunde.length; i++) {
			// Daten aus �bergabearray holen
			y_wert = belegung_pro_stunde[i].Buchung_fuer;
			a_stunden = belegung_pro_stunde[i].StundenBelegung;
			// Arrays f�r Heatmap f�llen
			for (j = 0; j < a_stunden.length; j++) {	
				// im ersten Durchlauf die Y-Achse noch belegen
				if (i == 0) {
					kategorien_y.push(a_stunden[j].Stunde + " Uhr");	
					y_max++;
				}			
				daten.push([i,j,a_stunden[j].Belegt]);	
			}	
			kategorien_x.push(y_wert);
		}	
		hoehe = null;			
		legende = false;
		titel = "Belegung des Raumes " + response.raumnr + " pro Wochentag und Stunde <br/>im Zeitraum " + response.datum_begin + " - " + response.datum_ende + "";
		x_format = '<style="font-size:8px">{value}</style>'
		titel = rd1ExpandTitle(titel, response.mitSamstag, response.mitSonntag);
		rdHeatMap("diagramm5", titel, kategorien_x, kategorien_y, daten, 0, 100, legende, hoehe, true, y_max, x_format, 'x');
	}	

	return;
}
// wo wird diese Funktion augerufen?!
function rd1ShowContainer(container, height) {
	var ws1, ws2;
	if ((height == "") || (height == null)) {
		height = "400px";
	}	
	container = "#" + container;
	ws1 = container + "_ws1";
	ws2 = container + "_ws2";	
	$(container).css("height", height);
	$(container).show();
	$(ws1).css("height", "25px");
	$(ws1).show();
	$(ws2).css("height", "25px");
	$(ws2).show();	
	
	return;
}

function rd1HideAllContainer() {
	rd1HideContainer("diagramm1");
	rd1HideContainer("diagramm2");
	rd1HideContainer("diagramm3");
	rd1HideContainer("diagramm4");
	rd1HideContainer("diagramm5");
		
	return;
}

function showAllDiagrammtypen() {	
	$('#trbalkendiagramm').show();
	$('#trflaechendiagramm').show();
	$('#trheatmap').show();	
	return;
}



function rd1HideContainer(container) {
	var ws1, ws2;
	container = "#" + container;
	ws1 = container + "_ws1";
	ws2 = container + "_ws2";	
	$(container).css("height", "0px");
	$(container).hide();
	$(ws1).css("height", "0px");
	$(ws1).hide();
	$(ws2).css("height", "0px");
	$(ws2).hide();
	
	return;
}

function rd1ExpandTitle(titel, mitSamstag, mitSonntag){
	if (!mitSamstag && !mitSonntag) {
		titel += "<br/>ohne Berechnung der Sams- und Sonntage!";	
	}
	else if (!mitSamstag) {
		titel +="<br/>ohne Berechnung der Samstage!";	
	}
	else if (!mitSonntag) {
		titel += "<br/>ohne Berechnung der Sonntage!";	
	}
	
	return titel;
}
