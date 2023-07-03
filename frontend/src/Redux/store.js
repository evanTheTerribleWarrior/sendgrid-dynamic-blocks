import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import folderReducer from './reducers';

import throttle from 'lodash/throttle';
import { loadState, saveState } from '../Utils/localStorage';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    folderStructure: folderReducer,
  },
  middleware: [thunkMiddleware],
  preloadedState: persistedState
});

store.subscribe(throttle(() => {
  saveState({
    folderStructure: store.getState().folderStructure,
  });
}, 1000));


export default store;