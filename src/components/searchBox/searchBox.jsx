import React, { useEffect, useRef, useState } from 'react';
import './searchBox.scss';

const SearchBox = ({ value, onChange, onGoBack, searchFocused }) => {
  const [searchKey, setSearchKey] = useState('');
  const searchInput = useRef(null);
  useEffect(() => {
    console.log('rendering');
  });
  const toggleInput = (el, state) => {
    const ee = el?.current;
    // console.log(ee);
    if (ee?.classList) {
      if (state) {
        ee.classList.add('show');
        ee.focus(); // Focus input
        searchFocused(true);
      } else {
        ee.classList.remove('show');
        searchFocused(false);
      }
    }
  };
  const clearSearch = (el) => {
    const ee = el?.current;
    ee.value = '';
    onChange('');
    searchFocused(false);
  }
  return (
    <div
      className="search"
      onMouseLeave={() =>
      {
        // Do not trigger render.. use ref instead
        !searchInput?.current?.value?.trim()?.length && toggleInput(searchInput, false)
      }
      }
    >
      <div id="wrap">
        <input
          id="search"
          name="search"
          type="text"
          autoComplete="off"
          placeholder="What're you looking for?"
          className="searchInput"
          onChange={(e) => onChange(e.target.value)}
          ref={searchInput}
        />
        <span className="backArrow"><img src="assets/back-arrow.svg" alt="go-back" width="30" height="30" onClick={() => (toggleInput(searchInput, false),clearSearch(searchInput),onGoBack && onGoBack())}/></span>
        <img
          className="search"
          src="assets/searchIcon.svg"
          alt="Search-icon"
          onClick={() => toggleInput(searchInput, true)}
        />
      </div>
    </div>
  );
};
export default SearchBox;
