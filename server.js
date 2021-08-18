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
// http://localhost:3001/whethercity?city_name=amman
server.get('/whethercity', (request, response) => {
    let city_name = request.query.city_name
    console.log('before search');
    try { let whether = wetherdata.find(value => {
        if (value.city_name.toLowerCase() == city_name.toLowerCase()) {return value }
    })

    // let whether =wetherdata.find(e=>e.city_name.toLowerCase()==city_name.toLowerCase())

    let Forcastarray = whether.data.map((item) => {

        return new Forcast(item)
    })
    response.send(Forcastarray)
    }
    catch (error) {
        console.log('Something went wrong', error)
        response.status(500).send('Something went wrong')
    }

    console.log('after search');


})   


server.get('*', (req, res) => {
    res.status(500).send('Something went wrong.')
})


