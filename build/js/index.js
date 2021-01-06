$(document).ready(function () {

    const carousel = $('.carousel');
    const selectedPoster = $('#poster_selected');
        carousel.slick({
            prevArrow: `<button type="button" class="slick-prev carousel_btn">
                            <i class="fas fa-arrow-left text-gray-600"></i>
                        </button>`,
            nextArrow: `<button type="button" class="slick-next carousel_btn">
                            <i class="fas fa-arrow-right text-gray-600"></i>   
                        </button>`,
            centerMode: true,
            mobileFirst: true,
            slidesToShow: 1,
            swipeToSlide: true,
            centerPadding: '60px',
            responsive: [
                {
                    breakpoint: 424,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1225,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 2000,
                    settings: {
                        slidesToShow: 7,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    const renderMovieCard = (movie) => {
        let html = ''
        movie.forEach((movie) => {
            const {title, poster, id} = movie;
            html += `<div class="carousel_slide">
                    <div id="${id}" class="movie">
                    <img class="carousel_img" src="${poster}" alt="movie poster for ${title}">
                    <div class="text-xs w-40 mt-2">
                        ${title}
                    </div>
                </div>
            </div>`
        });
        return html;
    }

    getMovies().then(data => {
        carousel.slick('slickAdd', renderMovieCard(data))
        selectedPoster.html(`<img src="${data[0].poster}" alt="" class="inline w-9/12 mx-auto py-3">`)
    })

    $(document).on('click', '.movie', function () {
        getMovieId($(this).attr('id')).then(data => {
            selectedPoster.html(`<img src="${data.poster}" alt="large poster for ${data.title}" class="inline w-9/12 mx-auto py-3">`)
        });
    });
})