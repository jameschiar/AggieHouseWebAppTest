import React from 'react';
const twilio = require('twilio');
const client = require('twilio')(
  'ACd7bc34ffbb289278893eb5b5804330a1',
  '21f4e6a8b3ed0681f86aaeeea7757996'
);

client.messages 
      .create({         
         to: '+19166477953' ,
         from: '+19783965499',
         body: 'you have a shift today'
       }) 
      .done();


{/*https://www.twilio.com/docs/sms/quickstart/node*/}