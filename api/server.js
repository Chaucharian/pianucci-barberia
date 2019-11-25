const express = require('express');
const cookieParser = require('cookie-parser');
const httpRequest = require('request');
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

app.post('/getSchedule', (request, response) => {
  const ref = firebaseDB.ref('/bookings');
  let schedule = [];
  ref.once('value', snapshot => {

    schedule = snapshot;
  });
  response.json({ status: "EA", schedule});
});

app.post('/createBooking', (request, response) => {
  const { userId, type, duration, date } = request.body;
  const bookingRef = firebaseDB.ref('bookings');
  const booking = { type: "classic", date: Date.now(), duration: 30, status: "pending", clientId: userId };
  let bookingResponse = { };

  bookingResponse = bookingRef.push(booking); // TODO FOR EXAMPLE 

  response.json({ status: 'booking created!', booking: bookingResponse });
});

app.post('/updateBooking', (request, response) => {
  const { userId, bookingId, type, duration, date } = request.body;
  const bookingRef = firebaseDB.ref('bookings/'+bookingId);

  bookingRef.set({ type, date, duration, status: "pending", clientId: userId }); // TODO FOR EXAMPLE 

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
