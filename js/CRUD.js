// functions to do the calling back and forth

"use strict";
    const moviesURL = 'https://mewing-typical-stage.glitch.me/movies';
    const omdbMainURL =  `http://www.omdbapi.com/?apikey=${omdbKey}`
    // const omdbPosters = 'http://img.omdbapi.com/'
    const header = {headers: {'Content-Type': 'application/json'}};

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

    function moviesObjArr () {
        return fetch(moviesURL)
            .then(res => res.json())
            .catch(console.error)
    }

    // fetch(`${omdbMainURL}&t=eureka`).then(res => res.json())
    //     .then(console.log);

    const addMovies = (movieInfo) =>
        fetch(`${moviesURL}`, {method: "POST",  header, body: `${JSON.stringify(movieInfo)}`})
            .then(res => res.json())
            .catch(console.error)

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

    function deleteIds (id) {
           return fetch(`${moviesURL}/${id}`, {"method": "delete", header})
                .then(res => res.json())
               .catch(console.error)
        }

    const editMovie = (movieObj, id) => {
               return fetch(`${moviesURL}/${id}`, {method: "PATCH", header,
                   body: `${JSON.stringify(movieObj)}`})
                    .then(res => res.json())
                    .catch(console.error)
    }

    function appendInfo (id) {
        return fetch(`${moviesURL}/${id}`, {"method": "GET", header})
            .then(res => res.json())
            .catch(console.error)
    }

