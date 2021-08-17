'use strict'

const { request, response } = require('express');
const express = require('express');
require('dotenv').config();
const axios = require('axios')
const wetherdata = require('./data/wether.json');
const server = express();
const PORT = process.env.PORT;
const cors = require('cors')
server.use(cors());

server.listen(PORT, () => {
    console.log(`listning on port ${PORT}`)
})
class Forcast {
    constructor(item) {
        this.data =item.datetime
        this.description = item.weather.description
    }

}




// server.get('/whethercity', (request, response) => {
//     // let lat = request.query.lat
//     // let lon = request.query.lon
//     let city_name = request.query.city_name
//     let whether = wetherdata.find(value => {
//         if (value.city_name.toLowerCase() == city_name.toLowerCase()) {return value }
//     })

//     // let whether =wetherdata.find(e=>e.city_name.toLowerCase()==city_name.toLowerCase())

//     let Forcastarray = whether.data.map((item) => {

//         return new Forcast(item)
//     })
//     response.send(Forcastarray)



// })
server.get('/', homeHandler);
// Function Handlers
function homeHandler (req, res) {
    res.send('all good')}

server.get('/whethertoday', getwhether)
function getwhether (req, res) {
    let lat = req.query.lat
    console.log(lat)
    let lon = req.query.lon
    let url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    
    console.log('before axios');
    try  {
        axios.get(url).then((whetherResults) => {
            console.log('inside axios');

            console.log(whetherResults.data)
            let wetherArray = whetherResults.data.map(item => {
                return new Forcast(item)
            })
            res.send(whetherResults)
            // console.log(wetherArray)
        })
    }
    catch (error) {
        console.log('error from axios', error)
        res.send(error)
    }

    console.log('after axios');

}


server.get('*', (req, res) => {
    res.status(500).send('not found')
})


//http://localhost:3001/whethertoday?&lat=47.6038321&lon=-122.3300624