import { configureStore } from '@reduxjs/toolkit';
import { folderStructureReducer } from './reducers';

const store = configureStore({
  reducer: {
    folderStructure: folderStructureReducer,
  },
});

export default store;