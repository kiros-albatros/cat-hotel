// build cards

let numbersContainer = document.querySelector(".numbers");
let oneNumber = "";

window.onload = drawCards(numbersArray);

function drawCards(array) {
  let numbersContainer = document.querySelector(".numbers");
  for (let i = 0; i < array.length; i++) {
    oneNumber = `<div class="number">
            <p class="number__picture">
                <img src= ${array[i]["image"]} alt="" width="270">
            </p>
            <div class="number__content">
    <h5 class="number__title">${array[i]["title"]}</h5>
    <p class="number__size">Размеры (ШхГхВ) - ${array[i]["size"]} см</p>
    <p class="number__area">Площадь - ${array[i]["area"]} м2</p>
    <div class="equipment__wrapper">
        <p class="number__equipment">Оснащение номера</p>
        <div class="equipment__pics">${array[i]["equipment"]}</div>
    </div>
    <p class="number__price">Цена за сутки: <span class="price__item"> ${array[i]["price"]} ₽</span></p>
    <button class="button button-colored book-button">Забронировать</button></div>
    </div>`;
    numbersContainer.innerHTML += oneNumber;
  }
}

//sort

function sortByPriceDown() {
  numbersArray.sort((a, b) => (Number(a.price) < Number(b.price) ? 1 : -1));
  numbersContainer.innerHTML = "";
  drawCards(numbersArray);
}

function sortByPriceUp() {
  numbersArray.sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1));
  numbersContainer.innerHTML = "";
  drawCards(numbersArray);
}

function sortByAreaUp() {
  numbersArray.sort((a, b) => (Number(a.area) > Number(b.area) ? 1 : -1));
  numbersContainer.innerHTML = "";
  drawCards(numbersArray);
}

function sortByAreaDown() {
  numbersArray.sort((a, b) => (Number(a.area) < Number(b.area) ? 1 : -1));
  numbersContainer.innerHTML = "";
  drawCards(numbersArray);
}

let select = document.querySelector("#select__list");
select.addEventListener("change", function (event) {
  console.log(select.value);
  switch (select.value) {
    case "priceDown":
      sortByPriceDown();
      break;

    case "priceUp":
      sortByPriceUp();
      break;

    case "areaUp":
      sortByAreaUp();
      break;

    case "areaDown":
      sortByAreaDown();
      break;
    default:
      sortByAreaUp();
  }
});

let burger = document.querySelector(".burger");
let mobileMenu = document.querySelector(".navigation__list");
burger.addEventListener("click", function () {
  mobileMenu.classList.toggle("show-nav");
});

// filter tablet

let showFilterButton = document.querySelector(".show-filter__button");
let filter = document.querySelector(".filter");
let blurBackground = document.querySelector(".popup-background");
let filterCross = document.querySelector(".filter__cross");

showFilterButton.addEventListener("click", function () {
  filter.classList.add("show-filter");
  blurBackground.classList.add("show-blur");
});

function closeFilter() {
  filter.classList.remove("show-filter");
  blurBackground.classList.remove("show-blur");
}

filterCross.addEventListener("click", closeFilter);

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    closeFilter();
  }
});

blurBackground.addEventListener("click", closeFilter);

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

// ФИЛЬТРАЦИЯ СЛЕВА

let filterForm = document.querySelector(".filter__form");
let resetFilterButton = document.querySelector(".reset-button");
let afterFilterArray = [];
let finalFilterArray = [];
var filterFeatures = {};
let nativeCheckboxes = document.querySelectorAll(".native-checkbox");
resetFilterButton.addEventListener("click", function (event) {
  event.preventDefault();
  filterForm.reset();
  numbersContainer.innerHTML = "";
  drawCards(numbersArray);
});

// получаем фильтры из формы в объект

filterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let startPrice = document.querySelector("input[name=start-price]").value;
  let finishPrice = document.querySelector("input[name=finish-price]").value;
  filterFeatures[startPrice] = startPrice;
  filterFeatures[finishPrice] = finishPrice;
  for (let i = 0; i < nativeCheckboxes.length; i++) {
    let checkedFeature = nativeCheckboxes[i].getAttribute("id");
    if (nativeCheckboxes[i].checked) {
      filterFeatures[checkedFeature] = true;
    } else {
      filterFeatures[checkedFeature] = false;
    }
  }
  console.log(filterFeatures);


  for (key in filterFeatures) {
    for (let z = 0; z < numbersArray.length; z++) {
      if (filterFeatures[key] == true && numbersArray[z][key] == true) {
        if (afterFilterArray.indexOf(numbersArray[z]) == -1) {
          afterFilterArray.push(numbersArray[z]);
        }
      }
    }
  }

  for (let j = 0; j < afterFilterArray.length; j++) {
    if ((afterFilterArray[j]['price'] >= startPrice) && (afterFilterArray[j]['price'] <= finishPrice)) {
      finalFilterArray.push(afterFilterArray[j]);
    }
  }

  numbersContainer.innerHTML = "";
  drawCards(finalFilterArray);
});