import React from 'react';
import Paper from '@material-ui/core/Paper';

export const templateRenderStyle = {
    width: '50vw',
    height: '60vh',
    border: '1px solid #ddd',
    overflow: 'auto',
    padding: '50px'
};

export const placeholderStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '20px'
}

const TemplateRenderer = ({ template, placeholderText }) => {

  return (
    <Paper style={templateRenderStyle}>
      {template ? (
        <div dangerouslySetInnerHTML={{ __html: template.content ? template.content : template }} />
      ) : (
        <div style={placeholderStyle}>
          <p>{placeholderText}</p>
        </div>
      )}
    </Paper>
  );
};

export default TemplateRenderer;
