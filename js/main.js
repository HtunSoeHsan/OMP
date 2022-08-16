import prodb, {
  bulkcreate,
  createEle,
  getData,
  SortObj
} from "./module.js";


let db = prodb("OMP", {
  products: `++id, type, promotion,desc, status, price`,
  user: `++id, email, name, order, status`,
  shop: `++id, owner_email, name, owner_id`
});

// input tags
const pimage = document.getElementById("previewimg");
const ptype = document.getElementById("ptype");
const pprice = document.getElementById("pprice");
const psize = document.getElementById("psize");
const pdesc = document.getElementById("pdesc");
// const pdesc1 = document.getElementById("pdesc1");

// for edit input
  var edit_image = document.getElementById("editviewimg");
  var edit_type = document.getElementById("edit_type");
  var edit_size = document.getElementById("edit_size");
  var edit_price = document.getElementById("edit_price");
  var edit_desc = document.getElementById("edit_desc");
  var productID = document.getElementById("productID");
// get image file 
  // pimage.addEventListener('change', (e)=>{
  //   console.log("e", e);
  //   let reader = new FileReader();
  //   reader.readAsDataURL(e[1])
  // })
// save button
const savebtn = document.getElementById("savebtn");

// create button
// const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// product data
product()

// event listerner for create button
savebtn.addEventListener("click",(event) => {
  // console.log("img src", pimage.getAttribute("src"))

  // pimage.getAttribute("src");
  // insert values
  let flag = bulkcreate(db.products, {
    image: pimage.getAttribute("src"),
    type: ptype.value,
    price: pprice.value,
    size: psize.value,
    desc: pdesc.value,
    title: "no",
    status: "Active",
    promotion: "no",
    promotionPrice: "no"

  });
  // reset textbox values
  pimage.value = ptype.value = pprice.value = psize.value = pdesc.value = "";

  // set id textbox value
  // getData(db.products, data => {
  //   userid.value = data.id + 1 || 1;
  //   console.log("data id", data.id)
  // });
  product();
  // location.reload();

  // let insertmsg = document.querySelector(".insertmsg");
  // getMsg(flag, insertmsg);
})


// event listerner for create button
// btnread.onclick = product;

// button update
btnupdate.onclick = () => {
  const upid = parseInt(productID.value);
  console.log("update id",upid)
  console.log("update image",edit_image.getAttribute("src"))
  console.log("update id",edit_type.value)
  console.log("update id",edit_size.value)
  console.log("update id",edit_price.value)
  console.log("update id",edit_desc.value)

  if (upid) {
    // call dexie update method
    db.products.update(upid, {
      image: edit_image.getAttribute("src"),
      type: edit_type.value,
      price: edit_price.value,
      size: edit_size.value,
      desc: edit_desc.value

    })
    location.reload();

    // .then((updated) => {
    //   // let get = updated ? `data updated` : `couldn't update data`;
    //   let get = updated ? true : false;

    //   // display message
    //   let updatemsg = document.querySelector(".updatemsg");
    //   getMsg(get, updatemsg);

    //   // proname.value = seller.value = price.value = "";
    //   //console.log(get);
    // })
  } else {
    console.log(`Please Select id:`);
  }
}

// for delete button
// btndelete.onclick = () => {
//   db.delete();
//   db = prodb("Productdb", {
//     products: `++id, name, seller, price`
//   });
//   db.open();
//   product();
//   textID(userid);
//   // display message
//   let deletemsg = document.querySelector(".deletemsg");
//   getMsg(true, deletemsg);
// }

// window.onload = event => {
//   // set id textbox value
//   textID(userid);
// };



// create dynamic product
function product() {

  const productcontainer = document.getElementById("productContainer");
  const newprodct = document.getElementById("newProduct");
  const notfound = document.getElementById("notfound");
  // notfound.textContent = "";
  // remove all childs from the dom first
  // while (tbody.hasChildNodes()) {
  //   tbody.removeChild(tbody.firstChild);
  // }


  getData(db.products, (data, index) => {
    if (data) {
      console.log(typeof data)
      for (const value in data) {
      console.log("data value", data[value].promotion)
      createEle("div", productcontainer, div_col => {
        div_col.className += "col mb-5";
        createEle("div", div_col, div_card =>{
          div_card.className += "card w-5 h-100";
          // createEle("div", div_card, div_title =>{
          //   div_title.className += "badge bg-dark text-white position-absolute";
          // })
          
            // for product image
            createEle("img", div_card, product_img =>{
              product_img.className += "card-img-top";
              product_img.setAttribute("src", data[value].image);
              product_img.setAttribute("alt","product image");
            })
  
            // for product details
            createEle("div", div_card, card_body=>{
              card_body.className += "card-body p-4";
              createEle("div", card_body, body_center =>{
                body_center.className += "text-center";
                createEle("h5", body_center, product_name =>{
                  product_name.className += "fw-bolder";
                  product_name.textContent = data[value].type;
                })
                createEle("div", body_center, product_size =>{
                  product_size.textContent = "Size:" + data[value].size;

                })
                createEle("div", body_center, product_price =>{
                  product_price.textContent = "Price:" + data[value].price + "$";

                })
                createEle("div", body_center, product_desc =>{
                  product_desc.textContent = "Title:" + data[value].desc;

                })
              })
            })
            // product card action
            createEle("div", div_card, product_action => {
              product_action.className += "card-footer p-2 pt-0 border-top-0 bg-transparent";
              createEle("div",product_action, action_center =>{
                action_center.className += "text-center";
                createEle("a", action_center, action_btn1 =>{
                  action_btn1.className += "btn btn-success mt-auto";
                  action_btn1.textContent = data[value].status;
                  action_btn1.setAttribute("data-id",data[value].id);
                  action_btn1.setAttribute("id","activebtn");
                  action_btn1.onclick = activefn;


                })
                createEle("a", action_center, action_btn2 =>{
                  action_btn2.className += "btn btn-outline-dark mt-auto";
                  action_btn2.textContent = "Edit";
                  
                  action_btn2.setAttribute("data-id",data[value].id);
                  action_btn2.setAttribute("data-bs-toggle","modal");
                  action_btn2.setAttribute("data-bs-target","#editModal")
                  action_btn2.onclick = editfn;
                })
                createEle("a", action_center, action_btn3 =>{
                  action_btn3.className += "btn btn-danger mt-auto";
                  action_btn3.textContent = "Delete";
                  action_btn3.setAttribute("data-id",data[value].id);
                  action_btn3.onclick = deletefn;

                })
              })
            });
          
        })
        
      });
    }
      console.log(data)
    } else {
      notfound.textContent = "No record found in the database...!";
    }

  });
}

// for edit product
const editfn = (event) => {
  let id = parseInt(event.target.dataset.id);

    db.products.get(id, function (data) {
    edit_type.value = data.price
    // let newdata = SortObj(data);
    edit_image.setAttribute('src',data.image);
    productID.value = id;
    edit_type.value = data.type || "";
    edit_size.value = data.size || "";
    edit_price.value = data.price || "";
    edit_desc.value = data.desc || "";

  });
}

// delete icon remove element 
const deletefn = event => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      let did = parseInt(event.target.dataset.id);
      db.products.delete(did);
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
        
      }).then(function(){ 
        location.reload();
    });
      
    } else {
      swal("Your imaginary file is safe!");
    }
  });
}

// active function
const activefn = event =>{
  let aid = parseInt(event.target.dataset.id);
  console.log("active id",aid)
  let activebtn = document.getElementById("activebtn");
  console.log("actvie text", activebtn.textContent)
  if (activebtn.textContent == "Unactive") {
    console.log("yes")
    // call dexie update method
    db.products.update(aid, {
      status: "Active"
    })
    // activebtn.textContent = "Unactive";
}
else{
  db.products.update(aid, {
    status: "Unactive"
  })
  console.log("not ")

}

}
// textbox id
function textID(textboxid) {
  getData(db.products, data => {
    textboxid.value = data.id + 1 || 1;
  });
}


// function msg
// function getMsg(flag, element) {
//   if (flag) {
//     // call msg 
//     element.className += " movedown";

//     setTimeout(() => {
//       element.classList.forEach(classname => {
//         classname == "movedown" ? undefined : element.classList.remove('movedown');
//       })
//     }, 4000);
//   }
// }

export default db;
