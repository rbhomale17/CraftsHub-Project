let paginationdiv = document.getElementById('pagination-wrapper');
//creating BaseURL for fetching data...

const BaseUrl = `https://project-json-server-dkem.onrender.com`;
const trackOrder = `${BaseUrl}/trackorder`;

// local Storage data of log in user
let loggedInAdmin = JSON.parse(localStorage.getItem("logged-in-Admin")) || [];
adminname.textContent = `Welcome,  ${loggedInAdmin[loggedInAdmin.length - 1].firstname}`
// Declaring Variables catching them form HTML page here...

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

var container = document.getElementById("container");
var searchBar = document.querySelector(".search>input");

// fetching data on window load

window.addEventListener("load", function () {
    fetchData();
})

// Declaring a global array of trackorder
var globalOrderArray = []
// function for fetch data from json server (BaseUrl).

function fetchData(page) {
    fetch(`${trackOrder}?_page=${page}&_limit=4`)
        .then((res) => {
            let total = res.headers.get("X-Total-Count");
            const totalPages = Math.ceil(total/4);
            // const buttons = [];
            paginationdiv.innerHTML = null;
            for (let i = 1; i <= totalPages; i++) {
                paginationdiv.append(pagination(i, i))
            }
            return res.json()
        })
        .then((data) => {
            console.log(data)
            globalOrderArray = data
            getCardList(data)
        })
}
function pagination(text, id) {
    let button = document.createElement("button");
    button.textContent = text;
    button.setAttribute("data-id", id);

    button.addEventListener("click", function (e) {
        let pageNumber = e.target.dataset.id;
        // console.log(e.target.dataset.id);
        fetchData(pageNumber)
    });
    return button;
}
// function for getting cardlist of appended data after fetching done. 
function getCardList(data) {

    container.innerHTML = null;

    let cardList = document.createElement("div");
    cardList.classList.add("card-list");
    cardList.id = "card-list";

    container.append(cardList);
    // running loop on fetched data and pass to another function thet will return card that we can append to cardlist.

    data.forEach((element) => {
        let card = getCard(element.name, element.phone, element.address, element.city, element.pinCode, element.item, element.Previous_location, element.Current_location, element.Next_location);
        cardList.append(card);
    });

    return cardList;
}

//function thet will create and return card that we can append to cardlist.
var count = 0;
function getCard(name, mobile, address, city, pinCode, item, Previous_location, Current_location, Next_location) {

    let card = document.createElement("div");
    card.classList.add("card");
    card.id = "card";

    let datalist = document.createElement("div");
    datalist.classList = "data-list";
    datalist.id = "data-list";

    let username = document.createElement("h3");
    username.classList = "name";
    username.textContent = `Name : ${name}`;

    let usermobile = document.createElement("h4");
    usermobile.classList = "mobile";
    usermobile.textContent = `Mobile : ${mobile}`;

    let useraddress = document.createElement("h4");
    useraddress.classList = "address"
    useraddress.textContent = `Address : ${address}`;

    let usercity = document.createElement("h4");
    usercity.classList = "city";
    usercity.textContent = `City : ${city}`;

    let userPinCode = document.createElement("h4");
    userPinCode.classList = "pin-code";
    userPinCode.textContent = `Pin Code : ${pinCode}`;

    let userbuyitem = document.createElement("h4");
    userbuyitem.classList = "buyitem";
    userbuyitem.textContent = `Item Buy : ${item}`;

    datalist.append(username, usermobile, useraddress, usercity, userPinCode, userbuyitem);

    // itemLocation button can be use for showing the location buyitem of customer.

    let itemlocation = document.createElement("button");
    itemlocation.classList = "item-location";
    itemlocation.textContent = "Track Location...";
    itemlocation.id = "item-location";

    itemlocation.addEventListener("click", function () {
        let itemPrevious_location = document.createElement("h4");
        itemPrevious_location.textContent = `Previous Location : ${Previous_location}`;

        let itemCurrent_location = document.createElement("h4");
        itemCurrent_location.textContent = `Current Location : ${Current_location}`;

        let itemNext_location = document.createElement("h4");
        itemNext_location.textContent = `Next Location : ${Next_location}`;

        card.append(datalist, itemPrevious_location, itemCurrent_location, itemNext_location);
        return card;
    })

    card.append(datalist, itemlocation);
    return card;
};

//  search bar working for name,item buy, pincode, mobile number & city name.

searchBar.addEventListener("search", function () {
    // console.log(searchBar.value);
    if (searchBar.value === "") {
        // fetchData()
        getCardList(globalOrderArray)
    } else {
        let searchResult = globalOrderArray.filter((element, index) => {
            if (searchBar.value == element.name || searchBar.value == element.firstname || searchBar.value == element.city || searchBar.value == element.phone || searchBar.value == element.city || searchBar.value == element.pinCode || searchBar.value == element.item) {
                return true;
                console.log(element.name)
            }
            // console.log(element)
        });
        // console.log(searchResult)
        getCardList(searchResult);
    }
});
