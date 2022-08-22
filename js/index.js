import prodb, {
  bulkcreate,
  createEle,
  getData,
  SortObj,
  shopData
} from "./module.js";


let db = prodb("OMP", {
  products: `++id, type, promotion,desc,shop_id,status,[status+shop_id],[id+shop_id],price`,
  user: `++id, email, name, order`,
  shop: `++id, owner_email, name, owner_id`
});


// for user  container
const user = JSON.parse(localStorage.getItem("userobj"));
if(user){
  var data = await db.user.get(user.id);
  document.getElementById("profile_name").textContent = data.name;
  document.getElementById("profile-img").setAttribute("src",data.profile)
}

// total user
db.user.count().then( totaluser =>{
  document.getElementById("totaluser").textContent = totaluser || "0";
});

// total shop
db.shop.count().then( totalshop =>{
  document.getElementById("totalshop").textContent = totalshop || "0";
});

///////////////////////////////

// for producct
var productcon = document.getElementById("showproductcon");

db.products
    .where("status").equalsIgnoreCase("Unactive")
    .each(product => {
        // console.log("Found product", product.price);
      
          createEle("div", productcon, div_col => {
            div_col.className += "col mb-5";
            createEle("div", div_col, div_card =>{
              div_card.className += "card h-100";
              createEle("div", div_card, div_title =>{
                div_title.className += "badge bg-logo text-white position-absolute";
                if(product.title != "no"){
                  div_title.textContent = product.title 
                }
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
                      if(product.promotion == "true"){
                        product_price.innerHTML = `Price:<span class="text-decoration-line-through">${product.price}$</span> <span>${product.promotionPrice}$</span>`;
                        
                      }else{
                        product_price.textContent = "Price:" + product.price + "$";
                      }
    
                    })
                    createEle("div", body_center, product_desc =>{
                      product_desc.textContent = "Title:" +product.desc;
                      
                    })
                    if(product.promotion == "true"){
                      createEle("div", body_center, promotionOFF =>{
                        promotionOFF.className += "text-danger"
                        promotionOFF.textContent = "OFF:" +product.promotionOFF;
                           
                      })
                    }
  
                  })
                })
                // product card action
                createEle("div", div_card, product_action => {
                  product_action.className += "card-footer p-2 pt-0 border-top-0 bg-transparent";
                  createEle("div",product_action, action_center =>{
                    action_center.className += "text-center";
                    createEle("a", action_center, action_btn1 =>{
                      action_btn1.className += "btn btn-outline-dark mt-auto";
                      action_btn1.textContent = "Order";
                      action_btn1.setAttribute("data-id",product.id);
                      action_btn1.setAttribute("id","orderbtn");
                      // action_btn1.onclick = activefn;
    
    
                    })
                    createEle("a", action_center, action_btn2 =>{
                      action_btn2.className += "btn btn-outline-dark mt-auto";
                      action_btn2.textContent = "View";
                      
                      action_btn2.setAttribute("data-id",product.id);
                      action_btn2.setAttribute("data-bs-toggle","modal");
                      action_btn2.setAttribute("data-bs-target","#staticBackdrop");
                      action_btn2.onclick = showproductinfo;
                    })
                    createEle("a", action_center, action_btn3 =>{
                      action_btn3.className += "btn btn-outline-dark mt-auto";
                      action_btn3.textContent = "Cart";
                      action_btn3.setAttribute("data-id",product.id);
                      // action_btn3.onclick = deletefn;
    
                    })
                  })
                });
              
            })
            
          });
    
    });


    // shop section
shopData(db.shop, (data)=>{
  if(data){
    // console.log("shop data:",data.type)
    // for (const value in data) {
    //   console.log("data:", data.id)
    // }
    var shopsection = document.getElementById("shopsection");

createEle("div", shopsection, shopcol =>{
  shopcol.className +="col-lg-4 col-sm-6 mb-4";
  createEle("div", shopcol, shopitem =>{
    shopitem.className += "shop-item";
    createEle("a", shopitem , shoplink =>{
      shoplink.className += "shop-link";
      shoplink.setAttribute("data-bs-toggle","modal");
      shoplink.setAttribute("href","#shopModal1");
      shoplink.onclick = showshopinfofn;
      createEle("div", shoplink, shophover =>{
        shophover.className += "shop-hover";
        shophover.setAttribute("data-id",data.id);
        createEle("div",shophover, shophovercontent =>{
          shophovercontent.className +="shop-hover-content";
          shophovercontent.textContent ="Click To View More"
        })
      })
      createEle("img",shoplink, shoplogo =>{
        shoplogo.className +="img-fluid rounded-top";
        shoplogo.setAttribute("src",data.logo || "assets/img/logos/logo.png");
        shoplogo.setAttribute("alt","...");
      })
    })
    createEle("div", shopitem, shopcaption =>{
      shopcaption.className += "shop-caption";
      createEle("div", shopcaption, captionheading =>{
        captionheading.className +="shop-caption-heading";
        captionheading.textContent = data.name;
      })
      createEle("div", shopcaption, captionsubheading =>{
        captionsubheading.className +="shop-caption-subheading text-muted";
        captionsubheading.textContent = data.type;
      })
    }
    )
  })

})
shopsection.append(shopcol)
  }
})

// for promotion
var promotioncon = document.getElementById("promotioncon");
db.products
    .where("promotion").equalsIgnoreCase("true")
    .each(product => {
        // console.log("Found product", product.price);
      console.log("promotion", product)
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
                      promotionOff.className += "text-danger"
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
                      action_btn1.textContent = "Order";
                      action_btn1.setAttribute("data-id",product.id);
                      action_btn1.setAttribute("id","orderbtn");
                      // action_btn1.onclick = activefn;
                    })
                    createEle("a", action_center, action_btn2 =>{
                      action_btn2.className += "btn btn-outline-dark mt-auto";
                      action_btn2.textContent = "View";
                      
                      action_btn2.setAttribute("data-id",product.id);
                      action_btn2.setAttribute("data-bs-toggle","modal");
                      action_btn2.setAttribute("data-bs-target","#staticBackdrop");
                      action_btn2.onclick = showproductinfo;
                    })
                    createEle("a", action_center, action_btn3 =>{
                      action_btn3.className += "btn btn-outline-dark mt-auto";
                      action_btn3.textContent = "Cart";
                      action_btn3.setAttribute("data-id",product.id);
                      // action_btn3.onclick = deletefn;
    
                    })
                  })
                });
              
            })
            
          });
    
    });
// view product info
  var visitShopbtn = document.getElementById("visitShopbtn");
  var offProduct = document.getElementById("ofproduct");
offProduct.textContent ="htun"
const showproductinfo = (event)=>{
  let id = parseInt(event.target.dataset.id);
 const viewProduct = db.products.get(id)
 document.getElementById("promoTitleOfProduct").textContent = ""
 viewProduct.then((data)=>{
  console.log("hi view product",data.shop_id);
  document.getElementById("imgOfProduct").setAttribute("src",data.image);
  document.getElementById("typeOfProduct").textContent = data.type;
  document.getElementById("sizeOfProduct").textContent = data.size;
  document.getElementById("titleOfProduct").textContent = data.desc;
  console.log("data title", data.title)
if(data.promotion == "true"){
  document.getElementById("promoTitleOfProduct").textContent = data.title;
  document.getElementById("priceOfProduct").innerHTML = `Price:<span class="text-decoration-line-through">${data.price}$</span> <span>${data.promotionPrice}$</span>`;
}else{
  document.getElementById("priceOfProduct").textContent ="Price:" + data.price + "$";
}
  offProduct.innerHTML = "";
if(data.promotionOFF !="no"){
  createEle("span", offProduct, offSpan =>{
    offSpan.className += "fs-4 text-danger";
    offSpan.textContent = "Promo Off Date:" + data.promotionOFF;

  })
}else{
  offProduct.removeChild();
}

const viewShop = db.shop.get(Number(data.shop_id))
  viewShop.then( data =>{
    console.log("shop name", data)
    document.getElementById("shopOfProduct").textContent = data.name;
    visitShopbtn.setAttribute("data-id",data.id)

  })

 })

}
  
// for show shop info
const shopName = document.getElementById("shopName");
  const shopImg = document.getElementById("shopImg");
  const shopType = document.getElementById("shopType");
  const shopEmail = document.getElementById("shopEmail");
  const shopPhone = document.getElementById("shopPhone");
  const shopFacebook = document.getElementById("shopFacebook");
  const shopProduct = document.getElementById("shopProduct");
const showshopinfofn = (event)=>{
  // shopProduct.innerHTML = "";
  let id = Number(event.target.dataset.id);
  console.log("id with one to one",id)
console.log("shop id", id)
    db.shop.get(id, function (data) {
      console.log("shop info", data)
    shopName.textContent = data.name;
    shopType.textContent = data.type;
    shopImg.setAttribute("src",data.logo)
    shopEmail.textContent = data.owner_email;
    shopEmail.setAttribute("href","mailto:"+data.owner_email);
    shopPhone.textContent = data.owner_phone;
    shopPhone.setAttribute("href","tel:"+data.owner_phone);
    shopFacebook.textContent = data.name;

})
    
        // console.log("Found product", product.price);
//  for shop info product
const product = db.products.where({status: 'Unactive', shop_id: event.target.dataset.id}).toArray();
product.then(data =>{
  console.log("each product", data);
  data.map( product =>{
    console.log("each price", product.price)
      console.log("shop product",product)
      createEle("div", shopProduct, div_col => {
        div_col.className += "col mb-5";
        createEle("div", div_col, div_card =>{
          div_card.className += "card h-100";
          createEle("div", div_card, div_title =>{
            div_title.className += "badge bg-logo text-white position-absolute";
            if(product.title != "no"){
              div_title.textContent = product.title 
            }
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
                  if(product.promotion == "true"){
                    product_price.innerHTML = `Price:<span class="text-decoration-line-through">${product.price}$</span> <span>${product.promotionPrice}$</span>`;
                  }else{
                    product_price.textContent = "Price:" + product.price + "$";
                  }
                })
                createEle("div", body_center, product_desc =>{
                  product_desc.textContent = "Title:" +product.desc;
    
                })
                if(product.promotion == "true"){
                  createEle("div", body_center, promotionOFF =>{
                    promotionOFF.className += "text-danger"
                    promotionOFF.textContent = "OFF:" +product.promotionOFF;
                       
                  })
                }
              })
            })
            // product card action
            createEle("div", div_card, product_action => {
              product_action.className += "card-footer p-2 pt-0 border-top-0 bg-transparent";
              createEle("div",product_action, action_center =>{
                action_center.className += "text-center";
                createEle("a", action_center, action_btn1 =>{
                  action_btn1.className += "btn btn-outline-dark mt-auto";
                  action_btn1.textContent = "Order";
                  action_btn1.setAttribute("data-id",product.id);
                  action_btn1.setAttribute("id","orderbtn");
                  // action_btn1.onclick = activefn;
    
    
                })
                createEle("a", action_center, action_btn2 =>{
                  action_btn2.className += "btn btn-outline-dark mt-auto";
                  action_btn2.textContent = "View";
                  
                  action_btn2.setAttribute("data-id",product.id);
                  action_btn2.setAttribute("data-bs-toggle","modal");
                  action_btn2.setAttribute("data-bs-target","#staticBackdrop");
                  action_btn2.onclick = showproductinfo;
                })
                createEle("a", action_center, action_btn3 =>{
                  action_btn3.className += "btn btn-outline-dark mt-auto";
                  action_btn3.textContent = "Cart";
                  action_btn3.setAttribute("data-id",product.id);
                  // action_btn3.onclick = deletefn;
    
                })
              })
            });
          
        })
        
      });
    
  })
})
}

// view product  - > go to shop link
visitShopbtn.setAttribute("data-bs-toggle","modal");
visitShopbtn.setAttribute("href","#shopModal1");
visitShopbtn.onclick = showshopinfofn;

