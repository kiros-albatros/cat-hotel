let sliderpPoints = document.querySelectorAll('.slider__point');
for (let i = 0; i < sliderpPoints.length; i++) {
    sliderpPoints[i].addEventListener("click", function () {
        for (let j = 0; j < sliderpPoints.length; j++) {
            sliderpPoints[j].classList.remove('point-active');
        }
        this.classList.add('point-active');
    })
}

// rooms slider

var Roomsslider = tns({
    container: '.rooms__slider',
    items: 1,
    controls: true,
    navAsThumbnails: true,
    prevButton: '.rooms__prev',
    nextButton: '.rooms__next',
    navContainer: '.slider__controls',
    center: true,
    rewind: true,
});

// burger

let burger = document.querySelector('.burger');
let mobileMenu = document.querySelector('.navigation__list');
burger.addEventListener("click", function () {
    mobileMenu.classList.toggle('show-nav');
})