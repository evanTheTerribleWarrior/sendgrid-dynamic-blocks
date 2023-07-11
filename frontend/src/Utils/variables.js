import { height } from "@mui/system";

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
    PROTOCOL: 'https://',
    //BASE_URL: 'sendgrid-api-9573.twil.io/',
    BASE_URL: 'sendgrid-dynamic-blocks-1123-dev.twil.io/',
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
    //IMAGE_TEXT: "ImageText",
    //CODE: { type: "code", label: "Code", fields: [{name: "code", type: "text", value: ""}] },
    //COLUMNS: "Columns",
    //BUTTON: "Button",
    DIVIDER: { type: "divider", label: "Divider", fields: [{name: "colour", type: "text", value: ""}, {name: height, type: "text", value: ""}]},
    SPACER: { type: "spacer", label: "Spacer", fields: [{name: "colour", type: "text", value: ""}, {name: height, type: "text", value: ""}]},
    //SOCIAL: "Social"
  }
  
  // Code Blocks
  export const CODE_BLOCKS = {
    TEXT: {
      generateSGCode: (value, styles) => {
        let stylesObj = {}
        for (let i = 0; i < styles.length; i++) {
          stylesObj[styles[i].name] = styles[i].value
        }
        console.log(JSON.stringify(stylesObj))
        const {paddingTop, paddingRight, paddingLeft, paddingBottom, alignment} = stylesObj;
        return `<table class="module" role="module" data-type="text">
        <tr>
          <td style="padding:${paddingTop || 0}px ${paddingRight|| 0}px ${paddingLeft|| 0}px ${paddingBottom|| 0}px;" bgcolor="" role="module-content">
          <p>${value}</p>
          </td>
        </tr>
      </table>`
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

    /*<td style="padding:0px 0px 0px 0px;" align="center">
            <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" width="600" style="max-width:100% !important; width:100%; height:auto !important;" alt="" data-proportionally-constrained="false" data-responsive="true">
          </td>

          <td style="padding:0px 0px 0px 0px;" align="center">
            <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" width="100" style="" alt="" data-proportionally-constrained="false" data-responsive="false" height="100">
          </td>*/

    IMAGE: {
      generateSGCode: (value, styles) => {
        let stylesObj = {}
        for (let i = 0; i < styles.length; i++) {
          stylesObj[styles[i].name] = styles[i].value
        }
        console.log(JSON.stringify(stylesObj))
        const {paddingTop, paddingRight, paddingLeft, paddingBottom, alignment} = stylesObj;
        return `<table class="wrapper" role="module" data-type="image" >
        <tr>
          <td style="padding:${paddingTop || 0}px ${paddingRight|| 0}px ${paddingLeft|| 0}px ${paddingBottom|| 0}px;" align=${alignment}>
            <img src=${value} />
          </td>
        </tr>
      </table>`
      }
    },
    DIVIDER: {
      generateSGCode: (value) => {
        return `<table class="module" role="module" data-type="divider">
        <tr>
          <td style="padding:0px 0px 0px 0px;" bgcolor="">
            <table height="10px">
              <tr>
                <td bgcolor=${value}></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`
      }
    },
    SPACER: {
      generateSGCode: (value) => {
        return `<table class="module" role="module" data-type="spacer">
        <tr>
          <td style="padding: 50px 0 0 0" bgcolor=${value}>
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
