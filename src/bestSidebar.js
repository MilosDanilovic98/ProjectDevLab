var url =
  "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=e14071a8a61045fda968752842f8f3fe";
var bestSidebarRes;
var req = new Request(url);
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (obj) {
    bestSidebarRes = obj;
    addElementsToBestSidebar();
  });

const bestSideBarContainer = document.getElementById("sidebarBestContainer");

function addElementsToBestSidebar() {
  for (let index = 0; index < 3; index++) {
    let bestSidebarItem = document.createElement("div");
    bestSidebarItem.classList.add("sidebarBestContainerItem");
    bestSidebarItem.setAttribute("id", "bestSidebarItem0" + index);

    bestSidebarItem.style.backgroundImage =
      "url('" + bestSidebarRes.articles[index].urlToImage + "')";

    let bestSidebarItemTitle = document.createElement("p");
    bestSidebarItemTitle.innerText = bestSidebarRes.articles[index].title;

    let bestSidebarItemDescription = document.createElement("p");
    bestSidebarItemDescription.innerText =
      bestSidebarRes.articles[index].description;

    let bestSidebarItemSource = document.createElement("p");
    bestSidebarItemSource.innerText =
      bestSidebarRes.articles[index].source.name;
    bestSidebarItemSource.classList.add("sidebarBestContainerItemSource");

    bestSidebarItem.append(bestSidebarItemTitle);
    bestSidebarItem.append(bestSidebarItemDescription);
    bestSidebarItem.append(bestSidebarItemSource);
    bestSidebarItem.addEventListener("click", addModalContent);
    bestSideBarContainer.append(bestSidebarItem);
  }
}
