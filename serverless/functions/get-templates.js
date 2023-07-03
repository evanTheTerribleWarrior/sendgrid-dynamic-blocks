const client = require('@sendgrid/client');

exports.handler = async function(context, event, callback) {
  client.setApiKey(context.SG_API_KEY);

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'GET, POST');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  const queryParams = {
    "generations": "dynamic",
    "page_size": 18
  };

  const request = {
    url: `/v3/templates`,
    method: 'GET',
    qs: queryParams
  }

  try{
    const results_array = await client.request(request)
    const templates_array = results_array[0].body.result.map(obj => ({ id: obj.id, name: obj.name, thumbnail_url: obj.versions[0].thumbnail_url, versions_array: obj.versions }));
    response.setBody(JSON.stringify(templates_array) );
    return callback(null, response)
  }
  catch (error) {
    console.error(error);
    return callback(error)
  }
  
  
};