import { useState, useEffect } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletionPopup from "./ConfirmDeletionPopup";

import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import "../index.css";

function App() { 
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(); 
  const [deletedCard, setDeletedCard] = useState({}); 

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletionPopupOpen, setIsConfirmDeletionPopupOpen] = useState(false);  



  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfoAbout()])
      .then(([result, user]) => {
        setCards(result);
        setCurrentUser(user);
      })
      .catch(error => console.log(`Ошибка при попытке загрузить данные пользователя и карточки: ${error}`));
  }, []);
  

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  };

  const handleCardClick = (card) => {
    setSelectedCard(card)
  };

  const handleDeleteClick = (card) => {
    setIsConfirmDeletionPopupOpen(true);
    setDeletedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletionPopupOpen(false);
    setSelectedCard();
  };


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch(error => console.error(error));
} 


  function handleDeleteCard(card) {
    api.deleteCard(card).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
      closeAllPopups();
    })
    .catch(error => console.error(error));
    }


  function handleUpdateUser(userData) {
    api.changeInfo(userData)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch(error => console.error(error))
  }

  function handleUpdateAvatar(imgSrc) {
    api.changeUserAvatar(imgSrc)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch(error => console.error(error))
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.error(error))
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">
        <Header />

        <Main 
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
        />

        <Footer />

        <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups} 
        onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmDeletionPopup 
        isOpen={isConfirmDeletionPopupOpen} 
        onClose={closeAllPopups} 
        onDeleteCard={handleDeleteCard}
        card={deletedCard}
        />
        
        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} 
        {...selectedCard} 
        />

      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;