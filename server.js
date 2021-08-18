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
const handleMovie = require('./modules/movies.js')


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
// class Forcastmovies {
//     constructor(item) {
//         this.title =item.original_title
//         this.overview = item.overview
//         this.vote_average=item.vote_average
//         this.vote_count=item.vote_count
//         this.image_url=`https://image.tmdb.org/t/p/w500/${item.poster_path}`
//         this.popularity=item.popularity
//         this.release_date=item.release_date


//     }

// }
server.get('/', homeHandler);
// Function Handlers
function homeHandler (req, res) {
    res.send('all good')}


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


// //--------------------------------------------------------------------------------------------------------------------------
// // http://localhost:3001/movies?&query=jone
// server.get('/movies', getmovies)
// function getmovies (req, res) {
//     let cityname = req.query.cityname
//     // console.log(moviesname)
//     let url =`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${cityname}`
//     console.log('before axios');
//     try  {
//         axios.get(url).then((moviesResults) => {
//             console.log('inside axios');

//             console.log('first',moviesResults.data)
//             let moviesArray = moviesResults.data.results.map(item => {
//                 return new Forcastmovies(item)
//             })
//             res.send(moviesArray)
//             console.log('moviesarray',moviesArray)
//         })
//     }
//     catch (error) {
//         console.log('error from axios', error)
//         res.send(error)
//     }

//     console.log('after axios');

// }
server.get('/movies', handleMovie)
server.get('*', (req, res) => {
    res.status(500).send('not found')
})


