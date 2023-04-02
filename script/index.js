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

// <-- Navbar JS -->

let f_name = JSON.parse(localStorage.getItem("name"));
let sign_in = document.getElementById("sign-in");

// sign_in.innerText = "";
sign_in.innerText = f_name[f_name.length-1];



let search = document.getElementById("search");
let search_btn = document.getElementById("search-btn");

search_btn.addEventListener("click", function(){
  if(search.value.toUpperCase() == "PRODUCTS"||"product"){
    window.open("product.html")
  }
  if(search.value.toUpperCase() == "FASHION" || "fashion"){
    window.open("fashion.html")
  }
  if(search.value.toUpperCase() == "BEAUTY"){
    window.open("makeup.html")
  }
  search.value = "";
})





