'use strict'

const { request, response } = require('express');
const express = require('express');
require('dotenv').config();
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
        this.data = item.datetime
        this.description = item.weather.description
    }

}
//localhost:3001/test
server.get('/test', (request, response) => {
    response.send('your server is working')

})
//localhost:3001/
server.get('/', (request, response) => {
    response.send('home route')
})




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

server.get('/wether', getwhether)
function getwhether(req, res) {
    let lat = request.query.lat
    let lon = request.query.lon
    let url = `https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely`
    
    console.log('before axios');
    try {
        axios.get(url).then((photoResults) => {
            console.log('inside axios');

            // console.log(photoResults.data)
            let photoArray = photoResults.data.results.map(photo => {
                return new Photo(photo)
            })
            res.send(photoArray)
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


