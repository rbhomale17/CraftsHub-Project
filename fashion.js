function fetchdata(page,limit){
    fetch(`https://project-json-server-dkem.onrender.com/fashionProduct?_page=${page}&_limit=${limit}`)
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

// let data_list_wrapper = document.getElementById("data-list-wrapper");
// let pagination_buttons = document.getElementById("pagination-wrapper");


// async function FetchUserList(page = 1) {
//   try {
//     const userList_request = await fetch(`${baseServerURL}/users?_limit=10&_page=${page}`);
//     const data = await userList_request.json();
//     const total_item = data.length
//     console.log(total_item);
//     // console.log(userList_request)
//     const total_button = Math.ceil(total_item / 10)
//     renderUserData(data);
//     paginationButton(total_button)
//   } catch (error) {
//     console.log(error);
//   }
// }

// FetchUserList();

// function renderUserData(cartListArr) {
//   let cardTemp = `
//   <div class = "card-list">
//   ${cartListArr.map((ele) => getCard(ele.avatar, ele.email, ele.firstname, ele.lastname, ele.id)).join("")}
//   </div>
//   `;
//   data_list_wrapper.innerHTML = cardTemp
//   //console.log(cardTemp)
// }

// function getCard(avatar, email, firstname, lastname, id) {
//   let card = `
//    <div class= "card" data-id = "${id}">
//    <div class= "card__img">
//    <img src=${avatar} alt="${firstname} ${lastname}"/>
//    </div>
//    <div class="card__body">
//    <h3 class = "card_item card__title">${firstname} ${lastname}</h3>
//    <div class="card_item card__description">${email}</div>
//    </div>
//    </div>
//   `;
//   return card
// }

// function paginationButton(page) {
//   let page_btn = [];
//   for (let i = 1; i <= page; i++) {
//     page_btn.push(`<button class="pagination-button" data-page-number=${i}>${i}</button>`)
//   }
//   pagination_buttons.innerHTML = page_btn.join("")
//   //console.log(page_btn.join(""));
//   const all_buttons = document.querySelectorAll("#pagination-wrapper .pagination-button")
//   for (let btn of all_buttons) {
//     btn.addEventListener("click", (e) => {
//       console.log(e.target.dataset.pageNumber)
//       FetchUserList(e.target.dataset.pageNumber)
//     })
//   }
// }