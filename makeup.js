
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



function fetchdata(page,limit,sortDirection){
  let url = `https://project-json-server-dkem.onrender.com/makeup?_page=${page}&_limit=${limit}`
  if (sortDirection === "low-to-high") {
    url += "&_sort=price&_order=asc";
  } else if (sortDirection === "high-to-low") {
    url += "&_sort=price&_order=desc";
  }
  fetch(url)

  .then((res)=>res.json())
  .then((data)=>{
     console.log(data)
     displaydata(data)
  })
  .catch((err)=>{
     console.log(err)
  })
}
let Cart = JSON.parse(localStorage.getItem("cart"))||[]
let wishlist = JSON.parse(localStorage.getItem("wish"))||[]
function displaydata(data){

document.getElementById("product-div").innerHTML = null
  data.forEach((ele)=>{
      let div = document.createElement("div")
      let image = document.createElement("img")
      let name = document.createElement("p")
      let price = document.createElement("h4")
      let butdiv=document.createElement("div")
      butdiv.classList="butdiv";
      let btn = document.createElement("button")
      let wishlistbtn = document.createElement("button")

      image.src = ele.image
      name.innerText = ele.name
      price.innerText = `₹ ${ele.price}`
      wishlistbtn.innerText = "Wishlist"
      wishlistbtn.addEventListener("click",()=>{
        wishlist.push({...ele, quantity:1})
          localStorage.setItem("wish", JSON.stringify(wishlist))
          alert("succesfully added on Wishlist")
      })
      
      btn.innerText = "Add To Cart"
      btn.addEventListener("click", ()=>{
        Cart.push({...ele, quantity:1})
          localStorage.setItem("cart", JSON.stringify(Cart))
          alert("succesfully added on Cart")
      })
      butdiv.append(btn,wishlistbtn)
      div.append(image,name,price,butdiv)
      document.getElementById("product-div").append(div)
  })
}
// let pagination_buttons = document.getElementById("pagination-wrapper")
function paginationButton(total,limit){

  const totalPages = Math.ceil(total / limit);
const buttons = [];
for (let i = 1; i <= totalPages; i++) {
  buttons.push(`<button onclick="fetchdata(${i} , ${limit})">${i}</button>`);
}
document.getElementById('pagination-wrapper').innerHTML = buttons.join('');
}
fetchdata(1,8)
paginationButton(50,8)

