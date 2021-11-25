var url =
  "https://newsapi.org/v2/top-headlines?" +
  "sources=bbc-news&" +
  "apiKey=e3fb4f5299d44066b025296877ccc8e4";
var final;
var req = new Request(url);
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (obj) {
    final = obj;
    addImages();
  });

let slidePosition = 0;
const carouselContainer = document.getElementById("carousel");
const slides = document.getElementsByClassName("carousel__item");
const slideElements = document.getElementsByClassName("carousel__element");
const totalSlides = slides.length;
slideTimer = setInterval(moveToNextSlide, 3000);
document
  .getElementById("carousel__button--next")
  .addEventListener("click", function () {
    moveToNextSlide();
  });
document
  .getElementById("carousel__button--prev")
  .addEventListener("click", function () {
    moveToPrevSlide();
  });

function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove("carousel__item--visible");
    slide.classList.add("carousel__item--hidden");
  }

  slides[slidePosition].classList.add("carousel__item--visible");
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }

  updateSlidePosition();
}
//turn slide very 3 seconds

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }

  updateSlidePosition();
}
function allowArrows(e) {
  switch (e.key) {
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
      moveToPrevSlide();

      break;

    case "Right": // IE/Edge specific value
    case "ArrowRight":
      moveToNextSlide();

      break;
  }
}
function inContainer() {
  document.addEventListener("keydown", allowArrows);
}
function removeEvent() {
  document.removeEventListener("keydown", allowArrows);
}
carouselContainer.addEventListener("mouseenter", inContainer);
carouselContainer.addEventListener("mouseleave", removeEvent);
function addImages() {
  // var readMore = document.createElement("a");
  // readMore.classList.add("myButton");
  // readMore.innerText = "Read More";

  let counter = 0;
  for (let item of slideElements) {
    var readMore = document.createElement("a");

    readMore.classList.add("myButton");
    readMore.setAttribute("id", "readMore");
    readMore.innerText = "Read More";

    var image = document.createElement("IMG");
    var title = document.createElement("p");
    title.classList.add("carousel__item_text");
    title.appendChild(readMore);
    image.src = final.articles[counter].urlToImage;
    title.innerText = final.articles[counter].title;
    item.append(image);
    item.append(title);
    title.append(readMore);
    console.log(title);

    //modal
    readMore.onclick = function () {
      modal.style.display = "block";
    };

    counter++;
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("readMore");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
