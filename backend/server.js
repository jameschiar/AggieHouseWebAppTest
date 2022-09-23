'use strict';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const express = require('express');
const client = require('twilio')(accountSid, authToken);
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('this is working');
});

app.get('/send-text', (req, res) => {
  //Welcome Message
  res.send('Hello to the Twilio Server');

  //_GET Variables
  const { recipient, textmessage } = req.query;

  //Send Text
  client.messages
    .create({
      body: textmessage,
      to: recipient, // Text this number
      from: twilioPhoneNumber, // From a valid Twilio number
    })
    .then(message => console.log(message.body))
    .catch(err => console.error(err));
});

module.exports = app;
