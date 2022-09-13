if (!process.env.CI) {
  require('dotenv-safe').load();
}

const cfg = {};

// HTTP Port
cfg.port = process.env.PORT || 5173;

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
  private_key: process.env['private_key'],
  client_email: process.env['client_email'],
  client_id: process.env['client_id'],
  auth_uri: process.env['auth_uri'],
  token_uri: process.env['token_uri'],
  auth_provider_x509_cert_url: process.env['auth_provider_x509_cert_url'],
  client_x509_cert_url: process.env['client_x509_cert_url'],
};

// Export configuration object
module.exports = cfg;
