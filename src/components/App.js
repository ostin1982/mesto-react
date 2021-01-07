import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App(props) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState()

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true) 
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true) 
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true) 
  }

  function handleCardClick(name, src) {
    setSelectedCard({ name: name, src: src });
    setIsImagePopupOpen(true);
  }


  function closeAllPopups() {
    setIsAddPlacePopupOpen(false) 
    setIsEditProfilePopupOpen(false) 
    setIsEditAvatarPopupOpen(false) 
    setSelectedCard()
  }

  return (
    <body className="body">
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm 
        title="Редактировать профиль" 
        name="edit" 
        button="Сохранить" 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
            <div>
              <input className="popup__about popup__about_grey-line popup__about_name" name="name" type="text" required placeholder="Имя" id="sign-in-name" minlength={2} maxlength={40} autocomplete="off" />                 
              <span className="" id="sign-in-name-error"></span>
              <input className="popup__about popup__about_grey-line popup__about_occupation_name" name="about" type="text" required placeholder="О себе" id="sign-in-occupation" minlength={2} maxlength={200} autocomplete="off" />
              <span className="" id="sign-in-occupation-error"></span>                            
            </div>
        </PopupWithForm>
        <PopupWithForm 
        title="Новое место" 
        name="add" 
        button="Создать" 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
            <div>                
              <input className="popup__about popup__about_grey-line popup__about_photo-card" id="sign-in-photo-card-name" type="text" placeholder="Название" value="" name="name" required minlength={2} maxlength={30} autocomplete="off" />
              <span className="" id="sign-in-photo-card-name-error"></span>  
              <input className="popup__about popup__about_grey-line popup__about_occupation_photo-card" id="sign-in-photo-card-occupation" type="url" placeholder="Ссылка на картинку" value="" name="about" required autocomplete="off" />
              <span className="" id="sign-in-photo-card-occupation-error"></span>
            </div>
        </PopupWithForm>
        <PopupWithForm
        title="Обновить аватар" 
        name="edit-photo" 
        button="Сохранить" 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
            <div>                
              <input className="popup__about popup__about_grey-line popup__about_new-avatar" id="sign-in-photo-card-occupation" type="url"  placeholder="Ссылка на картинку" value="" name="avatar" required autocomplete="off" />
              <span className="" id="sign-in-photo-card-occupation-error"></span>
            </div>
        </PopupWithForm>
        <PopupWithForm 
        title="Вы уверены?" 
        name="delete">
        </PopupWithForm>
        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        >
        </ImagePopup>
      </div>
    </body>
  );
}

export default App;