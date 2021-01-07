function ImagePopup(props) {
    return (
        <div className={`popup popup__photo-big-card ${props.card && "popup_is-open"}`}>
            <div className="popup__photo-element">
                <img 
                className="popup__photo-big" 
                src={props.src} 
                alt={props.name}
                 />                               
                <button 
                className="popup__close popup__photo-close"  
                type="button"
                aria-label="Закрыть"
                onClick={props.onClose}
                ></button>
                <p className="popup__photo-edit">{props.name}</p>
            </div>
        </div>
    );
  }
  
  export default ImagePopup;