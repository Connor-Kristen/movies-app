// functions to do the calling back and forth

"use strict";
    const moviesURL = 'https://mewing-typical-stage.glitch.me/movies';
    const omdbMainURL =  `http://www.omdbapi.com/?apikey=${omdbKey}`
    const omdbPosters = 'http://img.omdbapi.com/'


    function Constructor(movie) {
        const {
            title,
            year,
            rating,
            poster,
            genre,
            director,
            plot,
            actors
        } = movie;
        Object.assign(this, movie);
        // this.id = 4;
        // this.id += 1;
    }

    let movieConstructor = new Constructor({
        title: "Lord of the Rings",
        year: "2001",
        rating: "5",
        poster: "there will be a poster here",
        genre: "Fantasy",
        director: "Peter Jackson",
        plot: "People forget about eagles for 3 whole movies.",
        actors: "Elijah Wood"
    })

    movieConstructor.id = 5;


    console.log(movieConstructor);


    const addOption = {
        method: 'POST',
    }

    function moviesObjArr () {
        return fetch(moviesURL)
            .then(res => res.json())
            .catch(console.error)
    }

    fetch(`${omdbMainURL}&t=eureka`).then(res => res.json())
        .then(console.log);

    const addMovies = () =>
        fetch(`${moviesURL}`, addOption)
            .then(res => res.json());



    function getMovieInfo (title, year) {
        return fetch(`${omdbMainURL}&t=${title}&y=${year}`)
            .then(res => res.json())
            .then(data => {
            let Data = new Constructor({
                title: data.Title,
                year: data.Year,
                rating: data.Ratings[0].Value,
                poster: data.Poster,
                genre: data.Genre,
                director: data.Director,
                plot: data.Plot,
                actors: data.Actors
            })
                data.id = 5;
                return Data;
            })
            .catch(console.error);
    }

    getMovieInfo("Lord of the Rings", "2001").then(console.log)

    function deleteIds (id) {
            fetch(`${moviesURL}/${id}`, {"method": "delete"})
                .then(res => res.json())
                .then(console.log)
        }

    // deleteIds();

    // function that returns new movie object that we can add