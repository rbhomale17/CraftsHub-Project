let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart)

let submit = document.getElementById("submit")
let form = document.getElementById("form")

let oname = document.getElementById("oname")
let address = document.getElementById("address")
let city = document.getElementById("city")
let state = document.getElementById("state")
let pincode = document.getElementById("pincode")
let number = document.getElementById("number")


let locationArray=[
    'Ahmednagar',
    'Akola',
    'Amravati',
    'Aurangabad',
    'Bhandara',
    'Beed',
    'Buldhana',
    'Chandrapur',
    'Dhule',
    'Gadchiroli',
    'Gondia',
    'Hingoli',
    'Jalgaon',
    'Jalna',
    'Kolhapur',
    'Latur',
    'Mumbai City',
    'Mumbai suburban',
    'Nandurbar',
    'Nanded',
    'Nagpur',
    'Nashik',
    'Osmanabad',
    'Parbhani',
    'Pune',
    'Raigad',
    'Ratnagiri',
    'Sindhudurg',
    'Sangli',
    'Solapur',
    'Satara',
    'Thane',
    'Wardha',
    'Washim',
    'Yavatmal',
];
// let cart=JSON.parse(localStorage.getItem("Add-to-cart"))||[];

// console.log(cart);


submit.addEventListener("click",function(event){
event.preventDefault();
// cart=[];

// console.log(cart)
let i=34;

let  j=0;
if(i==0)
{
 i=34;
} 
if(j==34)
{
 j=0;
}
let k=10;
if(k===32)
{
 k=16;
}
console.log(cart.length);
if(cart.length===0)
{
    conform.textContent="Your Cart is Empty..."
}
else{

// conform.textContent="Your Order Succsesfully Placed."
// let trackOrder=JSON.parse(localStorage.getItem("track-my-order"))||[];
let orderData={
    name:oname.value,
    phone:number.value,
    address:address.value,
    city:city.value,
    pinCode:pincode.value,
    Previous_location:locationArray[i-2],
    Current_location:locationArray[j+3],
    Next_location:locationArray[k+4],
    buy_Item:cart[0].name,
    price:cart[0].price
};
console.log(orderData)
// console.log(cart,cart[i].title);
fetch("https://project-json-server-dkem.onrender.com/trackorder",{
    method : "POST",
    body: JSON.stringify(orderData),
    headers : {
        "Content-Type" : "application/json"
    }
})
.then((request)=>{
    return request.json()
})
.then((data)=>{
    console.log(data)

})
.catch((error)=>{
    console.log(error)
})
// trackOrder.push(orderData);
// localStorage.setItem("track-my-order",JSON.stringify(trackOrder));
}
// console.log(cart);
// cart=null;
// localStorage.setItem("cart",JSON.stringify(cart))
// setTimeout(function(){
// location.replace("./index.html");
// },4000);
});