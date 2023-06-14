const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { askGPT } = require('./openAI');
const { MessagingResponse } = require('twilio').twiml;
dotenv.config()

const corsOption = {
  origin: '*',
};
const app = express();
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.port || 8080

app.post('/sms', async (req, res) => {
  try{
      const twiml = new MessagingResponse();
     if (req.body.Body) {
        const query = req.body.Body;
        const gptResponse = await askGPT(query);
        twiml.message(gptResponse.content);
      } else {
        twiml.message(
          'No Body param match, Twilio sends this in the request to your server.'
        );
      }
      res.type('text/xml').send(twiml.toString());
      // res.send(gptResponse.content)
    } catch(error){
    res.send('ERROR: '+ error);
  }
  });
  
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });