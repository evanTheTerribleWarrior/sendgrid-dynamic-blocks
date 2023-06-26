import React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { Folder, InsertDriveFile } from '@mui/icons-material';

const FolderTree = ({ folderStructure, onSelectFolder, onBlockClick }) => {
  console.log(folderStructure)
  const renderTree = (nodes) => {
    console.log("nodes: " + JSON.stringify(nodes))
    return nodes.map((node) => {
      if (node.children) {
        return (
          <TreeItem key={node.id} nodeId={node.id} label={node.name}>
            {renderTree(node.children)}
          </TreeItem>
        );
      } else {
        return (
          <TreeItem key={node.id} nodeId={node.id} label={node.name} onClick={() => onBlockClick(node)}>
          </TreeItem>
        );
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
      defaultEndIcon={<InsertDriveFile />}
      onNodeSelect={handleNodeSelect}
    >
      {renderTree(folderStructure)}
    </TreeView>
  );
};

export default FolderTree;
