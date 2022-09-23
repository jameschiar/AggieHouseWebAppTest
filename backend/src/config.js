if (!process.env.CI) {
  require('dotenv-safe').load();
}

const cfg = {};

// HTTP Port
cfg.port = process.env.PORT || 5171;

// Twilio account SID and auth token
const mySecret1 = process.env['TWILIO_ACCOUNT_SID'];
const mySecret2 = process.env['TWILIO_AUTH_TOKEN'];

cfg.twilioAccountSid = mySecret1;
cfg.twilioAuthToken = mySecret2;

// Twilio number
const mySecret = process.env['TWILIO_PHONE_NUMBER'];
cfg.twilioPhoneNumber = mySecret;

cfg.firebaseConfig = {
  type: process.env['type'],
  project_id: process.env['project_id'],
  private_key_id: process.env['private_key_id'],
  private_key: process.env['private_key'].replace(/\\n/g, '\n'),
  client_email: process.env['client_email'],
  client_id: process.env['client_id'],
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8j0lv%40aggie-house.iam.gserviceaccount.com',
};

// Export configuration object
module.exports = cfg;
