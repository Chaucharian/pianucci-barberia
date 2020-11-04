const { isToday, isTomorrow, format, getHours } = require('date-fns');

class BookingService {
  constructor(firebaseDB) {
    this.firebaseDB = firebaseDB;
  }

  getNotificationAdminPayload(bookingAction, bookingDate) {
    return new Promise((resolve, reject) => {
      const usersRef = this.firebaseDB.ref('/users');

      // SEND NOTIFICATION TO ADMIN
      usersRef.once('value', (usersSnapshot) => {
        usersSnapshot.forEach((user) => {
          const { isAdmin, notificationToken } = user.val();
          let notificationMessage = '';
          if (isAdmin) {
            const description =
              bookingAction === 'create' ? 'Reservaron' : 'Se liberó';

            if (isToday(bookingDate)) {
              notificationMessage = `${description} un turno para hoy a las ${getHours(
                bookingDate,
              )} horas`;
            } else if (isTomorrow(bookingDate)) {
              notificationMessage = `${description} un turno para mañana a las ${getHours(
                bookingDate,
              )} horas`;
            } else {
              notificationMessage = `${description} un turno para el ${format(
                bookingDate,
                'dd/MM',
              )} a las ${getHours(bookingDate)} horas`;
            }
            resolve({ message: notificationMessage, notificationToken });
          }
        });
      });
    });
  }
}

module.exports = BookingService;
