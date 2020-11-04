const express = require('express');
const fetch = require('node-fetch');
const luxon = require('luxon');
const {
  isSameDay,
  isSameHour,
  isSameMonth,
  isToday,
  format,
  isSameWeek,
  isSameYear,
  getDay,
} = require('date-fns');
const path = require('path');
const app = express();
// const app = require("https-localhost")() // DEV ONLY
const cors = require('cors');
const admin = require('firebase-admin');
const api = require('./api');
// const User = require('./services/UserService');
const router = express.Router();
const rootPath = path.join(__dirname, '../');
const distPath = path.join(__dirname, '../') + 'dist/';
const port = process.env.PORT || 8080;
const env = require('dotenv').config({
  path: `${rootPath}/.env.${process.env.NODE_ENV}`,
});

if (env.error) {
  throw new Error('No .env file loaded');
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
  }),
  databaseURL: process.env.DATABASE_URL,
});
const firebaseDB = admin.database();
// CREATE MODULES TO SERVICES
// const userService = new User(firebaseDB)
const NOTIFICATION_INTERVAL = 1000 * 60 * 60; // 10 min
app.use(express.static(rootPath + 'dist'));
app.use('/assets', express.static(rootPath + 'src/assets'));
app.use(express.static(rootPath));
app.use(express.static(rootPath + 'src/'));
app.use(cors());
app.use(express.json());
app.use('/', router);

router.use(function (req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.listen(port, '0.0.0.0', () =>
  console.log(`Server running at ${port} port!`),
);
// redirect to ui router
app.get('/', (req, res) => res.sendFile(distPath + 'index.html'));
app.get('/login', (req, res) => res.sendFile(distPath + 'index.html'));
app.get('/admin', (req, res) => res.sendFile(distPath + 'index.html'));
app.use('/api', api);

const notificationDispatcher = () => {
  const bookingRef = firebaseDB.ref('/bookings');
  const usersRef = firebaseDB.ref('/users');
  const argentinaTime = new Date(
    luxon.DateTime.local().setZone('America/Argentina/Buenos_Aires').ts,
  );
  // const argentinaTime = new Date(new Date().setHours(00));
  const newDay = argentinaTime.getHours() === 00;
  console.log(' CURRENT TIME ', argentinaTime.getHours());

  bookingRef.once('value', async (bookingSnapshot) => {
    const bookingsRaw = [];
    bookingSnapshot.forEach((booking) => {
      bookingsRaw.push({ ...booking.val(), id: booking.key });
    });
    // filter bookings for today
    const reservedBookings = bookingsRaw
      .map((bookingReserved) => {
        const filterCondition = newDay
          ? isSameDay(bookingReserved.date, argentinaTime) &&
            bookingReserved.status === 'reserved'
          : isSameDay(bookingReserved.date, argentinaTime) &&
            isSameHour(
              bookingReserved.date,
              new Date(argentinaTime).setHours(
                new Date(argentinaTime).getHours() + 1,
              ),
            ) &&
            bookingReserved.status === 'reserved';
        if (filterCondition) {
          return bookingReserved;
        }
      })
      .filter((bookingReserved) => bookingReserved !== undefined);

    // set up notifications to send
    usersRef.once('value', (usersSnapshot) => {
      let notifications = [];
      usersSnapshot.forEach((user) => {
        const { id, notificationToken } = user.val();
        reservedBookings.map((booking) => {
          if (booking.clientId === id) {
            const notificationBody = {
              title: process.env.CLIENT_NAME,
              body: 'Tienes un turno reservado dentro de una hora',
              click_action: process.env.CLIENT_URL,
              default_sound: true,
              default_vibrate_timings: true,
              icon: `${process.env.CLIENT_URL}/assets/icons/android-chrome-192x192.png`,
            };
            if (newDay) {
              notificationBody.body = `Hoy tienes un turno reservado para las ${new Date(
                booking.date,
              ).getHours()}:00hs`;
            }
            notifications.push([notificationBody, notificationToken]);
          }
        });
      });
      // SEND NOTIFICATION TO FIREBASE
      notifications.map(
        ([notificationBody, userToken]) =>
          userToken &&
          fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'post',
            body: JSON.stringify({
              data: { ...notificationBody },
              to: userToken,
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `key=${process.env.SERVER_MESSAGING_KEY}`,
            },
          })
            .then((response) => response.json())
            .then((response) =>
              console.log(' notification dispatched ', response),
            ),
      );
    });
  });
};

process.env.NODE_ENV === 'production' &&
  setInterval(() => notificationDispatcher(), NOTIFICATION_INTERVAL);

app.post('/api/sendNotification', (request, response) => {
  const { message } = request.body;
  const usersRef = firebaseDB.ref('/users');

  const notificationBody = {
    title: process.env.CLIENT_NAME,
    body: message,
    click_action: process.env.CLIENT_URL,
    default_sound: true,
    default_vibrate_timings: true,
    icon: `${process.env.CLIENT_URL}/assets/icons/android-chrome-192x192.png`,
  };

  usersRef.once('value', (usersSnapshot) => {
    let notifications = [];
    usersSnapshot.forEach((user) => {
      const { notificationToken } = user.val();
      notifications.push([notificationToken]);
    });

    // SEND NOTIFICATION TO FIREBASE
    notifications.map(
      ([userToken]) =>
        userToken &&
        fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'post',
          body: JSON.stringify({
            data: { ...notificationBody },
            to: userToken,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `key=${process.env.SERVER_MESSAGING_KEY}`,
          },
        })
          .then((response) => response.json())
          .then(() => response.json({ status: 'notifications dispatched!' }))
          .catch((error) =>
            response.status(500).send({
              message: `Error dispatching notifications ${error}`,
            }),
          ),
    );
  });
});
