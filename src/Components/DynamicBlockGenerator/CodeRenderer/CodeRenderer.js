import React, { useState } from 'react';
import CodeViewSwitch from '../CodeViewSwitch/CodeViewSwitch';
import BlockCreation from '../BlockCreation/BlockCreation';
import {
  Grid,
  Paper,
  Box, Typography
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Container } from '@mui/system';


const CodeRenderer = ({onGenerateDynamicBlock}) => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [codeView, setCodeView] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };          
  
  const handleGeneratedDynamicBlock = (html, code) => {
    setGeneratedCode(code)
    setGeneratedHtml(html)
    onGenerateDynamicBlock(html)
  }

  const handleViewSwitch = () => {
    setCodeView((prevCodeView) => !prevCodeView);
  };

  return (
    <div>
      {/*<Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Build it" />
        <Tab label="Import it" />
      </Tabs>

      {activeTab === 0 && (
        <div>
          <BlockCreation getCustomBlock={handleGeneratedDynamicBlock}  />
        </div>
      )}

      {activeTab === 1 && (
        <div>
          <FileUpload onFileUpload={handleGeneratedDynamicBlock} />
        </div>
      )}*/}
      <Container>
      <BlockCreation getCustomBlock={handleGeneratedDynamicBlock}  />
      </Container>
      

      <Grid container direction="column" spacing={10}>
        <Grid item xs={6} >
        <Typography variant="h6" align="center" sx={{ pt: 2 }}>
          Generated Steps
        </Typography>
        <Paper elevation={2} sx={{ marginTop: '10px'}}>
        <Grid item>
          {generatedCode ? (
            <SyntaxHighlighter language="html" style={atomDark}>
              {generatedCode}
            </SyntaxHighlighter>
          ): <Paper elevation={2} sx={{ marginTop: '10px'}}><Grid item><Typography variant="h6" align="center" sx={{ p: 3, color: 'grey' }}>No steps yet</Typography></Grid></Paper>}
          </Grid>
        </Paper>
        </Grid>
        <Grid item xs={6} >
            
          <>
          <Grid container sx={{ height: '100%', flexDirection: 'column' }}>
          <Typography variant="h6" align="center" sx={{ pt: 2 }}>
          Generated Code
        </Typography>
          <CodeViewSwitch checked={codeView} onChange={handleViewSwitch} /> 
          
          {codeView ? (
              <Grid item> 
              {generatedHtml ? (
                <Paper elevation={2} sx={{ marginTop: '10px' }}>
                <SyntaxHighlighter language="html" style={darcula}>
                  {generatedHtml}
                </SyntaxHighlighter>
                </Paper>
              ): <Paper elevation={2} sx={{ marginTop: '10px'}}><Grid item><Typography variant="h6" align="center" sx={{ p: 3, color: 'grey' }}>No code yet</Typography></Grid></Paper>}
              </Grid>
            ) : (
              <Grid item>
              
                {generatedHtml ? (<Paper elevation={2} sx={{ p: 2, border: '1px solid #ccc', marginTop: '10px' }}><Box dangerouslySetInnerHTML={{ __html: generatedHtml }} /></Paper>)
                  : <Paper elevation={2} sx={{ marginTop: '10px'}}><Grid item><Typography variant="h6" align="center" sx={{ p: 3, color: 'grey' }}>No code yet</Typography></Grid></Paper>}
          
            </Grid>
            )}  
          </Grid>
          </>
        </Grid>
      </Grid>
    </div>
  );
};

export default CodeRenderer;
