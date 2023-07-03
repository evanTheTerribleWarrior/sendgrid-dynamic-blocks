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
    BASE_URL: 'sendgrid-api-9573.twil.io/',
    GET_SINGLE_TEMPLATE: 'dynamic-block-get-single-4e1f28a8333724c532f030c5ee29b312',
    GET_ALL_TEMPLATES: 'dynamic-block-b6335ecab3375517003bc1c1ba7e63b96ca52136',
    UPDATE_TEMPLATE: 'dynamic-block-edit-template-5e441bdfe03eb984877763becc00877d',
    GET_SINGLE_TEMPLATE_VERSION: 'dynamic-block-get-version-caa8210c26afd3004b4b6c80022c48fa',
    GET_FOLDER_STRUCTURE:'dynamic-block-get-structure-3b3c5ec1fd4ea3e4fb76a6c2a623f4b2'
  };

  export const COMPONENTS = {
    IMAGE: { 
      type: "image",
      label: "Image", 
      fields: [{name: "imageUrl", type: "text", value: ""}], 
      styles: {
        altText: "", 
        paddingLeft: "",
        paddingRight: "",
        paddingTop: "",
        paddingBottom: "",
        responsive: false,
        width: "",
        height: "",
        responsiveWidthPercentage: "",
        alignment: ""
      }
    },
    TEXT: { type: "text", label: "Text", fields: [{name: "text", type: "text", value: ""}] },
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
      generateSGCode: (value) => {
        return `<table class="module" role="module" data-type="text">
        <tr>
          <td style="padding:0px 0px 0px 0px;" bgcolor="" role="module-content">
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
    IMAGE: {
      generateSGCode: (value, styles) => {
        return `<table class="wrapper" role="module" data-type="image" >
        <tr>
          <td style="padding:0px 0px 0px 0px;" align='center'>
            <img src=${value}/>
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
