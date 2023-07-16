/* This function gets a local image the user wants to upload, in base64.
Then stores it in the /tmp directory under Functions so we can retrieve it as a file.
Right after it calls the Sendgrid API and sends the image/stream data to upload the image */

const FormData = require('form-data');
const fs = require('fs');
var path = require('path');
var tmp_dir = require('os').tmpdir();
const axios = require('axios')

exports.handler = async function(context, event, callback) {

  const checkAuthPath = Runtime.getFunctions()['check-auth'].path;
  const checkAuth = require(checkAuthPath)
  let check = checkAuth.checkAuth(event.request.headers.authorization, context.JWT_SECRET);
  if(!check.allowed)return callback(null,check.response);
  const response = check.response

  const {imgBase64, imgFileName} = event;

  const timeStamp = Date.now()

  const imageBuffer = Buffer.from(imgBase64, 'base64');
  const savedFileName = imgFileName + "_" + timeStamp;
  const savedPath = path.join(tmp_dir, savedFileName)
  
  fs.writeFile(savedPath, imageBuffer, async function(err) {
      if (err) return callback(err);

      const formData = new FormData(); 
      const fileStreamData = fs.createReadStream(savedPath)
      formData.append('upload', fileStreamData);

      let config = {
        method: 'post',
        url: 'https://api.sendgrid.com/v3/images',
        headers: { 
          'Authorization': `Bearer ${context.SG_API_KEY}`, 
          ...formData.getHeaders()
        },
        data : formData
      };

      try{
          const result = await axios.request(config)
          response.setBody({url: result.data.url })
          return callback(null, response)
      }
      catch (error) {
        console.error(error);
        return callback(error)
      }

  });
  
};