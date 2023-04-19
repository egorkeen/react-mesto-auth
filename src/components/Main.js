import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import Card from './Card.js';


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

    return (
      <main className="content">
      <section className="profile">
        <div className="profile__edit-avatar" onClick={props.onEditAvatar} />
        <img src={currentUser?.avatar} className="profile__avatar" alt="Аватар" />
        <div className="profile__data">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <p className="profile__about">{currentUser?.about}</p>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать профиль"
            onClick={props.onEditProfile}
          />
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить картинку"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {props.cards.map((card) => <Card 
          key={card._id} 
          card={card} 
          onCardClick={props.onCardClick}
          onDeleteClick={props.onDeleteClick}
          onCardLike={props.onCardLike} />)}
      </section>
    </main>
  );
};

export default Main;