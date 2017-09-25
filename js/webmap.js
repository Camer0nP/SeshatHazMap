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

var OSMcol = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var Dwellingswms = L.tileLayer.wms('http://geodev.co.za:8080/geoserver/seshat/wms?', {
    layers: 'seshat:mamelodi_footprints_v3',
    format: 'image/png',
    transparent: true

}).addTo(map);
var Roadswms = L.tileLayer.wms('http://geodev.co.za:8080/geoserver/seshat/wms?', {
    layers: 'seshat:roads_v2',
    format: 'image/png',
    transparent: true

}).addTo(map);

var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);

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

var VivaFoundation = L.marker([-25.732114, 28.444671]).bindPopup("This is Viva Foundation");
var RandomPoint = L.marker([-25.731000, 28.444646]).bindPopup("This is a random popup");
var popups = L.layerGroup([VivaFoundation,RandomPoint]);

var baseMaps = {
	"Open Street Map": OSMcol,
	"Open Topographic Map": OpenTopoMap,
	"World Imagery": Esri_WorldImagery,
	"HERE - Hybrid": HERE_hybridDay,
};
var overlayMaps = {
  "Dwelling Footprints": Dwellingswms,
  "Roads": Roadswms,
};

new L.control.layers(baseMaps, overlayMaps).addTo(map);

var owsrootUrl = "http://41.185.93.18:8080/geoserver/seshat/ows";

var defaultParameters = {
    service : 'WFS',
    version : '1.0.0',
    request : 'GetFeature',
    typeName : 'seshat:Hazard',
    outputFormat : 'text/javascript',
    format_options : 'callback:parseResponse',
    SrsName : 'EPSG:4326'
};

var parameters = L.Util.extend(defaultParameters);
var URL = owsrootUrl + L.Util.getParamString(parameters);

var WFSLayer = null;

$.ajax({
	url: URL,
	dataType: 'jsonp',
	jsonpCallback: 'parseResponse',
	success: function handleJson(data){
  	WFSLayer = new L.geoJson(data, {
      style: function (feature) {
                  return {
                      stroke: false,
                      fillColor: 'FFFFFF',
                      fillOpacity: 0
                  };
              },
              onEachFeature: function (feature, layer) {
                  popupOptions = { maxWidth: 200 };
                  layer.bindPopup("Popup text, access attributes with feature.properties.ATTRIBUTE_NAME", popupOptions);
  		}
  	}).addTo(map);
  }
});
