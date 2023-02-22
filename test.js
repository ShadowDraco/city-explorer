let clientData = { lat: lat, lon: lon, search: search}
// clientData = weatherData
axios.post('localhost/weather', {clientData})
.then(response => {
    (forecast)
})