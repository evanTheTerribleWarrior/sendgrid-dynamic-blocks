const client = require('@sendgrid/client');

exports.handler = async function(context, event, callback) {
  
client.setApiKey(context.SG_API_KEY);

const response = new Twilio.Response();
response.appendHeader('Access-Control-Allow-Origin', '*');
response.appendHeader('Access-Control-Allow-Methods', 'POST');
response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

console.log(JSON.stringify(event.template_data))
console.log(event.create_version_checked)

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
    console.log(JSON.stringify(result))
    response.setBody(JSON.stringify(result) );
    return callback(null, response)
  }
  catch (error) {
    console.error(error.response.body);
    return callback(error)
  }
  
};