// for setting HTML

"use strict";
$(document).ready(function () {

    $(".main-container").hide();
    const footer = $('.footer');
    const addMovie = $('.add-movie');
    const movieSelect = $(".movie-select");
    const editModal = $('.edit-movie-modal');

    movieSelect.hide()

    moviesObjArr().then(function () {
        $('.loading-screen').hide();
        $(".main-container").show();
        movieSelect.show();
    });

    moviesObjArr().then(console.log);


    const buildHtml = ({title, plot, id}) => `
             <dl class="movieInfo">
                 <dt class="movie-title">${title}</dt>
                 <dd class="description">${plot}</dd>
                 <button class="delete-btn" data-id=${id}>delete</button>
             </dl>`

    const buildEditTitles = (title) =>
        `<div class="initial-pick">${title}</div>`

    const renderEditTitles = () => {
        moviesObjArr()
            .then(data => {
                for (const movies of data) {
                editModal.append(buildEditTitles(movies.title))
                }
            })
    }
    renderEditTitles();


    const setHtml = () => {
        moviesObjArr().then(data => {
            for (const movies of data) {
                footer.html(buildHtml(movies));
                movieSelect.append(buildHtml(movies))
            }
        })
    }
    setHtml();

    // $('.star').each(function () {
    //     console.log($(this).data('rated'));
    //
    // })

    // addMovie.on('click', () => {
    //     addMovies().then( () => {
    //     })
    // })

    $('#add-movie').on("click", () =>  {
        const title = $('#add-title').val();
        const year = $('#add-year').val();
        // figure out rating later
        getMovieInfo(title, year)
            // .then(console.log)
            .then(data => addMovies(data)
                .then(data => {
                    movieSelect.append(buildHtml(data));
                    moviesObjArr().then(console.log);
                }))
            .catch(console.error)

    });

movieSelect.on('click', '.delete-btn', (e) => {
    e.preventDefault();
   deleteIds($(e.target).data('id'))
       .then(() => {
           console.log($(e.target).parent().css('display', 'none'));
           moviesObjArr().then(console.log);
       })
})


});