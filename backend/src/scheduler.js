'use strict';

const CronJob = require('cron').CronJob;
const notifications = require('./notifications');
const moment = require('moment');

function start() {
  new CronJob(
    '*/1 * * * *', // run every 5 minutes
    () => {
      const currentTime = new Date();
      console.log(`Running Shift Check ${moment(currentTime).format()}`);
      notifications.checkAndSendNecessaryNotifications(currentTime);
    },
    null,
    true
  );
}

module.exports = {
  start,
};
