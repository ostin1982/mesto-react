import React from "react";
import { api } from "../utils/api";
import Card from "./Card";

function Main(props) {
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])
  
    React.useEffect(() => {
      api.getInitialCards()
        .then((result) => {
          setCards(result)
        })
    }, []);
  
    React.useEffect(() => {
      api.getUserInfoAbout()
        .then((result) => {
          setUserName(result.name);
          setUserDescription(result.about);
          setUserAvatar(result.avatar);
        })
    }, []);

  return (
    <main className="content">
      <section className="profile">
        <div 
        className="profile__avatar"  
        onClick={props.onEditAvatar} >
          <img
          className="profile__avatar-img" 
          src={userAvatar} 
          alt={userName}
          />
        </div>
          <div className="profile__info">                   
            <div className="profile__edit">
              <h1 className="profile__name">{userName}</h1>
                <button 
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать"
                onClick={props.onEditProfile}
                ></button>
            </div>
            <p className="profile__occupation">{userDescription}</p>
          </div>               
          <button 
          className="profile__add-button" 
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
          ></button>
        </section>
        <ul className="elements">
            {cards.map(card => {
              return (
                <Card
                card={card}
                key={card._id}  
                onCardClick={props.onCardClick}
                />
              );
            })}
        </ul>
    </main>
  );
}

export default Main;