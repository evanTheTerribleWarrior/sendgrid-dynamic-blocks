import {createSlice} from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';

const folderStructureSample = 
[
    { id: uuid(), type: 'folder', name: 'My First Folder', children: []} 
]

  const initialState = {
    folderStructure: folderStructureSample,
  };
  
  const folderSlice = createSlice({
    name: 'folderStructure',
    initialState,
    reducers: {
      updateFolderStructure: (state, action) => {
        state.folderStructure = action.payload;
      },
    },
  });

  export const { updateFolderStructure } = folderSlice.actions;
  export default folderSlice.reducer;