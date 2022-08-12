import prodb, {
  bulkcreate,
  createEle,
  getData,
  SortObj
} from "./module.js";


let db = prodb("Productdb", {
  products: `++id, name, seller, price`
});

// input tags
const pimage = document.getElementById("pimage");
const ptype = document.getElementById("ptype");
const pprice = document.getElementById("pprice");
const psize = document.getElementById("psize");
const pdesc = document.getElementById("pdesc");

// save button
const savebtn = document.getElementById("savebtn");

// create button
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// user data

// event listerner for create button
savebtn.onclick = event => {
  // insert values
  let flag = bulkcreate(db.products, {
    image: pimage.value,
    type: ptype.value,
    price: pprice.value,
    size: psize.value,
    desc: pdesc.value

  });
  // reset textbox values
  pimage.value = ptype.value = pprice.value = psize.value = pdesc.value = "";

  // set id textbox value
  getData(db.products, data => {
    userid.value = data.id + 1 || 1;
  });
  product();

  let insertmsg = document.querySelector(".insertmsg");
  getMsg(flag, insertmsg);
};

// event listerner for create button
btnread.onclick = product;

// button update
// btnupdate.onclick = () => {
//   const id = parseInt(userid.value || 0);
//   if (id) {
//     // call dexie update method
//     db.products.update(id, {
//       name: proname.value,
//       seller: seller.value,
//       price: price.value
//     }).then((updated) => {
//       // let get = updated ? `data updated` : `couldn't update data`;
//       let get = updated ? true : false;

//       // display message
//       let updatemsg = document.querySelector(".updatemsg");
//       getMsg(get, updatemsg);

//       proname.value = seller.value = price.value = "";
//       //console.log(get);
//     })
//   } else {
//     console.log(`Please Select id: ${id}`);
//   }
// }

// delete button
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
  // const notfound = document.getElementById("notfound");
  // notfound.textContent = "";
  // remove all childs from the dom first
  // while (tbody.hasChildNodes()) {
  //   tbody.removeChild(tbody.firstChild);
  // }


  getData(db.products, (data, index) => {
    if (data) {
      createEle("div", productcontainer, tr => {
        for (const value in data) {
          createEle("div", tr, td => {
            td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value];
          });
        }
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-edit btnedit";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = editbtn;
          });
        })
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-trash-alt btndelete";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = deletebtn;
          });
        })
      });
    } else {
      notfound.textContent = "No record found in the database...!";
    }

  });
}

// const editbtn = (event) => {
//   let id = parseInt(event.target.dataset.id);
//   db.products.get(id, function (data) {
//     let newdata = SortObj(data);
//     userid.value = newdata.id || 0;
//     proname.value = newdata.name || "";
//     seller.value = newdata.seller || "";
//     price.value = newdata.price || "";
//   });
// }

// delete icon remove element 
// const deletebtn = event => {
//   let id = parseInt(event.target.dataset.id);
//   db.products.delete(id);
//   product();
// }

// textbox id
function textID(textboxid) {
  getData(db.products, data => {
    textboxid.value = data.id + 1 || 1;
  });
}

// function msg
function getMsg(flag, element) {
  if (flag) {
    // call msg 
    element.className += " movedown";

    setTimeout(() => {
      element.classList.forEach(classname => {
        classname == "movedown" ? undefined : element.classList.remove('movedown');
      })
    }, 4000);
  }
}