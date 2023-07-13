const jwt = require('jsonwebtoken');

exports.handler = (context, event, callback) => {

  console.log(JSON.stringify(event))

  const { username, password } = event;

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'POST');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (username !== context.USERNAME || password !== context.PASSWORD) {
    response
      .setBody({success: false, message: 'Invalid Credentials'})
      .setStatusCode(401);

    return callback(null, response);
  }

  const token = jwt.sign(
    {
      sub: 'SendgridDynamicBlocksApp',
      iss: 'twil.io',
      org: 'twilio',
      perms: ['read'],
    },
    context.JWT_SECRET,
    { expiresIn: '1d' }
  )

  console.log(token)

  response.setBody({success: true, token: token});

  return callback(null, response);
};