fetch('https://project-json-server-dkem.onrender.com/fashionProduct')
.then(response => response.json())
.then(data => {
  // Loop through the data and create list items for each user
  data.forEach(user => {
    const div = document.createElement("div");
    const img=document.createElement("img");
    const name=document.createElement("h6");
    const price=document.createElement("h6");
    
    img.setAttribute=user.image;
    name.textContent=user.name;
    price.textContent=user.price;
    // div.textContent = `Name: ${user.name}, Age: ${user.age}, Email: ${user.email}`;
    div.append(img,name,price);
    document.getElementById("productpage").append(div);
  });
})
.catch(error => console.error(error));
