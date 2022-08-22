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
  
  // input tags
  const pimage = document.getElementById("previewimg");
  const ptype = document.getElementById("ptype");
  const pprice = document.getElementById("pprice");
  const psize = document.getElementById("psize");
  const pdesc = document.getElementById("pdesc");
  const noproduct = document.getElementById("noproduct");
  const promoTitle = document.getElementById("promoTitle");
  const promoPrice = document.getElementById("promoPrice");
  const promoOffDate = document.getElementById("promoOffDate");
  const searchid = document.getElementById("searchwithpid");
  const promosavebtn = document.getElementById("promosavebtn");

//   edit modal input ele
const editPromoDesc = document.getElementById("editPromoDesc");
const editPromoTitle = document.getElementById("editPromoTitle");
const editPromoPrice = document.getElementById("editPromoPrice");
const editPromoOff = document.getElementById("editPromoOff");
const productId = document.getElementById("promoProductID");

const promoupdatebtn = document.getElementById("promoupdatebtn")

    searchid.addEventListener("click",()=>{
        noproduct.textContent = "";
    })
    // search btn
  const searchwithpidbtn = document.getElementById("searchwithpidbtn");
  searchwithpidbtn.addEventListener("click",()=>{
    var shopadminId = localStorage.getItem("shopadminId");
    console.log("shop id", shopadminId)
    var pid = Number(searchid.value);
    console.log("search id", pid);
    const promoProduct = db.products.where({id: pid, shop_id: shopadminId}).toArray();
    promoProduct.then( pdata =>{
      console.log("product with shop id", pdata);
      if(pdata.length == 0){
        console.log(" no data");
            noproduct.textContent = "Sorry! Your Product Not Found";
            noproduct.classList.add("text-danger");
      }else{
        pdata.map( pdata =>{
          console.log("product 1 with shop id", pdata);
          document.getElementById("promocontainer").classList.remove("hide-me")
          pimage.setAttribute("src", pdata.image)
          ptype.value = pdata.type;
          pprice.value = pdata.price;
          psize.value = pdata.size;
          pdesc.value = pdata.desc;
        })
        
      }
      
    })
     
  })
  // save button
  
  // for promotion
var promotioncon = document.getElementById("promotionContainer");
db.products
    .where("promotion").equalsIgnoreCase("true")
    .each(product => {
        // console.log("Found product", product.price);
      
          createEle("div", promotioncon, div_col => {
            div_col.className += "col mb-5";
            createEle("div", div_col, div_card =>{
              div_card.className += "card h-100";
              createEle("div", div_card, div_title =>{
                div_title.className += "badge bg-logo text-white position-absolute";
                div_title.textContent = product.title
              })
              
                // for product image
                createEle("img", div_card, product_img =>{
                  product_img.className += "card-img-top";
                  product_img.setAttribute("src", product.image);
                  product_img.setAttribute("alt","product image");
                })
      
                // for product details
                createEle("div", div_card, card_body=>{
                  card_body.className += "card-body p-4";
                  createEle("div", card_body, body_center =>{
                    body_center.className += "text-center";
                    createEle("h5", body_center, product_name =>{
                      product_name.className += "fw-bolder";
                      product_name.textContent = product.type;
                    })
                    createEle("div", body_center, product_size =>{
                      product_size.textContent = "Size:" + product.size;
    
                    })
                    createEle("div", body_center, product_price =>{
                      product_price.innerHTML = `Price:<span class="text-decoration-line-through">${product.price}$</span> <span>${product.promotionPrice}$</span>`;
    
                    })
                    createEle("div", body_center, product_desc =>{
                      product_desc.textContent = "Title:" +product.desc;
    
                    })
                    createEle("div", body_center, promotionOff =>{
                      promotionOff.className += "text-warning"
                      promotionOff.textContent = "OFF:" +product.promotionOFF;
    
                    })
                  })
                })
                // product card action
                createEle("div", div_card, product_action => {
                  product_action.className += "card-footer p-2 pt-0 border-top-0 bg-transparent";
                  createEle("div",product_action, action_center =>{
                    action_center.className += "text-center";
                    
                    createEle("a", action_center, action_btn1 =>{
                      action_btn1.className += "btn btn-outline-dark mt-auto";
                      action_btn1.textContent = "End";
                      action_btn1.setAttribute("data-id",product.id);
                      action_btn1.setAttribute("id","orderbtn");
                      action_btn1.onclick = endpromofn;
                    })
                    createEle("a", action_center, action_btn2 =>{
                      action_btn2.className += "btn btn-outline-dark mt-auto";
                      action_btn2.textContent = "Edit";
                      
                      action_btn2.setAttribute("data-id",product.id);
                      action_btn2.setAttribute("data-bs-toggle","modal");
                      action_btn2.setAttribute("data-bs-target","#editModal")
                      action_btn2.onclick = editfn;
                    })
                    // createEle("button", action_center, action_btn3 =>{
                    //   action_btn3.className += "btn btn-success mt-auto";
                    //   action_btn3.textContent = product.status;
                    //   action_btn3.setAttribute("data-id",product.id);
                    //   action_btn3.setAttribute("value",product.status);
                    //   action_btn3.setAttribute("id","activebtn");
                    //   action_btn3.onclick = activefn;
    
                    // })
                    
                  })
                });
              
            })
            
          });
    
    });

  
// event listerner for create button
promosavebtn.addEventListener("click",(event) => {
  if(navigator.onLine == true){
    const pid = Number(searchid.value);
    if (pid) {
        // call dexie update method
        db.products.update(pid, {
        //   image: edit_image.getAttribute("src"),
          type: ptype.value,
          price: pprice.value,
          size: psize.value,
          desc: pdesc.value,
          promotion: "true",
          promotionPrice: promoPrice.value,
          title: promoTitle.value,
          promotionOFF: promoOffDate.value,
          status: "Unactive"
    
        }).then( ()=>{
    window.location.href = "./promotion.html";

        })
    }
}
else{
    console.log("you are online")
    swal("You are offline !");
}
    
  })
  
  // button update

// for edit proomotion
const editfn = (event) => {
    let id = parseInt(event.target.dataset.id);
      db.products.get(id, function (data) {
        productId.value = data.id;
      editPromoDesc.value = data.desc;
      editPromoTitle.value = data.title;
      editPromoPrice.value = data.promotionPrice;
      editPromoOff.value = data.promotionOFF;  
    });
  }
  // event listerner for promo update button
  promoupdatebtn.addEventListener("click",(event) => {
    // console.log("img src", pimage.getAttribute("src"))
    // pimage.getAttribute("src");
    // insert values
    const upid =Number(productId.value);
    console.log("hi promo",upid)

    if (upid) {

        // call dexie update method
        db.products.update(upid, {
        //   image: edit_image.getAttribute("src"),
          desc: editPromoDesc.value,
          promotionPrice: editPromoPrice.value,
          title: editPromoTitle.value,
          promotionOFF: editPromoOff.value
    
        })
    window.location.href = "./promotion.html";
    }
  })
  
  // promotion end fn
  const endpromofn = event => {
    swal({
      title: "Are you sure?",
      text: "Once End, Only remove promotion !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let did = parseInt(event.target.dataset.id);
        db.products.update(did,{
            promotion:"false",
            title: "no",
            promotionOFF: "no"
        });
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

  // active promotion function
// const activefn = event =>{
//   let aid = parseInt(event.target.dataset.id);
//   db.products.get(aid, function (data) {
//     // edit_type.value = data.price
//     console.log("data in db", data.status)
//     console.log("active id",aid)
//     let activebtn = document.getElementById("activebtn");
//     console.log("actvie text", activebtn.textContent)
//     if (data.status == "Active") {
//       console.log("yes set unactive")
//       // call dexie update method
//       db.products.update(aid, {
//         status: "Unactive"
//       }).then(()=>{
//         location.reload();
//       })
//   }
//   else{
//     db.products.update(aid, {
//       status: "Active"
//     }).then(()=>{
//       location.reload();
//     })
//     console.log("not set active")
//   }
//   })
// }