// // // ====== Cleaner example of nesting promises =====
// // new Promise((resolve, reject) => {
// //     console.log("Initial");

// //     reject();
// // })
// //     .then(() => {
// //         throw new Error("Something failed");

// //         console.log("Do this");
// //     })
// //     .catch((error) => {
// //         console.log(error);
// //         console.error("Do that");
// //     })
// //     .then(() => {
// //         console.log("Do this, no matter what happened before");
// //     });

// async function syncDoSomething(ms) {
//     const myPromise = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Success!");
//         }, ms * 1000);
//     });
//     return myPromise;
// }
// function syncDoSomethingElse(ms) {
//     return ms + "Again";
// }
// function syncDoSomethingElse(ms) {
//     return ms + " Third time!";
// }
// function syncDoThirdThing(ms) {
//     return ms + " Promises are cool!";
// }

// // myPromise // returns Guess this worked
// //     // x is a representation of the returned value from the previous Promise
// //     .then((x) => x + " Again?") // x = Guess this worked!
// //     .then((x) => x + " Third time!") // x = Guess this worked! Again?
// //     .then((x) => x + " Promises are cool.")
// //     .then((x) => console.log(x))
// //     .catch((err) => {
// //         console.error(`Hi Heba, ${err}!`);
// //     })
// //     .then(() => console.log("We are calling then() even after breaking!"));

// async function testAwait() {
//     const result = await syncDoSomething(1);
//     result += syncDoSomethingElse(result);
//     result += syncDoThirdThing(result);

//     return result;
// }

// console.log(testAwait());
class User {
    constructor(id, name, username, email, address, phone, website, company) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.website = website;
        this.company = company;
    }
}
// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

let id = 1;

async function getUserData(id) {
    if (id < 1 || id > 10) {
        throw new Error("Please input a number between 1 and 10.");
    }
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3,
    };
    const db = await central(id);
    const userInfo = await dbs[db](id);
    const personalInfo = await vault(id);

    const UserData = new User(
        id,
        personalInfo.name,
        userInfo.username,
        personalInfo.email,
        personalInfo.address,
        personalInfo.phone,
        userInfo.website,
        userInfo.company
    );

    return UserData;
}

const UserData = await getUserData(id);

console.log(UserData);
