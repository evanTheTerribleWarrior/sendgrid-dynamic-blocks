import { API_URLS, CODE_BLOCKS, COMPONENTS, HANDLEBARS } from "./variables";

// Get all the templates from a specific account.
// It points to a Twilio Function/server endpoint that will use the SG Key to pull the templates
// SG Key is not used here as it would be a security gap
export async function fetchAllTemplates () {
    try {
      const url = API_URLS.PROTOCOL + API_URLS.BASE_URL + API_URLS.GET_ALL_TEMPLATES    
      const response = await fetch(url, {
          method: 'POST'
      });
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
        throw new Error(`Failed to fetch templates: ${error}`);
    }
};

// Get a template from a specific account.
// It points to a Twilio Function/server endpoint that will use the SG Key to pull the template
// SG Key is not used here as it would be a security gap
export async function fetchSingleTemplate (template_id) {
    try {
      const url = API_URLS.PROTOCOL + API_URLS.BASE_URL + API_URLS.GET_SINGLE_TEMPLATE    
      const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({"template_id": template_id}),
          headers: {
            'Content-Type': 'application/json'
          }
      });
      const data = await response.json();
      return data[0].body;
    } catch (error) {
        throw new Error(`Failed to fetch single template: ${error}`);
    }
};

export async function fetchSingleTemplateVersion (template_version_obj) {

  try {
    const url = API_URLS.PROTOCOL + API_URLS.BASE_URL + API_URLS.GET_SINGLE_TEMPLATE_VERSION    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({"template_version_obj": template_version_obj}),
        headers: {
          'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data[0].body;
  } catch (error) {
      throw new Error(`Failed to fetch single template: ${error}`);
  }
};

// Update tempate from a specific account.
// It points to a Twilio Function/server endpoint that will use the SG Key to update the template
// SG Key is not used here as it would be a security gap

// It passes in the template data along with the updated HTML we want to apply
// The HTML is in SG Editor format (i.e. using <table> etc as defined by SG)
export async function updateSingleTemplate (template_data, mergedTemplateHtml) {
    try {
      const url = API_URLS.PROTOCOL + API_URLS.BASE_URL + API_URLS.UPDATE_TEMPLATE    
      const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
              "template_data": template_data,
              "mergedTemplateHtml": mergedTemplateHtml
            }),
          headers: {
            'Content-Type': 'application/json'
          }
      });
      const data = await response.json();
      return data;
    } catch (error) {
        throw new Error(`Failed to update template: ${error}`);
    }
};

export async function getFolderStructure () {
  try {
    const url = API_URLS.PROTOCOL + API_URLS.BASE_URL + API_URLS.GET_FOLDER_STRUCTURE    
    const response = await fetch(url, {
        method: 'POST'
    });
    const data = await response.json();
    return data;
  } catch (error) {
      throw new Error(`Failed to update template: ${error}`);
  }
};

// Helper function to get a specific handlebar object
// It is used when creating the dynamic block mainly
export const getHandlebarsObject = (condition) => {
    for (let key in HANDLEBARS){
        const found = HANDLEBARS[key].value === condition ? true: false;
        if (found) return HANDLEBARS[key]
    }
};

// Helper function to get a specific handlebar object's close version (e.g. equals --> how to close it)
// It is used when creating the dynamic block mainly
export const getCloseHandlebar = (condition) => {
  let closeConditionValue = "";
  Object.keys(HANDLEBARS).forEach((key) => {
    if (HANDLEBARS[key].value === condition) {
      const closeConditionKey = `${key}_CLOSE`;
      closeConditionValue = HANDLEBARS[closeConditionKey].value;    
    }
  });
  return closeConditionValue;
}

// Helper function to get a specific object from the various Components
// It is used to build the dynamic block mainly
export const getComponentsObject = (condition) => {
  for (let key in COMPONENTS){
      const found = COMPONENTS[key].type === condition ? true: false;
      if (found) return COMPONENTS[key]
  }
};

// Helper function to get a specific code block object in the SG-specific format
// It is used to build the dynamic block mainly
export const getCodeBlockObject = (type,value) => {
  for (const [key] of Object.entries(CODE_BLOCKS)) {
      const found = key === type.toUpperCase() ? true: false;
      if (found) return CODE_BLOCKS[key].generateSGCode(value)
  }
};