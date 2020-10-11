import React from 'react';
import './card.scss';
const Card = ({imgUrl, name}) => {
  return (
    <div className="playCard">
      <div className="playCardImageContainer">
        <img src={imgUrl} alt={name} className="playCardImage" />
      </div>
      <p className="playCardName">{name}</p>
    </div>
  )
}
export default Card;