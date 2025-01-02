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
            let list = new List(kvp);
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

        // to do: check the size of buckets against the loadfactor, if it exceeds then double the capacity and (?)redistribute all items(?)
    };

    get(key) {
        let index = this.hash(key);
        if(!this.#buckets[index]) return null;

        let workingList = this.#buckets[index];
        let reference = workingList.head;

        while(reference) {
            if(reference.value[0] === key) {
                return reference.value[1];
            } else {
                reference = reference.nextNode;
            }
        }

        return null;
    };

    has(key) {
        let index = this.hash(key);
        if(!this.#buckets[index]) return false;

        let workingList = this.#buckets[index];
        let reference = workingList.head;

        while(reference) {
            if(reference.value[0] === key) {
                return true;
            } else {
                reference = reference.nextNode;
            }
        }

        return false;
    };

    remove(key) {
        let index = this.hash(key);
        if(!this.#buckets[index]) return false;

        let workingList = this.#buckets[index];
        let reference = workingList.head;
        let i = 0;

        while(reference) {
            console.log(reference);
            if(reference.value[0] === key) {
                workingList.removeAt(i);
                return true;
            } else {
                ++i;
                reference = reference.nextNode;
            }
        }

        return false;
    };

    get length () {
        let counter = 0;

        this.#buckets.forEach(bucket => {
            if(bucket) {
                let currentNode = bucket.head;
                do {
                    counter++
                    currentNode = currentNode.nextNode;
                } while (currentNode);
            }
        });

        return counter;
    };

    clear() {
        
    };

    keys() {

    };

    values() {

    };

    entries() {

    };

    assignLoadFactor(factor) {
        this.#loadFactor = factor;
    };
};


const hashmap = new HashMap();

hashmap.set("carlos", "diaz");
hashmap.set("carlos", "safijwf");
hashmap.set("cArlos", "bejfsodjjaoj");
hashmap.set("dsafoi", "fsaigjih");

console.log(hashmap.remove("cAolos"));

console.log(hashmap.report().toString());

console.log(hashmap.length);