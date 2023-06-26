import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import {Menu, MenuItem} from '@mui/material'
import { Folder, InsertDriveFile } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const FolderTree = ({ folderStructure, onBlockClick, onFolderClick, showFiles }) => {

  const [selectedFolder, setSelectedFolder] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event, node, isFolder) => {
    event.preventDefault();
    isFolder ? setSelectedFolder(node) : setSelectedFile(node)

    const clickX = event.clientX;
    const clickY = event.clientY;
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  }

  const handleAddFolder = () => {
    console.log(selectedFolder)
  };

  const handleDeleteFolder = () => {
    console.log(selectedFolder)
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
            onContextMenu={(event) => handleContextMenu(event, node, true)} 
            onClick={() => onFolderClick(node)}>
              
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
              onContextMenu={(event) => handleContextMenu(event, node, false)} 
              onClick={() => onBlockClick(node)}>
            </TreeItem>
          );
        }
        
      }
    });
  };

  const handleNodeSelect = (event, nodeId) => {
   
  };

  return (
    <TreeView
      sx={{ width: '100%', overflowY: 'auto' }}
      defaultCollapseIcon={<Folder />}
      defaultExpandIcon={<Folder />}
      onNodeSelect={handleNodeSelect}
    >
      {renderTree(folderStructure)}
      <Menu
        open={!!selectedFolder}
        anchorEl={selectedFolder}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: contextMenuPosition.y,
          left: contextMenuPosition.x,
        }}
        onClose={() => setSelectedFolder(null)}
      >
        <MenuItem onClick={handleAddFolder}>Add Folder</MenuItem>
        <MenuItem onClick={handleDeleteFolder}>Delete Folder</MenuItem>
      </Menu>
    </TreeView>
  );
};

export default FolderTree;
