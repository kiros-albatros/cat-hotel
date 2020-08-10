//comments slider

var slider = tns({
    container: '.comments__list',
    items: 1,
    controls: true,
    navAsThumbnails: true,
    prevButton: '.comment__prev',
    nextButton: '.comment__next',
    navContainer: '.comments__controls',
    center: true,
    rewind: true,
    mouseDrag: true,
    responsive: {
        700: {
            items: 1.5,
            edgePadding: 20,
            center: true,
            loop: true,
        },
        1000: {
            items: 1.5,
            edgePadding: 0,
            center: true,
            loop: true,
        },
        1200: {
            items: 2.5,
            edgePadding: 0,
            center: false,
            loop: true,
            rewind: false
        }

    }
});

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


// book

let bookPopup = document.querySelector(".book-popup");
let bookCross = document.querySelector(".book__cross");
let bookForm = document.querySelector(".book__form");

numbersContainer.addEventListener("click", function (event) {
    console.log(event.target);
    if (event.target.classList.contains('book-button')) {
        blurBackground.classList.add("show-blur");
        bookPopup.classList.add("show-book-popup");

        // AJAX

        bookForm.addEventListener("submit", function (event) {
            console.log('start ajax');
            event.preventDefault();

            let bookRequest = new XMLHttpRequest();
            bookRequest.open("POST", "server.php");
            bookRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            let bookData = new FormData(bookForm);
            bookRequest.send(bookData);
            let message = document.createElement("div");
            bookPopup.append(message);

            bookRequest.addEventListener("readystatechange", function () {
                if (bookRequest.readyState < 4) {
                    message.innerHTML = "Загрузка...";
                } else if (bookRequest.readyState === 4 && bookRequest.status == 200) {
                    message.innerHTML = "Номер забронирован";
                    bookForm.reset();
                } else {
                    message.innerHTML = "Что-то пошло не так";
                }
            });
        });

        // finish AJAX
    }
});


bookCross.addEventListener("click", function () {
    blurBackground.classList.remove("show-blur");
    bookPopup.classList.remove("show-book-popup");
});