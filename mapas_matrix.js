///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [16, -23.5],
		zoom: 9,
		minZoom: 9,
		maxZoom: 13,
	});




///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultmarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////

//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h2>Cambio climático recente nos lugares,<br> vilas e cidades de Cabo Verde';
	 return div;
	};
	title2.addTo(map);

//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/composi.png"  width="321px" height="200px" ></img></a>';
	 return div;
	};
	title1.addTo(map);

//Logo CLIMACAVE
var title4 = L.control({position: 'bottomright'});
	title4.onAdd = function (map) {
var div = L.DomUtil.create('div','info4');
	 div.innerHTML +=
	 '<a><img src="images/CLIMACAVE LOGO _transparencia.png" width="135px" height="94px" ></img></a>';
	 return div;
	};
	title4.addTo(map); 



///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetmap </a>| Map data © 2023 <a href="https://www.fundacionmatrix.es"><strong>@Fundación Matrix 2023</strong></a>',
	}).addTo(map);		
var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '',

    }).addTo(map);
var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: ' ',
    pane: 'labels'
    }).addTo(map);


var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	opacity: 0.5,
	attribution: ' '
	}).addTo(map);;

var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});

var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetmap </a>',
	});


//Mapas en formato imagen
//MDT
 var relieve = L.imageOverlay('images/MDT_900_MOD.png',
  imageBounds = [
    [17.2036,-25.3621],
    [17.2032,-22.662],
    [14.7995,-25.3461],
    [14.7991,-22.662]

  ]).addTo(map)


relieve.setOpacity(0.5);


///////////Otras funcionalidades
//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[16, -24], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////



//VARIABLES DEL SHPE
//VARIABLE1 "aa_camb_no"

function getColor11(a) {
	
return a < 8? '#edf0de' :
	a <= 11? '#fae7bc':
	a <= 14? '#ffbe94':
	a <= 17? '#fb8461':
	a <= 299? '#cc4039':
	a > 299? '#BCBEC1':
	
	'#C2523C';

};

function style11(feature) {
	return {
		fillColor: getColor11(feature.properties.aa_camb__1),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};

function popup11(feature, layer) {
	if (feature.properties && feature.properties.nom_freg) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Isla: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Freguesia: </strong>"+feature.properties.nom_freg.toLocaleString()+"<br>"

				+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>"
			             
            	+"<strong>Cambio: </strong>"+feature.properties.aa_camb_no,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson11 = L.geoJson(TCR, {
	style: style11,
	onEachFeature: popup11
});

//VARIABLE2 "dif_dias_1"

function getColor12(a) {
	
return a < 3? '#edf0de' :
	a <= 4.5? '#fae7bc':
	a <= 6? '#ffbe94':
	a <= 7? '#fb8461':
	a <= 200? '#cc4039':
	a > 290? '#BCBEC1':
	
	'#c3ff00';
};
function style12(feature) {
	return {
		fillColor: getColor12(feature.properties.dif_dias_1),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};
function popup12(feature, layer) {
	if (feature.properties && feature.properties.nom_freg) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Isla: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Freguesia: </strong>"+feature.properties.nom_freg.toLocaleString()+"<br>"

				+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>"
			             
            	+"<strong>Cambio: </strong>"+feature.properties.dif_dias_c,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson12 = L.geoJson(TCR, {
	style: style12,
	onEachFeature: popup12
});

//VARIABLE3 "dif_per_es"
function getColor13(a) {
	
return a < 0? '#fff8de' :
	a <= 50? '#ebf5fb':
	a <= 100? '#aebfc7':
	a <= 150? '#628abe':
	a <= 200? '#3d65a3':
	a <= 280? '#274687':
	a > 290? '#BCBEC1':
	
	'#C2523C';
};

function style13(feature) {
	return {
		fillColor: getColor13(feature.properties.prec_med_1),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};
function popup13(feature, layer) {
	if (feature.properties && feature.properties.nom_freg) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Isla: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Freguesia: </strong>"+feature.properties.nom_freg.toLocaleString()+"<br>"

				+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>"
			             
            	+"<strong>Cambio: </strong>"+feature.properties.prec_med_m.toLocaleString().substring(0,12),
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson13 = L.geoJson(TCR, {
	style: style13,
	onEachFeature: popup13
});


//VARIABLE4 "med_min__1"
function getColor14(a) {
	
return a < 0? '#d6f3fe' :
	a <= 0.1? '#fdc6af':
	a <= 0.2? '#fca486':
	a <= 0.3? '#fc8161':
	a <= 0.4? '#f85d42':
	a <= 0.5? '#ea372a':
	a <= 0.6? '#cc191d':
	a <= 0.7? '#a91016':
	a <= 200? '#67000d':
	a > 290? '#BCBEC1':

	
	'#C2523C';
};
function style14(feature) {
	return {
		fillColor: getColor14(feature.properties.med_min__1),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};
function popup14(feature, layer) {
	if (feature.properties && feature.properties.nom_freg) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Isla: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Freguesia: </strong>"+feature.properties.nom_freg.toLocaleString()+"<br>"

				+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>"
			             
            	+"<strong>Cambio: </strong>"+feature.properties.med_min_ca.toLocaleString().substring(0,10),
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson14 = L.geoJson(TCR, {
	style: style14,
	onEachFeature: popup14
});


//VARIABLE5 "prec_med_1""
function getColor15(a) {
	
return a < 0? '#ffeec8' :
	a <= 10? '#aebfc7':
	a <= 20? '#628abe':
	a <= 30.? '#3d65a3':
	a > 30? '#274687':
	
	'#C2523C';
};
function style15(feature) {
	return {
		fillColor: getColor15(feature.properties.prec_med_1),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};
function popup15(feature, layer) {
	if (feature.properties && feature.properties.nom_freg) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Isla: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Freguesia: </strong>"+feature.properties.nom_freg.toLocaleString()+"<br>"

				+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>"
			             
            	+"<strong>Cambio: </strong>"+feature.properties.prec_med_1.toLocaleString().substring(0,9)+" mm",
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson15 = L.geoJson(TCR, {
	style: style15,
	onEachFeature: popup15
});


//VARIABLE6 "prec_sec_1"
function getColor16(a) {
	
return a < -7.5? '#ea2626' :
	a < -5? '#f76e4e':
	a < -2.5? '#ffb399':
	a < 0? '#fff1cc':
	a < 2.5? '#eef4f2':
	a < 10? '#bcbbc9':
	a > 290? '#ECEDEE':
	
	'#C2523C';
};


function style16(feature) {
	return {
		fillColor: getColor16(feature.properties.prec_sec_1),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};
function popup16(feature, layer) {
	if (feature.properties && feature.properties.nom_freg) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Isla: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Freguesia: </strong>"+feature.properties.nom_freg.toLocaleString()+"<br>"

				+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>"
			             
            	+"<strong>Cambio: </strong>"+feature.properties.prec_sec_d,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson16 = L.geoJson(TCR, {
	style: style16,
	onEachFeature: popup16
});

//VARIABLE 17 "temp_max_1""
function getColor17(a) {
	
return a < 0? '#d0d8f1' :
	a <= 0.05? '#fff7c6':
	a <= 0.2? '#fcb189':
	a <= 0.35? '#df4837':
	a > 0.35? '#7a3233':
	
	'#C2523C';
};
function style17(feature) {
	return {
		fillColor: getColor14(feature.properties.temp_max_1),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};
function popup17(feature, layer) {
	if (feature.properties && feature.properties.nom_freg) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Isla: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Freguesia: </strong>"+feature.properties.nom_freg.toLocaleString()+"<br>"

				+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>"
			             
            	+"<strong>Cambio: </strong>"+feature.properties.temp_max_d,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson17 = L.geoJson(TCR, {
	style: style17,
	onEachFeature: popup17
});


//VARIABLE 18 "temp_med_1"
function getColor18(a) {
	
return a < -0.26? '#d0d8f1' :
	a <= -0.13? '#fff7c6':
	a <= 0? '#fcb189':
	a <= 0.06? '#df4837':
	a <= 299? '#7a3233':
	a > 299? '#ECEDEE':
	
	'#C2523C';
};
function style18(feature) {
	return {
		fillColor: getColor14(feature.properties.temp_med_2),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '1',
		fillOpacity: 0.7
	};

};
function popup18(feature, layer) {
	if (feature.properties && feature.properties.nom_freg) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Isla: </strong>"+feature.properties.nom_ilha.toLocaleString()+"<br>"

			+"<strong>Freguesia: </strong>"+feature.properties.nom_freg.toLocaleString()+"<br>"

				+"<strong>Concello: </strong>"+feature.properties.nom_conc.toLocaleString()+"<br>"

					+"<strong>Nome: </strong>"+feature.properties.Nombre.toLocaleString()+"<br>"
			             
            	+"<strong>Cambio: </strong>"+feature.properties.temp_med_t_2,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson18 = L.geoJson(TCR, {
	style: style18,
	onEachFeature: popup18
});


var mapa11 = L.layerGroup([geojson11])
var mapa12 = L.layerGroup([geojson12]);
var mapa13 = L.layerGroup([geojson13]);
var mapa14 = L.layerGroup([geojson14]);
var mapa15 = L.layerGroup([geojson15]);
var mapa16 = L.layerGroup([geojson16]);
var mapa17 = L.layerGroup([geojson17]);
var mapa18 = L.layerGroup([geojson18]).addTo(map);

//BASE TREE
var baseTree = [
	{ label: "<strong>Limpar mapa", layer: osm3 },
	{
	label: '<strong>Mapas de temperatura',
	children: [
		{ label: "Cambio na temperatura media", layer: mapa18 },
		{ label: "Cambio na temperatura media das máximas", layer: mapa17 },
		{ label: "Cambio na temperatura media das mínimas", layer: mapa14 },	
		{ label: "Cambio no número medio anual de días cálidos", layer: mapa12 },
		{ label: "Cambio no número medio anual de noites tropicais", layer: mapa11 },
		


		
	]
	},
	{
	label: '<strong>Mapas de precipitación',
	children: [
		{ label: "Cambio na precipitación total anual na estación húmida", layer: mapa13 },
		{ label: "Cambio na precipitación total anual na estación seca", layer: mapa16 },	
	]},
	
];	
	
//OVERLAY TREE	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "Relevo", layer: relieve},
		{ label: "OpenStreetMap", layer: osm},
		{ label: "Toponimia", layer: positronLabels},

	]
};	

//leyendas
var htmlLegend11 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Cambio no número medio anual de noites tropicais entre os períodos 1991-2005 e 2006-2020'+"<\h3>",
			layer: geojson11,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Método: media espacial a partir de modelización estatística e interpolación espacial dende datos procedentes de observacións de estacións meteorolóxicas <br> <br> Noite tropical: noite con temperatura mínima ≥ 20°C'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
				label:"<h1>"+'<br><strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  Días </strong><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}},  {		
			    label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp&nbsp  < 8 '+"<\h4>",html: '',style: {'background-color': '#edf0de','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp&nbsp&nbsp 8 – 11 '+"<\h4>",html: '',style: {'background-color': '#fae7bc','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 11 – 14 '+"<\h4>",html: '',style: {'background-color': '#ffbe94','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 14 – 17 '+"<\h4>",html: '',style: {'background-color': '#fb8461','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp  ≥ 17 '+"<\h4>",html: '',style: {'background-color': '#cc4039','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp Sen datos '+"<\h4>",html: '',style: {'background-color': '#ECEDEE','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {

				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend11);



var htmlLegend12 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Cambio no número medio anual de días cálidos entre os períodos 1991-2005 e 2006-2020'+"<\h3>",
			layer: geojson12,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Método: media espacial a partir de modelización estatística e interpolación espacial dende datos procedentes de observacións de estacións meteorolóxicas <br> <br> Día cálido: dia con temperatura máxima ≥ 25°C'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
				label:"<h1>"+'<br><strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  Días </strong><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}},  {		
			    label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp&nbsp  < 3 '+"<\h4>",html: '',style: {'background-color': '#edf0de','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp&nbsp&nbsp 3 – 4,5 '+"<\h4>",html: '',style: {'background-color':'#fae7bc','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 4,5 – 6 '+"<\h4>",html: '',style: {'background-color': '#ffbe94','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp 6 – 7 '+"<\h4>",html: '',style: {'background-color': '#fb8461','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp&nbsp  ≥ 7 '+"<\h4>",html: '',style: {'background-color': '#cc4039','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp Sen datos '+"<\h4>",html: '',style: {'background-color': '#ECEDEE','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		

				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend12);


var htmlLegend13 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Cambio na precipitación total anual media na estación húmida entre os períodos 1991-2005 e 2006-2020'+"<\h3>",
			layer: geojson13,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Estación húmida: meses de xullo, agosto, setembro e outubro <br> <br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Método: media espacial a partir de modelización estatística e interpolación espacial dende datos procedentes de observacións de estacións meteorolóxicas <br> '+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
				label:"<h2>"+'<br><strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  mm </strong><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}},  {		
			    label:"<h3>"+  ' Descenso intranscendente <br> (-7 – 0 mm)'+"<\h4>",html: '',style: {'background-color': '#fff8de','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {	
				label:"<h3>"+  ' Aumento leve <br> (0 – 50 mm) '+"<\h4>",html: '',style: {'background-color': '#ebf5fb','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {		
				label:"<h3>"+  ' Aumento lixeiro <br> (50 – 100 mm) '+"<\h4>",html: '',style: {'background-color': '#aebfc7','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {		
				label:"<h3>"+  ' Aumento lmoderado <br>(100 – 150 mm)  '+"<\h4>",html: '',style: {'background-color': '#628abe','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {		
				label:"<h3>"+  ' Aumento importante <br>(150 – 200 mm)  '+"<\h4>",html: '',style: {'background-color': '#3d65a3','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {		
				label:"<h3>"+  ' Aumento moi importante <br> (≥ 200 mm)'+"<\h4>",html: '',style: {'background-color': '#274687','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {	
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h3>"+  ' &nbsp Sen datos '+"<\h4>",html: '',style: {'background-color': '#BCBEC1','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {	

				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]



		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend13);
		

var htmlLegend14 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Cambio na temperatura media das mínimas entre os períodos 1991-2005 e 2006-2020'+"<\h3>",
			layer: geojson14,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Método: media espacial a partir de modelización estatística e interpolación espacial dende datos procedentes de observacións de estacións meteorolóxicas <br> <br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
				label:"<h1>"+'<br><strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  °C </strong><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}},  {		
			    label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp&nbsp  < 0 '+"<\h4>",html: '',style: {'background-color': '#d6f3fe','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp&nbsp&nbsp 0 – 0,1 '+"<\h4>",html: '',style: {'background-color': '#fdc6af','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 0,1 – 0,2 '+"<\h4>",html: '',style: {'background-color': '#fca486','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 0,2 – 0,3 '+"<\h4>",html: '',style: {'background-color': '#fc8161','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 0,3 – 0,4 '+"<\h4>",html: '',style: {'background-color': '#f85d42','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp 0,4 – 0,5 '+"<\h4>",html: '',style: {'background-color': '#ea372a','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp 0,5 – 0,6 '+"<\h4>",html: '',style: {'background-color': '#cc191d','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp 0,6 – 0,7 '+"<\h4>",html: '',style: {'background-color': '#a91016','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp  ≥ 0,7 '+"<\h4>",html: '',style: {'background-color': '#67000d','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp Sen datos '+"<\h4>",html: '',style: {'background-color': '#ECEDEE','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		

				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend14);


var htmlLegend15 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Cambio na precipitación media máxima entre os períodos 1991-2005 e 2006-2020'+"<\h3>",
			layer: geojson15,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Método: media espacial a partir de modelización estatística e interpolación espacial dende datos procedentes de observacións de estacións meteorolóxicas <br> <br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
				label:"<h1>"+'<br><strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  mm </strong><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}},  {		
			    label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp&nbsp  < 0 '+"<\h4>",html: '',style: {'background-color': '#ffeec8','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp&nbsp&nbsp 0 – 10 '+"<\h4>",html: '',style: {'background-color': '#aebfc7','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 10 – 20 '+"<\h4>",html: '',style: {'background-color': '#628abe','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 20 – 30 '+"<\h4>",html: '',style: {'background-color': '#3d65a3','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp  ≥ 30 '+"<\h4>",html: '',style: {'background-color': '#274687','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp Sen datos '+"<\h4>",html: '',style: {'background-color': '#ECEDEE','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		

				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend15);



var htmlLegend16 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Cambio na precipitación total anual media na estación seca entre os períodos 1991-2005 e 2006-2020'+"<\h3>",
			layer: geojson16,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Estación seca: meses de xaneiro, febreiro, marzo, abril, maio, xuño, novembro e decembro <br> <br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Método: media espacial a partir de modelización estatística e interpolación espacial dende datos procedentes de observacións de estacións meteorolóxicas <br> <br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
				label:"<h2>"+'<br><strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  mm </strong><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}},  {		
			    label:"<h3>"+  'Descenso lixeiro <br>(< -7,5 mm) '+"<\h4>",html: '',style: {'background-color': '#ea2626','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {	
				label:"<h3>"+  'Descenso leve <br>(-7,5 – -5 mm) '+"<\h4>",html: '',style: {'background-color': '#f76e4e','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {		
				label:"<h3>"+  'Descenso moi leve <br> (-5 – -2,5 mm) '+"<\h4>",html: '',style: {'background-color': '#ffb399','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {		
				label:"<h3>"+  'Descenso intranscendente <br> (-2,5 – 0 mm) '+"<\h4>",html: '',style: {'background-color': '#fff1cc','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {
				label:"<h3>"+  'Aumento intranscendente <br> (0 – 2,5 mm) '+"<\h4>",html: '',style: {'background-color': '#eef4f2','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {		
				label:"<h3>"+  'Aumento moi leve <br>(≥ 2,5 mm) '+"<\h4>",html: '',style: {'background-color': '#bcbbc9','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h3>"+  '&nbsp Sen datos '+"<\h4>",html: '',style: {'background-color': '#ECEDEE','width': '28px','height': '15px', 'border': 'black 2px solid'}}, {		

				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			



			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend16);



var htmlLegend17 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Cambio na temperatura media das máximas entre os períodos 1991-2005 e 2006-2020'+"<\h3>",
			layer: geojson17,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Método: media espacial a partir de modelización estatística e interpolación espacial dende datos procedentes de observacións de estacións meteorolóxicas <br> <br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
				label:"<h1>"+'<br><strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  °C </strong><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}},  {		
			    label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp&nbsp  < 0 '+"<\h4>",html: '',style: {'background-color': '#d6f3fe','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp&nbsp&nbsp 0 – 0,1 '+"<\h4>",html: '',style: {'background-color': '#fdc6af','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 0,1 – 0,2 '+"<\h4>",html: '',style: {'background-color': '#fca486','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 0,2 – 0,3 '+"<\h4>",html: '',style: {'background-color': '#fc8161','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 0,3 – 0,4 '+"<\h4>",html: '',style: {'background-color': '#f85d42','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp 0,4 – 0,5 '+"<\h4>",html: '',style: {'background-color': '#ea372a','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp 0,5 – 0,6 '+"<\h4>",html: '',style: {'background-color': '#cc191d','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp 0,6 – 0,7 '+"<\h4>",html: '',style: {'background-color': '#a91016','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp  ≥ 0,7 '+"<\h4>",html: '',style: {'background-color': '#67000d','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp Sen datos '+"<\h4>",html: '',style: {'background-color': '#ECEDEE','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	

				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend17);

var htmlLegend18= L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Cambio na temperatura media entre os períodos 1991-2005 e 2006-2020'+"<\h3>",
			layer: geojson18,
		image:'<img src="images/LOGO_GEN.png"',
			
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Método: media espacial a partir de modelización estatística e interpolación espacial dende datos procedentes de observacións de estacións meteorolóxicas <br> <br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {

				
				label:"<h1>"+'<br><strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  °C </strong><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}},  {		
			    label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp&nbsp  < 0 '+"<\h4>",html: '',style: {'background-color': '#d6f3fe','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  '&nbsp&nbsp&nbsp 0 – 0,1 '+"<\h4>",html: '',style: {'background-color': '#fdc6af','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 0,1 – 0,2 '+"<\h4>",html: '',style: {'background-color': '#fca486','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 0,2 – 0,3 '+"<\h4>",html: '',style: {'background-color': '#fc8161','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {		
				label:"<h1>"+  '&nbsp 0,3 – 0,4 '+"<\h4>",html: '',style: {'background-color': '#f85d42','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp 0,4 – 0,5 '+"<\h4>",html: '',style: {'background-color': '#ea372a','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp 0,5 – 0,6 '+"<\h4>",html: '',style: {'background-color': '#cc191d','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp 0,6 – 0,7 '+"<\h4>",html: '',style: {'background-color': '#a91016','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {
				label:"<h1>"+  '&nbsp&nbsp&nbsp&nbsp  ≥ 0,7 '+"<\h4>",html: '',style: {'background-color': '#67000d','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {	
				label:"<h1>"+  ' &nbsp Sen datos '+"<\h4>",html: '',style: {'background-color': '#ECEDEE','width': '60px','height': '28px', 'border': 'black 2px solid'}}, {

				label: "<h5>" +'<BR><i>Fonte: Elaboración propia (2023) con datos do Instituto Nacional de Meteorologia e Geofísica (INMG) e o Instituto Nacional de Gestão do Territorio (INGT).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: false,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 1, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend18);

//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree,{collapsed:true}).collapseTree(baseTree,overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});