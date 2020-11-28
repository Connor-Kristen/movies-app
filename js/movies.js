// for setting HTML

"use strict";
$(document).ready(function () {

    $(".main-container").hide();
    const infoBox = $('.info-box');
    const addMovie = $('#add-movie');
    const movieSelect = $(".movie-select");
    const editModal = $('.edit-movie-modal');

    movieSelect.hide()

    moviesObjArr().then(function () {
        $('.loading-screen').hide();
        $(".main-container").show();
        movieSelect.show();
    });

    moviesObjArr().then(console.log);


    const buildHtml = ({title, poster, id}) => `
             <dl class="movieInfo">
                <div class="img">
                    <img src=${poster} class="movie-poster">
                </div>
                <dt class="movie-title">${title}</dt>
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
                // infoBox.html(buildHtml(movies));
                movieSelect.append(buildHtml(movies))
            }
        })
    }
    setHtml();
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

    addMovie.on("click", () =>  {
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
                    submitEdit(data, $(e.target).data("attribute"))
                }
            })
    });

    const submitEdit = (dataObj, id) => {
        $('#edit-movie').on("click", (e) => {
            e.preventDefault();
            const change = $('.movie-inputs');
            let movieInfoArray = Array.from(change.map(function () {
                return $(this).val();
            }))
            editMovie({
                title: movieInfoArray[0],
                year: movieInfoArray[1],
                imdbRating: movieInfoArray[2],
                poster: movieInfoArray[3],
                genre: movieInfoArray[4],
                director: movieInfoArray[5],
                plot: movieInfoArray[6],
                actors: movieInfoArray[7],
                id: id,
            }, id).then(() => {
                moviesObjArr().then(console.log);
            })
        })
    }

    $('#add').on('click', () => {
        $('.modal').fadeIn();

    })
    $(document).click((e) => {
        if ($(e.target).closest('.modal, #add').length === 0) {
            $('.modal').fadeOut();
        }
    })

    $('#edit').on('click', () => {
        $('.edit-movie-modal').fadeIn();

    })
    $(document).click((e) => {
        if ($(e.target).closest('.edit-movie-modal, #edit').length === 0) {
            $('.edit-movie-modal').fadeOut();
        }
    })

    $('.hamburger').on("click", function() {
        $('.side-bar').animate({width: "toggle"}, 300)
    })

    $('.side-bar').hide();

    $(document).click((e) => {
        if ($(e.target).closest('.side-bar, .hamburger').length === 0) {
            $('.side-bar').animate({"width": 0}, 300)

        }
    })


});