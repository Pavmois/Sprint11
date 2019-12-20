import { Card } from './card';
import { CardList } from './cardlist';
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort5' : 'https://praktikum.tk/cohort5';
const cardContainer = document.querySelector(".places-list");

export class Api {
    constructor(option) {    
    }

//1. Загрузка информации о пользователе с сервера
    getUserInfo() {
        fetch((serverUrl+'/users/me'), {
            headers: {authorization: '16cff247-2cce-4ee4-a2da-c1f063b15055'}
        })
        .then(res => {if (res.ok) {return res.json();}
            return Promise.reject(`Ошибка загрузки информации о пользователе с сервера: ${res.status}`);
        })
        .then((result) => {
            document.querySelector('.user-info__name').textContent = result.name;
            document.querySelector('.user-info__job').textContent = result.about;
            // текущие данные профиля показываются в форме редактирования
            document.Profile.name.value = result.name;
            document.Profile.about.value = result.about;
        });
    }

//2. Загрузка первоначальных карточек с сервера
    getInitialCards() {
        fetch((serverUrl+'/cards'), {
            headers: { authorization: '16cff247-2cce-4ee4-a2da-c1f063b15055'}
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
                return Promise.reject(`Ошибка загрузки карточек изображений с сервера: ${res.status}`);
          })
        .then((result) => {new CardList(cardContainer, result);
    });
  }

//3. Редактирование профиля
    saveChange(name, about){
        return fetch((serverUrl+'/users/me'), {
        method: 'PATCH',
        headers: {authorization: '16cff247-2cce-4ee4-a2da-c1f063b15055','Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            about: about
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json(); 
            }
            return Promise.reject(`Ошибка загрузки данных профиля с сервера: ${res.status}`);
        })
    };   
}