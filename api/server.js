const express = require('express');
const cookieParser = require('cookie-parser');
const httpRequest = require('request');
const { format, getHours,  differenceInHours, compareAsc } = require('date-fns');
const app = express();
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseCredentials.json');
const router = express.Router();
const path = __dirname + '/dist';
const port = process.env.PORT || 2345;
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

const setDefaultTodayTimeSchedule = () => {
  const timeRangeRef = firebaseDB.ref('/timeRange');
  let morningScheduleTime, afternoonScheduleTime, scheduleForDate;

  timeRangeRef.once('value', timeSnapshot => {
    timeSnapshot.forEach( scheduleDate => {
      if(compareAsc(scheduleDate.val(),  new Date()) !== 0) {
        morningScheduleTime = [ new Date(new Date().setHours(9, 00, 00)), new Date(new Date().setHours(13, 00, 00)) ];
        afternoonScheduleTime = [ new Date(new Date().setHours(17, 00, 00)), new Date(new Date().setHours(21, 00, 00)) ];
        scheduleForDate = { morningScheduleTime, afternoonScheduleTime };
      }
    });
  });

  timeRangeRef.push(scheduleForDate);
}


console.log("COMPARE ",compareAsc(new Date().setHours(9), new Date().setHours(9)) );

setInterval( () => setDefaultTodayTimeSchedule(), 1000*60*60*24); // set schedule daily

app.use(express.static(path));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/', router);

router.use(function (req,res,next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.listen(port, '0.0.0.0',() => console.log(`Server running at ${port} port!`));

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

app.post('/getUserData', (request, response) => {
  const { id } = request.body;
  const ref = firebaseDB.ref('/users');

  ref.once('value', snapshot => {
    snapshot.forEach( user => {
      const userBookings = user.val().bookings;
      const userId = user.val().id;
      if(userId === id) {
          response.json({ status: 'user loged in successfullt!', user: user.val() })
      }
      // TODO MAP BOOKINGS
      // Object.keys((user.val().bookings)).map( key => {
      //   console.log(userBookings[key].type);
      // });
    });
  });
});

app.post('/updateDailyTimeSchedule', (request, response) => {
  const { date, morinigSchueduleTime, afternoonScheduleTime } = request.body;
  setTimeScheduleForDate(morningScheduleTime, afternoonScheduleTime);
});

// TODO MAKE IT WORK!
// app.post('/getScheduleForDate', (request, response) => {
//   const { userDate, bookingDuration } = request.body;
//   const bookingRef = firebaseDB.ref('/bookings');
//   const timeRangeRef = firebaseDB.ref('/timeRange');
//   const filteredSchedule = [];
//   let morningScheduleTime, afternoonScheduleTime;

//   timeRangeRef.once('value', timeSnapshot => {
//     timeSnapshot.forEach( timeForDate => {
//       if(compareAsc(timeForDate.morinigSchuedule[1], userDate) === 0) { // 0 means equal
//         morningAvailableHours = differenceInHours(timeForDate.val().morinigSchuedule[1], timeForDate.val().morinigSchuedule[0]);
//         afternoonAvailableHours = differenceInHours(timeForDate.val().afternoonSchedule[1], timeForDate.val().afternoonSchedule[0]);
//       }

//     });

//       response.json({ status: { morningAvailableHours, afternoonAvailableHours }});

//     // bookingRef.once('value', bookingSnapshot => {
//     //   let schedule = [];
//     //   const bookingsAmount = morningScheduleTime + afternoonScheduleTime;
//     //   if(bookingSnapshot.lenght === 0) {
//     //     for(let i = 0; i < bookingsAmount; i++) {

//     //     }
//     //   } else {
//     //     bookingSnapshot.forEach( booking => {
//     //       const bookingDate = format(new Date(booking.date), 'MM/dd/yyyy');
//     //       if(booking.val().date === 'pending') {
//     //         schedule.push(booking.val());
//     //       } 
//     //     });
//     //   }
//     //   schedule = schedule.filter( booking => {
        
//     //   });
//     // });

// // });

app.post('/createBooking', (request, response) => {
  const { userId, type, duration, date } = request.body;
  const bookingRef = firebaseDB.ref('bookings');
  const booking = { type, date, duration, status: "active", clientId: userId };
  let bookingResponse = { };

  bookingResponse = bookingRef.push(booking);

  response.json({ status: 'booking created!', booking: bookingResponse });
});

app.post('/updateBooking', (request, response) => {
  const { userId, bookingId, type, duration, date, status } = request.body;
  const bookingRef = firebaseDB.ref('bookings/'+bookingId);

  bookingRef.set({ type, date, duration, status, clientId: userId }); // TODO FOR EXAMPLE 

  response.json({ status: 'booking updated!' });
});

app.post('/createUser', (request, response) => {
  const { name, email, id } = request.body;
  const ref = firebaseDB.ref('users');
  const newUserForDb = { name, email, id, bookings: [] }; 
  const userResponse = { name, id, bookings: [] };

  const newUserCreated = firebaseDB.ref('users/'+ref.push(newUserForDb).key+'/bookings');
  newUserCreated.push({ "type": "classic" }); // TODO FOR EXAMPLE 

  response.json({ status: 'user created successfully!', user: userResponse });
});
