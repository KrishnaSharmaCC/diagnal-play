import React, { useRef } from 'react';
import SearchBox from '../searchBox/searchBox';
import './header.scss';
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen(elem) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

const Header = (props) => {
  const logoRef = useRef(null);
  const toggleLogo = (logoEl, state) => {
    const logo = logoEl?.current;
    if (logo?.classList) {
      if (state) {
        logo.classList.add('hide');
        return;
      }
      logo.classList.remove('hide');
    }
  };
  return (
    <div className="header">
      <div className="header-items">
        <img
          className="logo"
          src="/assets/play1.svg"
          alt=""
          height="auto"
          ref={logoRef}
          onClick={() => 
            openFullscreen(document.documentElement)    
          }
        />
        <SearchBox
          value={props.value}
          onChange={props.onChange}
          onGoBack={null}
          searchFocused={(state) => toggleLogo(logoRef, state)}
        />
      </div>
    </div>
  );
};
export default Header;
