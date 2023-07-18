//Here we drop any code we want to have as a quick backup to do some tests. Not affecting the app


return (
    <div>
      <Container>
      <BlockCreation getCustomBlock={handleGeneratedDynamicBlock} getRowsStructure={handleGetRowStructure}  />
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
                <SyntaxHighlighter language="html" style={darcula} customStyle={{borderRadius: "5px",marginTop: '10px', overflow: 'auto', width: '40vw'}}>
                  {generatedHtml}
                </SyntaxHighlighter>
            
              ): <Paper elevation={2} sx={{ marginTop: '10px'}}><Grid item ><Typography variant="h6" align="center" sx={{ p: 3, color: 'grey' }}>No code yet</Typography></Grid></Paper>}
              </Grid>
            ) : (
              <Grid item >
              
                {generatedHtml ? (<Paper sx={{ p: 3, border: '1px solid #ccc', marginTop: '10px',  overflow: 'auto'  }}><Box><HTMLSanitize html={generatedHtml}/></Box></Paper>)
                  : <Paper elevation={2} sx={{ marginTop: '10px'}}><Grid item ><Typography variant="h6" align="center" sx={{ p: 3, color: 'grey' }}>No code yet</Typography></Grid></Paper>}
          
            </Grid>
            )}  
          </Grid>
          </>
        </Grid>
      </Grid>
    </div>
  );