const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;
dotenv.config()

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.port || 8080

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
  
    if (req.body.Body == 'hello') {
      twiml.message('Hi!');
    } else if (req.body.Body == 'bye') {
      twiml.message('Goodbye');
    } else {
      twiml.message(
        'No Body param match, Twilio sends this in the request to your server.'
      );
    }
  
    res.type('text/xml').send(twiml.toString());
  });
  
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });