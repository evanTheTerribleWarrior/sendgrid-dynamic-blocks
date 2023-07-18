import { combineReducers } from 'redux';
import folderReducer from './slices/folderStructureSlice';
import authReducer from './slices/authSlice'
import settingsReducer from './slices/settingsSlice';

const rootReducer = combineReducers({
  isAuthenticated: authReducer,
  folderStructure: folderReducer,
  segmentWebVitals: settingsReducer
});

export default rootReducer;
