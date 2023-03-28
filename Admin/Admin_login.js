
    const BaseUrl=`http://localhost:3000`;
    // const BaseUrl=`https://busy-lime-gecko-cape.cyclic.app`
        // const BaseUrl=`https://js-201-json-server-prohbbhx5-rbhomale17.vercel.app`
    let AdminUsers=`${BaseUrl}/Users`;

    window.addEventListener("load",function(){
        fetchData();
    })

    let myUserData=[];
    function fetchData(){
    fetch(`${AdminUsers}`,{
        method:"GET",
        // body:JSON.stringify(formdata),
        headers:{
            "content-type":"application/json"
        }, 
        })
        .then((res)=>{
        return res.json();
        })
        .then((data)=>{
        console.log(data)
        myUserData.push(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    let loginPopup=document.getElementById("loginPopup");
    
    let registeredUser=document.getElementById("username");
    let password=document.getElementById("password");
    let forms=document.getElementById("submit");

    forms.addEventListener("click",function(){
        let formdata={
            username:registeredUser.value,
            password:password.value,
        }
        console.log(formdata)
        if(checkemailPass(formdata))
        {
            // console.log(formdata.username)
            alert("Log in Successful")
            setTimeout(()=>{
                alert("Redirecting to APP.",onclick=redirect());
            },3000)
            
        }else{
            alert("Wrong Mobile/Email or Password.")
        };
    });
    
    function checkemailPass(data){
        // console.log(myUserData[0]);
        for(let i=0; i<myUserData[0].length; i++)
        {
            // console.log(myUserData[0][i])
            if(data.username==myUserData[0][i].username&&data.password==myUserData[0][i].password)
            {
                loginPopup.textContent=`Hey! Welcome ${myUserData[0][i].firstname} to Crafthub.com`
                return true;
                // break;
            }
            // console.log(data.username,myUserData[0][i].username,data.password,myUserData[0][i].password);
        }
    }
    function redirect(){
        location.href="./index.html"
    }