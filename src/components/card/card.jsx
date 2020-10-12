import React, { memo, useEffect, useRef, useState } from 'react';
import './card.scss';
const Card = ({ imgUrl, name, loaded = true }) => {
  const [delay, setDelay] = useState(loaded);
  useEffect(() => {
    setTimeout(() => {
      setDelay(false)
    }, 2000);
  }, [])
  return (
    !delay ? <div className="playCard">
      <div className="playCardImageContainer">
        <img src={imgUrl} alt={name} className="playCardImage" />
      </div>
      <p className="playCardName">{name}</p>
     </div>
        :
    <div className="skelton">
      <div className="image pulse"></div>
      <div className="text pulse"></div>
    </div>
    // <PreloadImage imgUrl={!delay && imgUrl} name={name}/>
  );
};
export default Card;


const PreloadImage = memo(({ imgUrl, name }) => {
  const image = useRef(null);
  useEffect(() => {
    const imgEl = image?.current;
    if (!imgUrl) {
      imgEl.classList.add('loading');
    } else {
      imgEl.classList.remove('loading');
      imgEl.style.background = `url(${imgUrl}) no-repeat center /cover`;
    }
  }, [imgUrl])
  return (
    <div className="skelton lines">
      <div className="image pulse" ref={image}></div>
  {!!!(name && imgUrl) ? <div className="text pulse"></div> : <div style={{color: 'white', marginRight: 'auto'}}>{name}</div>}
    </div>
  )
})
