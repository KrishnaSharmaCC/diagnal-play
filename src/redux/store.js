import { combineReducers, createStore } from 'redux';

const initialState = { logCount: 1, searchText: '', assets: {currentPage: 1, total: 0, list: []} };
const reducer1 = (state = initialState, {type, data}) => {
  switch (type) {
    case 'LOG':
      return { ...state, logCount: state.logCount + 1 };
    case 'FEED_ITEMS':
      return {...state, searchText: data.searchText, assets: {currentPage: data.currentPage, total: data.total, list: [...state.assets.list, ...data.list]}}
    default:
      return state;
  }
}
const rootReducer = combineReducers({ reducer1 });

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;