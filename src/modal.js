var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const modalContent = document.getElementById("modalContent");
span.onclick = function () {
  modal.style.display = "none";
};

function addModalContent(e) {
  let articleId = parseInt(e.currentTarget.id.slice(-2));
  modal.style.display = "block";
  modalContent.innerHTML = "";

  var image = document.createElement("IMG");
  image.src = topRatedRes.articles[articleId].urlToImage;

  var urlToArticle = document.createElement("a");
  urlToArticle.innerText = "Read the Source";
  urlToArticle.href = final.articles[articleId].url;

  let articleDescription = document.createElement("p");
  articleDescription.innerText =
    "Description: " + final.articles[articleId].description;

  let articleTitle = document.createElement("p");
  articleTitle.innerText = final.articles[articleId].title;

  let articleAuthor = document.createElement("p");
  articleAuthor.innerText = "The author: " + final.articles[articleId].author;

  let articleDate =
    "Published At: " + new Date(final.articles[articleId].publishedAt);

  modalContent.append(articleTitle);
  modalContent.append(image);
  modalContent.append(articleAuthor);
  modalContent.append(articleDescription);
  modalContent.append(urlToArticle);
  modalContent.append(articleDate);
}
