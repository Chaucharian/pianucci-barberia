const path = require('path');
const rootPath = path.join(__dirname, '../');
const env = require('dotenv').config({
  path: `${rootPath}/.env.${process.env.NODE_ENV}`,
});

if (env.error) {
  throw new Error('No .env file loaded');
}
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const {
  isSameDay,
  isSameMonth,
  isToday,
  isSameWeek,
  isSameYear,
} = require('date-fns');
const NotificationService = require('./services/NotificationService');
const BookingService = require('./services/BookingService');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
  }),
  databaseURL: process.env.DATABASE_URL,
});
const firebaseDB = admin.database();
const notificationService = new NotificationService(firebaseDB);
const bookingService = new BookingService(firebaseDB);

// GET

router.get('/getDaysOff', (request, response) => {
  const daysOffRef = firebaseDB.ref('/daysOff');
  const days = [];

  daysOffRef.once('value', (daysOff) => {
    daysOff.forEach((dayOff) => {
      days.push(dayOff.val());
    });
    response.json({ status: 'days off!', days });
  });
});

router.get('/getImageGalery', (request, response) => {
  const imageGaleryRef = firebaseDB.ref('/imageGalery');
  const images = [];

  imageGaleryRef.once('value', (imageGalery) => {
    imageGalery.forEach((image) => {
      images.push(image.val());
    });
    response.json({ status: 'images for galery!', images });
  });
});

router.get('/checkEmailExists', async (request, response) => {
  const { email } = request.query;
  const usersRef = firebaseDB.ref('/users');

  await usersRef.once('value', (snapshot) => {
    snapshot.forEach((user) => {
      if (user.val().email === email) {
        return response.json({
          success: true,
          message: '¡Nueva contraseña enviada!',
        });
      }
    });
  });

  response
    .status(404)
    .json({ success: false, message: 'El usuario no existe' });
});

// POST

router.post('/getBusinessStats', (request, response) => {
  const { date: requestDate } = request.body;
  const billingRef = firebaseDB.ref('/billing');
  let stats = {
    bookings: { today: 0, currentMonth: 0 },
    billing: { today: 0, currentMonth: 0 },
  };
  const billingRaw = [];

  billingRef.once('value', (billingSnapshot) => {
    billingSnapshot.forEach((billing) => {
      billingRaw.push(billing.val());
    });

    const todayBilling = billingRaw.filter(({ date }) =>
      isToday(date, new Date()),
    );
    const currentWeekBilling = billingRaw.filter(({ date }) =>
      isSameWeek(date, new Date()),
    );
    const currentMonthBilling = billingRaw.filter(({ date }) =>
      isSameMonth(date, new Date()),
    );
    const currentYearBilling = billingRaw.filter(({ date }) =>
      isSameYear(date, new Date()),
    );

    if (requestDate) {
      const requestDateBilling = billingRaw.filter(({ date }) =>
        isSameDay(requestDate, date),
      );
      const requestDateBookingsStats = requestDateBilling.reduce(
        (counter, billing) => {
          // if no amount, then take it as lost booking
          if (Number(billing.amount) !== 0) {
            return counter + 1;
          } else {
            return counter;
          }
          return counter + 1;
        },
        0,
      );
      const requestDateBillingStats = requestDateBilling.reduce(
        (counter, billing) => counter + Number(billing.amount),
        0,
      );

      stats = {
        bookings: {
          selectedDate: requestDateBookingsStats,
        },
        billing: {
          selectedDate: requestDateBillingStats,
        },
      };
    } else {
      const todayBookingsStats = todayBilling.reduce((counter, billing) => {
        // if no amount, then take it as lost booking
        if (Number(billing.amount) !== 0) {
          return counter + 1;
        } else {
          return counter;
        }
      }, 0);
      const weekBookingStats = currentWeekBilling.reduce((counter, billing) => {
        if (Number(billing.amount) !== 0) {
          return counter + 1;
        } else {
          return counter;
        }
      }, 0);
      const monthBookingsStats = currentMonthBilling.reduce(
        (counter, billing) => {
          if (Number(billing.amount) !== 0) {
            return counter + 1;
          } else {
            return counter;
          }
        },
        0,
      );
      const todayBillingStats = todayBilling.reduce(
        (counter, billing) => counter + Number(billing.amount),
        0,
      );
      const weekBillingStats = currentWeekBilling.reduce(
        (counter, billing) => counter + Number(billing.amount),
        0,
      );
      const monthBillingStats = currentMonthBilling.reduce(
        (counter, billing) => counter + Number(billing.amount),
        0,
      );
      const yearBillingStats = todayBilling.reduce(
        (counter, billing) => counter + Number(billing.amount),
        0,
      );

      stats = {
        bookings: {
          today: todayBookingsStats,
          week: weekBookingStats,
          month: monthBookingsStats,
        },
        billing: {
          today: todayBillingStats,
          week: weekBillingStats,
          month: monthBillingStats,
        },
      };
    }

    response.json({ status: 'billing stats retrieved!', stats });
  });
});

router.post('/getAvailableHours', (request, response) => {
  const { requestDate } = request.body;
  const timeRangeRef = firebaseDB.ref('/timeRange');
  const datesTimeRangeRef = firebaseDB.ref('/timeRange/dates');

  timeRangeRef.once('value', (timeRangeSnapshot) => {
    datesTimeRangeRef.once('value', (datesTimeRangeSnapshot) => {
      // use default schedule
      const {
        morningScheduleTime,
        afternoonScheduleTime,
      } = timeRangeSnapshot.val();
      let [mStartingTime, mEndingTime] = morningScheduleTime
        .split('/')
        .map((unixDate) => Number(unixDate));
      let [aStartingTime, aEndingTime] = afternoonScheduleTime
        .split('/')
        .map((unixDate) => Number(unixDate));

      // override schedule if date is found
      datesTimeRangeSnapshot.forEach((date) => {
        const scheduleForDate = date.val();
        if (isSameDay(scheduleForDate.date, requestDate)) {
          [
            mStartingTime,
            mEndingTime,
          ] = scheduleForDate.schedule.morningScheduleTime
            .split('/')
            .map((unixDate) => Number(unixDate));
          [
            aStartingTime,
            aEndingTime,
          ] = scheduleForDate.schedule.afternoonScheduleTime
            .split('/')
            .map((unixDate) => Number(unixDate));
        }
      });

      response.json({
        status: 'hours retrieved!',
        morning: { from: mStartingTime, to: mEndingTime },
        afternoon: { from: aStartingTime, to: aEndingTime },
      });
    });
  });
});

router.post('/setDaysOff', (request, response) => {
  const { days } = request.body;
  const daysOffRef = firebaseDB.ref('/daysOff');

  daysOffRef.set(days);
  response.json({ status: 'days off updated!' });
});

router.post('/setImageGalery', (request, response) => {
  // request example "images": ["https://pianuccibarberia.com/assets/cut1.jpeg", "https://pianuccibarberia.com/assets/cut2.jpeg",]
  const { images: requestImages } = request.body;
  const imageGaleryRef = firebaseDB.ref('/imageGalery');
  const images = [];

  requestImages.map((image, id) => images.push({ url: image, id }));
  imageGaleryRef.set(images);
  response.json({ status: 'images added to galery!' });
});

router.post('/logout', (request, response) => {
  const { userId } = request.body;
  const usersRef = firebaseDB.ref('/users');

  usersRef.once('value', (userRef) => {
    userRef.forEach((user) => {
      const userIdTemp = user.val().id;
      if (userIdTemp === userId) {
        // Clear notification token cause it's unique for device
        firebaseDB
          .ref('/users/' + user.key)
          .set({ ...user.val(), notificationToken: '' });
      }
    });
  });
  response.setHeader('Cache-Control', 'no-cache');
  response.json({ status: 'user logged out succesfully!' });
});

router.post('/setNotificationToken', (request, response) => {
  const { notificationToken, userId } = request.body;
  const usersRef = firebaseDB.ref('/users');

  usersRef.once('value', (userRef) => {
    userRef.forEach((user) => {
      const userIdTemp = user.val().id;
      if (userIdTemp === userId) {
        firebaseDB
          .ref('/users/' + user.key)
          .set({ ...user.val(), notificationToken });
        response.json({
          status: '¡notification assigned to user!',
          token: notificationToken,
        });
      }
    });
  });
});

router.post('/getUserData', (request, response) => {
  const { userId } = request.body;
  const usersRef = firebaseDB.ref('/users');
  const bookingsRef = firebaseDB.ref('/bookings');
  const daysOffRef = firebaseDB.ref('/daysOff');

  usersRef.once('value', (snapshot) => {
    snapshot.forEach((user) => {
      const userIdTemp = user.val().id;
      if (userIdTemp === userId) {
        bookingsRef.once('value', (bookingRef) => {
          daysOffRef.once('value', (daysOff) => {
            const days = [];
            daysOff.forEach((dayOff) => {
              days.push(dayOff.val());
            });
            const bookings = [];
            bookingRef.forEach((booking) => {
              bookings.push({ ...booking.val(), id: booking.key });
            });
            const filterdBookings = bookings.filter(
              (booking) => booking.clientId === userId,
            );
            response.json({
              status: 'user logged in successfullt!',
              daysOff: days,
              // user: { ...user.val(), bookings: filterdBookings },
              user: { ...user.val(), bookings: [] },
            });
          });
        });
      }
    });
  });
});

router.post('/getUserBookings', (request, response) => {
  const { userId } = request.body;
  const bookingsRef = firebaseDB.ref('/bookings');

  bookingsRef.once('value', async (bookingRef) => {
    const bookings = [];
    bookingRef.forEach((booking) => {
      bookings.push({ ...booking.val(), id: booking.key });
    });
    const filterdBookings = bookings.filter(
      (booking) => booking.clientId === userId && booking.status === 'reserved',
    );
    const freeBooking = await bookingService.calculateFreeBooking(userId);

    response.json({
      status: 'bookings retrived!',
      bookings: filterdBookings,
      freeBooking,
    });
  });
});

router.post('/setAvailableHours', (request, response) => {
  const {
    morning: { from: morningFrom, to: morningTo },
    afternoon: { from: afternoonFrom, to: afternoonTo },
    requestDate,
  } = request.body;
  const timeRangeRef = firebaseDB.ref('/timeRange/dates');
  const afternoonRef = firebaseDB.ref('/timeRange/afternoonScheduleTime');
  const morningRef = firebaseDB.ref('/timeRange/morningScheduleTime');

  if (morningFrom && afternoonTo && !requestDate) {
    morningRef.set(`${morningFrom}/${morningTo}`);
    afternoonRef.set(`${afternoonFrom}/${afternoonTo}`);
    response.json({ status: 'daily hours updated!' });
  } else if (requestDate) {
    timeRangeRef.push({
      schedule: {
        morningScheduleTime: `${morningFrom}/${morningTo}`,
        afternoonScheduleTime: `${afternoonFrom}/${afternoonTo}`,
      },
      date: requestDate,
    });
    response.json({ status: 'hours for date updated!' });
  }
});

router.post('/getBookingsByType', (request, response) => {
  const { bookingType } = request.body;
  const bookingRef = firebaseDB.ref('/bookings');
  const usersRef = firebaseDB.ref('/users');
  const bookings = [];

  bookingRef.once('value', async (bookingSnapshot) => {
    const bookingsRaw = [];
    bookingSnapshot.forEach((booking) => {
      bookingsRaw.push({ ...booking.val(), id: booking.key });
    });
    // filtered by type
    const filteredBookings = bookingsRaw.filter(
      (booking) => booking.type === bookingType && booking.status !== 'paid',
    );
    usersRef.once('value', (usersSnapshot) => {
      usersSnapshot.forEach((user) => {
        const { name, lastname, phone, id } = user.val();
        const fullName = `${name} ${lastname ? lastname : ''}`;
        filteredBookings.map((booking) => {
          if (booking.clientId === id) {
            bookings.push({ ...booking, name: fullName, phone });
          }
        });
      });
      response.json({ status: 'bookings retrived!', bookings });
    });
  });
});

router.post('/getAllBookingsByDate', (request, response) => {
  const { userDate } = request.body;
  const bookingRef = firebaseDB.ref('/bookings');
  const usersRef = firebaseDB.ref('/users');
  let bookings = [];

  bookingRef.once('value', async (bookingSnapshot) => {
    const bookingsRaw = [];
    bookingSnapshot.forEach((booking) => {
      bookingsRaw.push({ ...booking.val(), id: booking.key });
    });
    // filtered by request date
    const reservedBookings = bookingsRaw
      .map((bookingReserved) => {
        if (
          isSameDay(bookingReserved.date, userDate) &&
          bookingReserved.status === 'reserved'
        ) {
          return bookingReserved;
        }
      })
      .filter((bookingReserved) => bookingReserved !== undefined);

    usersRef.once('value', (usersSnapshot) => {
      usersSnapshot.forEach((user) => {
        const { name, lastname, phone, id } = user.val();
        const fullName = `${name} ${lastname ? lastname : ''}`;
        reservedBookings.map((booking) => {
          if (booking.clientId === id) {
            bookings.push({ ...booking, name: fullName, phone });
          }
        });
      });
      bookings.sort(
        (firstBooking, secondBooking) => firstBooking.date - secondBooking.date,
      );
      response.json({ status: 'bookings retrived!', bookings });
    });
  });
});

router.post('/getScheduleForDate', (request, response) => {
  const { userDate, bookingDuration = 60 } = request.body;
  const bookingRef = firebaseDB.ref('/bookings');
  const timeRangeRef = firebaseDB.ref('/timeRange');
  const datesTimeRangeRef = firebaseDB.ref('/timeRange/dates');
  const bookingModel = {
    status: 'available',
    duration: bookingDuration,
    date: Date.now(),
    type: '',
    cliendId: '',
  }; // status: available, reserved, done
  const bookings = [];

  bookingRef.once('value', (bookingSnapshot) => {
    const bookingsRaw = [];
    bookingSnapshot.forEach((booking) => {
      bookingsRaw.push(booking.val());
    });
    // filtered by request date
    const reservedBookings = bookingsRaw
      .map((bookingReserved) => {
        if (isSameDay(bookingReserved.date, userDate)) {
          return bookingReserved;
        }
      })
      .filter((bookingReserved) => bookingReserved !== undefined);
    // filtered asc order
    reservedBookings.sort(
      (firstBooking, secondBooking) => firstBooking.date - secondBooking.date,
    );

    timeRangeRef.once('value', (timeRangeSnapshot) => {
      datesTimeRangeRef.once('value', (datesTimeRangeSnapshot) => {
        // use default schedule
        const {
          morningScheduleTime,
          afternoonScheduleTime,
        } = timeRangeSnapshot.val();
        let [mStartingTime, mEndingTime] = morningScheduleTime
          .split('/')
          .map((unixDate) => Number(unixDate));
        let [aStartingTime, aEndingTime] = afternoonScheduleTime
          .split('/')
          .map((unixDate) => Number(unixDate));

        // override schedule if date is found
        datesTimeRangeSnapshot.forEach((date) => {
          const scheduleForDate = date.val();
          if (isSameDay(scheduleForDate.date, userDate)) {
            [
              mStartingTime,
              mEndingTime,
            ] = scheduleForDate.schedule.morningScheduleTime
              .split('/')
              .map((unixDate) => Number(unixDate));
            [
              aStartingTime,
              aEndingTime,
            ] = scheduleForDate.schedule.afternoonScheduleTime
              .split('/')
              .map((unixDate) => Number(unixDate));
          }
        });

        const hoursAmount =
          new Date(mEndingTime).getHours() -
          new Date(mStartingTime).getHours() +
          (new Date(aEndingTime).getHours() -
            new Date(aStartingTime).getHours());
        let hoursCount = 0;
        let currentHour = new Date(Number(mStartingTime)).getHours();

        // create spaces to set up bookings for any date
        while (hoursCount < hoursAmount) {
          const bookingDate = new Date(userDate).setHours(currentHour, 00, 00);
          bookings.push({ ...bookingModel, date: bookingDate });

          currentHour += 1;
          hoursCount += 1;

          if (currentHour === new Date(mEndingTime).getHours()) {
            currentHour = new Date(aStartingTime).getHours();
          }
        }
        // populate reserved bookings is there any
        if (reservedBookings.length !== 0) {
          bookings.map((bookingTemplate, index) => {
            reservedBookings.map((bookingReserved) => {
              if (
                new Date(bookingReserved.date).getHours() ===
                new Date(bookingTemplate.date).getHours()
              ) {
                bookings[index] = bookingReserved;
              }
            });
          });
        }
        response.json({ status: 'bookings retrived!', bookings });
      });
    });
  });
});

router.post('/sendNotification', async (request, response) => {
  const { token: notificationToken, message } = request.body;
  try {
    const notificationResponse = await notificationService.sendNotificationToUser(
      {
        message,
        notificationToken,
      },
    );
    response.json({ notificationResponse });
  } catch (error) {
    response.json({ error });
  }
});

router.post('/createBooking', (request, response) => {
  const { userId, type, duration, date, isFree } = request.body;
  const bookingRef = firebaseDB.ref('bookings');
  const booking = {
    type,
    date,
    duration,
    status: 'reserved',
    clientId: userId,
    isFree,
  };
  const bookingId = bookingRef.push(booking).key;

  // SEND NOTIFICATION TO ADMIN
  bookingService
    .getNotificationDescription('create', date, (payload) => notificationService.sendNotificationToUser(payload));

  response.json({ status: 'booking created!', bookingId });
});

router.post('/deleteBooking', async (request, response) => {
  const { bookingId } = request.body;
  const bookingRef = firebaseDB.ref('bookings/' + bookingId);

  // SEND NOTIFICATION TO ADMIN BEFORE DELETING BOOKING
  await bookingRef.once('value', (bookingSnapshot) =>
    bookingService
      .getNotificationDescription('delete', bookingSnapshot.val().date, (payload) => notificationService.sendNotificationToUser(payload))
  );

  bookingRef.remove();

  response.json({ status: 'booking removed!' });
});

router.post('/payBooking', (request, response) => {
  const { bookingId, amount } = request.body;
  const bookingRef = firebaseDB.ref('/bookings');
  const billingRef = firebaseDB.ref('/billing');

  bookingRef.child(bookingId).update({ status: 'paid' });
  billingRef.push({ date: Date.now(), amount, bookingId });

  response.json({ status: 'billing saved!' });
});

router.post('/updateBooking', (request, response) => {
  const { userId, bookingId, type, duration, date, status } = request.body;
  const bookingRef = firebaseDB.ref('bookings/' + bookingId);

  bookingRef.set({ type, date, duration, status, clientId: userId });

  response.json({ status: 'booking updated!' });
});

router.post('/createUser', (request, response) => {
  const userRequest = request.body;
  const usersRef = firebaseDB.ref('users');
  const daysOffRef = firebaseDB.ref('/daysOff');
  const userModel = { ...userRequest, bookings: [] };
  const days = [];

  usersRef.push(userModel);

  daysOffRef.once('value', (daysOff) => {
    daysOff.forEach((dayOff) => {
      days.push(dayOff.val());
    });
    response.json({
      status: 'user created successfully!',
      daysOff: days,
      user: userModel,
    });
  });
});

router.post('/sendMassiveNotification', async (request, response) => {
  const { message } = request.body;
  try {
    const status = await notificationService.sendMassiveNotification(message);
    response.json(status);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
