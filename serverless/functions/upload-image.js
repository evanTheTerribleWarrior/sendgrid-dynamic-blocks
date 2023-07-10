const FormData = require('form-data');
const fs = require('fs');
var path = require('path');
var tmp_dir = require('os').tmpdir();
const axios = require('axios')

exports.handler = async function(context, event, callback) {

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'POST');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  const {imgBase64, imgFileName} = event;

  const timeStamp = Date.now()

  const imageBuffer = Buffer.from(imgBase64, 'base64');
  const savedFileName = imgFileName + "_" + timeStamp;
  const savedPath = path.join(tmp_dir, savedFileName)
  console.log(savedPath)
  
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
          console.log(JSON.stringify(result.data))
          response.setBody(JSON.stringify({url: result.data.url }))
          return callback(null, response)
      }
      catch (error) {
        console.error(error);
        return callback(error)
      }

  });
  
};