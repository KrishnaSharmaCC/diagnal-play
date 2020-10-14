import { combineReducers, createStore } from 'redux';

const initialState = { searchText: '', currentPageTitle: '', assets: { currentPage: 1, total: 0, list: [], searchResults: [] } };
const reducer1 = (state = initialState, { type, data }) => {
  switch (type) {
    case 'FEED_ITEMS':
      return { ...state, currentPageTitle: data.currentPageTitle, assets: { ...state.assets, currentPage: data.currentPage, total: data.total, list: [...state.assets.list, ...data.list] } };
    case 'SEARCH_RESULTS':
      return { ...state, assets: { ...state.assets, currentPage: data.currentPage, searchResults: [...data.searchResults] } }
    case 'SEARCH':
      return { ...state, searchText: data.searchText }
    default:
      return state;
  }
}
const rootReducer = combineReducers({ reducer1 });

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;