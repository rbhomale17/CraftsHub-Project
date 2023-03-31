fetch("https://project-json-server-dkem.onrender.com/fashionProduct")
.then((res)=>res.json())
.then((data)=>{
    data.forEach((ele)=>{
        let div = document.createElement("div")
        let image = document.createElement("img")
        let name = document.createElement("p")
        let price = document.createElement("p")
        let btn = document.createElement("button")

        image.src = ele.image
        name.innerText = ele.name
        price.innerText = ele.price
        btn.innerText = "Add To Cart"
        div.append(image,name,price,btn)
        document.getElementById("product-div").append(div)
    })
})
.catch((err)=>{
    console.log(err)
})