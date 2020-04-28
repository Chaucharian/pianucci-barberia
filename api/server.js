const express = require('express');
const cookieParser = require('cookie-parser');
const httpRequest = require('request');
const { isSameDay } = require('date-fns');
const path = require('path');
const app = express();
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseCredentials.json');
const router = express.Router();
// const path = __dirname + '/dist';
const port = process.env.PORT || 8080;
const credentials = {
    client: {
      id: '6630f184387c425e8912e1495be328c9', 
      secret: '6d61d7e4b38f4b0e828091f01b16f46b',
    },
    auth: {
      tokenHost: 'https://api.instagram.com',
      tokenPath: '/oauth/access_token'
    }
};
const oauth2 = require('simple-oauth2').create(credentials);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pianucci-barberia.firebaseio.com"
});
const firebaseDB = admin.database();
// app.use(express.static(path));
app.use(express.static("./dist"));
app.use(cookieParser());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "marplacode.com"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors());
app.use(express.json());
app.use('/', router);

router.use(function (req,res,next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.listen(port, '0.0.0.0',() => console.log(`Server running at ${port} port!`));

app.get('/color-matcher', (req, res) => res.sendfile('./color-matcher/dist/index.html') );

app.get('/', (req, res) => res.sendfile('./index.html') );
// redirect to ui router
app.get('/login', (req, res) => res.sendfile('./dist/index.html') );
app.get('/admin', (req, res) => res.sendfile('./dist/index.html') );

app.get('/instagram', (req, res) => {
    const redirectUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: `${req.protocol}://${req.get('host')}/instagram-redirect`,
        scope: 'basic',
    });
    res.redirect(redirectUri);
});

app.get('/instagram-redirect', (req, res) => {
	var options = {
		url: 'https://api.instagram.com/oauth/access_token',
		method: 'POST',
		form: {
			client_id: credentials.client.id,
			client_secret: credentials.client.secret,
			grant_type: 'authorization_code',
			redirect_uri: `${req.protocol}://${req.get('host')}/instagram-redirect`,
			code: req.query.code
		}
  };

	httpRequest(options, (error, response, body) => {
		if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }
  });
});

app.post('/api/getUserData', (request, response) => {
  const { userId } = request.body;
  const ref = firebaseDB.ref('/users');
  console.log(" REF ",ref);
  ref.once('value', snapshot => {
    snapshot.forEach( user => {
      console.log(" USER ",user);
      const userIdTemp = user.val().id;
      if(userIdTemp === userId) {
          response.json({ status: 'user loged in successfullt!', user: user.val() })
      }
    });
  });
});

app.post('/api/getUserBookings', (request, response) => {
  const { userId } = request.body;
  const bookingsRef = firebaseDB.ref('/bookings');

  bookingsRef.once('value', bookingRef => {
    const bookings = [];
    bookingRef.forEach( booking => {
      bookings.push({ ...booking.val(), id: booking.key });
    });
    const filterdBookings = bookings.filter( booking => booking.clientId === userId);
    response.json({ status: "bookings retrived!", bookings: filterdBookings });
  });
});

app.post('/api/setAvailableHours', (request, response) => {
  const { morning: { from: morningFrom, to: morningTo }, afternoon: { from: afternoonFrom, to: afternoonTo } } = request.body;
  const afternoonRef = firebaseDB.ref('/timeRange/afternoonScheduleTime');
  const morningRef = firebaseDB.ref('/timeRange/morningScheduleTime');

  morningRef.set(`${morningFrom}/${morningTo}`); 
  afternoonRef.set(`${afternoonFrom}/${afternoonTo}`);

  response.json({ status: "hours updated!" });
});

app.get('/api/getAvailableHours', (request, response) => {
  const timeRangeRef = firebaseDB.ref('/timeRange');

  timeRangeRef.once('value', timeRangeSnapshot => {
    const { morningScheduleTime, afternoonScheduleTime } = timeRangeSnapshot.val();
    const [mStartingTime, mEndingTime] = morningScheduleTime.split("/").map( unixDate => Number(unixDate) );
    const [aStartingTime, aEndingTime] = afternoonScheduleTime.split("/").map( unixDate => Number(unixDate) );

    response.json({ status: "hours retrieved!", morning: { from: mStartingTime, to: mEndingTime }, afternoon: { from: aStartingTime, to: aEndingTime } });
  });
});

app.post('/api/getAllBookingsByDate', (request, response) => {
  const { userDate } = request.body;
  const bookingRef = firebaseDB.ref('/bookings');
  const usersRef = firebaseDB.ref('/users');
  let bookings = [];

  bookingRef.once('value', async bookingSnapshot => {
    const bookingsRaw = [];
    bookingSnapshot.forEach( booking => {
      bookingsRaw.push({ ...booking.val(), id: booking.key });
    });
    // filtered by request date
    const reservedBookings = bookingsRaw.map( bookingReserved => {
      if(isSameDay(bookingReserved.date, userDate) && bookingReserved.status === "reserved") {
        return bookingReserved;
      }
    }).filter( bookingReserved => bookingReserved !== undefined);

    usersRef.once('value', usersSnapshot => {
      usersSnapshot.forEach( user => {
        const { name, phone, id } = user.val();
        reservedBookings.map( booking => {
          if(booking.clientId === id) {
            bookings.push({ ...booking, name, phone });
          }
        });
      });
      bookings.sort( (firstBooking, secondBooking) => firstBooking.date - secondBooking.date);
      response.json({ status: "bookings retrived!", bookings });
    });
  }); 
});

app.post('/api/getScheduleForDate', (request, response) => {
  const { userDate, bookingDuration = 60 } = request.body;
  const bookingRef = firebaseDB.ref('/bookings');
  const timeRangeRef = firebaseDB.ref('/timeRange');
  const bookingModel = { status: "available",  duration: bookingDuration, date: Date.now(), type: "", cliendId: "" }; // status: available, reserved, done
  const bookings = [];

  bookingRef.once('value', bookingSnapshot => {
    const bookingsRaw = [];
    bookingSnapshot.forEach( booking => {
      bookingsRaw.push(booking.val());
    });
    // filtered by request date
    const reservedBookings = bookingsRaw.map( bookingReserved => {
      if(isSameDay(bookingReserved.date, userDate)) {
        return bookingReserved;
      }
    }).filter( bookingReserved => bookingReserved !== undefined);
    // filtered asc order
    reservedBookings.sort( (firstBooking, secondBooking) => firstBooking.date - secondBooking.date);

    timeRangeRef.once('value', timeRangeSnapshot => {
      // calculate schedule range for date
      const { morningScheduleTime, afternoonScheduleTime } = timeRangeSnapshot.val();
      const [mStartingTime, mEndingTime] = morningScheduleTime.split("/").map( unixDate => Number(unixDate) );
      const [aStartingTime, aEndingTime] = afternoonScheduleTime.split("/").map( unixDate => Number(unixDate) );
      const hoursAmount = (new Date(mEndingTime).getHours() - new Date(mStartingTime).getHours()) + (new Date(aEndingTime).getHours() - new Date(aStartingTime).getHours());
      let hoursCount = 0;
      let currentHour = new Date(Number(mStartingTime)).getHours();

      // create spaces to set up bookings for any date
      while(hoursCount < hoursAmount) {
        const bookingDate = new Date(userDate).setHours(currentHour,00,00);
        bookings.push({ ...bookingModel, date: bookingDate });

        currentHour += 1;
        hoursCount += 1;
        
        if(currentHour === new Date(mEndingTime).getHours()) {
          currentHour = new Date(aStartingTime).getHours();
        }
      }
      // populate reserved bookings is there any
      if(reservedBookings.length !== 0) {
        bookings.map( (bookingTemplate, index) => {
          reservedBookings.map( bookingReserved => {
            if(new Date(bookingReserved.date).getHours() === new Date(bookingTemplate.date).getHours()) {
              bookings[index] = bookingReserved;
            }
          });
        }); 
      }
      response.json({ status: "bookings retrived!", bookings });
    });
  }); 
});

app.post('/api/createBooking', (request, response) => {
  const { userId, type, duration, date } = request.body;
  const bookingRef = firebaseDB.ref('bookings');
  const booking = { type, date, duration, status: "reserved", clientId: userId };
  const bookingId = bookingRef.push(booking).key;

  response.json({ status: 'booking created!', bookingId });
});

app.post('/api/deleteBooking', (request, response) => {
  const { bookingId } = request.body;
  const bookingRef = firebaseDB.ref('bookings/' + bookingId);
  bookingRef.remove();
  
  response.json({ status: 'booking removed!'  });
});


app.post('/api/updateBooking', (request, response) => {
  const { userId, bookingId, type, duration, date, status } = request.body;
  const bookingRef = firebaseDB.ref('bookings/'+bookingId);

  bookingRef.set({ type, date, duration, status, clientId: userId }); // TODO FOR EXAMPLE 

  response.json({ status: 'booking updated!' });
});

app.post('/api/createUser', (request, response) => {
  const { name, email, phone, id } = request.body;
  const usersRef = firebaseDB.ref('users');
  const userModel = { name, email, id, phone, bookings: [] }; 

  usersRef.push(userModel);

  response.json({ status: 'user created successfully!', user: userModel });
});
