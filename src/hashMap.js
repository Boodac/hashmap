import List from "./linkedlist.js";

export default class HashMap {
    #loadFactor = 0.75;
    #_DEFAULT_SIZE = 16;
    #_CURRENT_SIZE = 0;
    #buckets = [...Array(this.#_DEFAULT_SIZE)];
    get #capacity () {
        return this.#buckets.length;
    };
    get #currentLoad () {
        let load = this.length;
        return load / this.#capacity;
    };
    get length() {
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

    constructor() {
        // hi mom
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

        if(this.#currentLoad > this.#loadFactor) this.growMap();
        // to do: check the size of buckets against the loadfactor, if it exceeds then double the capacity and (?)redistribute all items(?)
    };

    growMap(currentMap = [... this.#buckets]) {
        if(!this.#_CURRENT_SIZE) this.#_CURRENT_SIZE = this.#_DEFAULT_SIZE * 2;
        else this.#_CURRENT_SIZE *= 2;
        this.#buckets = [... Array(this.#_CURRENT_SIZE)];
        currentMap.forEach((bucket) => {
            if(bucket) {
                let currentNode = bucket.head;
                while(currentNode) { 
                    let kvp = currentNode.value;
                    this.set(kvp[0], kvp[1]);
                    currentNode = currentNode.nextNode;
                }
            }
        });
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

    clear() {
        this.#buckets = [...Array(this.#_DEFAULT_SIZE)];
        this.#_CURRENT_SIZE = 0;
    };

    keys() {
        let arr = [];

        this.#buckets.forEach(bucket => {
            if(bucket) {
                let currentNode = bucket.head;
                while(currentNode) {
                    arr.push(currentNode.value[0]);
                    currentNode = currentNode.nextNode;
                }
            }
        })

        return arr;
    };

    values() {
        let arr = [];

        this.#buckets.forEach(bucket => {
            if(bucket) {
                let currentNode = bucket.head;
                while(currentNode) {
                    arr.push(currentNode.value[1]);
                    currentNode = currentNode.nextNode;
                }
            }
        })

        return arr;
    };

    entries() {
        let arr = [];

        this.#buckets.forEach(bucket => {
            if(bucket) {
                let currentNode = bucket.head;
                while(currentNode) {
                    arr.push(currentNode.value);
                    currentNode = currentNode.nextNode;
                }
            }
        })
        
        return arr;
    };

    assignLoadFactor(factor) {
        this.#loadFactor = factor;
    };
};


const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.report());

test.set("moon", "silver");

console.log(test.report());

console.log(test.entries());
console.log(test.keys());
console.log(test.values());