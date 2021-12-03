var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const modalContent = document.getElementById("modalContent");
// add event listener on the close button
span.onclick = function () {
  modal.classList.add("modalClosed");

  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("modalClosed");
  }, 1000);
};

function addModalContent(e) {
  let final;
  // check which section was clicked
  if (e.currentTarget.id.slice(0, 4) === "Slid") {
    final = sliderRes;
  } else if (e.currentTarget.id.slice(0, 4) == "topR") {
    final = topRatedRes;
  } else {
    final = bestSidebarRes;
  }
  // Find the ID of clicked item
  let articleId = parseInt(e.currentTarget.id.slice(-2));
  modal.style.display = "block";
  modalContent.innerHTML = "";
  // Modal image
  var image = document.createElement("IMG");
  if (final.articles[articleId].urlToImage != null) {
    image.src = final.articles[articleId].urlToImage;
  } else {
    image.src = "images/list/no_img.png";
  }

  // Modal link to website
  var urlToArticle = document.createElement("a");
  urlToArticle.innerText = "Read the Source";
  urlToArticle.href = final.articles[articleId].url;
  urlToArticle.target = "_blank";
  urlToArticle.classList.add("modalUrlToArticle");
  // modal description
  let articleDescription = document.createElement("p");
  articleDescription.innerText =
    "Description: " + final.articles[articleId].description;
  console.log(articleDescription.innerText.length);
  if (articleDescription.innerText.length > 130) {
    articleDescription.innerText =
      articleDescription.innerText.slice(0, 130) + "...";
  }
  articleDescription.classList.add("modalArticleDescription");
  // modal title
  let articleTitle = document.createElement("p");
  articleTitle.innerText = final.articles[articleId].title;
  articleTitle.classList.add("modalTitle");
  // modal author
  let articleAuthor = document.createElement("p");
  articleAuthor.innerText = "The author: " + final.articles[articleId].author;
  articleAuthor.classList.add("modalArticleAuthor");
  // modal date
  let articleDate =
    "Published At: " + new Date(final.articles[articleId].publishedAt);
  // modal date info
  let articleInfo = document.createElement("div");
  articleInfo.append(articleDate);
  articleInfo.classList.add("modalArticleInfo");
  // upper half of modal
  let modalImageContainer = document.createElement("div");
  modalImageContainer.append(articleTitle);
  modalImageContainer.classList.add("modalImageContainer");
  // modal image and description container
  let modalImageText = document.createElement("div");
  modalImageText.append(image);
  modalImageText.append(articleDescription);
  modalImageText.append(articleAuthor);
  modalImageText.classList.add("modalImageText");
  // finall appends
  modalImageContainer.append(modalImageText);
  modalContent.append(modalImageContainer);
  modalContent.append(urlToArticle);
  modalContent.append(articleInfo);
}
