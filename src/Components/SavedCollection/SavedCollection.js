import React, {useState} from 'react';
import FolderTree from '../FolderTree/FolderTree';
import {CardContent, Grid, Card, Paper} from '@mui/material'

const SavedCollection = () => {

    const [folderStructure, setFolderStructure] = useState([
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
      ]);

      const [selectedFolder, setSelectedFolder] = useState(null);
      const [selectedFileContent, setSelectedFileContent] = useState('');

      const handleSelectFolder = (folderId) => {
        setSelectedFolder(folderId);
      };

      const handleFileClick = (fileId, fileName, fileContent) => {
        setSelectedFileContent(fileContent)
      }
    

    return(
        <Grid container direction="row" spacing={10}>
            <Grid item xs={3}>
                <FolderTree folderStructure={folderStructure} onSelectFolder={handleSelectFolder} onFileClick={handleFileClick}/>
            </Grid>
            <Grid item xs={9}>
                <Paper>
                    <div dangerouslySetInnerHTML={{ __html: selectedFileContent }} />
                </Paper>
                

            </Grid>
        </Grid>
    )
}

export default SavedCollection