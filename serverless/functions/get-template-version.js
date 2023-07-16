const client = require('@sendgrid/client');

exports.handler = async function(context, event, callback) {
  client.setApiKey(context.SG_API_KEY);

  const {template_id, version_id} = event.template_version_obj;

  const checkAuthPath = Runtime.getFunctions()['check-auth'].path;
  const checkAuth = require(checkAuthPath)
  let check = checkAuth.checkAuth(event.request.cookies, context.JWT_SECRET);
  if(!check.allowed)return callback(null,check.response);
  const response = check.response

  const request = {
    url: `/v3/templates/${template_id}/versions/${version_id}`,
    method: 'GET'
  }

  try{
    const template = await client.request(request)
    response.setBody(template[0].body);
    return callback(null, response)
  }
  catch (error) {
    console.error(error);
    return callback(error)
  }
  
  
};