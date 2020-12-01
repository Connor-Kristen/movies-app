// functions to do the calling back and forth

"use strict";

// urls and header
    const moviesURL = 'https://mewing-typical-stage.glitch.me/movies';
    const omdbMainURL =  `http://www.omdbapi.com/?apikey=${omdbKey}`
    const header = {'Content-Type': 'application/json'};
// constructor for adding movie obj
function Constructor(movie) {
        const {
            title,
            year,
            criticRatings,
            userRating,
            poster,
            genre,
            director,
            plot,
            actors,
            id
        } = movie;
        Object.assign(this, movie);
    }
    // function making request to get movie array
    function moviesObjArr () {
        return fetch(moviesURL)
            .then(res => res.json())
            .catch(console.error)
    }
    //function making request to add movie
    const addMovies = (movieInfo) =>
        fetch(`${moviesURL}`, {method: "POST",  headers: header, body: `${JSON.stringify(movieInfo)}`})
            .then(res => res.json())
            .catch(console.error)
//function the get specific movie to add
    function getMovieInfo (title, year, rating) {
        return fetch(`${omdbMainURL}&t=${title}&y=${year}`)
            .then(res => res.json())
            .then(data => {
                return new Constructor({
                    title: data.Title,
                    year: data.Year,
                    criticRatings: data.Ratings,
                    userRating: rating,
                    poster: data.Poster,
                    genre: data.Genre,
                    director: data.Director,
                    plot: data.Plot,
                    actors: data.Actors,
                    id: Date.now()
                });
            })
            .catch(console.error);
    }
//function to make request to delete movie
    function deleteIds (id) {
           return fetch(`${moviesURL}/${id}`, {"method": "delete", headers: header})
                .then(res => res.json())
               .catch(console.error)
        }
//function to make request to eddit movie
    const editMovie = (movieObj, id) => {
               return fetch(`${moviesURL}/${id}`, {method: "PATCH", headers: header,
                   body: `${JSON.stringify(movieObj)}`})
                    .then(res => res.json())
                    .catch(console.error)
    }
//function to make request to get information to append
    function appendInfo (id) {
        return fetch(`${moviesURL}/${id}`, {"method": "GET", headers: header})
            .then(res => res.json())
            .catch(console.error)
    }

