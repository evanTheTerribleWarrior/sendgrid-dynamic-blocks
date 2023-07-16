/* Creates a new Dynamic Template. It is used when the user imports a .zip and has the option
to create a new template as a result of the final HTML composition*/

const client = require('@sendgrid/client');

exports.handler = async function(context, event, callback) {
  
client.setApiKey(context.SG_API_KEY);

const checkAuthPath = Runtime.getFunctions()['check-auth'].path;
const checkAuth = require(checkAuthPath)
let check = checkAuth.checkAuth(event.request.headers.authorization, context.JWT_SECRET);
if(!check.allowed)return callback(null,check.response);
const response = check.response

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
        await client.request(version_request)
        response.setBody({success: true});
        return callback(null, response)
    }
  }
  catch (error) {
    console.error(error.response.body);
    return callback(error)
  }
  
};