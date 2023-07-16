exports.handler = async function(context, event, callback) {
    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'POST');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.appendHeader('Content-Type', 'application/json');
    response.setBody({key: context.SEGMENT_WRITE_KEY || null})
    return callback(null, response)
}