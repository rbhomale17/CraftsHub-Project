let adminname=document.getElementById("adminname");
let productscount=document.getElementById("productscount");
let localusercount=document.getElementById("localusercount");
let admincount=document.getElementById("admincount");
let incomecount=document.getElementById("incomecount");

const BaseUrlForUsers="https://mock-api-json-server-ooya.onrender.com";
const AdminUserUrl=`${BaseUrlForUsers}/Users`;
const localUserUrl=`${BaseUrlForUsers}/localUsers`;

const BaseUrlForProduct="https://project-json-server-dkem.onrender.com";
const ProductUrl=`${BaseUrlForProduct}`
// var globalproductArray2=[]
// var globalproductArray=[];
// let tempArray=[];
var productLength=0;
window.addEventListener("load",function(){
    fetchUser();
    fetchLocalUser();
    fetchproductfashion();
    fetchproductmakeup();
    fetchproducthome_decor();
    fetchproductElectronics();
    fetchPrice();
})
function fetchUser(){
fetch(`${AdminUserUrl}`)
.then((res)=>{
    return res.json();
})
.then((data)=>{
    // console.log(data)
    admincount.textContent=data.length;
})
}
function fetchLocalUser(){
    fetch(`${localUserUrl}`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // console.log(data)
        localusercount.textContent=data.length;
    })
}

function fetchproductfashion(){
    fetch(`${ProductUrl}/fashionProduct`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // console.log(data)
        productLength+=data.length;
        console.log(productLength)   
    })
}
// console.log(tempArray);

function fetchproductmakeup(){
    fetch(`${ProductUrl}/makeup`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // console.log(data)
        productLength+=data.length;
        console.log(productLength)   
    })
}

function fetchproducthome_decor(){
    fetch(`${ProductUrl}/home_decor`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // console.log(data)
        productLength+=data.length;
        console.log(productLength)   
    })
}
  
function fetchproductElectronics(){
    fetch(`${ProductUrl}/Electronics`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // console.log(data) 
        productLength+=data.length; 
        console.log(productLength)   
        productscount.textContent=productLength;   
    })
}

function fetchPrice(){
    fetch(`${ProductUrl}/trackorder`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // console.log(data)
        let x=0;
        for(let i=0; i<data.length; i++)
        {
            x+=data[i].price;
        }
        incomecount.textContent=`₹ ${x}`
    })
}


