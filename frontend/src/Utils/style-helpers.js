export const extractStylesAttributes = (styles) => {
    const attributes = {};
    styles.forEach((obj) => {
      const { name, value } = obj;
      attributes[name] = value;
    });
    return attributes;
  }

 export const constructTextStyles = (text, attributes) => {
    let styledText = text;

  if (attributes.bold) {
    styledText = `<strong>${styledText}</strong>`;
  }

  if (attributes.italics) {
    styledText = `<em>${styledText}</em>`;
  }

  if (attributes.underline) {
    styledText = `<u>${styledText}</u>`;
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

  if (attributes.heading) {
    let headingSize = attributes.heading.split(" ").pop()
    styledText = `<h${headingSize}>${styledText}</h${headingSize}>`;
  }

  if (attributes.textColor) {
    styledText = `<span style="color: ${attributes.textColor}">${styledText}</span>`;
  }

  if (attributes.textHighlightColor) {
    styledText = `<span style="background-color: ${attributes.textHighlightColor}">${styledText}</span>`;
  }

  if (attributes.backgroundColor) {
    styledText = `<div style="background-color: ${attributes.bgcolor}">${styledText}</div>`;
  }

  if (attributes.alignment) {
    styledText = `<div style="text-align: ${attributes.alignment}">${styledText}</div>`;
  }


  return styledText;
  }