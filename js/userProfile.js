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
  var id = JSON.parse(localStorage.getItem("userobj")).id;
  console.log("type:", typeof id);
  var iid = parseInt(id)
  console.log("type:", typeof iid)

  var data = await db.user.get(id)
//   var name = console.log("user data", data.address)
var userprofile = document.getElementById("userprofileimg");
var username = document.getElementById("username");
var useraddress = document.getElementById("useraddress");
var useremail = document.getElementById("useremail");
var userphone = document.getElementById("userphone");
var editprofilereviewer = document.getElementById("editprofilereviewer");
var editname = document.getElementById("editname");
var editemail = document.getElementById("editemail");
var editphone = document.getElementById("editphone");
var editaddress = document.getElementById("editaddress");

  userprofile.setAttribute("src",data.profile);
  username.textContent = data.name || "Name";
  useremail.textContent = data.email;
  useremail.setAttribute("href","mailto:"+data.email);
  userphone.textContent = data.phone;
  userphone.setAttribute("href","tel:"+data.phone);
  useraddress.textContent = data.address || "address";
  editprofilereviewer.setAttribute("src", data.profile);
  editname.value = data.name;
  editphone.value = data.phone;
  editaddress.value = data.address;
  editemail.value = data.email;

  document.getElementById("userprofileeditbtn").addEventListener("click",()=>{
    console.log("hi why click me")
    console.log(editaddress.value)
    db.user.update(id, {
        name: editname.value,
        phone: editphone.value,
        email: editemail.value,
        address: editaddress.value,
        profile: editprofilereviewer.getAttribute("src")
    }).then(function (updated) {
        if (updated)
        Swal.fire({
            title: 'Successed!',
            icon: 'success',
            confirmButtonText:`OK`
          }).then((result) => {
            if (result.value) {
              window.location.href = `./userProfile.html`;
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