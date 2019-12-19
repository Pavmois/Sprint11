export class Popup {
    constructor(element, openClassName, closeButtonClassName) {
        this.element = element;
        this.openClassName = openClassName; 
        const closeButton = this.element.querySelector(closeButtonClassName);
        this.close = this.close.bind(this);
        closeButton.addEventListener('click', this.close);
        closeButton.addEventListener('click', this.reset.bind(this));
        closeButton.addEventListener('click', this.profileError.bind(this));
    }
    open() {
        this.element.classList.add(this.openClassName);
    }
    close() {
        this.element.classList.remove(this.openClassName);
    }
    reset(){
        const newCardForm = document.forms.Cards;
        const places = newCardForm.elements.place;
        const links = newCardForm.elements.link;
        const plusButton = document.querySelector('.popup__button');
        places.value= '';
        links.value = '';
        if (places.value.length === 0 || links.value.length === 0) {
            plusButton.setAttribute('disabled', true);
            plusButton.classList.add('popup__button_disable');
        } else {
            plusButton.removeAttribute('disabled');
            plusButton.classList.remove('popup__button_disable');
        } 
    }

    profileError() {
        event.preventDefault();
        profilePopup.close();
        document.Profile.name.value= document.querySelector('.user-info__name').textContent;
        document.Profile.about.value = document.querySelector('.user-info__job').textContent;
        const errorName = document.getElementById('error-name');
        errorName.textContent = '';
        errorName.parentNode.classList.remove('error');
        const errorAbout = document.getElementById('error-about');
        errorAbout.textContent = '';
        errorAbout.parentNode.classList.remove('error');
    }
}