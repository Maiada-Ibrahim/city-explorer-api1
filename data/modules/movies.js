const axios = require('axios'); 
module.exports = handleMovie; 

//--------------------------------------------------------------------------------------------------------------------------
// http://localhost:3001/movies?&query=jone

function getmovies (req, res) {
    let cityname = req.query.cityname
    // console.log(moviesname)
    let url =`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${cityname}`
    console.log('before axios');
    try  {
        axios.get(url).then((moviesResults) => {
            console.log('inside axios');

            console.log('first',moviesResults.data)
            let moviesArray = moviesResults.data.results.map(item => {
                return new Forcastmovies(item)
            })
            res.send(moviesArray)
            console.log('moviesarray',moviesArray)
        })
    }
    catch (error) {
        console.log('error from axios', error)
        res.send(error)
    }

    console.log('after axios');

}




class Forcastmovies {
    constructor(item) {
        this.title =item.original_title
        this.overview = item.overview
        this.vote_average=item.vote_average
        this.vote_count=item.vote_count
        this.image_url=`https://image.tmdb.org/t/p/w500/${item.poster_path}`
        this.popularity=item.popularity
        this.release_date=item.release_date


    }

}