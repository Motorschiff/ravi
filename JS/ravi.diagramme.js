function rd3DPie(container, titel, hinweis, datenarray) {
	var anz = rdAnzahlZeilenImTitel(titel);
	var chart_margin_top = anz * 30;
	rd1ShowContainer(container);
	container = "#" + container;
	rdSetOptions();
	$(container).highcharts({
		chart: {
			marginTop: chart_margin_top,
			type: 'pie',
			options3d: {
				enabled: true,
				alpha: 45,
				beta: 0
			}
		},
		title: {
			text: titel
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				depth: 35,
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %'
				}
			}
		},
		series: [{
			type: 'pie',
			name: hinweis,
			data: datenarray
		}]
	});
}

function rdStackedBar(container, titel, hinweis, kategorien, daten, maxWert) {
	var anz = rdAnzahlZeilenImTitel(titel);
	var chart_margin_top = anz * 30;
	rd1ShowContainer(container);
	container = "#" + container;
	rdSetOptions();
	$(container).highcharts({
		chart: {
			marginTop: chart_margin_top,
			type: 'bar'
		},
		title: {
			text: titel
		},
		xAxis: {
			categories: kategorien
		},
		yAxis: {
			min: 0,		
			max: maxWert,
			title: {
				text: hinweis
			}
		},
		legend: {
			reversed: true
		},
		plotOptions: {
			series: {
				stacking: 'normal'
			}
		},
		series: daten
	});
}

function rdHeatMap(container, titel, kategorien_x_achse, kategorien_y_achse, daten, minWert, maxWert, mitLegende, hoehe, y_reverse, y_max, x_format, zoom_type) {
	var anz = rdAnzahlZeilenImTitel(titel);
	var subtitle_text = null;
	var chart_margin_top = anz * 30;;
	var chart_margin_bottom = 60;
	var hoehe_container = "";
	if ((hoehe != "") && (hoehe != null)) {
		hoehe_container = hoehe + "px";
	}
	rd1ShowContainer(container, hoehe_container);
	container = "#" + container;
	rdSetOptions();
	y_max--;		
	if (zoom_type != null) {
		subtitle_text = 'Ziehen Sie einen Rahmen zum reinzoomen';
		chart_margin_top += 20;
		chart_margin_bottom += 10;
	}	
	$(container).highcharts({
        
        chart: {
            zoomType: zoom_type,
			height: hoehe,
            marginTop: chart_margin_top,
            marginBottom: chart_margin_bottom
        },

        title: {			
            text: titel
        },
		
		subtitle: {
			text: subtitle_text,
			style: {                
				fontSize: '9px'
            },
			useHTML: true
		},

        xAxis: {
            categories: kategorien_x_achse,
			labels: {
				align: 'center',
				format: x_format
            }			
        },

        yAxis: {
            max: y_max,
			categories: kategorien_y_achse,
            title: null,
			reversed: y_reverse
        },

        colorAxis: {
            min: minWert,
			max: maxWert,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[1]
        },

        legend: {
            align: 'right',
			enabled: mitLegende,
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 320
        },

        tooltip: {
			enabled: true,
            formatter: function () {
                return this.series.xAxis.categories[this.point.x] + ' - ' + this.series.yAxis.categories[this.point.y] + ':<br>belegt zu <b>' + this.point.value + '</b>%';
            }
        },

        series: [{            
            borderWidth: 1,
            data: daten,
			type: 'heatmap'
        }]

    });
}

function rdColumn(container, titel, hinweis, daten, maxWert) {	
	var anz = rdAnzahlZeilenImTitel(titel);
	var chart_margin_top = anz * 30;
	rd1ShowContainer(container);
	container = "#" + container;
	rdSetOptions();
	$(container).highcharts({
		chart: {
			marginTop: chart_margin_top,
			type: 'column'
		},
		colors: [Highcharts.getOptions().colors[1]
		],
		title: {
			text: titel
		},		
		xAxis: {
			type: 'category',
			labels: {
				rotation: -45,
				align: 'right',
				format: '<style="font-size:8px">{value}</style>'
			}
		},
		yAxis: {
			min: 0,
			max: maxWert,
			title: {
				text: hinweis
			}
		},
		legend: {
			enabled: false
		},
		tooltip: {
			pointFormat: 'belegt: <b>{point.y:.1f} %</b>'
		},
		series: [{
			name: 'Population',
			data: daten
		}]
	});
}

function rdLine(container, titel, hinweis, daten, maxWert, tag, monat, jahr) {
	var anz = rdAnzahlZeilenImTitel(titel);
	var chart_margin_top = anz * 30;
	rd1ShowContainer(container);
	container = "#" + container;
	rdSetOptions();
	$(container).highcharts({
		chart: {
			marginTop: chart_margin_top,
			zoomType: 'x'
		},
		title: {
			text: titel
		},
		subtitle: {
			text: 'Ziehen Sie einen Rahmen zum reinzoomen',
			style: {                
				fontSize: '9px'
            },
			useHTML: true
		},
		xAxis: {
			type: 'datetime',
			minRange: 14 * 24 * 3600000 // fourteen days
		},
		yAxis: {
			min: 0,
			max: maxWert,
			title: {
				text: hinweis
			}
		},
		legend: {
			enabled: false
		},		
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
					stops: [
						[0, Highcharts.getOptions().colors[1]],
						[1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0).get('rgba')]
					]
				},
				marker: {
					radius: 2
				},
				lineWidth: 1,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},

		series: [{
			type: 'area',
			name: 'belegt',
			pointInterval: 24 * 3600 * 1000,
			pointStart: Date.UTC(jahr, monat, tag),
			data: daten
		}]
	});
    
}

function rdSetOptions() {
	Highcharts.setOptions({
		lang: {
			contextButtonTitle: 'Diagramm ...',
			downloadJPEG: 'Diagramm als <b>JPEG</b> abspeichern',
			downloadPDF: 'Diagramm als <b>PDF</b> abspeichern',
			downloadPNG: 'Diagramm als <b>PNG</b> abspeichern',
			downloadSVG: 'Diagramm als <b>SVG</b> abspeichern',
			printChart: 'Diagramm drucken',
			resetZoom: 'Zoom zuruecksetzen',
			resetZoomTitle: 'Zoomansicht 1:1',
			months: ['Januar', 'Februar', 'M\u00e4rz', 'April', 'Mai', 'Juni',  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
			shortMonths: ['Jan', 'Feb', 'M\u00e4r', 'Apr', 'Mai', 'Jun',  'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
			weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
		}
	});
}

function rdAnzahlZeilenImTitel(titel) {
	return titel.split("<br/>").length;
}
