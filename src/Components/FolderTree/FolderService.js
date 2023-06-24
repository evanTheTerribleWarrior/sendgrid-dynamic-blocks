import { useState, useEffect } from 'react';

const structure = [
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

const useFolderStructure = () => {
  const [folderStructure, setFolderStructure] = useState(null);

  useEffect(() => {
    const fetchFolderStructure = async () => {
      /*try {
        const response = await getFolderStructureFromAPI(); // Fetch folder structure from the API
        setFolderStructure(response.data); // Store the folder structure locally
      } catch (error) {
        console.error('Failed to fetch folder structure:', error);
      }
    };*/
        console.log(structure)
        setFolderStructure(structure)
    }

    fetchFolderStructure();
  }, []);

  return folderStructure;
};

export default useFolderStructure;