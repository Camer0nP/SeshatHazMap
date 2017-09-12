//new map at div element
var lat = -25.731479;
var lng = 28.447177;
var zoom = 17;

// set up the map and remove the default zoomControl
var map = new L.Map(document.getElementById('map'), {
  zoomControl: false
});
map.setView([lat, lng], zoom);


// custom zoom bar control that includes a Zoom Home function
L.Control.zoomHome = L.Control.extend({
    options: {
        position: 'topleft',
        zoomInText: '+',
        zoomInTitle: 'Zoom in',
        zoomOutText: '-',
        zoomOutTitle: 'Zoom out',
        zoomHomeText: 'o',
        zoomHomeTitle: 'Zoom home'
    },

    onAdd: function (map) {
        var controlName = 'gin-control-zoom',
            container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
            options = this.options;

        this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
        controlName + '-in', container, this._zoomIn);
        this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
        controlName + '-home', container, this._zoomHome);
        this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
        controlName + '-out', container, this._zoomOut);

        this._updateDisabled();
        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        return container;
    },

    onRemove: function (map) {
        map.off('zoomend zoomlevelschange', this._updateDisabled, this);
    },

    _zoomIn: function (e) {
        this._map.zoomIn(e.shiftKey ? 3 : 1);
    },

    _zoomOut: function (e) {
        this._map.zoomOut(e.shiftKey ? 3 : 1);
    },

    _zoomHome: function (e) {
        map.setView([lat, lng], zoom);
    },

    _createButton: function (html, title, className, container, fn) {
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', fn, this)
            .on(link, 'click', this._refocusOnMap, this);

        return link;
    },

    _updateDisabled: function () {
        var map = this._map,
            className = 'leaflet-disabled';

        L.DomUtil.removeClass(this._zoomInButton, className);
        L.DomUtil.removeClass(this._zoomOutButton, className);

        if (map._zoom === map.getMinZoom()) {
            L.DomUtil.addClass(this._zoomOutButton, className);
        }
        if (map._zoom === map.getMaxZoom()) {
            L.DomUtil.addClass(this._zoomInButton, className);
        }
    }
});
// add the new control to the map
var zoomHome = new L.Control.zoomHome();
zoomHome.addTo(map);
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
	"Open Street Map": OSMcol,
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
new L.control.layers(baseMaps, overlayMaps).addTo(map);
