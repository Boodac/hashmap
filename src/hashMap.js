import List from "./linkedlist.js";

const list = new List();

export default class HashMap {
    #loadFactor = 0.75;
    #buckets = [...Array(16)];
    #capacity = this.#buckets.length;

    hash(key) {
        let hash = 0;

        const prime = 47;
        for(let i = 0; i < key.length; i++) {
            hash = (prime * hash) + (key.charCodeAt(i) * (i+1)); 
            hash = hash % this.#capacity;
        };
        return hash;
    };

    set(pKey, pValue) {
        let object = {
            key: pKey,
            value: pValue
        }

        let hash = this.hash(pKey);
        if (hash < 0 || hash >= this.#capacity) {
            throw new Error("Trying to access index out of bounds");
        }

        if(!this.#table[hash]) {
            let list = new List();
            list.prepend(object);
        } else {
            this.#table[hash].append(object);
        }
    }

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