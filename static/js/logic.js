// Creating map object
var myMap = L.map("map", {
    center: [38.8026, -116.4194],
    zoom: 5
  });

  // Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap); 


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(url, function(data) {
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
      radius: (feature.properties.mag)*5,
        fillColor: getColor(feature.properties.mag),
        weight: 1,
        opacity: 0.7,
        color: "#555",
        fillOpacity: 1
    };
  }
  
  L.geoJson(data, {
    style: style,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, style);
    }
}).addTo(myMap);

function createFeatures(earthquakeData) {
function onEachFeature(feature, layer) {
  layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
}

var earthquakes = L.geoJSON(earthquakeData, {
  onEachFeature: onEachFeature
});
}

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
});

