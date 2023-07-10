const client = require('@sendgrid/client');

exports.handler = async function(context, event, callback) {
  
client.setApiKey(context.SG_API_KEY);

const response = new Twilio.Response();
response.appendHeader('Access-Control-Allow-Origin', '*');
response.appendHeader('Access-Control-Allow-Methods', 'POST');
response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

const {name, html} = event.data;

const data = {
    "name": name,
    "generation": "dynamic"
  };
  
const request = {
    url: `/v3/templates`,
    method: 'POST',
    body: data
}

try{
    const result = await client.request(request)
    console.log(JSON.stringify(result[0].body))
    const template_id = result[0].body.id;
    if(template_id){
        const version_data = {
            "template_id": template_id,
            "active": 1,
            "name": name,
            "html_content": html,
            "subject": name,
            "editor": "code",
        };
        
        const version_request = {
            url: `/v3/templates/${template_id}/versions`,
            method: 'POST',
            body: version_data
        }
        const version_result = await client.request(version_request)
        console.log(JSON.stringify(version_result))
        response.setBody(JSON.stringify({success: true}));
        return callback(null, response)
    }
  }
  catch (error) {
    console.error(error.response.body);
    return callback(error)
  }
  
};