import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import folderReducer from './reducers';

const store = configureStore({
  reducer: {
    folderStructure: folderReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;