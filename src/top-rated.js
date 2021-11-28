var url =
  "https://newsapi.org/v2/everything?q=bitcoin&apiKey=e3fb4f5299d44066b025296877ccc8e4";
var topRatedRes;
var req = new Request(url);
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (obj) {
    topRatedRes = obj;
    addElementsToTopRated();
  });

const topRatedContainer = document.getElementById("top-rated-container");
const loadMoreBtn = document.getElementById("loadMoreBtn");
loadMoreBtn.addEventListener("click", loadMore);

function addElementsToTopRated() {
  let counter = 0;
  for (let item of topRatedRes.articles) {
    let topRatedItem = document.createElement("div");
    topRatedItem.classList.add("top-rated-container-item");

    topRatedItem.style.backgroundImage = "url('" + item.urlToImage + "')";

    let topRatedItemTitle = document.createElement("p");
    topRatedItemTitle.innerText = item.title;

    let topRatedItemDescription = document.createElement("p");
    topRatedItemDescription.innerText = item.description;

    let topRatedItemSource = document.createElement("p");
    topRatedItemSource.innerText = item.source.name;

    topRatedItem.append(topRatedItemTitle);
    topRatedItem.append(topRatedItemDescription);
    topRatedItem.append(topRatedItemSource);
    if (counter > 2) {
      topRatedItem.style.display = "none";
    }
    topRatedContainer.append(topRatedItem);
    counter++;
  }
}

function loadMore() {
  let topRatedItems = document.getElementsByClassName(
    "top-rated-container-item"
  );
  let counter = 0;
  for (let item of topRatedItems) {
    if (counter < 3) {
      if (item.style.display === "none") {
        item.style.display = "block";
        counter++;
      }
    }
  }
}
