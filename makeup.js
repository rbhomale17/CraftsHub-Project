function fetchdata(page,limit){
    fetch(`https://project-json-server-dkem.onrender.com/makeup?_page=${page}&_limit=${limit}`)
    .then((res)=>res.json())
    .then((data)=>{
    //    console.log(data)
       displaydata(data)
    })
    .catch((err)=>{
       console.log(err)
    })
}
let lsdata = JSON.parse(localStorage.getItem("cart"))||[]
function displaydata(data){
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
        btn.addEventListener("click", ()=>{
          if(checkduplicate(ele)){
            alert("Product already in cart")
        }else{
            lsdata.push({...ele})
            localStorage.setItem("cart", JSON.stringify(lsdata))
            alert("succesfully added on cart")
        }
        })
        function checkduplicate(ele){
          for(let i=0;i<lsdata.length;i++){
              if(lsdata[i].img == ele.img){
                  return true
              }
          }
          return false
      }
        div.append(image,name,price,btn)
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
fetchdata(1,10)
paginationButton(50,10)

