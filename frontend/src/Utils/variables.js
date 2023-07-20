import { constructTextStyles, extractStylesAttributes, constructImageStyles } from "./style-helpers";
import fontFamilies from "./font-families";

// Handlebars
export const HANDLEBARS = {
    IF: { value: '{{#if', hasVariables: 1},
    ELSE_IF: { value: '{{else if', hasVariables: 1},
    ELSE: { value: '{{else', hasVariables: 0},
    IF_CLOSE: { value: '{{/if', hasVariables: 0},
    UNLESS: { value: '{{#unless', hasVariables: 1},
    UNLESS_CLOSE: { value: '{{/unless', hasVariables: 0},
    GREATHER_THAN: { value: '{{#greaterThan', hasVariables: 2},
    GREATHER_THAN_CLOSE: { value: '{{/greaterThan', hasVariables: 0},
    LESS_THAN: { value: '{{#lessThan', hasVariables: 2},
    LESS_THAN_CLOSE: { value: '{{/lessThan', hasVariables: 0},
    EQUALS: { value: '{{#equals', hasVariables: 2},
    EQUALS_CLOSE: { value: '{{/equals', hasVariables: 0},
    NOT_EQUALS: { value: '{{#notEquals', hasVariables: 2},
    NOT_EQUALS_CLOSE: { value: '{{/notEquals', hasVariables: 0},
    AND: { value: '{{#and', hasVariables: 2},
    AND_CLOSE: { value: '{{/and', hasVariables: 0},
    OR: { value: '{{#or', hasVariables: 2},
    OR_CLOSE: { value: '{{/or', hasVariables: 0},
    //: { value: 'length', hasVariables: 0, hasClosingCondition: false},
    //EACH: { value: '{{#each', hasVariables: 1, hasClosingCondition: true},
    //EACH_CLOSE: { value: '{{/each}}', hasVariables: 0, hasClosingCondition: false},
    //EACH_THIS: { value: 'this.', hasVariables: 0},
    //EACH_ARRAY_INDEX: { value: '{{@index}}: {{this}}', hasVariables: 0},
    //EACH_OBJ_KEY: { value: '{{@key}}: {{this}}', hasVariables: 0},
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
    CREATE_NEW_TEMPLATE: 'create-new-template',
    AUTHENTICATE: 'jwt',
    CHECK_USER_AUTHENTICATED: 'check-user-authenticated',
    REMOVE_TOKEN: 'remove-token',
    GET_SEGMENT_WRITE_KEY: 'get-segment-write-key'
  };

  export const COMPONENTS = {
    IMAGE: { 
      type: "image",
      label: "Image", 
      fields: [{name: "imageUrl", type: "text", label: "Image URL", value: ""}], 
      styles: [
        {name: "altText", type: "text", label: "Alt Text", value: ""},
        {name: "paddingLeft", type: "number", label: "Padding Left", value: ""},
        {name: "paddingRight", type: "number", label: "Padding Right", value: ""},
        {name: "paddingTop", type: "number", label: "Padding Top", value: ""},
        {name: "paddingBottom", type: "number", label: "Padding Bottom", value: ""},
        {name: "isResponsive", type: "boolean", label: "Is Responsive?", selectValues: ['Yes', 'No'], value: ""},
        {name: "width", type: "number", label: "Width", value: ""},
        {name: "height", type: "number", label: "Height", value: ""},
        {name: "responsiveWidthPercentage", type: "number", label: "Responsive Width %", value: ""},
        {name: "alignment", type: "select", label: "Alignment", selectValues: ['center', 'left', 'right'], value: ""},
      ]
    },
    TEXT: { type: "text", label: "Text", fields: [{name: "text", type: "text", label: "Text", value: ""}],
    styles: [
      {name: "paddingLeft", type: "number", label: "Padding Left", value: ""},
      {name: "paddingRight", type: "number", label: "Padding Right", value: ""},
      {name: "paddingTop", type: "number", label: "Padding Top", value: ""},
      {name: "paddingBottom", type: "number", label: "Padding Bottom", value: ""},
      {name: "bgcolor", type: "text", label: "Background Color", value: ""},
      {name: "textColor", type: "text", label: "Text Color", value: ""},
      {name: "textHighlightColor", type: "text", label: "Text Highlight Color", value: ""},
      {name: "lineHeight", type: "number", label: "Line Height", value: ""},
      {name: "bold", type: "boolean", label: "Bold", selectValues: ['Yes', 'No'], value: ""},
      {name: "italics", type: "boolean", label: "Italics", selectValues: ['Yes', 'No'], value: ""},
      {name: "underline", type: "boolean", label: "Underline", selectValues: ['Yes', 'No'], value: ""},
      {name: "alignment", type: "select", label: "Alignment", selectValues: ['center', 'left', 'right'], value: ""},
      {name: "heading", type: "select", label: "Heading", selectValues: ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'], value: ""},
    ]
    },
    BUTTON: { 
      type: "button",
      label: "Button", 
      fields: [{name: "buttonText", type: "text", label: "Button Text", value: ""}, {name: "buttonURL", type: "text", label: "Button URL", value: ""}], 
      styles: [
        {name: "paddingLeft", type: "number", label: "Padding Left", value: ""},
        {name: "paddingRight", type: "number", label: "Padding Right", value: ""},
        {name: "paddingTop", type: "number", label: "Padding Top", value: ""},
        {name: "paddingBottom", type: "number", label: "Padding Bottom", value: ""},
        {name: "width", type: "number", label: "Width", value: ""},
        {name: "height", type: "number", label: "Height", value: ""},
        {name: "bgcolor", type: "text", label: "Background Color", value: ""},
        {name: "fontSize", type: "number", label: "Font Size", value: ""},
        {name: "fontWeight", type: "select", label: "Font Weight", selectValues: ['300', '400', '700', 'normal', 'bold'], value: ""},
        {name: "fontFamily", type: "select", label: "Font Family", selectValues: fontFamilies, value: ""},
        {name: "letterSpacing", type: "number", label: "Letter Spacing", value: ""},
        {name: "alignment", type: "select", label: "Alignment", selectValues: ['center', 'left', 'right'], value: ""},
        {name: "borderColor", type: "text", label: "Border Color", value: ""},
        {name: "borderWidth", type: "number", label: "Border Width", value: ""},
        {name: "borderRadius", type: "number", label: "Border Radius", value: ""},
        {name: "moduleBgColor", type: "text", label: "Module Color", value: ""},
        {name: "modulePaddingLeft", type: "number", label: "Module Padding Left", value: ""},
        {name: "modulePaddingRight", type: "number", label: "Module Padding Right", value: ""},
        {name: "modulePaddingTop", type: "number", label: "Module Padding Top", value: ""},
        {name: "modulePaddingBottom", type: "number", label: "Module Padding Bottom", value: ""},
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
    ]},
    SOCIAL: {
      type: "social",
      label: "Social",
      styles: [
        {name: "paddingLeft", type: "number", label: "Padding Left", value: ""},
        {name: "paddingRight", type: "number", label: "Padding Right", value: ""},
        {name: "paddingTop", type: "number", label: "Padding Top", value: ""},
        {name: "paddingBottom", type: "number", label: "Padding Bottom", value: ""},
        {name: "facebookURL", type: "text", label: "Facebook URL", value: ""},
        {name: "twitterURL", type: "text", label: "Twitter URL", value: ""},
        {name: "instagramURL", type: "text", label: "Instagram URL", value: ""},
        {name: "pinterestURL", type: "text", label: "Pinterest URL", value: ""},
        {name: "linkedinURL", type: "text", label: "LinkedIn URL", value: ""},
        {name: "bgcolor", type: "text", label: "Background Color", value: ""},
        {name: "iconColor", type: "text", label: "Icon Color", value: ""},
        {name: "iconSize", type: "number", label: "Icon Size", value: ""},
        {name: "borderRadius", type: "number", label: "Border Radius", value: ""},
        {name: "alignment", type: "select", label: "Alignment", selectValues: ['center', 'left', 'right'], value: ""},
      ]
    }
    
  }


  // Code Blocks
  export const CODE_BLOCKS = {
    TEXT: {
      generateSGCode: (fields, styles) => {
        let attributes = extractStylesAttributes(styles)
        const textFirsPart = `<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tbody>
        <tr>
          <td style="padding:${attributes.paddingTop || 0}px ${attributes.paddingRight|| 0}px ${attributes.paddingBottom|| 0}px ${attributes.paddingLeft|| 0}px; line-height:${attributes.lineHeight || 22}px text-align:inherit; background-color:${attributes.bgcolor};" height="100%" valign="top" bgcolor="${attributes.bgcolor}" role="module-content">`
        
        const textMainPart = constructTextStyles(fields[0].value, attributes)      
        const textClosingPart = `</td></tr></tbody></table>`
        
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
      generateSGCode: (fields, styles) => {
        let attributes = extractStylesAttributes(styles)
        const imageFirstPart = `<table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tbody>
        <tr>
          <td style="padding:${attributes.paddingTop || 0}px ${attributes.paddingRight|| 0}px ${attributes.paddingBottom|| 0}px ${attributes.paddingLeft|| 0}px;" align="${attributes.alignment}">`
        
        const imageMainPart = constructImageStyles(fields[0].value, attributes);
        const imageClosingPart = `</td>
        </tr>
      </tbody>
      </table>`

        return imageFirstPart + imageMainPart + imageClosingPart;         
      }
    },
    DIVIDER: {
      generateSGCode: (value, styles) => {
        let attributes = extractStylesAttributes(styles)
        return `<table class="module" role="module" data-type="divider" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tbody>
        <tr>
          <td style="padding:${attributes.paddingTop || 0}px ${attributes.paddingRight|| 0}px ${attributes.paddingBottom|| 0}px ${attributes.paddingLeft|| 0}px;" bgcolor="${attributes.bgcolor}" height="100%" valign="top">
            <table height="${attributes.height}px" width="100%" border="0" cellpadding="0" cellspacing="0" align="center" style="line-height:${attributes.height}px; font-size:${attributes.height}px;">
              <tr>
                <td bgcolor="${attributes.linecolor}" style="padding:0px 0px 10px 0px;"></td>
              </tr>
            </table>
          </td>
        </tr>
        </tbody>
      </table>`
      }
    },
    SPACER: {
      generateSGCode: (value, styles) => {
        let attributes = extractStylesAttributes(styles)
        return `<table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tbody>
        <tr>
          <td style="padding:0px 0px ${attributes.paddingTop}px 0px;" role="module-content" bgcolor="${attributes.bgcolor}">
          </td>
        </tr>
        </tbody>
      </table>`
      }
    },
    SOCIAL: {
      generateSGCode: (value, styles) => {
        let attributes = extractStylesAttributes(styles)
        return `<table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tbody>
          <tr>
            <td valign="top" style="padding:${attributes.paddingTop || 0}px ${attributes.paddingRight|| 0}px ${attributes.paddingBottom|| 0}px ${attributes.paddingLeft|| 0}px; font-size:6px; line-height:10px; background-color:${attributes.bgcolor};" align="${attributes.alignment}">
              <table align="${attributes.alignment}">
                <tbody>
                  <tr align="${attributes.alignment}">
                    <td style="padding: 0px 5px;display:inline-block;" class="social-icon-column">
                      <a class="has-url" role="social-icon-link" href="${attributes.facebookURL}" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:${attributes.iconColor}; height:${attributes.iconSize}px; width:${attributes.iconSize}px; border-radius:${attributes.borderRadius}px; -webkit-border-radius:${attributes.borderRadius}px; -moz-border-radius:${attributes.borderRadius}px;">
                        <img role="social-icon" alt="Facebook" title="Facebook" src="https://mc.sendgrid.com/assets/social/white/facebook.png" style="height:${attributes.iconSize}px; width:${attributes.iconSize}px;" height="${attributes.iconSize}" width="${attributes.iconSize}">
                      </a>
                    </td>
                    <td style="padding: 0px 5px;display:inline-block;" class="social-icon-column">
                      <a class="has-url" role="social-icon-link" href="${attributes.twitterURL}" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:${attributes.iconColor}; height:${attributes.iconSize}px; width:${attributes.iconSize}px; border-radius:${attributes.borderRadius}px; -webkit-border-radius:${attributes.borderRadius}px; -moz-border-radius:${attributes.borderRadius}px;">
                        <img role="social-icon" alt="Twitter" title="Twitter" src="https://mc.sendgrid.com/assets/social/white/twitter.png" style="height:${attributes.iconSize}px; width:${attributes.iconSize}px;" height="${attributes.iconSize}" width="${attributes.iconSize}">
                      </a>
                    </td>
                    <td style="padding: 0px 5px;display:inline-block;" class="social-icon-column">
                      <a class="has-url" role="social-icon-link" href="${attributes.instagramURL}" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:${attributes.iconColor}; height:${attributes.iconSize}px; width:${attributes.iconSize}px; border-radius:${attributes.borderRadius}px; -webkit-border-radius:${attributes.borderRadius}px; -moz-border-radius:${attributes.borderRadius}px;">
                        <img role="social-icon" alt="Instagram" title="Instagram" src="https://mc.sendgrid.com/assets/social/white/instagram.png" style="height:${attributes.iconSize}px; width:${attributes.iconSize}px;" height="${attributes.iconSize}" width="${attributes.iconSize}">
                      </a>
                    </td>
                    <td style="padding: 0px 5px;display:inline-block;" class="social-icon-column">
                      <a class="has-url" role="social-icon-link" href="${attributes.pinterestURL}" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:${attributes.iconColor}; height:${attributes.iconSize}px; width:${attributes.iconSize}px; border-radius:${attributes.borderRadius}px; -webkit-border-radius:${attributes.borderRadius}px; -moz-border-radius:${attributes.borderRadius}px;">
                        <img role="social-icon" alt="Pinterest" title="Pinterest" src="https://mc.sendgrid.com/assets/social/white/pinterest.png" style="height:${attributes.iconSize}px; width:${attributes.iconSize}px;" height="${attributes.iconSize}" width="${attributes.iconSize}">
                      </a>
                    </td>
                    <td style="padding: 0px 5px;display:inline-block;" class="social-icon-column">
                      <a class="has-url" role="social-icon-link" href="${attributes.linkedinURL}" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:${attributes.iconColor}; height:${attributes.iconSize}px; width:${attributes.iconSize}px; border-radius:${attributes.borderRadius}px; -webkit-border-radius:${attributes.borderRadius}px; -moz-border-radius:${attributes.borderRadius}px;">
                        <img role="social-icon" alt="LinkedIn" title="LinkedIn" src="https://mc.sendgrid.com/assets/social/white/linkedin.png" style="height:${attributes.iconSize}px; width:${attributes.iconSize}px;" height="${attributes.iconSize}" width="${attributes.iconSize}">
                      </a>
                    </td>
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
      generateSGCode: (fields, styles) => {
        let attributes = extractStylesAttributes(styles)
        return `  <table class="module" role="module" data-type="button" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tbody>
        <tr>
          <td align="${attributes.alignment || "center"}" bgcolor="${attributes.moduleBgColor}" class="outer-td" style="padding:${attributes.modulePaddingTop || 0}px ${attributes.modulePaddingRight|| 0}px ${attributes.modulePaddingBottom|| 0}px ${attributes.modulePaddingLeft|| 0}px; background-color:${attributes.moduleBgColor}">
            <table class="wrapper-mobile" border="0" cellpadding="0" cellspacing="0" style="text-align:center;">
              <tbody>
                <tr>
                  <td align="${attributes.alignment || "center"}" bgcolor="${attributes.bgcolor || "#333333"}" class="inner-td" style="border-radius:${attributes.borderRadius || 6}px;  text-align:${attributes.alignment || "center"}; background-color:inherit;font-size=${attributes.fontSize || 14}px">
                    <a href="${fields[1].value}" style="background-color:${attributes.bgcolor || "#333333"}; border:${attributes.borderWidth || 1}px; border-width:${attributes.borderWidth || 1 }px; border-radius:${attributes.borderRadius || 6}px; color:${attributes.fontColor || "#FFFFFF"}; display:inline-block; font-size:${attributes.fontSize || 14}px; font-weight:${attributes.fontWeight || "normal"}; font-family:${attributes.fontFamily}; letter-spacing:${attributes.letterSpacing || 0}px; line-height:${attributes.lineHeight}px; padding:${attributes.paddingTop || 12}px ${attributes.paddingRight|| 18}px ${attributes.paddingBottom|| 12}px ${attributes.paddingLeft|| 18}px; text-align:center; text-decoration:none; border-style:solid; width:${attributes.width}px;" target="_blank">${fields[0].value}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
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
