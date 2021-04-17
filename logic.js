// // Store our API endpoint inside queryUrl
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// // Perform a GET request to the query URL
// d3.json(queryUrl).then(function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function
//   function styleInfo(feature){
//     return{
//         opacity: 1, 
//         fillOpacity: 1, 
//         fillColor: getColor(feature.properties.mag), 
//         color: "#00000",
//         radius: getRadius(feature.properties.mag),
//         stroke: true, 
//         weight: 0.5,
//     }
// }
// })

// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   }

//   // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the onEachFeature function once for each piece of data in the array
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }

// function createMap(earthquakes) {

//   // Define streetmap and darkmap layers
//   var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   });

//   var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "dark-v10",
//     accessToken: API_KEY
//   });

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
//   };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Earthquakes: earthquakes
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load
//   var myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [streetmap, earthquakes]
//   });

//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);
// }





//console.log("working");
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>", 
    maxZoom: 18, 
    accessToken: API_KEY


})
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18, 
    accessToken: API_KEY


})
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18, 
    accessToken: API_KEY


})

let map = L.map('mapid', {
    center: [40.7, -94.5],
    zoom: 3,
    layers: [streets]
})

let baseMaps = { 
    "Streets": streets,
    "Satellite": satelliteStreets,
    Light: light
}

let allEarthquakes = new L.LayerGroup()
let largeEarquakes = new L.LayerGroup()
let tectonicplates = new L.LayerGroup()

let overlays = { 
    "TectonicPlate": tectonicplates, 
    "Earthquakes": allEarthquakes, 
}
L.control.layers(baseMaps. overlays).addTo(map)

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    function styleInfo(feature){
        return{
            opacity: 1, 
            fillOpacity: 1, 
            fillColor: getColor(feature.properties.mag), 
            color: "#00000",
            radius: getRadius(feature.properties.mag),
            stroke: true, 
            weight: 0.5,
        }
    }
    function getColor(magnitude){
        if(magnitude > 5){
            return "#ea2c2c";
        }
        if(magnitude > 4){
            return "#ea822c";
        }
        if(magnitude > 3){
            return "#ee9c00";
        }

        if(magnitude > 2){
            return "#eecc00";
        }

        if(magnitude > 1){
            return "#d4ee00";
        }
        
        return "##98eee00";
      }
        function getRadius(magnitude){
            if(magnitude === 0){
                return 1
            }
            return magnitude * 4;

    }
    L.geoJson(data, {
        pointtoLayer: function(feature, latlng){
            console.log(data);
            return L.circleMarker(latlng)
        },
        style: styleInfo,
        onEachFeatureL: function(feature, layer) {
            later.bindPopup("Magnitude:" + feature.properties.mag + "<br>Location" + feature.properties.place);
        }
    }).addTo(allEarthquakes)
    allEarthquakes.addTo(map)
})