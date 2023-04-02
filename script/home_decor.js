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

//product pagae js//
// let cart= JSON.parse(localStorage.getItem("cart"))||[];
// let wish= JSON.parse(localStorage.getItem("wish"))||[];

function fetchdata(page,limit,sortDirection){
  let url = `https://project-json-server-dkem.onrender.com/home_decor?_page=${page}&_limit=${limit}`
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
  // Loop through the data and create list items for each user
  data.forEach(user => {
    const div = document.createElement("div");
    const img=document.createElement("img");
    const name=document.createElement("p");
    const price=document.createElement("h4");
    const btn=document.createElement("button")
    const butdiv=document.createElement("div");
    butdiv.classList="butdiv";
    img.src=user.image;
    name.textContent=user.name;
    price.textContent=`₹ ${user.price}`;
    btn.textContent="Add To Cart";
    btn.addEventListener('click',()=>{
      // const productId=btn.dataset.productId;
      Cart.push({...user,quantity:1})
      localStorage.setItem('cart',JSON.stringify(Cart));
      alert("succesfully added on Cart")
    })
    const wishbtn=document.createElement("button");
    wishbtn.textContent="Add To Wishlist";
    wishbtn.addEventListener("click",function(){
      wishlist.push({...user,quantity:1})
      localStorage.setItem('wish',JSON.stringify(wishlist));
      alert("succesfully added on Wishlist")
    })
    butdiv.append(btn,wishbtn);
    // div.textContent = `Name: ${user.name}, Age: ${user.age}, Email: ${user.email}`;
    div.append(img,name,price,butdiv);
    document.getElementById("product-div").appendChild(div);
  });
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
fetchdata(1,12)
paginationButton(50,12)
