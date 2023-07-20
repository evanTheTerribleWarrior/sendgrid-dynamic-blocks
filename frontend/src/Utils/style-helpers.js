export const extractStylesAttributes = (styles) => {
    const attributes = {};
    styles.forEach((obj) => {
      const { name, value } = obj;
      attributes[name] = value;
    });
    return attributes;
  }

export const constructImageStyles = (imageURL, attributes) => {

  const responsiveWidthPercentage = attributes.responsiveWidthPercentage
  let mainStyle = `display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;`
  if(attributes.isResponsive === "Yes") {
    const responsiveStyle = `max-width:${responsiveWidthPercentage}% !important; width:${responsiveWidthPercentage}%; height:auto !important;`
    mainStyle += " " + responsiveStyle
  }

  let finalImageElement = `<img src="${imageURL}" style="${mainStyle}" data-responsive="${attributes.isResponsive === "Yes" ? true : false}" `
  if(!attributes.isResponsive){
    finalImageElement += `width="${attributes.width}" height="${attributes.height}"`
  }
  finalImageElement += ` />`

  return finalImageElement
}

 export const constructTextStyles = (text, attributes) => {
    let styledText = text.replace(/\n/g, '<br />');

  if (attributes.bold === "Yes") {
    styledText = `<strong>${styledText}</strong>`;
  }
  else {
    styledText = styledText.replace(/<strong>(.*?)<\/strong>/g, '$1');
  }

  if (attributes.italics === "Yes") {
    styledText = `<em>${styledText}</em>`;
  }
  else {
    styledText = styledText.replace(/<em>(.*?)<\/em>/g, '$1');
  }

  if (attributes.underline === "Yes") {
    styledText = `<u>${styledText}</u>`;
  }
  else {
    styledText = styledText.replace(/<u>(.*?)<\/u>/g, '$1');
  }

  if (attributes.bulletPoints) {
    styledText = styledText.split('\n')
      .map(line => `<li>${line}</li>`)
      .join('');
    styledText = `<ul>${styledText}</ul>`;
  } else if (attributes.numberingPoints) {
    styledText = styledText.split('\n')
      .map(line => `<li>${line}</li>`)
      .join('');
    styledText = `<ol>${styledText}</ol>`;
  }

  if (attributes.fontFamily) {
    styledText = `<span style="font-family: ${attributes.fontFamily}">${styledText}</span>`;
  }

  if (attributes.fontSize) {
    styledText = `<span style="font-size: ${attributes.fontSize}">${styledText}</span>`;
  }

  

  if (attributes.textColor) {
    styledText = `<span style="color: ${attributes.textColor}; background-color: ${attributes.textHighlightColor || ""}">${styledText}</span>`;
  }

  if (attributes.textHighlightColor) {
    console.log("in")
    styledText = `<span style="background-color: ${attributes.textHighlightColor}">${styledText}</span>`;
  }

  if (attributes.backgroundColor) {
    styledText = `<div style="background-color: ${attributes.bgcolor}">${styledText}</div>`;
  }

  if (attributes.alignment) {
    styledText = `<div style="text-align: ${attributes.alignment}">${styledText}</div>`;
  }

  if (attributes.heading) {
    let headingSize = attributes.heading.split(" ").pop()
    styledText = `<h${headingSize} style="text-align: ${attributes.alignment ? attributes.alignment : "inherit"}">${styledText}</h${headingSize}>`;
    
  }
  console.log(styledText)

  return styledText;
  }