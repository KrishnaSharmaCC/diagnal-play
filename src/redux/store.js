import { combineReducers, createStore } from 'redux';

const initialState = { logCount: 1 };
const reducer1 = (state = initialState, {type, data}) => {
  switch (type) {
    case 'LOG':
      return {...state, logCount: state.logCount + 1}
  
    default:
      return state;
  }
}
const rootReducer = combineReducers({ reducer1 })

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;