import { constructTextStyles, extractStylesAttributes } from "./style-helpers";

// Handlebars
export const HANDLEBARS = {
    IF: { value: '{{#if', hasVariables: 1},
    ELSE_IF: { value: '{{else if', hasVariables: 1},
    ELSE: { value: '{{else}}', hasVariables: 0},
    IF_CLOSE: { value: '{{/if}}', hasVariables: 0},
    UNLESS: { value: '{{#unless', hasVariables: 1},
    UNLESS_CLOSE: { value: '{{/unless}}', hasVariables: 0},
    GREATHER_THAN: { value: '{{#greaterThan', hasVariables: 2},
    GREATHER_THAN_CLOSE: { value: '{{/greaterThan}}', hasVariables: 0},
    LESS_THAN: { value: '{{#lessThan', hasVariables: 2},
    LESS_THAN_CLOSE: { value: '{{/lessThan}}', hasVariables: 0},
    EQUALS: { value: '{{#equals', hasVariables: 2},
    EQUALS_CLOSE: { value: '{{/equals}}', hasVariables: 0},
    NOT_EQUALS: { value: '{{#notEquals', hasVariables: 2},
    NOT_EQUALS_CLOSE: { value: '{{/notEquals}}', hasVariables: 0},
    AND: { value: '{{#and', hasVariables: 2},
    AND_CLOSE: { value: '{{/and}}', hasVariables: 0},
    OR: { value: '{{#or', hasVariables: 2},
    OR_CLOSE: { value: '{{/or}}', hasVariables: 0},
    LENGTH: { value: 'length', hasVariables: 0},
    EACH: { value: '{{#each', hasVariables: 1},
    EACH_CLOSE: { value: '{{/each}}', hasVariables: 0},
    EACH_THIS: { value: 'this.', hasVariables: 0},
    EACH_ARRAY_INDEX: { value: '{{@index}}: {{this}}', hasVariables: 0},
    EACH_OBJ_KEY: { value: '{{@key}}: {{this}}', hasVariables: 0},
  };
  
  // API URLs
  export const API_URLS = {
    PROTOCOL: '',
    BASE_URL: '',
    GET_SINGLE_TEMPLATE: 'get-single-template',
    GET_ALL_TEMPLATES: 'get-templates',
    UPDATE_TEMPLATE: 'update-template',
    GET_SINGLE_TEMPLATE_VERSION: 'get-template-version',
    GET_FOLDER_STRUCTURE:'get-folder-structure',
    UPLOAD_IMAGE_BASE64: 'upload-image',
    CREATE_NEW_TEMPLATE: 'create-new-template'
  };

  export const COMPONENTS = {
    IMAGE: { 
      type: "image",
      label: "Image", 
      fields: [{name: "imageUrl", type: "text", value: ""}], 
      styles: [
        {name: "altText", type: "text", label: "Alt Text", value: ""},
        {name: "paddingLeft", type: "number", label: "Padding Left", value: ""},
        {name: "paddingRight", type: "number", label: "Padding Right", value: ""},
        {name: "paddingTop", type: "number", label: "Padding Top", value: ""},
        {name: "paddingBottom", type: "number", label: "Padding Bottom", value: ""},
        {name: "isResponsive", type: "boolean", label: "Is Responsive?", value: ""},
        {name: "width", type: "number", label: "Width", value: ""},
        {name: "height", type: "number", label: "Height", value: ""},
        {name: "responsiveWidthPercentage", type: "number", label: "Responsive Width %", value: ""},
        {name: "alignment", type: "select", label: "Alignment", selectValues: ['center', 'left', 'right'], value: ""},
      ]
    },
    TEXT: { type: "text", label: "Text", fields: [{name: "text", type: "text", value: ""}],
    styles: [
      {name: "paddingLeft", type: "number", label: "Padding Left", value: ""},
      {name: "paddingRight", type: "number", label: "Padding Right", value: ""},
      {name: "paddingTop", type: "number", label: "Padding Top", value: ""},
      {name: "paddingBottom", type: "number", label: "Padding Bottom", value: ""},
      {name: "bgcolor", type: "text", label: "Background Color", value: ""},
      {name: "textColor", type: "text", label: "Text Color", value: ""},
      {name: "textHighlightColor", type: "text", label: "Text Highlight Color", value: ""},
      {name: "lineHeight", type: "number", label: "Line Height", value: ""},
      {name: "bold", type: "boolean", label: "Bold", value: ""},
      {name: "italics", type: "boolean", label: "Italics", value: ""},
      {name: "alignment", type: "select", label: "Alignment", selectValues: ['center', 'left', 'right'], value: ""},
      {name: "heading", type: "select", label: "Heading", selectValues: ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'], value: ""},
    ]
    },
    DIVIDER: { type: "divider", label: "Divider", 
    styles: [
      {name: "paddingLeft", type: "number", label: "Padding Left", value: ""},
      {name: "paddingRight", type: "number", label: "Padding Right", value: ""},
      {name: "paddingTop", type: "number", label: "Padding Top", value: ""},
      {name: "paddingBottom", type: "number", label: "Padding Bottom", value: ""},
      {name: "height", type: "number", label: "Height", value: ""},
      {name: "bgcolor", type: "text", label: "Background Color", value: ""},
      {name: "linecolor", type: "text", label: "Line Color", value: ""}
    ]},
    SPACER: { type: "spacer", label: "Spacer", 
    styles: [
      {name: "paddingTop", type: "number", label: "Padding Top", value: ""},
      {name: "bgcolor", type: "text", label: "Background Color", value: ""}
    ]}
    
  }


  // Code Blocks
  export const CODE_BLOCKS = {
    TEXT: {
      generateSGCode: (value, styles) => {
        let attributes = extractStylesAttributes(styles)
        const textFirsPart = `<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="padding:${attributes.paddingTop || 0}px ${attributes.paddingRight|| 0}px ${attributes.paddingLeft|| 0}px ${attributes.paddingBottom|| 0}px; line-height:${attributes.lineHeight || 22}px text-align:inherit; background-color:${attributes.bgcolor};" height="100%" valign="top" bgcolor="${attributes.bgcolor}" role="module-content">`
        
        const textMainPart = constructTextStyles(value, attributes)
          
        const textClosingPart = `</td></tr></table>`
        
        return textFirsPart + textMainPart + textClosingPart;
      }
    },
    CODE: {
      generateSGCode: (value) => {
        return `<table class="module" role="module" data-type="code">
        <tr>
          <td style="" bgcolor="" role="module-content">
            ${value}
          </td>
        </tr>
      </table>`
      }
    },

    IMAGE: {
      generateSGCode: (value, styles) => {
        let attributes = extractStylesAttributes(styles)
        return `<table class="wrapper" role="module" data-type="image" >
        <tr>
          <td style="padding:${attributes.paddingTop || 0}px ${attributes.paddingRight|| 0}px ${attributes.paddingLeft|| 0}px ${attributes.paddingBottom|| 0}px;" align="${attributes.alignment}">
            <img src=${value} />
          </td>
        </tr>
      </table>`
      }
    },
    DIVIDER: {
      generateSGCode: (value, styles) => {
        let attributes = extractStylesAttributes(styles)
        return `<table class="module" role="module" data-type="divider" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:${attributes.paddingTop || 0}px ${attributes.paddingRight|| 0}px ${attributes.paddingLeft|| 0}px ${attributes.paddingBottom|| 0}px;" bgcolor="${attributes.bgcolor}" height="100%" valign="top">
            <table height="${attributes.height}px" width="100%" border="0" cellpadding="0" cellspacing="0" align="center" style="line-height:${attributes.height}px; font-size:${attributes.height}px;">
              <tr>
                <td bgcolor="${attributes.linecolor}" style="padding:0px 0px 10px 0px;"></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`
      }
    },
    SPACER: {
      generateSGCode: (value, styles) => {
        let attributes = extractStylesAttributes(styles)
        return `<table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td style="padding:0px 0px ${attributes.paddingTop}px 0px;" role="module-content" bgcolor="${attributes.bgcolor}">
          </td>
        </tr>
      </table>`
      }
    },
    SOCIAL: {
      generateSGCode: (value) => {
        return `  <table class="module" role="module" data-type="social">
        <tbody>
          <tr>
          <td [styles go here] data-align=['left', 'right', or 'center']>
            <table>
            <tbody>
              <tr>
              [MODULE CONTENT]
              </tr>
            </tbody>
            </table>
          </td>
          </tr>
        </tbody>
      </table>`
      }
    },
    BUTTON: {
      generateSGCode: (value) => {
        return `  <table class="module" role="module" data-type="button">
        <tr>
          <td [styles go here] bgcolor=[some color] align=['left' or 'right']>
            <table class="wrapper-mobile">
              <tr>
                <td [styles go here too] bgcolor=[some color]>
                  [MODULE CONTENT]
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`
      }
    },
    COLUMNS: {
      generateSGCode: (value) => {
        return `  <table role="module" data-type="columns">
        <tr>
          <td [styles go here] bgcolor=[some color]>
            <table>
              <tr>
                <td class="templateColumnContainer column-drop-area">
                [MODULE CONTENT]
                </td>
                <td class="templateColumnContainer column-drop-area">
                [ANOTHER MODULE CONTENT]
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`
      }
    },
    IMAGE_TEXT: {
      generateSGCode: (value) => {
        return `  <table role="module" data-type="imagetext">
        <tr>
          <td>
            <table>
              <tr role="module-content">
                <td class="templateColumnContainer" >
                  <table>
                    <tr>
                      <td class="leftColumnContent" role="column-one">
                        <table role="module" data-type="image">
                          <tr>
                            <td role="module-content">
                              [MODULE CONTENT]
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
                <td class="templateColumnContainer" >
                  <table>
                    <tr>
                      <td class="rightColumnContent" role="column-two">
                        <table role="module" data-type="text">
                          <tr>
                            <td role="module-content">
                              [MODULE CONTENT]
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `
      }
    }
      
    
  };
