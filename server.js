'use strict'

const { request, response } = require('express');
const express =require('express');
require('dotenv').config();
const wetherdata =require('./data/wether.json');
const server= express();
const PORT = process.env.PORT;

server.listen( PORT,()=>{
console.log(`listning on port ${PORT}`)
})
//localhost:3001/test
server.get('/test', (request, response) => {
    response.send('your server is working')

})
//localhost:3001/
server.get('/',(request,response)=>{
    response.send('home route')
})


//localhost:${process.env.REACT_APP_LOCATIONIQ_KEY}/whether?lat=0&lon=0&searchQuery='A'
 server.get('/whether', ( request, response) => {
    let lat = request.query.lat
    let lon = request.query.lon
    let city_name = request.query.city_name
    let citywhther = wetherdata.find ( async value => {
          if  ( await Number(value.lat) === Number(lat) && Number(value.lon) == Number(lon) && value.city_name == city_name) {
           return citywhther
        }
          
          response.send([citywhther.data[0].weather,citywhther.data[0].valid_date] )

    })



})
server.get('*',(req,res)=>{
    res.status(500).send('not found')
})


