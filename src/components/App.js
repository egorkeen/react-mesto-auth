import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup.js';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

useEffect(() => {
  api.getUserData()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => console.log(err));
}, []);

useEffect(() => {
  api.getInitialCards()
  .then((res) => {
    setCards(res.map((dataCard) => {
      return {
        _id: dataCard._id,
        name: dataCard.name,
        link: dataCard.link,
        owner: dataCard.owner,
        likes: dataCard.likes
      }
    }))
  })
  .catch((err) => console.log(err))
}, [])

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const updatedCards = cards.slice().filter(c => c !== card);
      setCards(updatedCards)
    })
    .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
  };

  function handleUpdateUser(userData) {
    api.setUserData(userData)
    .then((updatedUserData) => {
      setCurrentUser(updatedUserData);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  };

  function handleUpdateAvatar(avatarLink) {
    api.setAvatar(avatarLink)
    .then((updatedUserData) => {
      setCurrentUser(updatedUserData);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  };

  function handleAddPlaceSubmit(dataCard) {
    api.addCard(dataCard)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <Header />
      <Main
        cards={cards} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onDeleteClick={handleCardDelete}
        onCardLike={handleCardLike} 
      />
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser} 
      />
       <EditAvatarPopup 
       isOpen={isEditAvatarPopupOpen} 
       onClose={closeAllPopups}
       onUpdateAvatar={handleUpdateAvatar} 
      />
      <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
      />


      <PopupWithForm 
        name="confirmation" 
        title="Вы уверены?"
        buttonText="Да">
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <Footer />
    </div>
  </CurrentUserContext.Provider>
 );
}

export default App;
