
const shopadminId = localStorage.getItem("shopadminId");

document.getElementById("admin").addEventListener("click",(e)=>{
e.preventDefault();
    if(shopadminId){
        console.log("hi admin ")
        window.location.href =`./dashboard.html`;
    }
    else{
        window.location.href =`./shopadminlogin.html`;
        console.log("hi login for admin")
    }
})