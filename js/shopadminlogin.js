// for import db
import prodb, {
    bulkcreate,
    createEle,
    getData,
    userData,
    SortObj,
    shopData
  } from "./module.js";
  
  
  let db = prodb("OMP", {
    products: `++id, type, promotion,desc, shop_id status,[status+shop_id],[id+shop_id], price`,
    user: `++id, email, name, order, status`,
    shop: `++id, owner_email, name, owner_id`
  });
  ////////////////////////////////////////////

var shopadminloginbtn = document.getElementById("shopadminloginbtn");
// var user =JSON.parse(localStorage.getItem("userobj")); 
// if(!user){
//     Swal.fire({
//         title: 'You need to Login first',
//         icon: 'warning',
//         text: 'Go registeration page',
//         confirmButtonText:`Please Login`
//       }).then((result) => {
//         if (result.value) {
//           window.location.href = `./login.html`
//         }
//       }); 
// }
// document.getElementById("userName").value =user.name;
// document.getElementById("userPhone").value = user.phone;
// document.getElementById("userEmail").value = user.email;

// console.log(document.getElementById("user_Email"))

shopadminloginbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    var loginuser = JSON.parse(localStorage.getItem("userobj"));
    
if(loginuser){
  var id = loginuser.id;
  shopData(db.shop, data =>{
    if(!data){
      document.getElementById("login_error").textContent ="No Shop yet"
    }
    if(data.name.toLowerCase() == document.getElementById("shopname").value.toLowerCase() && data.password.toLowerCase() == document.getElementById("shoppassword").value.toLowerCase() && id == data.owner_id){
        console.log(" good you success");

        
         localStorage.setItem("shopadminId",data.id);
         localStorage.setItem("shopownerId",data.owner_id);

         Swal.fire({
            title: 'Successed',
            icon: 'success',
            text: 'Welcome to shop admin',
            confirmButtonText:`Ok`
          }).then((result) => {
            if (result.value) {
              window.location.href = `./dashboard.html`
            }
          }); 
            
    }else{
        document.getElementById("login_error").textContent ="Incorrect name or password!"
    }
})
}else{
  document.getElementById("login_error").textContent ="You need to login first"

}

document.querySelector("input").addEventListener("click", ()=>{
  document.getElementById("login_error").textContent ="";

})
    
        
         
    //  location.reload()
    })

