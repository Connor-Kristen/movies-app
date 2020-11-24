// functions to do the calling back and forth

"use strict";


$(document).ready(function () {


    const moviesURL = 'https://mewing-typical-stage.glitch.me/movies';

    function moviesObjArr () {

        return fetch(moviesURL)
            .then(res => res.json())
            .catch(console.error)
    }

    moviesObjArr().then(function() {
        $('.loading-screen').hide();
    });















});

