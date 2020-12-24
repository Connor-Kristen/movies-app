$(document).ready(function () {

    const leftArrow = $('#left-arrow');
    const rightArrow = $('#right-arrow');
    const lsh = $('#lsh');
    const lsh2 = $('#lsh2');
    const carousel = $('#carousel');


    leftArrow.on('click', function () {
     carousel.scrollLeft(lsh.width());
    });

    rightArrow.on('click', function () {
        carousel.scrollLeft(-lsh.width());
    })


})