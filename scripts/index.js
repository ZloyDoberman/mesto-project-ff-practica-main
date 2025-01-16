// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const newCard = document.querySelector('.popup.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEdit = document.querySelector('.popup.popup_type_edit');
const nameProfile = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function createCard(item, { deleteCard, likeCard }) {
  const cloneCards = cardsTemplate.querySelector('.places__item').cloneNode(true);
  const cloneCardsImg = cloneCards.querySelector('.card__image');
  const cloneCardsName = cloneCards.querySelector('.card__title');
  const deleteButton = cloneCards.querySelector('.card__delete-button');
  const like = cloneCards.querySelector('button.card__like-button');
  cloneCardsImg.src = item.link;
  cloneCardsImg.alt = item.name;
  cloneCardsName.textContent = item.name;
  deleteButton.addEventListener('click', deleteCard);
  like.addEventListener('click', likeCard);
  return cloneCards;
}

function renderCard(card, method = 'prepend') {
  card.forEach((item) => {
    const cardElement = createCard(item, { deleteCard, likeCard });
    cardsList[method](cardElement);
  });
}

renderCard(initialCards);

//function deleteCard(evt) {
//  const listItem = evt.target.closest('.places__item');
//  listItem.remove();
//}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function openPopup(popup) {
  popup.style.display = 'flex';
  popup.addEventListener('click', closeOnBackgroundClick);
  const closePopupButton = popup.querySelector('.popup__close');
  closePopupButton.addEventListener('click', () => closePopup(popup));
}

function closePopup(popup) {
  popup.style.display = 'none';
  popup.removeEventListener('click', closeOnBackgroundClick);
}

function closeOnBackgroundClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openFormAddCard() {
  openPopup(newCard);
  const form = newCard.querySelector('.popup__form');
  form.addEventListener('submit', saveCard);
}

function saveCard(evt) {
  evt.preventDefault();
  const nameCard = evt.target.querySelector('.popup__input.popup__input_type_card-name').value;
  const linkImg = evt.target.querySelector('.popup__input.popup__input_type_url').value;

  if (nameCard && linkImg) {
    initialCards.push({
      name: nameCard,
      link: linkImg,
    });
    evt.target.reset();
    closePopup(newCard);
    renderCard([initialCards[initialCards.length - 1]]);
  }
}

function openFormProfile() {
  openPopup(profileEdit);
  const form = profileEdit.querySelector('.popup__form');
  form.addEventListener('submit', saveInfo);
}

function saveInfo(evt) {
  evt.preventDefault();
  const name = evt.target.querySelector('.popup__input.popup__input_type_name').value;
  const description = evt.target.querySelector('.popup__input.popup__input_type_description').value;
  nameProfile.textContent = name;
  profileDescription.textContent = description;
  evt.target.reset();
  closePopup(profileEdit);
}

addButton.addEventListener('click', openFormAddCard);
profileEditButton.addEventListener('click', openFormProfile);

const prevBtn = document.querySelector('.button-prev');
const nextBtn = document.querySelector('.button-next');
let currentIndex = 0;
const cardWidth = 310;
const cardShow = 3;

function updSlider() {
  const offset = -currentIndex * cardWidth;
  cardsList.style.transform = `translateX(${offset}px)`;
}

prevBtn.addEventListener('click', ()=> {
  if (currentIndex > 0) {
    currentIndex--;
    updSlider();
  }
});

nextBtn.addEventListener('click', () => {
  const totalCard = document.querySelectorAll('.places__item.card').length;
  if (currentIndex < totalCard - cardShow) {
    currentIndex++;
    updSlider();
  }
});
updSlider();

function deleteCard(evt) {
  const listItem = evt.target.closest('.places__item');
  listItem.remove();
  const allCards = document.querySelectorAll('.places__item.card').length;
  if (currentIndex >= allCards - cardShow) {
    currentIndex = Math.max(0, allCards - cardShow);
  }
  updSlider();
}
