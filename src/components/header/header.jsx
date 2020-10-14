import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ASSETS_PREFIX } from '../../constants';
import { useDebouncedCallback } from '../../hooks/useDebounceCallback';
import { ACTIONS } from '../../redux/actions';
import SearchBox from '../searchBox/searchBox';
import './header.scss';

/* View in fullscreen */
function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}

const Header = () => {
  const staticRef = useRef(null); // arrow button and current page title
  const searchText = useSelector(({ data }) => data.searchText);
  const pageTitle = useSelector(({ data }) => data.currentPageTitle);
  const dispatch = useDispatch();

  // Toggle visibility of arrow button and current page title.
  const toggleStaticVisibility = ({ current: staticElm }, state) => {
    if (staticElm?.classList) {
      if (state) {
        staticElm.classList.add('hide');
        return;
      }
      staticElm.classList.remove('hide');
    }
  };

  // Add a debounce of 0.5s to let user type in. Then store the search key..
  const onSearch = useDebouncedCallback((key) => {
    dispatch({ type: ACTIONS.SEARCH, data: { searchText: key } });
  }, 500);
  return (
    <div className="header">
      <div className="header-items">
        <div className="static" ref={staticRef}>
          <img
            className="backButton"
            src={`${ASSETS_PREFIX}/slices/Back.png`}
            alt=""
          />
          <p
            className="currentPageTitle"
            onClick={() =>
              !document.fullscreenElement ? openFullscreen() : closeFullscreen()
            }
          >
            {pageTitle}
          </p>
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
