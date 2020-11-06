const { isToday, isTomorrow, format, getHours } = require('date-fns');

class BookingService {
  constructor(firebaseDB) {
    this.firebaseDB = firebaseDB;
  }

  calculateFreeBooking(userId) {
    return new Promise((resolve, reject) => {
      const bookingsRef = this.firebaseDB.ref('/bookings');
      const FREE_BOOKING_AMOUNT = 4;
      const responsePayload = {
        description: '¡4 turnos más para un turno gratis!',
        isFree: false,
      };

      bookingsRef.once('value', (bookingRef) => {
        const bookings = [];
        bookingRef.forEach((booking) => {
          bookings.push({ ...booking.val(), id: booking.key });
        });
        const paidedBookings = bookings.filter(
          (booking) => booking.clientId === userId && booking.status === 'paid',
        );
        if (paidedBookings.length === 0) {
          return resolve(responsePayload);
        }
        // order free bookings
        const freeBookings = paidedBookings.filter((booking) => booking.isFree);
        freeBookings.sort((a, b) => a.date - b.date);

        const lastFreeBooking = freeBookings[freeBookings.length - 1];

        // first 4 bookings reserved
        if (!lastFreeBooking) {
          const freeBookingRemaingingSpace =
            FREE_BOOKING_AMOUNT - paidedBookings.length;
          if (freeBookingRemaingingSpace === 0) {
            responsePayload.description = '¡Este turno es gratis!';
            responsePayload.isFree = true;
            return resolve(responsePayload);
          }
          responsePayload.description = `¡${freeBookingRemaingingSpace} turnos más para un turno gratis!`;
          responsePayload.isFree = false;
          return resolve(responsePayload);
        }

        // find last free booking
        let lastIndex = paidedBookings.findIndex(
          ({ id }) => id === lastFreeBooking.id,
        );

        const freeBookingRemaingingSpace =
          paidedBookings.length - (lastIndex + 1);
        const amountLeft = FREE_BOOKING_AMOUNT - freeBookingRemaingingSpace;

        if (amountLeft > FREE_BOOKING_AMOUNT || amountLeft === 0) {
          responsePayload.description = 'Este turno es gratis';
          responsePayload.isFree = true;
          return resolve(responsePayload);
        } else {
          responsePayload.description = `¡${amountLeft} turnos más para un turno gratis!`;
          responsePayload.isFree = false;
          return resolve(responsePayload);
        }
      });
    });
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
