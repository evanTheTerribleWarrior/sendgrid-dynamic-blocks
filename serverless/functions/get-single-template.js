const client = require('@sendgrid/client');

exports.handler = async function(context, event, callback) {
  client.setApiKey(context.SG_API_KEY);

  const checkAuthPath = Runtime.getFunctions()['check-auth'].path;
  const checkAuth = require(checkAuthPath)
  let check = checkAuth.checkAuth(event.request.headers.authorization, context.JWT_SECRET);
  if(!check.allowed)return callback(null,check.response);
  const response = check.response

  const request = {
    url: `/v3/templates/${event.template_id}`,
    method: 'GET'
  }

  try{
    const template = await client.request(request)
    console.log(template)
    response.setBody(template);
    return callback(null, response)
  }
  catch (error) {
    console.error(error);
    return callback(error)
  }
  
  
};