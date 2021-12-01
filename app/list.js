// api key
const api_key = '&apiKey=9564644c185b40928b511611f6fa100e';
// toggle filters
const user_input = document.querySelector("#search");
const filters = document.querySelector(".filters")
user_input.addEventListener("mouseover",()=>{
    filters.classList.toggle("hide");
},{once:true})

// hide or show elements depends on click
user_input.addEventListener("click",()=>{
  document.getElementById("search").style.border = "";
  if(document.querySelector(".group").classList.contains("hide"))
      document.querySelector(".group").classList.toggle("hide");

})

// HTML elements
const results = document.querySelector("#results");
const message = document.querySelector("#messsage");
const form = document.querySelector(".form-search");
const selection = document.querySelector("#options");
const pagination_element = document.querySelector("#pagination");
const user_date = document.querySelector("#date");
const categories = document.querySelector(".dropdown");
const search_bar = document.querySelector(".search-bar");

// paggination variables
let current_page = 1; 
let rows = 4;

// FUNCTIONS

//  function to display paginated results
function displayList(items,wrapepr,rows_per_page, page){
  wrapepr.innerHTML = "";
  page--;
  let start = rows_per_page * page ; 
  let end = start + rows_per_page;
  let paginatedNews = items.slice(start,end);
 
    // case there is no results found
    if(paginatedNews.length < 1)
    message.innerHTML = 
    `
    <div class="alert">
        <strong>No results found</strong> 
    </div>
    ` ;
  
    // loop through news 
 paginatedNews.forEach((news)=>{

    let result = wrapepr.innerHTML;
    let author,cover_image,description;
    let date = JSON.stringify(news.publishedAt).substring(1,11);
    let title = JSON.stringify(news.title).substring(0,50);
    news.author != null ? author = news.author : author = "Unknown author";
    news.urlToImage ==  null || news.urlToImage  == ""   ? cover_image = "../images/list/no_img.png" : cover_image = news.urlToImage ;
    news.description != null ? description = JSON.stringify(news.description).substring(0,250) + "..." : description = " Click on image to read full news ";

     // show results
     result += 
     `
     <div class="card">
           <div class="card-header">
           <a href="${news.url}" target="_blank" >
             <img src="${cover_image}" alt="rover" />
             </a>
           </div>
           <div class="card-body">
             <span class="tag tag-teal">${author}</span>
             <a href="${news.url}" target="_blank">
             <h4> ${title}</h4>
             </a>
             <a href="${news.url}" target="_blank">
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
     wrapepr.innerHTML = result;
 })
}

// determine number of pages
function SetupPagination(items,wrapper,rows_per_page){
  wrapper.innerHTML = "";
  let page_count = Math.ceil(items.length / rows_per_page);
    for(let i = 1; i < page_count + 1 ; i++){
     let btn =  paginationButton(i,items);
     wrapper.appendChild(btn);
    }
}

// create button for current page
function paginationButton(page,items){
  let button = document.createElement("button");
  button.innerText = page;

  if(current_page === page) button.classList.add("active");

  button.addEventListener("click",()=>{
    current_page = page;
    displayList(items,results,rows,current_page);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
    window.scrollTo({ top: 10, behavior: 'smooth' });

  })

  return button;

}


// logic on form submit
form.addEventListener("submit",(e)=>{
  e.preventDefault();

  // show loading icon, while waiting for server response
  document.querySelector(".loader").style.display = "block";

  // first page in pagination
  current_page = 1;
// check user input
if(user_input.value === ""){
  document.getElementById("search").style.border = "1px solid red";
  document.querySelector(".loader").style.display = "none";

  return;
}

// filter filters
let sortBy = "publishedAt";

// get filter values
if(selection.value == "popularity"){
  sortBy = "popularity";
}else if(selection.value == "relevancy" )
  sortBy = "relevancy"

// get category


// api
    let url = "";
    if(user_date.value.length < 1) {
      url =  ` https://newsapi.org/v2/everything?q=${user_input.value}&sortBy=${sortBy}${api_key} `  ;
    }
   else{
      url = ` https://newsapi.org/v2/everything?q=${user_input.value}&from=${user_date.value}&to=${user_date.value}${api_key} `;
      document.querySelector(".group").classList.toggle("hide");
   }

// create fetch request
let req = new Request(url);
fetch(req)
    .then((response)=> {
    if(response.status == 200)
        return response.json();
    else{
        Promise.reject(new Error("Error 123",response));
    }
    })
.then((data)=>{

       // hide loading icon, when response is ready
  document.querySelector(".loader").style.display = "none";
     let news = data.articles;
     message.innerHTML = "";

    // calling function
    displayList(news,results,rows,current_page);
    SetupPagination(news,pagination_element,rows);
   
  })
})

categories.addEventListener("click",(e)=>{

  // switch background color - known which category is selected
Array.from(document.querySelectorAll(".sub-dropdown")).forEach((elem)=>{
elem.style.backgroundColor = "#fff";
})
// if user select category, show it
 if(e.target.value.length > 0){
   // get category
    let category = e.target.value;
    // create request
    let url = `https://newsapi.org/v2/top-headlines?category=${category}${api_key}`;
    let req = new Request(url);
      // create request
      fetch(req)
        .then(function(response){
            return response.json();
        })
        .then((data)=>{
          // caling functions to display data 
          let news = data.articles;
          message.innerHTML = "";
        displayList(news,results,rows,current_page);
        SetupPagination(news,pagination_element,rows);
        })
  search_bar.classList.add("hide");
  document.querySelector(`#${e.target.value}`).parentElement.style.backgroundColor = "#44FFEE";

}


})


