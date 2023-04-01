let paginationdiv = document.getElementById('pagination-wrapper');
let loggedInAdmin = JSON.parse(localStorage.getItem("logged-in-Admin")) || [];
adminname.textContent = `Welcome,  ${loggedInAdmin[loggedInAdmin.length - 1].firstname}`


// Admin logout function /////////////////////////////

let LogOut = document.getElementById("LogOut");
LogOut.addEventListener("click", function () {
    alert(`${loggedInAdmin[loggedInAdmin.length - 1].firstname} You Are Logged Out...`, onclick = redirect());
})

function redirect() {
    localStorage.getItem("logged-in-Admin", JSON.stringify([]))
    location.href = "/index.html"
}

/////////////////////////////////////////////////////

function fetchdata(page) {
    fetch(`https://project-json-server-dkem.onrender.com/home_decor?_page=${page}&_limit=8`)
        .then((res) => {
            // console.log(res.headers.get("X-Total-Count"))
            let total = res.headers.get("X-Total-Count");
            const totalPages = Math.ceil(total / 8);
            // const buttons = [];
            paginationdiv.innerHTML = null;
            for (let i = 1; i <= totalPages; i++) {
                paginationdiv.append(pagination(i, i))
            }

            return res.json()
        })
        .then((data) => {
            //    console.log(data)
            displaydata(data)
        })
        .catch((err) => {
            console.log(err)
        })
}

function pagination(text, id) {
    let button = document.createElement("button");
    button.textContent = text;
    button.setAttribute("data-id", id);

    button.addEventListener("click", function (e) {
        let pageNumber = e.target.dataset.id;
        // console.log(e.target.dataset.id);
        fetchdata(pageNumber)
    });
    return button;
}
function displaydata(data) {
    document.getElementById("product-div").innerHTML = null;
    data.forEach((ele) => {

        let card = document.createElement("div")
        card.id = "card"
        let image = document.createElement("img")
        let name = document.createElement("p")
        let price = document.createElement("p")
        let btn = document.createElement("button")

        image.src = ele.image
        name.innerText = ele.name
        price.innerText = ele.price
        btn.innerText = "Delete"
        btn.addEventListener("click", () => {
            fetch(`https://project-json-server-dkem.onrender.com/fashionProduct/${ele.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    reloadThePage();
                    // displaydata(data)
                })
        })
        function reloadThePage() {
            window.location.reload(false);
        }
        //     function checkduplicate(ele){
        //       for(let i=0;i<lsdata.length;i++){
        //           if(lsdata[i].img == ele.img){
        //               return true
        //           }
        //       }
        //       return false
        //   }
        card.append(image, name, price, btn)
        document.getElementById("product-div").append(card)
    })
}
// let pagination_buttons = document.getElementById("pagination-wrapper")
function paginationButton(total, limit) {
    const totalPages = Math.ceil(total / limit);
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
        buttons.push(`<button onclick="fetchdata(${i} , ${limit})">${i}</button>`);
    }
    document.getElementById('pagination-wrapper').innerHTML = buttons.join('');
}
fetchdata(1)
paginationButton(50)

