import React from 'react'

function PopupWithForm(props) {
    return(
        <div className={props.isOpen ? `popup popup__input_${props.name} popup_is-open` : `popup popup__input_${props.name}`}>
            <div className="popup__container">
                <h2 className="popup__edit">{props.title}</h2>
                <form className={`popup__input popup__input_${props.name} form`} method="POST" name={`${props.name}`} noValidate>
                    <div>{props.children}</div>
                </form>
                <button className="popup__close" type="submit" onClick={props.onClose}/>
                <button className="popup__submit" type="button">{props.button}</button>
            </div>
        </div>
    )
}

export default PopupWithForm