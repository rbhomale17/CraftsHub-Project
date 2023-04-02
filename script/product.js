// let cart= JSON.parse(localStorage.getItem("cart"))||[];
// let wish= JSON.parse(localStorage.getItem("wish"))||[];


// fetch('https://project-json-server-dkem.onrender.com/fashionProduct')
// .then(response => response.json())
// .then(data => {
//   // Loop through the data and create list items for each user
//   data.forEach(user => {
//     const div = document.createElement("div");
//     const img=document.createElement("img");
//     const name=document.createElement("p");
//     const price=document.createElement("h4");
//     const btn=document.createElement("button")
//     const butdiv=document.createElement("div");
//     butdiv.classList="butdiv";
//     img.src=user.image;
//     name.textContent=user.name;
//     price.textContent=`₹ ${user.price}`;
//     btn.textContent="Add To Cart";
//     btn.addEventListener('click',()=>{
//       // const productId=btn.dataset.productId;
//       cart.push({...user,quantity:1})
//       localStorage.setItem('cart',JSON.stringify(cart));
//     })
//     const wishbtn=document.createElement("button");
//     wishbtn.textContent="Add To Wishlist";
//     wishbtn.addEventListener("click",function(){
//       wish.push({...user,quantity:1})
//       localStorage.setItem('wish',JSON.stringify(wish));
//     })
//     butdiv.append(btn,wishbtn);
//     // div.textContent = `Name: ${user.name}, Age: ${user.age}, Email: ${user.email}`;
//     div.append(img,name,price,butdiv);
//     document.getElementById("productpage").appendChild(div);
//   });
// })
// .catch(error => console.error(error));

  

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
  let url = `https://project-json-server-dkem.onrender.com/fashionProduct?_page=${page}&_limit=${limit}`
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

let filterSelect=document.getElementById("filter");
filterSelect.addEventListener("change",function(){
  if(filterSelect.value===""){
    // fetch()
    fetchdata(1,8)    
  }else{
    let url = `https://project-json-server-dkem.onrender.com/makeup`

  if(filterSelect.value=="500")
  {
    url += "?price_gte=500&price_lte=1000";
  }
  else if(filterSelect.value=="300")
  {
    url += "?price_gte=1&price_lte=500";
  }
  else if(filterSelect.value=="1000"){
    url += "?price_gte=1000";
  }
  fetch(url)
  .then((res)=>{
    return res.json();
  })
  .then((data)=>{
    console.log(data)
    displaydata(data)
  })
  }
})

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