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
const handleMovie = require('./modules/movies')
const handleweather = require('./modules/weather')

server.listen(PORT, () => {
    console.log(`listning on port ${PORT}`)
})

server.get('/', homeHandler);
// Function Handlers
function homeHandler (req, res) {
    res.send('all good')}
    
server.get('/weather', handleweather)
server.get('/movies', handleMovie)
server.get('*', (req, res) => {
    res.status(500).send('not found')
})


