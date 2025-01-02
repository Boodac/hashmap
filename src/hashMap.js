import List from "./linkedlist.js";

export default class HashMap {
    #loadFactor = 0.75;
    #buckets = [...Array(16)];
    #capacity = this.#buckets.length;

    constructor() {
    }

    report() {
        return [...this.#buckets];
    }

    hash(key) {
        let hash = 0;

        const prime = 47;
        for(let i = 0; i < key.length; i++) {
            hash = (prime * hash) + (key.charCodeAt(i) * (i+1)); 
            hash = hash % this.#capacity;
        };
        return hash;
    };

    set(key, value) {
        let kvp = [
            key,
            value
        ];

        let hash = this.hash(key);

        if (hash < 0 || hash >= this.#capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        if(!this.#buckets[hash]) {
            let list = new List();
            list.prepend(kvp);
            this.#buckets[hash] = list;
        } else {
            let workingList = this.#buckets[hash];
            let reference = workingList.head;
            while(reference) {
                if(reference.value[0] === kvp[0]) {
                    reference.value = kvp;
                    break;
                } else {
                    reference = reference.nextNode;
                }
            }
            if(reference === null) {
                workingList.append(kvp);
            };
        };
    };

    get(key) {

    }

    has(key) {

    }

    remove(key) {

    }

    get length () {
        return 1;
    }

    clear() {
        
    }

    keys() {

    }

    values() {

    }

    entries() {

    }

    assignLoadFactor(factor) {
        this.#loadFactor = factor;
    }
};


const hashmap = new HashMap();

hashmap.set("carlos", "diaz");
hashmap.set("carlos", "safijwf");
hashmap.set("cArlos", "bejfsodjjaoj");

let arr = hashmap.report();

console.log(arr[0].toString());