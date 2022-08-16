// for import db
import prodb, {
    bulkcreate,
    createEle,
    getData,
    userData,
    SortObj
  } from "./module.js";
  
  
  let db = prodb("OMP", {
    products: `++id, type, promotion,desc, status, price`,
    user: `++id, email, name, order, status`,
    shop: `++id, owner_email, name, owner_id`
  });
  ////////////////////////////////////////////

var shopregisterbtn = document.getElementById("shopregisterbtn");
var user =JSON.parse(localStorage.getItem("userobj")); 
if(!user){
    Swal.fire({
        title: 'You need to Login first',
        icon: 'warning',
        text: 'Go registeration page',
        confirmButtonText:`Please Login`
      }).then((result) => {
        if (result.value) {
          window.location.href = `./login.html`
        }
      }); 
}else{
  
}
document.getElementById("userName").value =user.name;
document.getElementById("userPhone").value = user.phone;
document.getElementById("userEmail").value = user.email;

console.log(document.getElementById("user_Email"))
shopregisterbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    
    let flag = bulkcreate(db.shop,{
        logo: document.getElementById("PicturePreview").getAttribute("src"),
        name: document.getElementById("shopName").value,
        type: document.getElementById("shopType").value,
        address1: document.getElementById("address1").value,
        address2: document.getElementById("address2").value,
        license: document.getElementById("license").value,
        password: document.getElementById("password").value,
        owner_name: user.name,
        owner_id: user.id,
        owner_email: user.email,
        owner_phone: user.phone
     })
     var shopadmin = {
        id: user.id,
        profile: user.profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: user.password
     }
     localStorage.setItem("shopadmin",JSON.stringify(shopadmin));
     localStorage.removeItem("userobj");
     Swal.fire({
        title: 'Register Successed',
        icon: 'success',
        text: 'Go home page',
        confirmButtonText:`Go Home`
      }).then((result) => {
        if (result.value) {
          window.location.href = `./`
        }
      }); 
        
         
    //  location.reload()
    })

