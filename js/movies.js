// for setting HTML

"use strict";
$(document).ready(function () {

    $(".main-container").hide();
    const infoBox = $('.info-box');
    const addMovie = $('#add-movie');
    const movieSelect = $(".movie-select");
    const editModal = $('.edit-movie-modal');

    $('.banner-add, .main-container, .nav').hide()

    moviesObjArr().then(function () {
        $('.loading-screen').hide();
        $('.banner-add, .main-container, .nav').show()
    });

    moviesObjArr().then(console.log);


    const buildHtml = ({title, poster, id}) => `
             <dl class="movieInfo">
                <div class="img" data-id=${id}>
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
        </form>`


    const setRatings = (ratingArr) => {
        let html = ""
        ratingArr.forEach((rating) => {
            html += `<label for=${rating.Source}>${rating.Source}:</label>
                <input class="movie-inputs" id=${rating.Source}\ value="${rating.Value}" type="text">`
        });
        html += '<button id="edit-movie">Edit Movie</button>'
        return html;
    }

    $('.star').on('click', function () {
        const title = $('#add-title').val();
        const year = $('#add-year').val();
        getMovieInfo(title, year, $(this).data('rated'))
            .then(data => addMovie.on("click", () =>  {
                        addMovies(data)
                        .then(data => {
                            movieSelect.prepend(buildHtml(data));
                            editModal.append(buildEditTitles(data.title, data.id))
                            moviesObjArr().then(console.log);
                        })
                        .catch(console.error)
            }))
            .catch(console.error)
    })

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
                        editModal.append(setRatings(movies.criticRatings))
                        console.log(movies);
                    }
                }
                submitEdit($(e.target).data("attribute"))
                userRatingEdit($(e.target).data("attribute"))
            })
    });

    const submitEdit = (id) => {
        $('#edit-movie').on("click", (e) => {
            e.preventDefault();
            const change = $('.movie-inputs');
            let movieInfoArray = Array.from(change.map(function () {
                return $(this).val();
            }))
            editMovie({
                title: movieInfoArray[0],
                year: movieInfoArray[1],
                poster: movieInfoArray[2],
                genre: movieInfoArray[3],
                director: movieInfoArray[4],
                plot: movieInfoArray[5],
                actors: movieInfoArray[6],
                criticRatings: [{Source: "Internet Movie Database", Value: movieInfoArray[7]},
                                        {Source: "Rotten Tomatoes", Value: movieInfoArray[8]},
                                        {Source: "Metacritic", Value: movieInfoArray[9]}],
            }, id).then(() => {
                moviesObjArr().then(console.log);
            })
            console.log(movieInfoArray);
        })
    }

    const userRatingEdit = (id) => {
        $('.star').on('click', function () {
            let rating = $(this).data('rated')
            $('#edit-movie').on("click", (e) => {
                e.preventDefault();
                editMovie({userRating: rating}, id)
                    .then(console.log)
            })
        })
    }


    $('.modal').hide();
    $('.edit-movie-modal').hide();

    $('#add').on('click', () => {
        $('.modal').fadeIn();

    })
    $(document).click((e) => {
        if ($(e.target).closest('.modal, #add').length === 0) {
            $('.modal').fadeOut();
        }
    })

    $('#edit').on('click', () => {
        editModal.fadeIn();

    })

    $(document).click((e) => {
        if ($(e.target).closest('.edit-movie-modal, #edit').length === 0) {
            editModal.fadeOut();
        }
    })

    $('.side-bar').css({width: 0})
    $('.movie-functions').css('font-size', 0)
    $('.hamburger').on("click", function() {
        $('.side-bar').animate({width: "150px"}, 300);
        $('.movie-functions').animate({'font-size': '1em'}, 300)
    })

    $(document).click((e) => {
        if ($(e.target).closest('.side-bar, .hamburger').length === 0) {
            $('.side-bar').animate({"width": 0}, 300);
            $('.movie-functions').animate({'font-size': 0}, 300);
        }
    })

    function buildHtmlInfoBox (movie) {
        const {title, year, plot, actors, director, criticRatings} = movie;
        let html = `
            <div id="title-info">Title: ${title}</div>
            <div id="year-info">Year: ${year}</div>
            <div id="plot-info">Plot: ${plot}</div>
            <div id="actors-info">Actors: ${actors}</div>
            <div id="directors-info">Directors: ${director}</div>`

        criticRatings.forEach(function(rating, i) {
            if (i === 0) {
                html += "<div>"
            }
            html += `<div id='ratings-info'>${rating.Source} -> ${rating.Value}</div>`
            if (criticRatings.length - 1 === i) {
                html += "</div>"
            }
        })
        // console.log(movie);
        return html;
    }

    $('body').on('click', '.img', function () {
        appendInfo($(this).data('id'))
            .then(data => {
                $('.info-box').html(buildHtmlInfoBox(data))
                $('.video-box').html(`<img src=${data.poster} class="video-player">`)
            })

    })


    $(window).scroll(function () {
    const currentPos = $(this).scrollTop();
    if (currentPos >=parseFloat($('.banner-add').css('height'))) {
          $('.nav').css({position: 'fixed', 'background-color': 'rgba(0,0,0,.5)'});
        $('.side-bar').css({top: 0});
    } else {
        $('.nav').css({position: 'static', 'background-color': 'transparent'});
        $('.side-bar').offset({top: 50});
    }
})

    $('#close-side').on("click", function () {
        $('.side-bar').animate({"width": 0}, 300);
        $('.movie-functions').animate({'font-size': 0}, 300);
    })

    $(document).on('mouseover', '.star',function () {
        $(this).css('color', 'yellow')
    })
        .on('mouseout', '.star',function () {
            $(this).css('color', '#bbb')
        });

    $('.fa-search').on("click", function() {
        // $('#massive-search, #search-bar').animate({width: "100vw"}, 300);
        // $('#massive-search').show()
        $('#search-bar').css("opacity", 1);
        $('#massive-search').css("background", "rgba(0,0,0,.7");
        $('div:not(#massive-search)').css("filter", "blur(3px)");
        if (!$('#massive-search').hasClass('slideToTheLeft')) {
            $('#massive-search').addClass('slideToTheLeft')
        }
    })


});