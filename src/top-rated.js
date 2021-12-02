var url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=e3fb4f5299d44066b025296877ccc8e4";
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
    if (counter < 10) {
      topRatedItem.setAttribute("id", "topRatedId0" + counter);
    } else {
      topRatedItem.setAttribute("id", "topRatedId" + counter);
    }

    topRatedItem.style.backgroundImage = "url('" + item.urlToImage + "')";

    let topRatedItemTitle = document.createElement("p");
    topRatedItemTitle.innerText = item.title;

    let topRatedItemDescription = document.createElement("p");
    topRatedItemDescription.innerText = item.description;
    if (topRatedItemDescription.innerText.length > 100) {
      topRatedItemDescription.innerText =
        topRatedItemDescription.innerText.slice(0, 100) + "...";
    }
    let topRatedItemSource = document.createElement("p");
    topRatedItemSource.classList.add("topRatedItemSource");
    topRatedItemSource.innerText = item.source.name;

    topRatedItem.append(topRatedItemTitle);
    topRatedItem.append(topRatedItemDescription);
    topRatedItem.append(topRatedItemSource);
    if (counter > 2) {
      topRatedItem.style.display = "none";
    }
    topRatedItem.addEventListener("click", addModalContent);

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
        item.style.display = "flex";
        counter++;
      }
    }
  }
}

// function addModalContent(e) {
//   var modal = document.getElementById("myModal");
//   var span = document.getElementsByClassName("close")[0];
//   span.onclick = function () {
//     modal.style.display = "none";
//   };

//   let articleId = parseInt(e.currentTarget.id.slice(-2));
//   modal.style.display = "block";
//   modalContent.innerHTML = "";

//   var image = document.createElement("IMG");
//   image.src = topRatedRes.articles[articleId].urlToImage;

//   var urlToArticle = document.createElement("a");
//   urlToArticle.innerText = "Read the Source";
//   urlToArticle.href = final.articles[articleId].url;

//   let articleDescription = document.createElement("p");
//   articleDescription.innerText =
//     "Description: " + final.articles[articleId].description;

//   let articleTitle = document.createElement("p");
//   articleTitle.innerText = final.articles[articleId].title;

//   let articleAuthor = document.createElement("p");
//   articleAuthor.innerText = "The author: " + final.articles[articleId].author;

//   let articleDate =
//     "Published At: " + new Date(final.articles[articleId].publishedAt);

//   modalContent.append(articleTitle);
//   modalContent.append(image);
//   modalContent.append(articleAuthor);
//   modalContent.append(articleDescription);
//   modalContent.append(urlToArticle);
//   modalContent.append(articleDate);
// }
