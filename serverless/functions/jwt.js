const jwt = require('jsonwebtoken');

exports.handler = (context, event, callback) => {

  console.log(JSON.stringify(event))

  const { username, password } = event;

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.appendHeader('Content-Type', 'application/json');

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
    { expiresIn: '1h' }
  )

  response.setCookie('sendgrid_blocks_jwt', token, ['HttpOnly',  'Max-Age=86400', 'Path=/', 'SameSite=strict'])
  response.setBody({success: true});
  console.log(response)
  return callback(null, response);
};