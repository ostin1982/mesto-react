function Card(props) {
    function handleCardClick() {
      props.onCardClick(props.card.name, props.card.link);
    }
  
    return (
        <li className="element">
            <article className="element__card">
                <img className="element__img" 
                src={props.card.src} 
                alt={`Изображение, на котором ${props.card.name}`}
                onClick={handleCardClick}
                />
            <button className="element__basket" type="button"></button>
            <div className="element__info">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__like-conteiner">
                    <button className="element__like" type="button">{props.card.likes.length}</button>
                    <span className="element__like-number"></span>
                </div>
            </div>
        </article>
    </li>
    );
  }
  
  export default Card;