const client = require('@sendgrid/client');

exports.handler = async function(context, event, callback) {
  client.setApiKey(context.SG_API_KEY);

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'GET, POST');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  const queryParams = {
    "generations": "dynamic",
    "page_size": 10,
    "page_token": event.page_token ? event.page_token : null
  };

  const request = {
    url: `/v3/templates`,
    method: 'GET',
    qs: queryParams
  }

  try{
    const results_array = await client.request(request)
    const templates_array = results_array[0].body.result.map(obj => ({ id: obj.id, name: obj.name, thumbnail_url: obj.versions[0].thumbnail_url, versions_array: obj.versions }));
    
    const res = {
      "templates_array" : templates_array
    }

    if (results_array[0].body._metadata.hasOwnProperty('next')){
      const params = new URLSearchParams(results_array[0].body._metadata.next);
      let page_token = "";
      for (const [key,value] of params) {
        if (key.includes("page_token")) page_token = value;
      }
      res.page_token = page_token;
    }

    response.setBody(JSON.stringify(res) );
    return callback(null, response)
  }
  catch (error) {
    console.error(error);
    return callback(error)
  }
  
  
};