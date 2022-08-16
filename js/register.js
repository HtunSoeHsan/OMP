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

  // for save register info
var signup_profile = document.getElementById("wizardPicturePreview")
var signup_username = document.getElementById("signup_username");
var signup_email = document.getElementById("signup_email");
var signup_phone = document.getElementById("signup_phone");
var signup_address = document.getElementById("signup_address");
var signup_password = document.getElementById("signup_password");
// console.log(signup_username)


const signupbtn = document.getElementById("signup_submit_btn");
signupbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    //     console.log("src",signup_profile.getAttribute("src"))
    //  console.log("signup_username",signup_username.value)
    //  console.log("signup_email",signup_email.value)
    //  console.log("signup_address",signup_address.value)
    //  console.log("signup_password",signup_password.value)
    // console.log("signup_address",signup_address.value)
    
     let flag = bulkcreate(db.user,{
        profile: signup_profile.getAttribute("src"),
        name: signup_username.value,
        email: signup_email.value,
        phone: signup_phone.value,
        address: signup_address.value,
        password: signup_password.value
     })
     var userobj = {
        profile: signup_profile.getAttribute("src"),
        name: signup_username.value,
        email: signup_email.value,
        phone: signup_phone.value,
        address: signup_address.value,
        password: signup_password.value
     }
     localStorage.setItem("userobj",JSON.stringify(userobj));

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

    // for login system 
      var login_email = document.getElementById("login_user");
      var login_password = document.getElementById("login_password");
      var loginbtn = document.getElementById("login_submit_btn");
    
      loginbtn.addEventListener('click',(e)=>{
        e.preventDefault();
        console.log(login_email.value);
    console.log(login_password.value);
        console.log("hi login");
        userData(db.user,(data)=>{
          if(data){
            console.log("user login data:",data.password);
            console.log("user login data:",data.email);
            for (const value in data) {
              console.log("user login data:",data[value].password);
              if(login_email.value == data[value].email && login_password.value == data[value].password){
                var userobj = {
                  id: data[value].id,
                  profile: data[value].profile,
                  name: data[value].name,
                  email: data[value].email,
                  phone: data[value].phone,
                  address: data[value].address,
                  password: data[value].password
               }
               localStorage.setItem("userobj",JSON.stringify(userobj));
          
               Swal.fire({
                  title: 'Login Successed',
                  icon: 'success',
                  text: 'Go home page',
                  confirmButtonText:`Go Home`
                }).then((result) => {
                  if (result.value) {
                    window.location.href = `./`
                  }
                }); 
              }else{
                document.getElementById("notlogin").textContent ="Not Success! Incorrect email or password"
                console.log("not success")
              }

            }

          }else{
            document.getElementById("notlogin").textContent ="Not Success! You are not user"

          }
        })

      })
