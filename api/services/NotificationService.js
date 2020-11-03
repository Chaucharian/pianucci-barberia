const fetch = require('node-fetch');

class NotificationService {
  constructor(firebase) {
    this.firebase = firebase;
  }

  sendMasiveNotification(users) {
    const notificationBody = {
      title: 'Pianucci Barberia',
      body: message,
      click_action: 'https://pianuccibarberia.com',
      default_sound: true,
      default_vibrate_timings: true,
      icon:
        'https://pianuccibarberia.com/assets/icons/android-chrome-192x192.png',
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
              Authorization:
                'key=AAAAQHgvRKo:APA91bF4_XkAk_XWc753vWpsj50SxP0tD60qJb5DXRtEFmngHB6oyr-7bX5f2DfX5LMU4gfAfJpeuqwztLCit-dxWOsY-b9sSD4DA9pCUmGbHHUywEYDk0KodPY1bDAdrcchq0uDPcu-',
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
  }
}

modulte.exports = NotificationManager;
