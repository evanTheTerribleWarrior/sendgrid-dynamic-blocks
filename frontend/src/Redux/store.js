import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  preloadedState: persistedState
});

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState(state);
}, 1000));


export default store;