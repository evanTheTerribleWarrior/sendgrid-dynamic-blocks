import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {Menu, MenuItem, Dialog, DialogActions, DialogTitle, DialogContent, Button, Grid, Typography} from '@mui/material'
import { updateFolderStructure } from '../../Redux/reducers';
import { MinusSquare, PlusSquare, CloseSquare, StyledTreeItem } from './FolderTreeStyles';
import ImportTemplate from './ImportTemplate/ImportTemplate'

const FolderTree = ({ onItemSelected, onItemDeleted, showFiles, allowUpdates }) => {

  const [selectedFolder, setSelectedFolder] = useState("")
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const [selectedItem, setSelectedItem] = useState("")
  const [renamingItemId, setRenamingItemId] = useState(null);
  const [renamingItemName, setRenamingItemName] = useState('');
  const [currentElementType, setCurrentElementType] = useState("")
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [importedFile, setImportedFile] = useState(null);

  const folderStructure = useSelector((state) => state.folderStructure);
  const dispatch = useDispatch()

  console.log(folderStructure.folderStructure)

  const handleContextMenu = (event, node, isFolder) => {
    event.preventDefault();
    event.stopPropagation();
    isFolder ? setCurrentElementType("folder") : setCurrentElementType("file")
    setSelectedItem(node)
    setMenuAnchorEl(event.currentTarget);
    setContextMenuPosition({ x: event.clientX, y: event.clientY }); 
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleOnItemClick = (item) => {

    setSelectedItem(item)
    onItemSelected(item)
    handleMenuClose()
  }

  const handleAddFolderRecursive = (folders) => {
    return folders.map((folder) => {
      console.log("Selected" + selectedItem)
      console.log("Compare " + folder.id)
      if (folder.id === selectedItem.id) {
        return {
          ...folder,
          children: [...folder.children, { id: uuid(), type: 'folder', name: "New Folder", children: [] }],
        };
      } else if ( folder.children && folder.children.length > 0) {
        return {
          ...folder,
          children: handleAddFolderRecursive(folder.children)
        };
      }
      return folder;
    });
  }

  const handleAddFolder = () => {
    dispatch(updateFolderStructure(handleAddFolderRecursive(folderStructure.folderStructure)));
    handleMenuClose()
  };

  const handleAddTopFolder = () => {
    const newTopFolder = {
      id: uuid(),
      type: "folder",
      name: "New Folder",
      children: []
    }
    dispatch(updateFolderStructure([...folderStructure.folderStructure, newTopFolder]))
  }


  const handleDeleteItem = () => {
    setShowDeleteConfirmation(true)
    handleMenuClose()
  }

  const handleDeleteConfirmation = () => {
    //setDeleteItemId(selectedItem.id)
    console.log(selectedItem)
    setShowDeleteConfirmation(false);
    onItemDeleted(selectedItem)
    dispatch(updateFolderStructure(handleDeleteItemRecursive(folderStructure.folderStructure, selectedItem.id)));
  };

  const handleDeleteItemRecursive = (items, itemId) => {
    return items.map((item) => {
      if (item.id === itemId) {
        return undefined;
      } else if (item.children) {
        return { ...item, children: handleDeleteItemRecursive(item.children, itemId) };
      }
      return item;
    }).filter((item) => item !== undefined);
  };

  /* Sets the id and name of the renaming item (folder/file)*/
  const handleRenameItem = () => {
    setRenamingItemId(selectedItem.id)
    setRenamingItemName(selectedItem.name)
    handleMenuClose()
  }

  const handleInputChange = (event) => {
    setRenamingItemName(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(updateFolderStructure(handleRenameItemRecursive(folderStructure.folderStructure, renamingItemName)));
      setRenamingItemId(null);
      setRenamingItemName('');
    }
  };

  const handleRenameItemRecursive = (folders, newName) => {

    return folders.map((item) => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          name: newName
        };
      } else if ( item.children && item.children.length > 0) {
        return {
          ...item,
          children: handleRenameItemRecursive(item.children, newName)
        };
      }
      return item;
    });
  }

  const handleImportedFile = (fileObj) => {
    console.log("Obj" + JSON.stringify(fileObj))
    setImportedFile({
      id: uuid(),
      ...fileObj
    })
  }

  const handleAddImported = () => {
    dispatch(updateFolderStructure(handleAddImportedRecursive(folderStructure.folderStructure, importedFile)));
    setImportedFile(null);
    handleMenuClose()
  }

  const handleAddImportedRecursive = (folders, file) => {

    console.log(selectedItem)

    return folders.map((item) => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          children: [...item.children, file]
        };
      } 
      
      else if ( item.children && item.children.length > 0) {
        return {
          ...item,
          children: handleAddImportedRecursive(item.children, file)
        };
      }
      return item;
    });

  }

  const handleDownloadItem = () => {
    const blob = new Blob([selectedItem.content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dynamic_block.html';
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
  }

  const renderTreeItem = (node) => {

    return (
      <StyledTreeItem 
        key={node.id} 
        nodeId={node.id} 
        label={
          renamingItemId === node.id ? (
            <input
              type="text"
              value={renamingItemName}
              onChange={handleInputChange}
              onKeyPress={(event) => handleInputKeyPress(event, node.id)}
              onBlur={() => {
                setRenamingItemId(null);
                setRenamingItemName('');
              }}
            />
          ) : (
            <>{node.name}</>
          )
        }
        //endIcon={(node) => setItemIcon(node)}
        onContextMenu={(event) => handleContextMenu(event, node, node.type === "folder" ? true : false)} 
        onClick={() => handleOnItemClick(node)}
        >
        {node.children ? renderTree(node.children) : <></>}
      </StyledTreeItem>
    );
  }

  const renderTree = (nodes) => {
    return nodes.map((node) => {
      if (node.children) {
        return renderTreeItem(node)
      } else {
        if(showFiles){
          return renderTreeItem(node)
        }
        
      }
    });
  };

  const renderMenu = () => {
    return (
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: contextMenuPosition.y,
          left: contextMenuPosition.x,
        }}
        onClose={handleMenuClose}
      >
        {
          currentElementType === "folder" ?
          (
            <div>
            <MenuItem onClick={handleAddFolder}>Add Folder</MenuItem>
            <MenuItem onClick={handleRenameItem}>Rename Folder</MenuItem>
            <MenuItem onClick={handleDeleteItem}>Delete Folder</MenuItem>
            {importedFile ? <MenuItem onClick={handleAddImported}>Add {importedFile.name}</MenuItem> : <></> }
            </div>
          )
          :
          (
            <div>
              <MenuItem onClick={handleRenameItem}>Rename File</MenuItem>
              <MenuItem onClick={handleDeleteItem}>Delete File</MenuItem>
              <MenuItem onClick={handleDownloadItem}>Download File</MenuItem>
            </div>
          )
        }
        
      </Menu>
    )
  }

  return (
    <>
    {allowUpdates ? 
    (<Grid container direction="row">
    <Button variant="outlined" size="small" onClick={handleAddTopFolder}>Add top level folder</Button>
    <ImportTemplate onImportedFile={handleImportedFile} />
    {importedFile ? (<Typography variant='subtitle1'>{importedFile.name} imported. Right click on a folder to add it</Typography>) : <></>}
    </Grid>) 
    
    : 
    
    <></>}
    <TreeView
      sx={{ width: '100%', overflowY: 'auto', marginTop: "20px" }}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
    >
      {renderTree(folderStructure.folderStructure)}
      { allowUpdates ? renderMenu() : <></>}
      <Dialog
        open={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this {currentElementType}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirmation(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} autoFocus>
            Delete
          </Button>
        </DialogActions>
  </Dialog>
      
    </TreeView>
    </>);
};

export default FolderTree;
