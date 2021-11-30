
const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const instance = axios.create({
  baseURL: `${proxyUrl}https://newsapi.org/v2/`,
  timeout: 1000,
  headers: {
     'Authorization': "b562823db8174e7f8b2e02152da43a83",
    'access-control-allow-origin': '*'}
});

instance.get('top-headlines', {
  params: {
    country: 'us',
    pageSize: 3
  }
}).then(res => {
  const topNews = document.getElementById('topnews');
  res.data.articles.forEach(item => {
    var tag = document.createElement("a"); // <p></p>
    let date = new Date(item.publishedAt)
  var text = document.createTextNode(` (${date.toLocaleDateString("en-US")}) ${item.title}`); 
  tag.appendChild(text); // <p>TEST TEXT</p>
  console.log(text);
  
    console.log(item);
    topNews.appendChild(tag);
  })
  // console.log(res.data);
})
//TOP NAVIGATION
function NavBar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  window.onscroll = function() {scrollFunction()};
  function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
  document.getElementById("navbar").style.top = "0";
  document.getElementById("roll_back").style.display = "flex";
  } else {
  document.getElementById("navbar").style.top = "-100px";
  document.getElementById("roll_back").style.display = "none";
  }
  }
  