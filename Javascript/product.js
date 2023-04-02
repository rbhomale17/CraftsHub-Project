let cart= JSON.parse(localStorage.getItem("cart"))||[];
let wish= JSON.parse(localStorage.getItem("wish"))||[];


fetch('https://project-json-server-dkem.onrender.com/fashionProduct')
.then(response => response.json())
.then(data => {
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
      cart.push({...user,quantity:1})
      localStorage.setItem('cart',JSON.stringify(cart));
    })
    const wishbtn=document.createElement("button");
    wishbtn.textContent="Add To Wishlist";
    wishbtn.addEventListener("click",function(){
      wish.push({...user,quantity:1})
      localStorage.setItem('wish',JSON.stringify(wish));
    })
    butdiv.append(btn,wishbtn);
    // div.textContent = `Name: ${user.name}, Age: ${user.age}, Email: ${user.email}`;
    div.append(img,name,price,butdiv);
    document.getElementById("productpage").appendChild(div);
  });
})
.catch(error => console.error(error));

  