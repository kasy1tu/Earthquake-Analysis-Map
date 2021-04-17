var streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18, 
    accessToken: API_KEY
})

let map = L.map("map", {
    center: [40.7, -94.5], 
    zoom: 3,
    layers:[streets]
})

let baseMap = {
    "Streets": streets
}

// // Creating our initial map object
// // We set the longitude, latitude, and the starting zoom level
// // This gets inserted into the div with an id of 'map'
// var myMap = L.map("map", {
//     center: [45.52, -122.67],
//     zoom: 13
//   });
  
//   // Adding a tile layer (the background map image) to our map
//   // We use the addTo method to add objects to our map
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);
  