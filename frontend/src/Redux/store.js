import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import folderReducer from './folderStructureSlice';
import authReducer from './authSlice'

import throttle from 'lodash/throttle';
import { loadState, saveState } from '../Utils/localStorage';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    folderStructure: folderReducer,
    auth: authReducer
  },
  middleware: [thunkMiddleware],
  preloadedState: persistedState
});

store.subscribe(throttle(() => {
  saveState({
    folderStructure: store.getState().folderStructure,
    jwtToken: store.getState().jwtToken
  });
}, 1000));


export default store;