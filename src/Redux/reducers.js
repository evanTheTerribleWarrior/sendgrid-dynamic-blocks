const folderStructureSample = [
    { id: '1', name: 'Folder 1', children: [{ id: '2', name: 'test.html', content: `<table class="module" role="module" data-type="code">
    <tr>
      <td style="" bgcolor="" role="module-content">
        {{#equals test 1}}
      </td>
    </tr>
  </table><table class="module" role="module" data-type="code">
    <tr>
      <td style="" bgcolor="" role="module-content">
        {{/equals}}
      </td>
    </tr>
  </table>` }] },
    { id: '3', name: 'Folder 2', children: [{ id: '4', name: 'Subfolder 2' }] },
  ]

  const initialState = {
    folderStructure: folderStructureSample,
  };
  
  const folderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_FOLDER_STRUCTURE':
        return { ...state, folderStructure: action.payload };
      case 'SET_FOLDER_STRUCTURE':
        return { ...state, folderStructure: action.payload };
      default:
        return state;
    }
  };
  
  export default folderReducer;