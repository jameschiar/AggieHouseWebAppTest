const moment = require('moment');
const twilio = require('twilio');
const db = require('./db');
const cfg = require('./config');

const client = twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);

// fetch events from firebase
const getEvents = async () => {
  let events = [];
  const snapshot = await db.collection('events').get();
  snapshot.forEach(event => {
    events.push(event);
  });

  return events;
};

function requiresNotification(appointment, currentTime) {
  // get date from database
  let date = new Date(appointment.start.toDate());

  // convert to local date
  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();

  // convert current time to local current time
  const currentLocalTime = new Date(
    currentTime.getTime() - currentTime.getTimezoneOffset() * 60000
  ).toISOString();

  return (
    Math.round(
      moment
        .duration(
          moment(localDate)
            .tz(appointment.timeZone || 'America/Los_Angeles')
            .utc()
            .diff(moment(currentLocalTime).utc())
        )
        .asMinutes()
    ) === parseInt(appointment.notification || 30)
  );
}

async function sendNotification(appointment) {
  appointment.shiftVolunteers.forEach(volunteer => {
    if (volunteer.phoneNumber) {
      // Create options to send the message
      const options = {
        to: volunteer.phoneNumber,
        from: cfg.twilioPhoneNumber,
        // turn shift into appointment.type
        body: `Hi ${
          volunteer.displayName
        }. Just a reminder that you have a shift at ${appointment.start
          .toDate()
          .toLocaleString()}.`,
      };

      // Send the message
      try {
        client.messages.create(options);
        // Log the last few digits of a phone number
        let masked = volunteer.phoneNumber.substr(
          0,
          volunteer?.phoneNumber?.length - 5
        );
        masked += '*****';
        console.log(`Message sent to ${masked}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
}

// checks db for shifts
async function checkAndSendNecessaryNotifications(currentTime) {
  const appointments = await getEvents();

  const appointmentsRequiringNotification = appointments.filter(appointment => {
    return requiresNotification(appointment.data(), currentTime);
  });

  console.log(
    `Sending ${appointmentsRequiringNotification.length} notifications`
  );

  appointmentsRequiringNotification.forEach(appointment =>
    sendNotification(appointment.data())
  );
}

module.exports = {
  checkAndSendNecessaryNotifications,
};
