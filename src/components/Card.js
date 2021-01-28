import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    
    const isOwn = card.owner._id !== currentUser._id;
    const cardDeleteButtonClassName = (
        `element__basket ${isOwn ? 'element__basket_active' : 'element__basket_inactive'}`
    ); 

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    ); 

    function handleCardClick() {
        onCardClick(card);
    } 

    function handleCardLike() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element" key={card.key}>
            <article className="element__card">
                <img className="element__img" 
                src={card.link} 
                alt={card.title}
                onClick={handleCardClick}
                />
            <button 
                type="button" 
                aria-label="Удалить"
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
            ></button>
            <div className="element__info">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-conteiner">
                    <button 
                        type="button" 
                        aria-label="Нравится"
                        className={cardLikeButtonClassName}
                        onClick={handleCardLike}
                    ></button>
                    <span className="element__like-number">{card.likes.length}</span>
                </div>
            </div>
        </article>
    </li>
    );
}

export default Card;