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
        this.data =item.valid_date
        this.description = item.weather.description
        this.temp=item.temp
    }

}
server.get('/', homeHandler);
// Function Handlers
function homeHandler (req, res) {
    res.send('all good')}

server.get('/whethertoday', getwhether)
function getwhether (req, res) {
    let city = req.query.city
    console.log(city)
    let url =`https://api.weatherbit.io/v2.0/forecast/daily?city=${city},&key=${process.env.WEATHER_API_KEY}`
    console.log('before axios wheather');
    try  {
        axios.get(url).then((whetherResults) => {
            console.log('inside axios wheather');
            // console.log(whetherResults.data)
            let wetherArray = whetherResults.data.data.map(item => {
                return new Forcast(item)
            })
            res.send(wetherArray)
            console.log(wetherArray)
        })
    }
    catch (error) {
        console.log('error from axios wheather', error)
        res.send(error)
    }

    console.log('after axios wheather');

}
// http://localhost:3001/weather?city=Amman
server.get('/weather', getwhether)
function getwhether (req, res) {
    // let lat = req.query.lat
    // console.log(lat)
    // let lon = req.query.lon
    let city = req.query.city
    console.log(city)
    // let url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    let url =`https://api.weatherbit.io/v2.0/forecast/daily?city=${city},&key=${process.env.WEATHER_API_KEY}`


    
    console.log('before axios');
    try  {
        axios.get(url).then((whetherResults) => {
            console.log('inside axios');

            console.log(whetherResults.data.data)
            let wetherArray = whetherResults.data.data.map(item => {
                return new Forcast(item)
            })
            res.send(wetherArray)
            console.log(wetherArray)
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


