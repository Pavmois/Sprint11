import { Card } from './card';

export class CardList {
    constructor(container, arr) {
        this.container = container;
        this.arr = arr;
        this.render();
    }

    render() {
        this.arr.forEach((arr) => {
            this.addCard(arr.name, arr.link);
        });
    }
    
    addCard(name, link) {
        const {card} = new Card(name, link);
        this.container.appendChild(card);
    } 
}