// functions to do the calling back and forth

"use strict";
    const moviesURL = 'https://mewing-typical-stage.glitch.me/movies';
    const omdbMainURL =  `http://www.omdbapi.com/?apikey=${omdbKey}`
    // const omdbPosters = 'http://img.omdbapi.com/'

function Constructor(movie) {
        const {
            title,
            year,
            imdbRating,
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
        fetch(`${moviesURL}`, {method: "POST",  headers: {'Content-Type': 'application/json'}, body: `${JSON.stringify(movieInfo)}`})
            .then(res => res.json())
            .catch(console.error)

    function getMovieInfo (title, year, rating) {
        return fetch(`${omdbMainURL}&t=${title}&y=${year}`)
            .then(res => res.json())
            .then(data => {
                return new Constructor({
                    title: data.Title,
                    year: data.Year,
                    imdbRating: data.Ratings[0].Value,
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

// getMovieInfo("Lord of the Rings", "2001").then(data => {
//     console.log(JSON.stringify(data));
// })

    function deleteIds (id) {
            fetch(`${moviesURL}/${id}`, {"method": "delete"})
                .then(res => res.json())
                .then(console.log)
        }

    // deleteIds(1606446082756);
    // deleteIds(1606446232055);
    // deleteIds(1606446370437);
    // deleteIds(8);
    // deleteIds(9);
    // deleteIds(10);
    // deleteIds();

    // function that returns new movie object that we can add