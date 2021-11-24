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
const slides = document.getElementsByClassName("carousel__item");
const totalSlides = slides.length;

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

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }

  updateSlidePosition();
}

function addImages() {
  var readMore = document.createElement("a");
  readMore.classList.add("myButton");
  readMore.innerText = "Read More";

  let counter = 0;
  for (let item of slides) {
    var readMore = document.createElement("a");
    readMore.classList.add("myButton");
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

    counter++;
  }
}
