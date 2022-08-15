import prodb, {
  bulkcreate,
  createEle,
  getData,
  SortObj
} from "./module.js";


let db = prodb("OMP", {
  products: `++id, type, promotion,desc, status, price`,
  user: `++id, email, name, order`
});

var productcon = document.getElementById("showproductcon");
console.log("ele",productcon);
db.products
    .where("status").equalsIgnoreCase("Unactive")
    .each(product => {
        // console.log("Found product", product.price);
      
          createEle("div", productcon, div_col => {
            div_col.className += "col mb-5";
            createEle("div", div_col, div_card =>{
              div_card.className += "card h-100";
              // createEle("div", div_card, div_title =>{
              //   div_title.className += "badge bg-dark text-white position-absolute";
              // })
              
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
                      product_price.textContent = "Price:" + product.price + "$";
    
                    })
                    createEle("div", body_center, product_desc =>{
                      product_desc.textContent = "Title:" +product.desc;
    
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
                      action_btn2.setAttribute("href","#shopModal1")
                      // action_btn2.onclick = editfn;
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

// for active product
// for (const value in data) {

// }
