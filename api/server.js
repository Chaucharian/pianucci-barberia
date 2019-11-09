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

app.post('/createUser', (request, response) => {
  const { name, email, id } = request.body;
  const ref = firebaseDB.ref('users');
  const newUser = { name, email, id }; 

  ref.push(newUser);
  response.json({ status: 'user created successfully!' });
});
