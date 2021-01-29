import React from "react";
import PopupWithForm from "./PopupWithForm";


function ConfirmDeletionPopup({ onDeleteCard, isOpen, onClose, card }) {

    function handleSubmit(event) {
    event.preventDefault();
    onDeleteCard(card);
    }
    

    return (
    <PopupWithForm
        title="Вы уверены?" 
        name="delete"
        buttonName="Удалить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
        <input className="popup__submit" type="submit" value="Да" />
    </PopupWithForm>
    );
}

export default ConfirmDeletionPopup;