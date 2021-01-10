var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var tectonicplates = "../static/js/tectonic_plates.json";

var earthquakeData = await d3.json(queryUrl);
var plateData = await d3.json(tectonicplates);
createFeatures(earthquakeData.features, plateData.features);


function createFeatures(earthquakeData, plateData) {

  function getColor(d) {
    return d > 5 ? '#ef5a5a' :
           d > 4  ? '#da8b4a' :
           d > 3  ? '#eaaf3f' :
           d > 2  ? '#e3c826' :
           d > 1   ? '#cbdf29' :
                      '#a4e039';
  }

  function style(feature) {
    return {
      radius: feature.properties.mag*5,
        fillColor: getColor(feature.properties.mag),
        weight: 1,
        opacity: 0.7,
        color: "#555",
        fillOpacity: 1
    }
};

function onEachFeature(feature, layer) {
  layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>Magnitude:" +feature.properties.mag+ "</p>"+"<p>"+ new Date(feature.properties.time) + "</p>");
}

var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, style);
    },
    style: style,
    onEachFeature: onEachFeature
  });

var plates = L.geoJSON(plateData, {
    color: "orange"
});
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes,plates);
}

function createMap(earthquakes,plates) {

  // Define streetmap and darkmap layers
  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
  });

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

  var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satellite": satellitemap,
    "Grayscale": streetmap,
    "Outdoors": outdoorsmap
  };


  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Fault Lines": plates,
    "Earthquakes": earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      38.8026, -116.4194
    ],
    zoom: 5,
    layers: [satellitemap, earthquakes, plates]
  });

  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({position: 'bottomright'});
	legend.onAdd = function (myMap) {
    
		var div = L.DomUtil.create('div', 'info legend'),
			mhis = [0, 1, 2, 3, 4, 5],
			labels = [],
			from, to;

		for (var i = 0; i < mhis.length; i++) {
			from = mhis[i];
			to = mhis[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(myMap);
}
