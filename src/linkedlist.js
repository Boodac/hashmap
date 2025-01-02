import Node from "./node.js";

export default class LinkedList {
    #start = null;
    #end = null;
    constructor(headValue = null) {
        if(headValue) this.prepend(headValue);
    }

    prepend(value) {
        let node = new Node(value, this.#start);

        if(!this.#start) {
            this.#start = node;
        } else if(!this.#start.nextNode) {
            this.#end = this.#start;
            this.#start = node;
        } else {
            this.#start = node;
        };
    };

    append(value) {
        let node = new Node(value);

        if(!this.#start) {
            this.#start = node;
        } else if (!this.#end) {
            this.#start.nextNode = node;
            this.#end = node;
        } else {
            this.#end.nextNode = node;
            this.#end = node;
        }
    }

    size() {
        let reference = this.#start;
        let counter = 0;

        do {
            counter++;
            reference = reference.nextNode;
        } while(reference)

        return counter;
    }

    get head() {
        return this.#start;
    }

    get tail() {
        return this.#end ? this.#end : this.#start;
    }

    at(index) {
        let reference = this.#start;

        for(let i = 0 ; i < index ; i++) {
            reference = reference.nextNode;
        };

        return reference;
    }

    pop() {
        if(this.#start.nextNode === null) this.#start = null;
        else {
            let node = this.at(this.size()-2);
            this.#end = node;
            node.nextNode = null;
        }
    };

    removeAt(index) {
        let previousNode = this.at(index-1);
        let nodeToRemove = previousNode.nextNode;
        previousNode.nextNode = nodeToRemove.nextNode;
    };

    contains(value) {
        let reference = this.#start;

        while(reference) {
            if(reference.value === value) {
                return true;
            };
            reference = reference.nextNode;
        };

        return false;
    }

    find(value) {
        let reference = this.#start;
        let index = 0;

        while(reference) {
            if(reference.value === value) return index;
            reference = reference.nextNode;
            index++;
        };

        return null;
    }

    toString() {
        let string = "";
        let reference = this.#start;

        while(reference) {
            string += `(${reference.value.toString()}) -> `;
            reference = reference.nextNode; 
        };

        return string + "null";
    }
}