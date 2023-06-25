const FETCH_FOLDER_STRUCTURE = 'FETCH_FOLDER_STRUCTURE';
const SET_FOLDER_STRUCTURE = 'SET_FOLDER_STRUCTURE';

const fetchFolderStructureAction = (folderStructure) => ({
  type: FETCH_FOLDER_STRUCTURE,
  payload: folderStructure,
});

const setFolderStructureAction = (folderStructure) => ({
  type: SET_FOLDER_STRUCTURE,
  payload: folderStructure,
});

const fetchFolderStructure = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/folder-structure');
      const data = await response.json();
      dispatch(fetchFolderStructureAction(data));
    } catch (error) {
      console.error('Failed to fetch folder structure:', error);
    }
  };
};

export const setFolderStructure = (folderStructure) => {
  return async (dispatch) => {
    try {
      await fetch('/api/folder-structure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(folderStructure),
      });
      dispatch(setFolderStructureAction(folderStructure));
    } catch (error) {
      console.error('Failed to set folder structure:', error);
    }
  };
};
