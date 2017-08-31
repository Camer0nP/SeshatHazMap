//new map at div element
var map = new L.Map(document.getElementById('map')).setView([-25.731479, 28.447177], 17);
//Openstreetmap mapnik layer below, maximum Zoom of 19, attributed to OpenStreetMap
/*var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);*/

/*var mapLayer = MQ.mapLayer(), map;

map2 = L.map('map', {
  layers: mapLayer,
  center: [ -25.731479, 28.447177 ],
  zoom: 17
});*/

var OSMcol = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/*var wmsLayer = L.tileLayer.wms('http://frikancarto.co.za:8080/geoserver/South_Africa/ows?',
{layers: 'South_Africa:Province_SA'}).addTo(map*/
//var wmsLayer = L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', {
    //layers: 'nasa:bluemarble'
//}).addTo(map);
var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);

/*var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
});*/

var HERE_hybridDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/hybrid.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
	attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
	subdomains: '1234',
	mapID: 'newest',
	app_id: '8aaXrup1AZfWhyjqvE8a',
	app_code: 'voPXblCpUaz0QuycdZAyOw',
	base: 'aerial',
	maxZoom: 20,
	type: 'maptile',
	language: 'eng',
	format: 'png8',
	size: '256'
});

var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

/*var getJsonURL = 'http://frikancarto.co.za:8080/geoserver/viva/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=viva:dwellings&outputFormat=text%2Fjavascript&format_options=callback:handleJson'
var WFSLayer = null;
var ajax = $.ajax({
	jsonp : false,
    url : getJsonURL,
    dataType: 'jsonp',
    jsonpCallback : 'handleJson',
    success : handleJson
});
function handleJson(data){
	L.geoJson(data,{
		onEachFeature: function (feature, my_Layer){
			my_Layer.bindPopup('<b><center>DWELLING INFORMATION</b>' + '<center>Coordinates:' + feature.geometry.coordinates + '<center>Primary Address:' + feature.properties.priadd + '<center>Secondary Address:' + feature.properties.secadd + '<center>Tertiary Address:' + feature.properties.teradd);
		},
		pointToLayer: function(feature, latlng){
			return L.circleMarker(latlng, {radius: 4,
			fillcolor: '#b3b3cc',
			color: '#000',
			weight: 1,
			opacity: 1,
			fillOpacity: 1
			});
		}
       }).addTo(map);
    };*/

var VivaFoundation = L.marker([-25.732114, 28.444671]).bindPopup("This is Viva Foundation");
var RandomPoint = L.marker([-25.731000, 28.444646]).bindPopup("This is a random popup");
var popups = L.layerGroup([VivaFoundation,RandomPoint]);



var baseMaps = {
	/*"OpenStreetMap - Mapnik": OpenStreetMap_Mapnik,
	"Province SA": wmsLayer,
	"CartoDB - Dark Version":CartoDB_DarkMatter,
	World Imagery": Esri_WorldImagery,
	"OSM back-up": OSMcol*/
	'Map': OSMcol,
	"Open Topographic Map": OpenTopoMap,
	"World Imagery": Esri_WorldImagery,
	"HERE - Hybrid": HERE_hybridDay,
 /* 'Hybrid': MQ.hybridLayer(),
  'Satellite': MQ.satelliteLayer(),
  'Dark': MQ.darkLayer(),
  'Light': MQ.lightLayer()*/
};
var overlayMaps = {
    "Popups": popups
};
L.control.layers(baseMaps, overlayMaps).addTo(map);
