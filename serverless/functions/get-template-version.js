const client = require('@sendgrid/client');

exports.handler = async function(context, event, callback) {
  client.setApiKey(context.SG_API_KEY);

  const {template_id, version_id} = event.template_version_obj;

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'POST');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log(version_id)

  console.log(JSON.stringify(event))

  const request = {
    url: `/v3/templates/${template_id}/versions/${version_id}`,
    method: 'GET'
  }

  try{
    const template = await client.request(request)
    response.setBody(JSON.stringify(template[0].body) );
    return callback(null, response)
  }
  catch (error) {
    console.error(error);
    return callback(error)
  }
  
  
};