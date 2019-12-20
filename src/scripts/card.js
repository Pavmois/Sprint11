export class Card {
    constructor(name, link) {
        this.card = this.createCard(name, link);
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    }

    createCard(name, link) {
        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');

        const cardImage = document.createElement('div');
        cardImage.classList.add('place-card__image');
        placeCard.appendChild(cardImage);
        cardImage.setAttribute('style', `background-image: url(${link})`);
    
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('place-card__delete-icon');
        cardImage.appendChild(deleteButton);
    
        const cardDescription = document.createElement('div');
        cardDescription.classList.add('place-card__description');
        placeCard.appendChild(cardDescription);

        const cardName = document.createElement('h3');
        cardName.classList.add('place-card__name');
        cardName.textContent = name;
        cardDescription.appendChild(cardName);
        
        const likeButton = document.createElement('button');
        likeButton.classList.add('place-card__like-icon');
        cardDescription.appendChild(likeButton);

        return placeCard;
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(){
        this.card.parentNode.removeChild(this.card);
    }
};