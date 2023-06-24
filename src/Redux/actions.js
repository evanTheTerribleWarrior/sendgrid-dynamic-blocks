export const SET_FOLDER_STRUCTURE = 'SET_FOLDER_STRUCTURE';
export const UPDATE_FOLDER_STRUCTURE = 'UPDATE_FOLDER_STRUCTURE';

export const setFolderStructure = (folderStructure) => ({
  type: SET_FOLDER_STRUCTURE,
  payload: folderStructure,
});

export const updateFolderStructure = (updatedFolderStructure) => ({
  type: UPDATE_FOLDER_STRUCTURE,
  payload: updatedFolderStructure,
});