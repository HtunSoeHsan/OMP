const productsdb = (dbname, table) => {
  const db = new Dexie(dbname);
  db.version(8).stores(table);
  db.open();

  return db;
  /**
       * const db = new Dexie('myDb');
          db.version(1).stores({
          friends: `name, age`
      });
       */
};

const bulkcreate = (dbtable, data) => {
  let flag = empty(data);
  if (flag) {
    dbtable.bulkAdd([data]);
    console.log("data inserted successfully...!");
  } else {
    console.log("Please provide data...!");
  }
  return flag;
};

// create dynamic elements
const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if (appendTo) appendTo.appendChild(element);
  if (fn) fn(element);
};

// check textbox validation
const empty = object => {
  let flag = false;
  for (const value in object) {
    if (object[value] != "" && object.hasOwnProperty(value)) {
      flag = true;
    } else {
      flag = false;
    }
  }
  return flag;
};

// getData for product from the database
const getData = (dbname, fn) => {
  let index = 0;
  let obj = {};
  dbname.count(count => {
    // count rows in the table using count method
    if (count) {
      dbname.each(table => {
        // table => return the table object data
        // to arrange order we are going to create for in loop
        obj = SortObj(table);
        fn(obj, index++); // call function with data argument
      });
      
    } else {
      fn(0);
    }
  });
};
// for user data getting
const userData = (dbname, fn) =>{
  let index = 0;
  let obj = {};
  dbname.count(count => {
    // count rows in the table using count method
    if (count) {
      dbname.each(table => {
        // table => return the table object data
        // to arrange order we are going to create for in loop
        obj = SortuserObj(table);
        fn(obj, index++); // call function with data argument
      });
    } else {
      fn(0);
    }
  });
}

// for shop data fn
// for user data getting
const shopData = (dbname, fn) =>{
  let index = 0;
  // let obj = {};
  dbname.count(count => {
    // count rows in the table using count method
    if (count) {
      dbname.each(table => {
        // table => return the table object data
        // to arrange order we are going to create for in loop
        // obj = SortuserObj(table);
        fn(table, index++); // call function with data argument
      });
    } else {
      fn(0);
    }
  });
}
const SortObj = (sortobj) => {
  let obj = {};
  obj = {
    
    id: sortobj.id,
    size: sortobj.size,
    price: sortobj.price,
    image: sortobj.image,
    type: sortobj.type,
    desc: sortobj.desc,
    status: sortobj.status,
    promotion: sortobj.promotion

  };
  let objArray =[];
  objArray.push(obj);
  return objArray;
}

// for sort user

const SortuserObj = (SortuserObj) => {
  let userobj = {};
  userobj = {
    id: SortuserObj.id,
    name: SortuserObj.name,
    phone: SortuserObj.phone,
    email: SortuserObj.email,
    address: SortuserObj.address,
    profile: SortuserObj.profile,
    password: SortuserObj.password

  };
  let userObjArray =[];
  userObjArray.push(userobj);
  return userObjArray;
}
export default productsdb;
export {
  bulkcreate,
  createEle,
  getData,
  SortObj,
  userData,
  SortuserObj,
  shopData
};



