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
      {name: "paddingLeft", type: "number", label: "Padding Left", value: ""},
      {name: "paddingRight", type: "number", label: "Padding Right", value: ""},
      {name: "paddingTop", type: "number", label: "Padding Top", value: ""},
      {name: "paddingBottom", type: "number", label: "Padding Bottom", value: ""},
      {name: "lineHeight", type: "number", label: "Line Height", value: ""},
      {name: "bold", type: "boolean", label: "Bold", value: ""},
      {name: "italics", type: "boolean", label: "Italics", value: ""},
      {name: "alignment", type: "select", label: "Alignment", selectValues: ['center', 'left', 'right'], value: ""},
      {name: "heading", type: "select", label: "Heading", selectValues: ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'], value: ""},
    ]
    },
    //IMAGE_TEXT: "ImageText",
    //CODE: { type: "code", label: "Code", fields: [{name: "code", type: "text", value: ""}] },
    //COLUMNS: "Columns",
    //BUTTON: "Button",
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
    SPACER: { type: "spacer", label: "Spacer", fields: [{name: "colour", type: "text", value: ""}, {name: height, type: "text", value: ""}]},
    //SOCIAL: "Social"
  }

  export const BEGINNING_HTML = `
  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
      <style type="text/css">
    body, p, div {
      font-family: arial,helvetica,sans-serif;
      font-size: 14px;
    }
    body {
      color: #000000;
    }
    body a {
      color: #1188E6;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    ul ul ul ul  {
      list-style-type: disc !important;
    }
    ol ol {
      list-style-type: lower-roman !important;
    }
    ol ol ol {
      list-style-type: lower-latin !important;
    }
    ol ol ol ol {
      list-style-type: decimal !important;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
      <!--user entered Head Start--><!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
            <tr>
              <td valign="top" bgcolor="#FFFFFF" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#ffffff" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p></p>
      </td>
    </tr>
  </table>
  `
  export const END_HTML = `
  </td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>`
  
  // Code Blocks
  export const CODE_BLOCKS = {
    TEXT: {
      generateSGCode: (value, styles) => {
        let stylesObj = {}
        for (let i = 0; i < styles.length; i++) {
          stylesObj[styles[i].name] = styles[i].value
        }
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
      generateSGCode: (value, styles) => {
        let stylesObj = {}
        for (let i = 0; i < styles.length; i++) {
          stylesObj[styles[i].name] = styles[i].value
        }
        const {paddingTop, paddingRight, paddingLeft, paddingBottom, bgcolor, linecolor, height} = stylesObj;
        return `<table class="module" role="module" data-type="divider" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:${paddingTop || 0}px ${paddingRight|| 0}px ${paddingLeft|| 0}px ${paddingBottom|| 0}px;" bgcolor="${bgcolor}" height="100%" valign="top">
            <table height="${height}px" width="100%" border="0" cellpadding="0" cellspacing="0" align="center" style="line-height:${height}px; font-size:${height}px;">
              <tr>
                <td bgcolor="${linecolor}" style="padding:0px 0px 10px 0px;"></td>
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
