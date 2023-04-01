// const BaseUrl=`http://localhost:3000`
const BaseUrl = `https://mock-api-json-server-ooya.onrender.com`
let AdminUsers = `${BaseUrl}/Users`;

let but = document.querySelector("button");

but.addEventListener("click", function () {
    let obj = {
        "username": "abhi  ",
        "password": "abhi@1432",
        "firstname": "abhi",
        "lastname": "abhi",
        "email": "rbhomale17@gmail.com"
    }
    fetch(`${AdminUsers}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
        })
})