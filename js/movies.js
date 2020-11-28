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

    const buildEditTitles = (title, id) =>
        `<div class="initial-pick" data-attribute=${id}>${title}</div>`

    const renderEditTitles = () => {
        moviesObjArr()
            .then(data => {
                for (const movies of data) {
                    editModal.append(buildEditTitles(movies.title, movies.id))
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
    const editInfo = (obj) =>
        `<form class="edit-movie-form">
        <div id="edit">
            <span>Edit User Score</span>
            <i class="fas fa-star star" data-rated="1"></i>
            <i class="fas fa-star star" data-rated="2"></i>
            <i class="fas fa-star star" data-rated="3"></i>
            <i class="fas fa-star star" data-rated="4"></i>
            <i class="fas fa-star star" data-rated="5"></i>
        </div>
        <label for=${obj.title}>Edit Title</label>
        <input class="movie-inputs" id=${obj.title} value="${obj.title}\" type="text">
        <label for=${obj.year}>Edit Year</label>
        <input class="movie-inputs" id=${obj.year} value=${obj.year} type="number">
        <label for=${obj.imdbRating}>Edit IMDB Rating</label>
        <input class="movie-inputs" id=${obj.imdbRating} value=${obj.imdbRating} type="text">
        <label for=${obj.poster}>Edit Poster URL</label>
        <input class="movie-inputs" id=${obj.poster} value="${obj.poster}\" type="text">
        <label for=${obj.genre}>Edit Genre</label>
        <input class="movie-inputs" id=${obj.genre} value="${obj.genre}\" type="text">
        <label for=${obj.director}>Edit Director</label>
        <input class="movie-inputs" id=${obj.director} value="${obj.director}\" type="text">
        <label for=${obj.plot}>Edit Plot</label>
        <textarea class="movie-inputs" id=${obj.plot}>${obj.plot}</textarea>
        <label for=${obj.actors}>Edit Actors</label>
        <input class="movie-inputs" id=${obj.actors} value="${obj.actors}\" type="text">
        <button id="edit-movie">Edit Movie</button>
   
    </form>`



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

    editModal.on("click", ".initial-pick", (e) => {
        $('.initial-pick').hide();
        moviesObjArr()
            .then(data => {
                for (const movies of data) {
                    if ($(e.target).data("attribute") === movies.id) {
                        editModal.html(editInfo(movies))
                    }
                }
                $('#edit-movie').on("click", (e) => {
                    e.preventDefault();
                    const editArr = [];
                    const test = $('.movie-inputs').map(function () {
                        return $(this).val();
                        // editArr.push($(this).val())
                    })

                    console.log(Object.assign({}, test));
                    console.log(editArr);

                })
            })
    })



});