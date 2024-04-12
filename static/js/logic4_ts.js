// Function to create the Leaflet map
function createMap(evStations) {
    const streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    const baseMaps = { "Street Map": streetmap };
    const overlayMaps = { "EV Stations": evStations };
  
    const map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 10,
      layers: [streetmap, evStations]
    });
  
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
    
    // Event listener for clicking on markers
    evStations.on('click', function(e) {
        const marker = e.layer;
        const latlng = marker.getLatLng();

        // Remove any existing circles
        map.eachLayer(function(layer) {
            if (layer instanceof L.Circle) {
                map.removeLayer(layer);
            }
        });

        // Create circle with 5-mile radius centered at marker's location
        const circle = L.circle(latlng, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 5 * 1609.34 // Convert 5 miles to meters
        }).addTo(map);
    });
}

// Function to create markers for EV charging stations
function createMarkers(evChargers) {
    const evMarkers = evChargers.map(charger => {
        const popupContent = `
            <h3>Station Name: ${charger["station name"]}</h3>
            <h3>State: ${charger.state}</h3>
            <h3>City: ${charger.city}</h3>
            <h3>ZipCode: ${charger.zipcode}</h3>
            <p>Latitude: ${charger.latitude}</p>
            <p>Longitude: ${charger.longitude}</p>
        `;
        const marker = L.marker([charger.latitude, charger.longitude]).bindPopup(popupContent);
      
        return marker;
    });
  
    const evStations = L.layerGroup(evMarkers);
    createMap(evStations);
}

// URL for GeoJSON data
const url = "https://marinelloc.github.io/Proj_3/data/tristatecharingstations.json";

// Fetch GeoJSON data and create markers when it completes
d3.json(url).then(createMarkers);
