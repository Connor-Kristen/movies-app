// for setting HTML

"use strict";
$(document).ready(function () {

    $(".main-container").hide();
    const footer = $('.footer');
    const addMovie = $('.add-movie');
    const movieSelect = $(".movie-select")

    movieSelect.hide()

    moviesObjArr().then(function () {
        $('.loading-screen').hide();
        $(".main-container").show();
        movieSelect.show();
    });

    moviesObjArr().then(console.log);


    const buildHtml = ({title, plot}) => `<dl class="movieInfo">
                <dt class="movie-title">${title}</dt>
                 <dd class="description">${plot}</dd>
                 <button data-title=${title.split(" ").join("")}>delete</button>
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

    // addMovie.on('click', () => {
    //     addMovies().then( () => {
    //     })
    // })

    $('#add-movie').on("click", () =>  {
        const title = $('#add-title').val();
        const year = $('#add-year').val();
        // figure out rating later
        getMovieInfo(title, year)
            .then(addMovies);
    });




});