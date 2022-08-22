import prodb, {
    bulkcreate,
    createEle,
    getData,
    SortObj
  } from "./module.js";
  
  
  let db = prodb("OMP", {
    products: `++id, type, promotion,desc,shop_id, status,[status+shop_id],[id+shop_id], price`,
    user: `++id, email, name, order, status`,
    shop: `++id, owner_email, name, owner_id`
  });
  console.log(JSON.parse(localStorage.getItem("userobj")).id)
  var id = localStorage.getItem("shopadminId")
  console.log("type:",  id);
  var sid = parseInt(id)
  console.log("type:", typeof iid)

  var data = await db.shop.get(sid)
console.log("shop data", data)
var shopprofile = document.getElementById("shopprofileimg");
var shopname = document.getElementById("shopname");
var shopaddress1 = document.getElementById("shopaddress1");
var shopaddress2 = document.getElementById("shopaddress2");
var shoptype = document.getElementById("shoptype");

var ownername = document.getElementById("ownername");
var owneremail = document.getElementById("owneremail");
var ownerphone = document.getElementById("ownerphone")

var shopprofilereviewer = document.getElementById("editprofilereviewer");
var editshopname = document.getElementById("editname");
var editshoptype = document.getElementById("shopType");
var editshopaddress1 = document.getElementById("editaddress1");
var editshopaddress2 = document.getElementById("editaddress2");
var license = document.getElementById("license");

shopprofile.setAttribute("src",data.logo || "./assets/img/logos/logo.png");
shopname.textContent = data.name || "Name";
shoptype.textContent = data.type;
shopaddress1.textContent = data.address1;
shopaddress2.textContent = data.address2;

ownername.textContent = data.owner_name;
owneremail.textContent = data.owner_email;
owneremail.setAttribute("href","mailto:"+data.owner_email);
ownerphone.textContent = data.owner_phone;
ownerphone.setAttribute("href","tel:"+data.owner_phone);
  
shopprofilereviewer.setAttribute("src", data.logo || "./assets/img/logos/logo.png");
editshopname.value = data.name;
  editshoptype.value = data.type;
  editshopaddress1.value = data.address1;
  editshopaddress2.value = data.address2;
  license.value = data.license;

  document.getElementById("shopprofileeditbtn").addEventListener("click",()=>{
    console.log("hi shop why click me")
    db.shop.update(sid, {
        logo: shopprofilereviewer.getAttribute("src"),
        name: editshopname.value,
        address1: editshopaddress1.value,
        address2: editshopaddress2.value,
        type: editshoptype.value
    }).then(function (updated) {
        if (updated)
        Swal.fire({
            title: 'Successed!',
            icon: 'success',
            confirmButtonText:`OK`
          }).then((result) => {
            if (result.value) {
              window.location.href = `./shopProfile.html`;
            }
          });         
          else{
            swal({
                title: "Not Successed!",
                text: "Something wrong",
                icon: "warning",
              });
          }
      });
  })