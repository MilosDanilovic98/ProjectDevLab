var url =
  "https://newsapi.org/v2/everything?q=bitcoin&apiKey=e3fb4f5299d44066b025296877ccc8e4";
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
const modalContent = document.getElementById("modalContent");
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
  let counter = 0;
  for (let item of slideElements) {
    var readMore = document.createElement("a");

    readMore.classList.add("myButton");

    readMore.innerText = "Read More";
    readMore.setAttribute("id", "SliderArticleNumber" + counter);
    var image = document.createElement("IMG");
    var title = document.createElement("p");
    title.classList.add("carousel__item_text");
    title.appendChild(readMore);
    image.src = final.articles[counter].urlToImage;
    title.innerText = final.articles[counter].title;
    item.append(image);
    item.append(title);
    title.append(readMore);

    //modal

    counter++;
  }
  addEventsOnReadMore();
}

function addEventsOnReadMore() {
  // Get the modal
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };
  let readMoreButtons = document.getElementsByClassName("myButton");
  for (let item of readMoreButtons) {
    item.onclick = function () {
      let articleId = item.id.charAt(item.id.length - 1);

      modal.style.display = "block";
      modalContent.innerHTML = "";

      var image = document.createElement("IMG");
      image.src = final.articles[articleId].urlToImage;

      var urlToArticle = document.createElement("a");
      urlToArticle.innerText = "Read the Source";
      urlToArticle.href = final.articles[articleId].url;

      let articleDescription = document.createElement("p");
      articleDescription.innerText =
        "Description: " + final.articles[articleId].description;

      let articleTitle = document.createElement("p");
      articleTitle.innerText = final.articles[articleId].title;

      let articleAuthor = document.createElement("p");
      articleAuthor.innerText =
        "The author: " + final.articles[articleId].author;

      let articleDate =
        "Published At: " + new Date(final.articles[articleId].publishedAt);

      modalContent.append(articleTitle);
      modalContent.append(image);
      modalContent.append(articleAuthor);
      modalContent.append(articleDescription);
      modalContent.append(urlToArticle);
      modalContent.append(articleDate);
    };
  }
}
