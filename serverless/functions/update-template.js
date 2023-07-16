const client = require('@sendgrid/client');

exports.handler = async function(context, event, callback) {
  
client.setApiKey(context.SG_API_KEY);

const checkAuthPath = Runtime.getFunctions()['check-auth'].path;
const checkAuth = require(checkAuthPath)
let check = checkAuth.checkAuth(event.request.cookies, context.JWT_SECRET);
if(!check.allowed)return callback(null,check.response);
const response = check.response

const template_id = event.template_data.template_id;
const version_id = event.template_data.version_id;
const data = {
  "template_id": template_id,
  "name": event.template_data.name,
  "html_content": event.template_data.html_content,
  "generate_plain_content": false,
  "subject": event.template_data.subject
};

if(event.create_version_checked) data.editor = "design"

const url = event.create_version_checked ? `/v3/templates/${template_id}/versions` : `/v3/templates/${template_id}/versions/${version_id}`
const method = event.create_version_checked ? 'POST': 'PATCH'

const request = {
  url: url,
  method: method,
  body: data
}

try{
    const result = await client.request(request)
    response.setBody(result);
    return callback(null, response)
  }
  catch (error) {
    console.error(error.response.body);
    return callback(error)
  }
  
};