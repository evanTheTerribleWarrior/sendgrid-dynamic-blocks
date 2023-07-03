const client = require('@sendgrid/client');

exports.handler = async function(context, event, callback) {
  client.setApiKey(context.SG_API_KEY);

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'POST');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log(JSON.stringify(event))

  const request = {
    url: `/v3/templates/${event.template_id}`,
    method: 'GET'
  }

  try{
    const template = await client.request(request)
    console.log(template)
    response.setBody(JSON.stringify(template) );
    return callback(null, response)
  }
  catch (error) {
    console.error(error);
    return callback(error)
  }
  
  
};