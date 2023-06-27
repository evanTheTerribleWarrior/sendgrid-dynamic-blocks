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
          <img src=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX27VqnFdy3tp45XHqahQMze9mfQID08AqdKfZE8GW&s />
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