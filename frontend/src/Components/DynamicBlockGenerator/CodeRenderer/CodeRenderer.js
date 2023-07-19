import React, { useState } from 'react';
import CodeViewSwitch from '../CodeViewSwitch/CodeViewSwitch';
import BlockCreation from '../BlockCreation/BlockCreation';
import HTMLSanitize from '../../HTMLSanitize/HTMLSanitize';
import {
  Grid,
  Paper,
  Box, Typography, Tab, Tabs
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Container } from '@mui/system';


const CodeRenderer = ({onGenerateDynamicBlock, getRowsStructure}) => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [codeView, setCodeView] = useState(false);
  
  const handleGeneratedDynamicBlock = (html, code) => {
    setGeneratedCode(code)
    setGeneratedHtml(html)
    onGenerateDynamicBlock(html)
  }

  const handleGetRowStructure = (rows) => {
    getRowsStructure(rows)
  }

  const handleViewSwitch = () => {
    setCodeView((prevCodeView) => !prevCodeView);
  };


  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const displayNoInput = (text) => {
    return (
      <Paper sx={{ border: '1px solid #ccc', marginTop: '10px'}}><Grid item ><Typography variant="h6" align="center" sx={{ p: 3, color: 'grey' }}>{text}</Typography></Grid></Paper>
    )
  }

  const displayHTML = () => {
    return (
      <>
      {generatedHtml ? (<Paper sx={{ p: 3, border: '1px solid #ccc', marginTop: '10px',  overflow: 'auto'  }}><Box><HTMLSanitize html={generatedHtml}/></Box></Paper>)
                  : displayNoInput("No code yet")}
      </>
    )
  }

  const displayCode = () => {
    return (<>
      {generatedHtml ? (
        <SyntaxHighlighter language="html" style={darcula} customStyle={{borderRadius: "5px",marginTop: '10px', overflow: 'auto', width: '40vw'}}>
          {generatedHtml}
        </SyntaxHighlighter>
    
      ): displayNoInput("No code yet")}
    </>)
  }

  const displaySteps = () => {
    return (
      <>
      
      <Grid item>
        {generatedCode ? (
          <SyntaxHighlighter language="html" style={atomDark}>
            {generatedCode}
          </SyntaxHighlighter>
        ): displayNoInput("No steps yet")}
        </Grid>
      
      </>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        
        <div style={{paddingTop: "10px"}}>
        <BlockCreation getCustomBlock={handleGeneratedDynamicBlock} getRowsStructure={handleGetRowStructure}  />
        </div>
      </Grid>
      <Grid item xs={6}>
        
          <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="HTML" />
            <Tab label="Code" />
            <Tab label="Steps" />
          </Tabs>
          {tabValue === 0 && displayHTML()}
          {tabValue === 1 && displayCode()}
          {tabValue === 2 && displaySteps()}
        
      </Grid>
    </Grid>
  );

};

export default CodeRenderer;
