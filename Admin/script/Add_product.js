const BaseUrl = "https://project-json-server-dkem.onrender.com";
const ProductUrl = `${BaseUrl}/`

// let firstnameError=document.getElementById("firstname-error")
// let lastnameError=document.getElementById("lastname-error")
// let emailError=document.getElementById("email-error")
// let passwordError=document.getElementById("password-error")
// let submitError=document.getElementById("submit-error")

// validation for first name from input

// var productname=document.getElementById("productname");
// var imageUrl=document.getElementById("imageUrl");
// var productPrice=document.getElementById("productPrice");
// var selectCategory=document.getElementById("category");
// function validationFirstName(){
//     let firstname=document.getElementById("firstname").value;
//     if(firstname.length<=2){
//         firstnameError.innerHTML="First Name is required";
//         return false;
//     }
//     firstnameError.innerHTML='<i class="fas fa-check-circle"></i>';
//     return true;

// }

//validation for last name from input

// var imageUrl=document.getElementById("imageUrl");
// var productPrice=document.getElementById("productPrice");
// var selectCategory=document.getElementById("category");
// function validationLastName(){
//     let lastname=document.getElementById("lastname").value;
//     if(lastname.length<=2){
//         lastnameError.innerHTML="Last Name is required";
//         return false;
//     }
//     lastnameError.innerHTML='<i class="fas fa-check-circle"></i>';
//     return true
// }

//validation for email id from input

// var productPrice=document.getElementById("productPrice");
// var selectCategory=document.getElementById("category");
// function validationEmail(){
//     let email=document.getElementById("email").value;
//     if(email.length==0){
//         emailError.innerHTML="Email is required";
//         return false;
//     }
//     if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
//         emailError.innerHTML="Email Invalid"
//         return false;
//     }
//     emailError.innerHTML='<i class="fas fa-check-circle"></i>';
//     return true;
// }

// validation for password from input
// var selectCategory=document.getElementById("category");
// function validationPassword(){
//     let password=document.getElementById("password").value;
//     if(password.length==0){
//         passwordError.innerHTML="8 character is required";
//         return false;
//     }
//     if(password.length<8){
//         passwordError.innerHTML="Password Invalid";
//         return false;
//     }
//     passwordError.innerHTML='<i class="fas fa-check-circle"></i>';
//     return true;
// }

// validation for form all inputs are working or data provided working fine or not

// let flag=false;
// function validateSubmit(e){
//     if(!validationPassword()||!validationEmail()||!validationLastName()||!validationFirstName()){
//         submitError.innerHTML="Please fill the data to submit."
//         return false
//     }else{
//         flag=true;
//         setUser();
//         return true;
//     }
// }
//submit event created here
// var Submitbutton=document.getElementById("Submit");
// Submitbutton.addEventListener("click",function(e){
//     e.preventDefault();
//     validateSubmit()
// })

// posting new Admin user data to server 
//     function setUser(){
//         let newAdminObject={
//         "username": firstname.value,
//         "password": password.value,
//         "firstname": firstname.value,
//         "lastname": lastname.value,
//         "email": email.value,
//     };
//     // console.log(newAdminObject)
//     fetch(`${AdminUserUrl}`,{
//         method:"POST",
//         body:JSON.stringify(newAdminObject),
//         headers:{
//             "Content-Type":"application/json",
//         }
//     })
//     .then((res)=>{
//         return res.json()
//     })
//     .then((data)=>{
//         alert(`New Account for ${firstname.value} been created`);
//         // console.log(data)
//             alert("Redirecting to Admin Dashboard");
//             redirect();
//     })
// }

// redirecting to dashboard

// function redirect(){
//     location.href="/Admin_p.html"
// }
// window.addEventListener("load",function(){
//     fetchData();
// })
// function fetchData(){
//     fetch(`${AdminUserUrl}`)
// .then((res)=>{
//     return res.json();
// })
// .then((data)=>{
//     console.log(data);
// })
// }



var productname = document.getElementById("productname");
var imageUrl = document.getElementById("imageUrl");
var productPrice = document.getElementById("productPrice");
var selectCategory = document.getElementById("category");
var SubmitProduct = document.getElementById("Submit");

SubmitProduct.addEventListener("click", function (e) {
    e.preventDefault()
    let newProduct = {
        "name": productname.value,
        "image": imageUrl.value,
        "price": +productPrice.value
    }
    // console.log(newProduct)
    fetch(`${ProductUrl}${selectCategory.value}`, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
            alert(`${productname.value} is Added.`, onclick = redirect())
        })
})

function redirect() {
    location.href = "/Admin/dashboard.html"
}
// productname.;
// imageUrl.value="";
// productPrice.value="";
// selectCategory.value="";
// SubmitProduct.value="";