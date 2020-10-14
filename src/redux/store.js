import { combineReducers, createStore } from 'redux';
import { ACTIONS } from './actions';
const initialState = { searchText: '', currentPageTitle: '', assets: { currentPage: 1, total: 0, list: [], searchResults: [] } };



// Could be split up into multiple reducers (for search and actual feed) if need be..
const data = (state = initialState, { type, data }) => {
  switch (type) {
    case ACTIONS.FEED_ITEMS:
      return { ...state, currentPageTitle: data.currentPageTitle, assets: { ...state.assets, currentPage: data.currentPage, total: data.total, list: [...state.assets.list, ...data.list] } };
    case ACTIONS.SEARCH_RESULTS:
      return { ...state, assets: { ...state.assets, currentPage: data.currentPage, searchResults: [...data.searchResults] } }
    case ACTIONS.SEARCH:
      return { ...state, searchText: data.searchText }
    default:
      return state;
  }
}

// Keeping only one reducer now for simplicity..
const rootReducer = combineReducers({ data });

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;