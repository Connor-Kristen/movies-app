// for setting HTML
"use strict";
//hide everything not dynamically added
$('.banner-add, .nav').hide()
$(document).ready(function () {
    //make sure canvas clear interval does not keep going
    clearInterval(canvInt)
    //selectors for html containers
    const addMovie = $('#add-movie');
    const movieSelect = $(".movie-select");
    const editModal = $('.edit-movie-modal');
    //hide modals by default
    $('.modal').hide();
    $('.edit-movie-modal').hide();
    //hide loading and show everything else once the
    moviesObjArr().then(function () {
        $('.loading-screen').hide();
        $('.banner-add, .nav').show()
    });
    //build html for the movie selection cards
    const buildHtml = ({title, poster, id}) => `
             <dl class="movieInfo">
                <div class="img" data-id=${id}>
                    <img src=${poster} class="movie-poster" alt="poster for ${title}\">
                </div>
                <dt class="movie-title wide">${title}</dt>
                 <button class="delete-btn" data-id=${id}>delete</button>
             </dl>`
    //build the selection of titles to edit on editing modal
    const buildEditTitles = (title, id) =>
        `<div class="initial-pick" data-attribute=${id}>${title}</div>`
    //render the title options
    const renderEditTitles = () => {
        moviesObjArr()
            .then(data => {
                let html = ""
                for (const [i, movies] of data.entries()) {
                    if (i === 0) {
                        html += '<div class="initial-pick">What Movie Would You Like To Edit</div>'
                    }
                    html += buildEditTitles(movies.title, movies.id)
                }
                editModal.html(html);
            })
    }
    //render the cards of movies to select from to
    const setHtml = () => {
        moviesObjArr().then(data => {
            for (const movies of data) {
                movieSelect.append(buildHtml(movies))
            }
        })
    }
    setHtml();
    //build the html to edit the title selected with fields already filled out
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
//append the array of critic ratings to what is set in function above
    const setRatings = (ratingArr) => {
        let html = ""
        ratingArr.forEach((rating) => {
            html += `<label for=${rating.Source}>${rating.Source}:</label>
                <input class="movie-inputs" id=${rating.Source}\ value="${rating.Value}" type="text">`
        });
        html += '<button id="edit-movie">Edit Movie</button>'
        return html;
    }
    //must click on user rating before clicking to add the movie
    $('.star').on('click', function () {
        const title = $('#add-title').val().toLowerCase();
        const year = $('#add-year').val();
        //pass in title and year to get the movie info
        getMovieInfo(title, year, $(this).data('rated'))
            //on  click, append the movie before and append the new edit option
            .then(data => addMovie.on("click", () => {
                addMovies(data)
                    .then(data => {
                        movieSelect.prepend(buildHtml(data));
                        editModal.append(buildEditTitles(data.title, data.id))
                        moviesObjArr().then(console.log);
                    })
                    .catch(console.error)
                $('.modal').fadeOut();
                $('#add-title, #add-year').val("");
            }))
            .catch(console.error)
    })
    //delete movie when delete btn pressed
    movieSelect.on('click', '.delete-btn', (e) => {
        e.preventDefault();
        deleteIds($(e.target).data('id'))
            .then(() => {
                $(e.target).parent().css('display', 'none')
                moviesObjArr().then(console.log);
            })
    })
    //when a movie to edit has been clicked, remove options and populate the movie info
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
//submit the final edit to change movie
    const submitEdit = (id) => {
        $('#edit-movie').on("click", (e) => {
            e.preventDefault();
            const change = $('.movie-inputs');
            let movieInfoArray = Array.from(change.map(function () {
                return $(this).val()
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
            $('.edit-movie-modal').fadeOut()
        })
    }
//submit edit to change user rating
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


//fade modal in
    $('#add').on('click', () => {
        $('.modal').fadeIn();

    })
    //fade modal out on click other than modal or modal link
    $(document).click((e) => {
        if ($(e.target).closest('.modal, #add').length === 0) {
            $('.modal').fadeOut();
        }
    })
//fade in edit modal with the titles to edit
    $('#edit').on('click', () => {
        editModal.fadeIn();
        renderEditTitles();
    })
//fade out edit modal when anything other than modal is pressed
    $(document).click((e) => {
        if ($(e.target).closest('.edit-movie-modal, #edit').length === 0) {
            editModal.fadeOut();
        }
    })
//set initial css values for sidebar
    $('#color').css('opacity', 0);
    $('.side-bar').css({width: 0})
    $('.movie-functions').css('font-size', 0)
    //slide sidebar in when hamburger clicked
    $('.hamburger').on("click", function () {
        $('.side-bar').animate({width: "150px"}, 300);
        $('#color').animate({'opacity': 1}, 300);
        $('.movie-functions').animate({'font-size': '1em'}, 300)
    })
//fade out when anything other than sidebar is clicked
    $(document).click((e) => {
        if ($(e.target).closest('.side-bar, .hamburger').length === 0) {
            $('.side-bar').animate({"width": 0}, 300);
            $('.movie-functions').animate({'font-size': 0}, 300);
            $('#color').animate({'opacity': 0}, 300);
        }
    })

//build html with info of movie populated
    function buildHtmlInfoBox(movie) {
        const {title, year, plot, actors, director, criticRatings} = movie;
        let html = `
            <div id="title-info">Title: ${title}</div>
            <div id="year-info">Year: ${year}</div>
            <div id="plot-info">Plot: ${plot}</div>
            <div id="actors-info">Actors: ${actors}</div>
            <div id="directors-info">Directors: ${director}</div>`
        criticRatings.forEach(function (rating, i) {
            if (i === 0) {
                html += "<div>"
            }
            html += `<div id='ratings-info'>${rating.Source} -> ${rating.Value}</div>`
            if (criticRatings.length - 1 === i) {
                html += "</div>"
            }
        })
        return html;
    }

// when poster is clicked, render the info for that movie and the poster
    $('body').on('click', '.img', function () {
        appendInfo($(this).data('id'))
            .then(data => {
                $('.info-box').html(buildHtmlInfoBox(data))
                $('.video-box').html(`<img src=${data.poster} class="video-player" alt="poster for ${data.title}">`)
            })

    })
//custom sticky nav
    $(window).scroll(function () {
        const currentPos = $(this).scrollTop();
        if (currentPos >= parseFloat($('.banner-add').css('height'))) {
            $('.nav').css({position: 'fixed', 'background-color': 'rgba(0,0,0,.5)'});
            $('.side-bar').css({top: 0});
        } else {
            $('.nav').css({position: 'static', 'background-color': 'transparent'});
            $('.side-bar').offset({top: 50});
        }
    })
//close sidebar when X is clicked
    $('#close-side').on("click", function () {
        $('#color').animate({'opacity': 0}, 300);
        $('.side-bar').animate({"width": 0}, 300);
        $('.movie-functions').animate({'font-size': 0}, 300);
    })
//hover effect for user rating stars
    $(document).on('mouseover', '.star', function () {
        $(this).css('color', 'yellow')
    })
        .on('mouseout', '.star', function () {
            $(this).css('color', '#edf2f4')
        });
//ridiculous search bar slide in
    $('.fa-search').on("click", function () {
        $('#search-bar').css("opacity", 1);
        $('#massive-search').css("background", "rgba(0,0,0,.7");
        $('div:not(#massive-search)').css("filter", "blur(3px)");
        if (!$('#massive-search').hasClass('slideToTheLeft')) {
            $('#massive-search').addClass('slideToTheLeft')
            $('#massive-search').removeClass('slideToTheRight')
        }
    })
//ridiculous search bar slide in
    $('#search-bar').on('input', function () {
        if ($(this).val().toLowerCase() === 'help me') {
            $('#massive-search').removeClass('slideToTheLeft')
            $('#massive-search').addClass('slideToTheRight')
            $('div:not(#massive-search)').css("filter", "none");
            $('#search-bar').val("");
        }
    })

});