import HashMap from "./hashMap.js";

const hashmap = new HashMap();

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let obj = {};

for (let i = 0; i < alphabet.length; i++) {
    let hash = hashmap.hash(alphabet[i]);
    if(!obj[hash]) obj[hash] = 1;
    else ++obj[hash];
};

console.log(obj);