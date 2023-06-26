import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {Menu, MenuItem} from '@mui/material'
import { Folder, InsertDriveFile } from '@mui/icons-material';
import { updateFolderStructure } from '../../Redux/reducers';

const FolderTree = ({ onFolderSelected, onFileSelected, showFiles, allowUpdates }) => {

  const [selectedFolder, setSelectedFolder] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const folderStructure = useSelector((state) => state.folderStructure);
  const dispatch = useDispatch()

  const handleNodeMouseDown = (event, node, isFolder) => {

    if(!isFolder) {
      setSelectedFile(node)
      return;
    }
    
    if (event.button === 0) {
      setSelectedFolder(node.id);
    } else if (event.button === 2) {
      setSelectedFolder(node.id);
      setMenuAnchorEl(event.currentTarget);
      setContextMenuPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleContextMenu = (event, node, isFolder) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.button)
    console.log(node.id)
    isFolder ? setSelectedFolder(node) : setSelectedFile(node)
    console.log(node)
      setMenuAnchorEl(event.currentTarget);
      setContextMenuPosition({ x: event.clientX, y: event.clientY });
    
  }
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleOnFolderClick = (folder) => {
    setSelectedFolder(folder)
    if (onFolderSelected) onFolderSelected(folder)
    handleMenuClose()
  }

  const handleOnFileClick = (file) => {
    setSelectedFile(file)
    if (onFileSelected) onFileSelected(file)
    handleMenuClose()
  }

  const handleAddFolderRecursive = (folders) => {
    
    return folders.map((folder) => {
      console.log(folder.id + " " + selectedFolder.id)
      if (folder.id === selectedFolder.id) {
        return {
          ...folder,
          children: [...folder.children, { id: uuid(), type: 'folder', name: "New Folder", children: [] }],
        };
      } else if (folder.children.length > 0) {
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


  const handleDeleteFolder = () => {
    console.log(selectedFolder)
    handleMenuClose()
  };

  const handleRenameFolder = () => {
    console.log(selectedFolder)
    handleMenuClose()
  };

  const renderTree = (nodes) => {
    return nodes.map((node) => {
      if (node.children) {
        return (
          <TreeItem 
            key={node.id} 
            nodeId={node.id} 
            label={node.name}
            endIcon={<Folder />}
            //onMouseDown={(event) => handleNodeMouseDown(event, node, true)}
            onContextMenu={(event) => handleContextMenu(event, node, true)} 
            onClick={() => handleOnFolderClick(node)}
              >
            {renderTree(node.children)}
          </TreeItem>
        );
      } else {
        if(showFiles){
          return (
            <TreeItem 
              key={node.id} 
              nodeId={node.id} 
              label={node.name} 
              endIcon={<InsertDriveFile />}
              //onMouseDown={(event) => handleNodeMouseDown(event, node, false)}
              onContextMenu={(event) => handleContextMenu(event, node, false)} 
              onClick={() => handleOnFileClick(node)}
              >
            </TreeItem>
          );
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
        <MenuItem onClick={handleAddFolder}>Add Folder</MenuItem>
        <MenuItem onClick={handleRenameFolder}>Rename Folder</MenuItem>
        <MenuItem onClick={handleDeleteFolder}>Delete Folder</MenuItem>
      </Menu>
    )
  }

  return (
    <TreeView
      sx={{ width: '100%', overflowY: 'auto' }}
      defaultCollapseIcon={<Folder />}
      defaultExpandIcon={<Folder />}
    >
      {renderTree(folderStructure.folderStructure)}
      { allowUpdates ? renderMenu() : <></>}
      
    </TreeView>
  );
};

export default FolderTree;
