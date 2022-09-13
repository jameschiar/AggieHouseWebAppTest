const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const cfg = require('./config.js');
const serviceAccount = cfg.firebaseConfig;

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = db;
