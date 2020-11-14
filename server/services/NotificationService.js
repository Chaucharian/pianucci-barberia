const fetch = require('node-fetch');
const luxon = require('luxon');

class NotificationService {
  constructor(firebaseDB) {
    this.firebaseDB = firebaseDB;
    const NOTIFICATION_INTERVAL = 1000 * 60 * 60; // 60 min
    if (process.env.NODE_ENV === 'production') {
      setInterval(
        () => this.sendAutomaticNotification(),
        NOTIFICATION_INTERVAL,
      );
    }
  }

  sendAutomaticNotification() {
    const bookingRef = this.firebaseDB.ref('/bookings');
    const usersRef = this.firebaseDB.ref('/users');
    const argentinaTime = new Date(
      luxon.DateTime.local().setZone('America/Argentina/Buenos_Aires').ts,
    );
    // const argentinaTime = new Date(new Date().setHours(00));
    const newDay = String(argentinaTime.getHours()) === '00';
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
  }

  sendMassiveNotification(message) {
    return new Promise((resolve, reject) => {
      const usersRef = this.firebaseDB.ref('/users');

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
          if (notificationToken) {
            notifications.push([notificationToken]);
          }
        });

        // IF ANY USER HAS NOTIFICATION TOKEN, REJECT
        if (notifications.length === 0) {
          reject({ status: 'any notification sent' });
        }

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
              .then(() => {
                resolve({ status: 'notification dispatched!' });
              })
              .catch((error) =>
                reject({
                  status: `Error sending notification: ${error}`,
                }),
              ),
        );
      });
    });
  }

  sendNotificationToUser({ message, notificationToken }) {
    return new Promise((resolve, reject) => {
      const notificationBody = {
        title: process.env.CLIENT_NAME,
        body: message,
        click_action: process.env.CLIENT_URL,
        default_sound: true,
        default_vibrate_timings: true,
        icon: `${process.env.CLIENT_URL}/assets/icons/android-chrome-192x192.png`,
      };

      fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'post',
        body: JSON.stringify({
          data: { ...notificationBody },
          to: notificationToken,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${process.env.SERVER_MESSAGING_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve({ status: 'notification dispatched!', data });
        })
        .catch((error) =>
          reject({
            status: `Error sending notification: ${error}`,
          }),
        );
    });
  }
}

module.exports = NotificationService;
