// for setting HTML

"use strict";
$(document).ready(function () {

    const movieContainer = $('.footer');
    const addMovie = $('.add-movie');

    $('.loading-screen').show();
    moviesObjArr().then(function () {
        $('.loading-screen').hide();
    });

    moviesObjArr().then(console.log);


    const buildHtml = ({title, plot}) => `<dl class="movieInfo">
                <dt class="movie-title">${title}</dt>
                 <dd class="description">${plot}</dd>
                                               </dl>`
    // add Promise.race to hide the Loading...

    const setHtml = () => {
        moviesObjArr().then(data => {
            for (const movies of data) {
                movieContainer.html(buildHtml(movies))
            }
        })
    }
    setHtml();

addMovie.on('click', () => {
    addMovies().then( () => {
        movieContainer.append("hello");
    })
})


});