//BaseUrl
const BaseUrl = "https://mock-api-json-server-ooya.onrender.com";
const AdminUserUrl = `${BaseUrl}/Users`;
// Setting local storage for admin information 
let loggedInAdmin = JSON.parse(localStorage.getItem("logged-in-Admin")) || [];

// catching element from html page

let usernameError = document.getElementById("username-error");
let passwordError = document.getElementById("password-error");
let submitError = document.getElementById("submit-error");

// fetch request done on API server **onmouseleave** from input 
var adminArray = [];
var passwordResult = false;
var usernameResult = false
function fetchData() {
    fetch(`${AdminUserUrl}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            adminArray.push(data)
            usernameResult = validationUserName(data);
            passwordResult = validationPassword(data);
        })
};

// validation for user name from input

var username = document.getElementById("username");
function validationUserName(userArray) {
    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i].username === username.value) {
            loggedInAdmin.push({ ...userArray[i] });
            localStorage.setItem("logged-in-Admin", JSON.stringify(loggedInAdmin))
            // console.log(userArray[i].username)
            usernameError.innerHTML = '<i class="fas fa-check-circle"></i>';
            return true;
        }
    }
    usernameError.innerHTML = "User Name is wrong";
    return false;
};

// validation for password from input

var password = document.getElementById("password");
function validationPassword(userArray) {
    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i].username === username.value && userArray[i].password === password.value) {
            console.log(userArray[i].password)
            passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
            return true;
        }
    }
    passwordError.innerHTML = "Write correct password";
    return false;
};

// validation for form all inputs are working or data provided working fine or not

// let flag=false;
function validateSubmit() {
    if (!usernameResult || !passwordResult) {
        submitError.innerHTML = "Please fill the correct data to Login."
        // console.log(usernameResult,passwordResult);
        return false
    } else {
        // flag=true;
        setUser(adminArray);
        // console.log(usernameResult,passwordResult);
        return true;
    }
};

//submit event created here
var Submitbutton = document.getElementById("Submit");
Submitbutton.addEventListener("click", function (e) {
    e.preventDefault();
    validateSubmit();
});

// posting new Admin user data to server 
function setUser(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][i].username === username.value) {
            // console.log(data[i][i].username)
            alert(`Welcome ${data[i][i].username} to Crafthub Admin`);
            alert("Redirecting to Admin Dashboard", onclick = redirect());
            return;
        }
    }
}

// redirecting to dashboard

function redirect() {
    location.href = "/Admin/dashboard.html"
}


