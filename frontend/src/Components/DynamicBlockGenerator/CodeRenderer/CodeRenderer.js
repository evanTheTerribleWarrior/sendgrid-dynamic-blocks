import React, { useState } from 'react';
import CodeViewSwitch from '../CodeViewSwitch/CodeViewSwitch';
import BlockCreation from '../BlockCreation/BlockCreation';
import HTMLSanitize from '../../HTMLSanitize/HTMLSanitize';
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
      <Container>
      <BlockCreation getCustomBlock={handleGeneratedDynamicBlock}  />
      </Container>
      
      <Grid container direction="row" spacing={10} >
        <Grid item xs={6} >
        <Typography variant="h6" align="center" sx={{ pt: 4 }}>
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
          
          <Grid container  sx={{ height: '100%', flexDirection: "column"}} >
            <Grid item container >
              <Grid item>
              <CodeViewSwitch checked={codeView} onChange={handleViewSwitch}/> 
              </Grid>
              <Grid item xs={true}>
                <Typography align="center" variant="h6" sx={{ pt: 4 }}>Generated Code</Typography>
              </Grid>
          </Grid>
          
          
          {codeView ? (
              <Grid item > 
              {generatedHtml ? (
                <SyntaxHighlighter language="html" style={darcula} customStyle={{borderRadius: "5px",marginTop: '10px', overflow: 'auto'}}>
                  {generatedHtml}
                </SyntaxHighlighter>
            
              ): <Paper elevation={2} sx={{ marginTop: '10px'}}><Grid item ><Typography variant="h6" align="center" sx={{ p: 3, color: 'grey' }}>No code yet</Typography></Grid></Paper>}
              </Grid>
            ) : (
              <Grid item >
              
                {generatedHtml ? (<Paper sx={{ p: 2, border: '1px solid #ccc', marginTop: '10px',  overflow: 'auto'  }}><Box><HTMLSanitize html={generatedHtml}/></Box></Paper>)
                  : <Paper elevation={2} sx={{ marginTop: '10px'}}><Grid item ><Typography variant="h6" align="center" sx={{ p: 3, color: 'grey' }}>No code yet</Typography></Grid></Paper>}
          
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
