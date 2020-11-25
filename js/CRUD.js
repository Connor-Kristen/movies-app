// functions to do the calling back and forth

"use strict";
    const moviesURL = 'https://mewing-typical-stage.glitch.me/movies';
    const omdbMainURL =  `http://www.omdbapi.com/?apikey=${omdbKey}`
    const omdbPosters = 'http://img.omdbapi.com/'
    let initialId = 4;
    const newMovieObj = {
        title: "",
        rating: "",
        poster: "",
        year: "",
        genre: "",
        director: "",
        plot: "",
        actors: "",
        id: initialId += 1
    }

    const addOption = {
        method: 'POST',
        body: JSON.stringify(newMovieObj)
    }

    function moviesObjArr () {
        return fetch(moviesURL)
            .then(res => res.json())
            .catch(console.error)
    }

    fetch(`${omdbMainURL}&t=princess+bride&y=1987`).then(res => res.json())
        .then(console.log);

    const addMovies = () =>
        fetch(`${moviesURL}`, addOption)
            .then(res => res.json());

    // const deleteMovie = () =>





















