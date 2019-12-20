import "./style.css";
import { Popup } from './scripts/popup';
import { Card } from './scripts/card'; // Cозданиe карточки
import { CardList } from './scripts/cardlist'; // 10 карточек при загрузке страницы
import { Api } from './scripts/api';
const cardContainer = document.querySelector(".places-list");

//Формы открытия и закрытия карточек
const popup = new Popup(document.querySelector('.popup'), 'popup_is-opened', '.popup__close');
const profilePopup = new Popup(document.querySelector('.popup-profile'), 'popup-profile_is-opened', '.popup-profile__close');
const infoButton = document.querySelector('.user-info__button');
function openPopupForm(event) {
    event.preventDefault();
    popup.open();
}
infoButton.addEventListener('click', openPopupForm);

const editButton = document.querySelector('.user-info__edit');
const popupProfile = document.querySelector('.popup-profile');
const popupProfileClose = document.querySelector('.popup-profile__close');
function openPopupProfileForm(event) {
    event.preventDefault();
    profilePopup.open();
}
editButton.addEventListener('click', openPopupProfileForm);

//Просмотр картинки при нажатии на неё
const image = document.querySelector('.place-card__image');
const popupImage = document.querySelector('.popup-image');
const popupImageClose = document.querySelector('.popup-image__close');
let imgImage = document.querySelector('.popup-image__image');
let url = cardContainer.getAttribute('style');
function closeImage(event) {
    event.preventDefault();
    popupImage.classList.remove('popup-image_is-opened');
}

function showCard(event) {
    if (event.target.classList.contains('place-card__image')) {
        event.preventDefault();
        popupImage.classList.add('popup-image_is-opened');
        document.querySelector('.popup-image__image').src = event.target.style.backgroundImage.slice(5, -2);
    }
}
cardContainer.addEventListener('click', showCard);
popupImageClose.addEventListener('click', closeImage);

//Валидация полей ввода
const newCardForm = document.forms.Cards;
newCardForm.addEventListener('input', function (event) {
        const newCardForm = document.forms.Cards;
        const places = newCardForm.elements.place;
        const links = newCardForm.elements.link;
        const plusButton = document.querySelector('.popup__button');
    if (places.value.length === 0 || links.value.length === 0) {
        plusButton.setAttribute('disabled', true);
        plusButton.classList.add('popup__button_disable');
    } else {
        plusButton.removeAttribute('disabled');
        plusButton.classList.remove('popup__button_disable');
    }
});

const form = document.forms.Profile;
form.addEventListener('input', function (event) {
    const form = document.forms.Profile;
    const name = form.elements.name;
    const about = form.elements.about;
    const addButton = document.querySelector('.popup-profile__button');
    const errorName = document.getElementById('error-name');
    const errorAbout = document.getElementById('error-about');
    if (!name.checkValidity() || !about.checkValidity()) {
        addButton.setAttribute('disabled', true);
        addButton.classList.add('popup-profile__button_disable');
    } else {
        addButton.removeAttribute('disabled');
        addButton.classList.remove('popup-profile__button_disable');
        errorName.textContent = '';
        errorName.parentNode.classList.remove('error');
    }

    // Проверка пункта "Имя" профиля
    if (name.value.length === 0) {
        errorName.textContent = 'Это обязательное поле';
        errorName.parentNode.classList.add('error');
    } if (name.value.length === 1 || name.value.length > 30 ) {
        errorName.textContent = 'Должно быть от 2 до 30 символов';
        errorName.parentNode.classList.add('error');
    } else if (name.checkValidity()) {
        errorName.textContent = '';
        errorName.parentNode.classList.remove('error');
    }

    // Проверка пункта "О себе" профиля
    if (about.value.length === 0) {
        errorAbout.textContent = 'Это обязательное поле';
        errorAbout.parentNode.classList.add('error');
    } if (about.value.length === 1 || about.value.length > 30 ) {
        errorAbout.textContent = 'Должно быть от 2 до 30 символов';
        errorAbout.parentNode.classList.add('error');
    } else if (about.checkValidity()) {
        errorAbout.textContent = '';
        errorAbout.parentNode.classList.remove('error');
    }
});

//Добавление карточек по вкусу
const formName = document.querySelector('.popup__input_type_name');
const formLink = document.querySelector('.popup__input_type_link-url');
const popupButton = document.querySelector('.popup__button');
function submitCardHandler() {
    cardList.addCard(formName.value, formLink.value);
    popup.reset();
    popup.close();
}
newCardForm.addEventListener('submit', submitCardHandler);

//Применение изменений в редактировании профиля
const addButton = document.querySelector('.popup-profile__button');
function submitData() {      
      event.preventDefault();
      api.saveChange(document.querySelector('.popup-profile__input_type_name').value, 
      document.querySelector('.popup-profile__input_type_about').value)
      .then(() => {
          document.querySelector('.user-info__name').textContent = document.querySelector('.popup-profile__input_type_name').value;
          document.querySelector('.user-info__job').textContent = document.querySelector('.popup-profile__input_type_about').value;
          popup.reset();
          profilePopup.close();
      })
      .catch((err) => console.log(err));
  }
form.addEventListener('submit', submitData);

function getProfile() {
    api.saveChange(document.querySelector('.popup-profile__input_type_name').value, 
    document.querySelector('.popup-profile__input_type_about').value);
  }


//Серверная часть
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort5' : 'https://praktikum.tk/cohort5';
const api = new Api({
    baseUrl: serverUrl,
    headers: {
      authorization: '16cff247-2cce-4ee4-a2da-c1f063b15055',
      'Content-Type': 'application/json'
    }
  });
api.getUserInfo();
api.getInitialCards();