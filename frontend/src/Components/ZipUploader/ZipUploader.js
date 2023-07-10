import React, {useState, useRef} from 'react';
import SectionHeader from '../SectionHeader/SectionHeader'
import TemplateRenderer from '../TemplateRenderer/TemplateRenderer';
import { uploadImageBase64, createNewTemplate } from '../../Utils/functions';
import { Grid, Button, TextField, Paper, Typography, Stack, Switch, Tooltip, IconButton } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import JSZip from 'jszip';

const sectionHeaderContent = {
    title: "Upload your HTML",
    subtitle: "Here you can upload a .zip file with your own html content and css / image folders so that it can be uploaded to Sendgrid"
  }

const fileUploadStyle = {
    border: '4px dashed #aaa',
    padding: '32px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px'
};
  

const ZipUploader = () => {

    const [uploadedFile, setUploadedFile] = useState(null);
    const [cssFolderName, setCssFolderName] = useState('');
    const [imgFolderName, setImgFolderName] = useState('');
    const [htmlFileName, setHtmlFileName] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [trustHtmlSource, setTrustHtmlSource] = useState(false);
    const [uploadLocalImages, setUploadLocalImages] = useState(false);
    const [imagesArray, setImagesArray] = useState([])

    const [processedHTML, setProcessedHTML] = useState(null)

    const canvasRef = useRef(null);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
      };
    
      const handleDragLeave = () => {
        setIsDragOver(false);
      };
    
      const handleDrop = (event) => {
        const file = event.dataTransfer.files[0];
        console.log(file)
        event.preventDefault();
        setIsDragOver(false);
        setUploadedFile(file);
      };
    
    const exportHTML = () => {
      if(processedHTML){
        const blob = new Blob([processedHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'composed.html';
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      }  
    }

    const uploadHTMLToSendgrid = async () => {
      if(processedHTML){
        const data = {
          html: processedHTML,
          name: uploadedFile ? uploadedFile.name.replace(/\.[^.]+$/, '') : "My Extracted Template"
        }
        const result = await createNewTemplate(data);
        console.log(JSON.stringify(result))
      }
    }
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setUploadedFile(file);
    };

    const convertToPng = (imageFileBase64) => {
      return new Promise((resolve, reject) => {
        const svgImage = new Image();
        svgImage.src = `data:image/svg+xml;base64,${imageFileBase64}`;
        
        svgImage.onload = () => {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
  
          canvas.width = svgImage.width;
          canvas.height = svgImage.height;

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(svgImage, 0, 0);
  
          // Convert the canvas to PNG
          const pngDataUrl = canvas.toDataURL('image/png');
          const pngBase64 = pngDataUrl.split(',')[1];
  
          resolve(pngBase64);
        };
  
        svgImage.onerror = () => {
          reject(new Error('Failed to load SVG image.'));
        };
      });
    };

    const generateCssCode = async (zipFile) => {
      const cssFiles = Object.values(zipFile.files).filter((file) => file.name.endsWith('.css'));
        let cssCode = '';

        for (const cssFile of cssFiles) {
          const code = await cssFile.async('text');
          cssCode += code;
        }
        return cssCode
    }

    const generateHTMLWithCSS = async (zipFile) => {
      const htmlFile = zipFile.file(htmlFileName || 'index.html');
      const htmlContents = await htmlFile.async('string');
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(htmlContents, 'text/html');
      const headElement = htmlDoc.querySelector('head');
      const styleTag = document.createElement('style');
      styleTag.setAttribute('type', 'text/css');
      styleTag.innerHTML = await generateCssCode(zipFile);
      headElement.appendChild(styleTag);
      const processedHTML = htmlDoc.documentElement.outerHTML;
      return processedHTML
    }

    const getImageFiles = async (zipFile) => {
      const imagesArray = [];
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
      const imageFiles = Object.values(zipFile.files).filter((file) => 
        imageExtensions.some((ext) => file.name.endsWith(ext))
      );

      for (const imageFile of imageFiles) {
        const imageBase64 = await imageFile.async('base64');
        const imageObj = {
          imageName: imageFile.name,
          imageBase64: imageBase64
        }
        imagesArray.push(imageObj)
      }
      return imagesArray
    }

    const transformImagesForSendgrid = async (imagesArrayOfObj) => {
      const validSGExtensions = ['jpg', 'jpeg', 'png'];
      for (const imageObj of imagesArrayOfObj) {
        const extension = imageObj.imageName.split('.').pop()
        if (!validSGExtensions.includes(extension)){   
          imageObj.imageBase64 = await convertToPng(imageObj.imageBase64)
        }
        imageObj.imageName = imageObj.imageName.replace(extension, 'png').split('/').pop();
      }
      return imagesArrayOfObj;
    }

    const uploadImagesToSendgrid = async (imagesArrayOfObj) => {
      for (const imageObj of imagesArrayOfObj) {
        const sendgridData = await uploadImageBase64(...Object.values(imageObj))
        imageObj.imagePublicUrl = sendgridData.url;
      }
      return imagesArrayOfObj
    }
  
    const replaceImageReferences = (html, imagesArray) => {

      const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

      for (const imageObject of imagesArray){
        const { imageName, imagePublicUrl } = imageObject;
        const imageNameWithoutExtension = imageName.replace(/\.[^.]+$/, '');
      
        const imgElements = parsedHTML.querySelectorAll('[src]');
        imgElements.forEach((element) => {
          const src = element.getAttribute('src').split('/').pop().replace(/\.[^.]+$/, '');
          if (src === imageNameWithoutExtension) {
            element.setAttribute('src', imagePublicUrl);
          }
        });

        html = parsedHTML.documentElement.innerHTML;
      }
        const cssRegex = /<style[^>]*>(.*?)<\/style>/gs;
        const matches = html.matchAll(cssRegex);

        for (const match of matches) {
          const cssCode = match[1];

          const modifiedCssCode = cssCode.replace(new RegExp('url\\((.*?)\\)', 'g'), (match, url) => {
            const updatedUrl = replaceUrl(url, imagesArray);
            return `url(${updatedUrl})`;
          });

          html = html.replace(cssCode, modifiedCssCode);

        }
        console.log(`Final html:${html}`)
        return html
    };

    const replaceUrl = (url, imagesArray) => {
      const filename = url.split('/').pop().replace(/\.[^.]+$/, '');
      const imageObject = imagesArray.find((obj) => obj.imageName.replace(/\.[^.]+$/, '') === filename);
      if (imageObject) {
        return imageObject.imagePublicUrl;
      }
    
      return url;
    };

    const processZipFile = async () => {
      try {
        const zip = new JSZip();
        const zipFile = await zip.loadAsync(uploadedFile);   
        const htmlWithCss = await generateHTMLWithCSS(zipFile)
        if(uploadLocalImages) {
          const imagesArrayOfObj = await getImageFiles(zipFile)
          await transformImagesForSendgrid(imagesArrayOfObj)
          console.table(imagesArrayOfObj)
          await uploadImagesToSendgrid(imagesArrayOfObj)
          console.table(imagesArrayOfObj)
          console.log(`Current html: ${htmlWithCss}`)
          const updatedHTML = replaceImageReferences(htmlWithCss, imagesArrayOfObj)
          setProcessedHTML(updatedHTML)
        }
        else{
          setProcessedHTML(htmlWithCss)
        }
        

      } catch (error) {
        console.log('Error processing zip file:', error);
      }
    };

    const clearFile = () => {
      setProcessedHTML(null)
      //if(uploadedFile) setUploadedFile(null)
    }
  
    return (
          <Grid container direction="row" spacing={5}>
            <div><canvas ref={canvasRef} style={{ display: 'none' }} /></div>
            <Grid item xs={12}>
                <SectionHeader title={sectionHeaderContent.title} subtitle={sectionHeaderContent.subtitle}/>
            </Grid>
            <Grid item xs={12}>
            <Paper
                style={{
                    ...fileUploadStyle,
                    borderColor: isDragOver ? 'green' : '',
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                >
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    {uploadedFile? uploadedFile.name : "Click here to select file or drag and drop"}
                    <input
                    id="file-upload"
                    type="file"
                    accept=".zip"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    />
                </label>
                </Paper>
            </Grid>
            <Grid item xs={3} sx={{marginTop: "20px"}}>
            <Typography variant="h6" gutterBottom>
                File and folders names (Optional)
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
                We will use these names to find the correct folders (for css and image) and file (for the main html).<br/>
                The default values we will look for are: css, img, index.html
            </Typography>
            
            <Stack spacing={2} direction="column">
            <TextField
            label="CSS Folder Name"
            variant="standard"
            value={cssFolderName}
            onChange={(e) => setCssFolderName(e.target.value)}
          />
          <TextField
            label="IMG Folder Name"
            variant="standard"
            value={imgFolderName}
            onChange={(e) => setImgFolderName(e.target.value)}
          />
          <TextField
            label="HTML File Name"
            variant="standard"
            value={htmlFileName}
            onChange={(e) => setHtmlFileName(e.target.value)}
          />

        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle1">Trust HTML Source</Typography>
          <Switch
            checked={trustHtmlSource}
            onChange={(e) => setTrustHtmlSource(e.target.checked)}
          />
          <Tooltip title="If enabled, the HTML source is trusted and we will not perform HTML sanitization before displaying the HTML. Make sure you trust the source of the HTML">
            <IconButton>
              <HelpOutline />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle1">Upload Local Images to SendGrid</Typography>
          <Switch
            checked={uploadLocalImages}
            onChange={(e) => setUploadLocalImages(e.target.checked)}
          />
          <Tooltip title="If enabled, we will upload all the local images of the relevant folder to the Sendgrid CDN and use that public URL to update the image URL so they are accessible by Sendgrid Editor. The processing time will be longer">
            <IconButton>
              <HelpOutline />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={() => processZipFile()}>Process Zip File</Button>
        <Button variant="outlined" onClick={() => clearFile()}>Clear HTML</Button>
        </Stack>
            
        <Button variant="contained" disabled={!processedHTML} onClick={() => uploadHTMLToSendgrid()}>Create New Template</Button>
        <Button variant="contained" disabled={!processedHTML} onClick={() => exportHTML()}>Export HTML File</Button>

        </Stack>
            </Grid>
            <Grid item={8}>
                <TemplateRenderer template={processedHTML} placeholderText="Your processed HTML file will render here" trusted={trustHtmlSource}/>
            </Grid>
            
          </Grid>

    );

}

export default ZipUploader;