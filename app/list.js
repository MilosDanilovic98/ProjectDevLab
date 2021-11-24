// toggle filters
const user_input = document.querySelector("#search");
const filters = document.querySelector(".filters")
user_input.addEventListener("mouseover",()=>{
    filters.classList.toggle("hide");
},{once:true})

// functions
function reverseString(str) {
    let splitString = str.split(""); 
    let reverseArray = splitString.reverse(); 
    let joinArray = reverseArray.join(""); 
    return joinArray; 
}
user_input.addEventListener("click",()=>{
  document.getElementById("search").style.border = "";
})


// date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

// search with api
const form = document.querySelector(".form-search");

// logic on form submit
form.addEventListener("submit",(e)=>{
  e.preventDefault();

// check user input
if(user_input.value === ""){
  document.getElementById("search").style.border = "1px solid red";
  return;
}

// filter filters
let popularity = "popularity";
today = yyyy + '-' + mm + '-' + dd;


// get filter value
 const selection = document.querySelector("#options");
if(selection.value == ""){
  today = "";
  popularity = "";
}
else if(selection.value == "popularity"){
    today = "";
}else{
    popularity = "";
}

// api
    const api_key = '&apiKey=9564644c185b40928b511611f6fa100e';
    const url =  ` https://newsapi.org/v2/everything?q=${user_input.value}&from=${today}&sortBy=${popularity}${api_key} `;
   
// create fetch request
var req = new Request(url);
fetch(req)
    .then(function(response) {
    if(response.status == 200)
        return response.json();
    else{
        Promise.reject(new Error("Error 123",response));
    }
    })
.then((data)=>{
      console.log(url);
     const results = document.querySelector("#results");
     const message = document.querySelector("#messsage");
     let news = data.articles;
     results.innerHTML = "";
     message.innerHTML = "";

     // case there is no results found
     if(news.length < 1)
      message.innerHTML = 
      `
      <div class="alert">
          <strong>No results found</strong> 
      </div>
      ` ;
   // loop through all news
     for(let i in news){
       // filter unknown data
        let result = results.innerHTML;
        let date = JSON.stringify(news[i].publishedAt).substring(1,11);
        let author,cover_image,description;
        news[i].author != null ? author = news[i].author : author = "Unknown author";
        news[i].urlToImage ==  null || news[i].urlToImage  == ""   ? cover_image = "../images/list/no_img.png" : cover_image = news[i].urlToImage ;
        news[i].description != null ? description = news[i].description : description = " Click on image to read full news ";
        // show results
        result += 
        `
        <div class="card">
              <div class="card-header">
              <a href="${news[i].url}" target="_blank" >
                <img src="${cover_image}" alt="rover" />
                </a>
              </div>
              <div class="card-body">
                <span class="tag tag-teal">${author}</span>
                <h4>
                  ${news[i].title}
                </h4>
                <a href="${news[i].url}" target="_blank">
                <p>
                ${description}
                </p>
                </a>
                <div class="user">
                  <img src="../images/list/fake_news.png" alt="logo" />
                  <div class="user-info">
                    <h5>From: </h5>
                    <small>${date}</small>
                  </div>
                </div>
              </div>
        `
        results.innerHTML = result;
     }  
  })
})