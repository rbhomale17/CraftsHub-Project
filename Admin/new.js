const BaseUrl=`http://localhost:3000`
let AdminUsers=`${BaseUrl}/Users`;

let but=document.querySelector("button");

but.addEventListener("click",function(){
    let obj={
        "username": "rbhomale17",
        "password": "Rushi@1432",
        "firstname":"Rushikesh",
        "lastname":"Bhomale",
        "email": "rbhomale17@gmail.com"
    }
    fetch(`${AdminUsers}`,{
        method:"GET",
        // body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data)
    })
})