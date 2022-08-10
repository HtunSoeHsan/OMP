import { Dexie } from "./indexedDB";
var db = new Dexie("ompdb");
db.version(1).stores({
    user: "++id, name, email, password"
})

await db.user.add({name:"htun", email:"htun@gmail.com", password:"1234"});