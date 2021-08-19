const axios = require('axios'); 
module.exports = handleweather; 
// http://localhost:3001/weather?city=Amman

function handleweather (req, res) {
    // let lat = req.query.lat
    // console.log(lat)
    // let lon = req.query.lon
    let city = req.query.city
    console.log(city)
    // let url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    let url =`https://api.weatherbit.io/v2.0/forecast/daily?city=${city},&key=${process.env.WEATHER_API_KEY}`


    
   // console.log('before axios');
    try  {
        axios.get(url).then((whetherResults) => {
       //     console.log('inside axios');

        //    console.log(whetherResults.data.data)
            let wetherArray = whetherResults.data.data.map(item => {
                return new Forcast(item)
            })
            res.send(wetherArray)
          //  console.log(wetherArray)
        })
    }
    catch (error) {
        console.log('error from axios', error)
        res.send(error)
    }

   // console.log('after axios');

}


class Forcast {
    constructor(item) {
        this.data =item.valid_date
        this.description = item.weather.description
        this.temp=item.temp
    }

}