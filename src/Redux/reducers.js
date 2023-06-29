import {createSlice} from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid';

const folderStructureSample = 
[
    { id: uuid(), type: 'folder', name: 'Root', children: [{
      id: uuid(), type: 'file', name: 'selected.html', content: `<table class="module" role="module" data-type="code">
      <tr>
        <td style="" bgcolor="" role="module-content">
          {{#equals test 1}}
        </td>
      </tr>
    </table>  <table class="wrapper" role="module" data-type="image" >
      <tr>
        <td style="padding:0px 0px 0px 0px;" align='center'>
          <img src=https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80 />
        </td>
      </tr>
    </table>  <table class="module" role="module" data-type="code">
      <tr>
        <td style="" bgcolor="" role="module-content">
          
        </td>
      </tr>
    </table>
<table class="module" role="module" data-type="code">
      <tr>
        <td style="" bgcolor="" role="module-content">
          {{/equals}}
        </td>
      </tr>
    </table>`
    }]} 
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