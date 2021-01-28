import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
    const avatarRef = useRef();


    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateAvatar({avatar: avatarRef.current.value });
    } 


    return (
        <PopupWithForm
        title="Обновить аватар" 
        name="avatar" 
        button="Сохранить" 
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
            <section>                
                <input ref={avatarRef} className="popup__about popup__about_grey-line popup__about_new-avatar" id="sign-in-photo-card-occupation" type="url"  placeholder="Ссылка на картинку"  name="avatar" required autoComplete="off" />
                <span className="" id="sign-in-photo-card-occupation-error"></span>
            </section>
            <input className="popup__submit" type="submit" value="Сохранить" />
        </PopupWithForm>
    )
}


export default EditAvatarPopup;