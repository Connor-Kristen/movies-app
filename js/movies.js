// for setting HTML

"use strict";
$(document).ready(function () {

    $(".main-container").hide();
    $(".movie-select").hide()
    const footer = $('.footer');
    const addMovie = $('.add-movie');
    const movieSelect = $(".movie-select")

    moviesObjArr().then(function () {
        $('.loading-screen').hide();
        $(".main-container").show();
        $(".movie-select").show()
    });

    moviesObjArr().then(console.log);


    const buildHtml = ({title, plot}) => `<dl class="movieInfo">
                <dt class="movie-title">${title}</dt>
                 <dd class="description">${plot}</dd>
                  <button>delete</button>
                                               </dl>`
    // add Promise.race to hide the Loading...

    const setHtml = () => {
        moviesObjArr().then(data => {
            for (const movies of data) {
                footer.html(buildHtml(movies));
                movieSelect.append(buildHtml(movies));
            }
        })
    }
    setHtml();

addMovie.on('click', () => {
    addMovies().then( () => {
    })
})


});