let counter = 1;
setInterval(function(){
    document.getElementById("radio" + counter).checked = true;
  counter++;
  if(counter>5){
    counter=1;
  }
}, 4000)

// <-- Navbar JS -->

var navbar = document.querySelector('.navbar');
var sticky = navbar.offsetTop;
function stickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add('sticky')
  } else {
    navbar.classList.remove('sticky');
  }
}
window.onscroll = function() {stickyNav()};




let search = document.getElementById("search");
let search_btn = document.getElementById("search-btn");

search_btn.addEventListener("click", function(){
  console.log(search.value.toUpperCase() == "FASHION");
  if(search.value.toUpperCase() == "PRODUCT"){
    // window.open("product.html")
    location.href="/product.html"
  }
  if(search.value.toUpperCase() == "FASHION"){
    // window.open("fashion.html")
    location.href="/fashion.html"
    // redirect();
  }
  if(search.value.toUpperCase() == "BEAUTY"){
    // window.open("makeup.html")
    location.href="/makeup.html"
  }
  search.value = "";
})
// function redirect(){
//   location.href="/fashion.html";
// }


search.addEventListener("search", function(){
  if(search.value.toUpperCase() == "PRODUCT"){
    // window.open("product.html")
    location.href="/product.html"
  }
  if(search.value.toUpperCase() == "FASHION"){
    // window.open("fashion.html")
    location.href="/fashion.html"
  }
  if(search.value.toUpperCase() == "BEAUTY"){
    // window.open("makeup.html")
    location.href="/product.html"
  }
  search.value = "";
})

// <-- Navbar JS -->

let f_name = JSON.parse(sessionStorage.getItem("name"));
let sign_in = document.getElementById("sign-in");

// sign_in.innerText = "";
sign_in.innerText = f_name[f_name.length-1];






