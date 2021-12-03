// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
// const instance = axios.create({
//   baseURL: `${proxyUrl}https://newsapi.org/v2/`,
//   timeout: 1000,
//   headers: {
//     Authorization: "b562823db8174e7f8b2e02152da43a83",
//     "access-control-allow-origin": "*",
//   },
// });

// instance
//   .get("top-headlines", {
//     params: {
//       country: "us",
//       pageSize: 3,
//     },
//   })
//   .then((res) => {
//     const topNews = document.getElementById("topnews");
//     res.data.articles.forEach((item) => {
//       var tag = document.createElement("a"); // <p></p>
//       let date = new Date(item.publishedAt);
//       var text = document.createTextNode(
//         ` (${date.toLocaleDateString("en-US")}) ${item.title}`
//       );
//       tag.appendChild(text); // <p>TEST TEXT</p>
//       console.log(text);

//       console.log(item);
//       topNews.appendChild(tag);
//     });
//     // console.log(res.data);
//   });
//TOP NAVIGATION
var headerScroll;
var url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=9564644c185b40928b511611f6fa100e";
var topRatedRes;
var req = new Request(url);
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (obj) {
    headerScroll = obj;
    addTextToHeaderScroll();
  });

const scrollingHeaderTxt = document.getElementById("scrollingHeaderText");
function NavBar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function addTextToHeaderScroll() {
  for (let item of headerScroll.articles) {
    if (item.title.length > 80) {
      scrollingHeaderTxt.innerText +=
        "'" + item.title.slice(0, 80) + `'.....       '`;
    } else {
      scrollingHeaderTxt.innerText += item.title + "     ";
    }
  }
}
