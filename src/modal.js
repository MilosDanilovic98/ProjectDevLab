var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const modalContent = document.getElementById("modalContent");
span.onclick = function () {
  modal.classList.add("modalClosed");

  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("modalClosed");
  }, 1000);
};

function addModalContent(e) {
  let final;

  if (e.currentTarget.id.slice(0, 4) === "Slid") {
    final = sliderRes;
  } else if (e.currentTarget.id.slice(0, 4) == "topR") {
    final = topRatedRes;
  } else {
    final = bestSidebarRes;
  }
  let articleId = parseInt(e.currentTarget.id.slice(-2));
  modal.style.display = "block";
  modalContent.innerHTML = "";

  var image = document.createElement("IMG");
  image.src = final.articles[articleId].urlToImage;

  var urlToArticle = document.createElement("a");
  urlToArticle.innerText = "Read the Source";
  urlToArticle.href = final.articles[articleId].url;
  urlToArticle.target = "_blank";
  urlToArticle.classList.add("modalUrlToArticle");

  let articleDescription = document.createElement("p");
  articleDescription.innerText =
    "Description: " + final.articles[articleId].description;
  console.log(articleDescription.innerText.length);
  if (articleDescription.innerText.length > 130) {
    articleDescription.innerText =
      articleDescription.innerText.slice(0, 130) + "...";
  }
  articleDescription.classList.add("modalArticleDescription");

  let articleTitle = document.createElement("p");
  articleTitle.innerText = final.articles[articleId].title;
  articleTitle.classList.add("modalTitle");

  let articleAuthor = document.createElement("p");
  articleAuthor.innerText = "The author: " + final.articles[articleId].author;
  articleAuthor.classList.add("modalArticleAuthor");

  let articleDate =
    "Published At: " + new Date(final.articles[articleId].publishedAt);

  let articleInfo = document.createElement("div");
  articleInfo.append(articleAuthor);
  articleInfo.append(articleDate);
  articleInfo.classList.add("modalArticleInfo");

  let modalImageContainer = document.createElement("div");
  modalImageContainer.append(articleTitle);
  modalImageContainer.classList.add("modalImageContainer");

  let modalImageText = document.createElement("div");
  modalImageText.append(image);
  modalImageText.append(articleDescription);
  modalImageText.append(articleAuthor);
  modalImageText.classList.add("modalImageText");

  modalImageContainer.append(modalImageText);

  modalContent.append(modalImageContainer);
  // modalContent.append(articleDescription);
  modalContent.append(urlToArticle);
  modalContent.append(articleInfo);
  // modalContent.append(articleDate);
}
