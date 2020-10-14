import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ASSETS_PREFIX } from '../../constants';
import { useDebouncedCallback } from '../../hooks/useDebounceCallback';
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

const Header = () => {
  const staticRef = useRef(null);
  const searchText = useSelector(({ reducer1 }) => reducer1.searchText);
  const pageTitle = useSelector(({ reducer1 }) => reducer1.currentPageTitle);
  const dispatch = useDispatch();

  const toggleStaticVisibility = ({current: staticElm}, state) => {
    if (staticElm?.classList) {
      if (state) {
        staticElm.classList.add('hide');
        return;
      }
      staticElm.classList.remove('hide');
    }
  };
  const onSearch = useDebouncedCallback((key) => {
    console.log(key);
    dispatch({ type: 'SEARCH', data: {searchText: key} });
  }, 500)
  return (
    <div className="header">
      <div className="header-items">
        <div className="static" ref={staticRef}>
        <img
          className="backButton"
          src={`${ASSETS_PREFIX}/slices/Back.png`}
          alt=""
          // onClick={() => 
          //   openFullscreen(document.documentElement)    
          // }
        />
        <p className="currentPageTitle">{pageTitle}</p>
        </div>
        <SearchBox
          value={searchText}
          onChange={onSearch}
          searchFocused={(state) => toggleStaticVisibility(staticRef, state)}
        />
      </div>
    </div>
  );
};
export default Header;
