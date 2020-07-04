const express = require('express');
const fetch = require('node-fetch');
const luxon = require('luxon');
const { isSameDay, isSameHour } = require('date-fns');
const path = require('path');
const app = express();
// const app = require("https-localhost")() // DEV ONLY
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('../credentials/firebaseCredentials.json');
const router = express.Router();
const rootPath = path.join(__dirname, '../');
const distPath = path.join(__dirname, '../') + 'dist/'
const assetsPath = path.join(__dirname, '../') + 'src/assets/'
const port = process.env.PORT || 8080;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pianucci-barberia.firebaseio.com"
});
const firebaseDB = admin.database();
const NOTIFICATION_INTERVAL = 1000 * 60 * 10; // 10 min
app.use(express.static(rootPath+"dist"));
app.use("/assets", express.static(rootPath+"src/assets"));
app.use(express.static(rootPath));
app.use(express.static(rootPath+'src/'));
console.log(rootPath)
app.use(cors());
app.use(express.json());
app.use('/', router);

router.use(function (req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`);
    // Handling not found manually and always redirecting to root in that case
    // if (!req.originalUrl.includes('/api') && (!req.originalUrl.includes('/login') || !req.originalUrl.includes('/admin') )) {
    //     res.sendFile(distPath+'index.html');
    //     return;
    // }
    next();
});

app.listen(port, '0.0.0.0', () => console.log(`Server running at ${port} port!`));
// redirect to ui router
app.get('/', (req, res) => res.sendFile(distPath+'index.html'));
app.get('/login', (req, res) => res.sendFile(distPath+'index.html'));
app.get('/admin', (req, res) => res.sendFile(distPath+'index.html'));

// app.get('/instagram', (req, res) => {
//     const redirectUri = oauth2.authorizationCode.authorizeURL({
//         redirect_uri: `${req.protocol}://${req.get('host')}/instagram-redirect`,
//         scope: 'basic',
//     });
//     res.redirect(redirectUri);
// });

// app.get('/instagram-redirect', (req, res) => {
// 	var options = {
// 		url: 'https://api.instagram.com/oauth/access_token',
// 		method: 'POST',
// 		form: {
// 			client_id: credentials.client.id,
// 			client_secret: credentials.client.secret,
// 			grant_type: 'authorization_code',
// 			redirect_uri: `${req.protocol}://${req.get('host')}/instagram-redirect`,
// 			code: req.query.code
// 		}
//   };

// 	httpRequest(options, (error, response, body) => {
// 		if (!error && response.statusCode == 200) {
//       res.json(JSON.parse(body));
//     }
//   });
// });

// WORKING BUT IN TESTING YET
const notificationDispatcher = () => {
    const bookingRef = firebaseDB.ref('/bookings');
    const usersRef = firebaseDB.ref('/users');
    const argentinaTime = new Date(luxon.DateTime.local().setZone('America/Argentina/Buenos_Aires').ts);
    // const argentinaTime = new Date(new Date().setHours(00));
    const newDay = argentinaTime.getHours() === 00;
    console.log(" CURRENT TIME ",argentinaTime.getHours());

    bookingRef.once('value', async bookingSnapshot => {
        const bookingsRaw = [];
        bookingSnapshot.forEach(booking => {
            bookingsRaw.push({ ...booking.val(), id: booking.key });
        });
        // filter bookings for today
        const reservedBookings = bookingsRaw.map(bookingReserved => {
            const filterCondition = newDay ? 
            isSameDay(bookingReserved.date, argentinaTime) && bookingReserved.status === "reserved" : 
            isSameDay(bookingReserved.date, argentinaTime) && isSameHour(bookingReserved.date, new Date(argentinaTime).setHours(new Date(argentinaTime).getHours() + 1)) && bookingReserved.status === "reserved";
            if (filterCondition) {
                return bookingReserved;
            }
        }).filter(bookingReserved => bookingReserved !== undefined);

        // set up notifications to send
        usersRef.once('value', usersSnapshot => {
            let notifications = [];
            usersSnapshot.forEach(user => {
                const { id, notificationToken } = user.val();
                reservedBookings.map(booking => {
                    if (booking.clientId === id) {
                        const notificationBody = ({
                            "title": "Pianucci Barberia",
                            "body": "Tienes un turno reservado dentro de una hora",
                            "click_action": "https://pianuccibarberia.com",
                            "default_sound": true,
                            "default_vibrate_timings": true,
                            "icon": "https://pianuccibarberia.com/assets/icons/android-chrome-192x192.png"
                        });
                        if(newDay) {
                            notificationBody.body = `Hoy tienes un turno reservado para las ${new Date(booking.date).getHours()}:00hs`;
                        } 
                        notifications.push([ notificationBody, notificationToken ]);
                    }
                });
            });
            // SEND NOTIFICATION TO FIREBASE
            notifications.map( ([ notificationBody, userToken]) => 
                userToken && fetch('https://fcm.googleapis.com/fcm/send', {
                    method: 'post',
                    body: JSON.stringify({
                        data: { ...notificationBody },
                        "to": userToken
                    }),
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'key=AAAAQHgvRKo:APA91bF4_XkAk_XWc753vWpsj50SxP0tD60qJb5DXRtEFmngHB6oyr-7bX5f2DfX5LMU4gfAfJpeuqwztLCit-dxWOsY-b9sSD4DA9pCUmGbHHUywEYDk0KodPY1bDAdrcchq0uDPcu-' },
                })
                .then(response => response.json())
                .then(response => console.log(" notification dispatched ",response))
            );            
        });
    });
}

setInterval(() => notificationDispatcher(), NOTIFICATION_INTERVAL);

// END POINTS 

app.get('/api/getDaysOff', (request, response) => {
    const daysOffRef = firebaseDB.ref('/daysOff');
    const days = [];

    daysOffRef.once('value', daysOff => {
        daysOff.forEach( dayOff => {
            days.push(dayOff.val());
        });
        response.json({ status: "days off!", days });
    });
});

app.post('/api/setDaysOff', (request, response) => {
    const { days } = request.body;
    const daysOffRef = firebaseDB.ref('/daysOff');
    
    daysOffRef.set(days);
    response.json({ status: 'days off updated!' });
});

app.get('/api/getImageGalery', (request, response) => {
    const imageGaleryRef = firebaseDB.ref('/imageGalery');
    const images = [];

    imageGaleryRef.once('value', imageGalery => {
        imageGalery.forEach( image => {
            images.push(image.val());
        });
        response.json({ status: "images for galery!", images });
    });
});

app.post('/api/setImageGalery', (request, response) => {
    const { images: requestImages } = request.body;
    const imageGaleryRef = firebaseDB.ref('/imageGalery');
    const images = [];
    
    requestImages.map( (image, id) => images.push({ url: image, id }));
    imageGaleryRef.set(images);
    response.json({ status: 'images added to galery!' });
});

app.post('/api/logout', (request, response) => {
    const { userId } = request.body;
    const usersRef = firebaseDB.ref('/users');

    usersRef.once('value', userRef => {
        userRef.forEach(user => {
            const userIdTemp = user.val().id;
            if (userIdTemp === userId) {
                // Clear notification token cause it's unique for device 
                firebaseDB.ref('/users/'+user.key).set({ ...user.val(), notificationToken: '' });
            }
        });
    });
    response.setHeader('Clear-Site-Data', '*');
    response.json({ status: "user logged out succesfully!" });
});

app.post('/api/setNotificationToken', (request, response) => {
    const { notificationToken, userId } = request.body;
    const usersRef = firebaseDB.ref('/users');

    usersRef.once('value', userRef => {
        userRef.forEach(user => {
            const userIdTemp = user.val().id;
            if (userIdTemp === userId) {
                firebaseDB.ref('/users/'+user.key).set({ ...user.val(), notificationToken });
                response.json({ status: "¡notification assigned to user!", token: notificationToken });
            }
        });
    });
});

app.post('/api/getUserData', (request, response) => {
    const { userId } = request.body;
    const usersRef = firebaseDB.ref('/users');
    const bookingsRef = firebaseDB.ref('/bookings');
    const daysOffRef = firebaseDB.ref('/daysOff');

    usersRef.once('value', snapshot => {
        snapshot.forEach(user => {
            const userIdTemp = user.val().id;
            if (userIdTemp === userId) {
                bookingsRef.once('value', bookingRef => {
                    daysOffRef.once('value', daysOff => {
                        const days = [];
                        daysOff.forEach( dayOff => {
                            days.push(dayOff.val());
                        });
                        const bookings = [];
                        bookingRef.forEach(booking => {
                            bookings.push({ ...booking.val(), id: booking.key });
                        });
                        const filterdBookings = bookings.filter(booking => booking.clientId === userId);
                        response.json({ status: 'user logged in successfullt!', daysOff: days, user: { ...user.val(), bookings: filterdBookings } });
                    });
                });
            }
        });
    });
});

app.post('/api/getUserBookings', (request, response) => {
    const { userId } = request.body;
    const bookingsRef = firebaseDB.ref('/bookings');

    bookingsRef.once('value', bookingRef => {
        const bookings = [];
        bookingRef.forEach(booking => {
            bookings.push({ ...booking.val(), id: booking.key });
        });
        const filterdBookings = bookings.filter(booking => booking.clientId === userId && booking.status === 'reserved');
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
        const [mStartingTime, mEndingTime] = morningScheduleTime.split("/").map(unixDate => Number(unixDate));
        const [aStartingTime, aEndingTime] = afternoonScheduleTime.split("/").map(unixDate => Number(unixDate));

        response.json({ status: "hours retrieved!", morning: { from: mStartingTime, to: mEndingTime }, afternoon: { from: aStartingTime, to: aEndingTime } });
    });
});

app.post('/api/getBookingsByType', (request, response) => {
    const { bookingType } = request.body;
    const bookingRef = firebaseDB.ref('/bookings');
    const usersRef = firebaseDB.ref('/users');
    const bookings = [];

    bookingRef.once('value', async bookingSnapshot => {
        const bookingsRaw = [];
        bookingSnapshot.forEach(booking => {
            bookingsRaw.push({ ...booking.val(), id: booking.key });
        });
        // filtered by type
        const filteredBookings = bookingsRaw.filter(booking => booking.type === bookingType && booking.status !== 'paid');
        usersRef.once('value', usersSnapshot => {
            usersSnapshot.forEach(user => {
                const { name, phone, id } = user.val();
                filteredBookings.map(booking => {
                    if (booking.clientId === id) {
                        bookings.push({ ...booking, name, phone });
                    }
                });
            });
            response.json({ status: "bookings retrived!", bookings });
        });
    });
});

app.post('/api/getAllBookingsByDate', (request, response) => {
    const { userDate } = request.body;
    const bookingRef = firebaseDB.ref('/bookings');
    const usersRef = firebaseDB.ref('/users');
    let bookings = [];

    bookingRef.once('value', async bookingSnapshot => {
        const bookingsRaw = [];
        bookingSnapshot.forEach(booking => {
            bookingsRaw.push({ ...booking.val(), id: booking.key });
        });
        // filtered by request date
        const reservedBookings = bookingsRaw.map(bookingReserved => {
            if (isSameDay(bookingReserved.date, userDate) && bookingReserved.status === "reserved") {
                return bookingReserved;
            }
        }).filter(bookingReserved => bookingReserved !== undefined);

        usersRef.once('value', usersSnapshot => {
            usersSnapshot.forEach(user => {
                const { name, phone, id } = user.val();
                reservedBookings.map(booking => {
                    if (booking.clientId === id) {
                        bookings.push({ ...booking, name, phone });
                    }
                });
            });
            bookings.sort((firstBooking, secondBooking) => firstBooking.date - secondBooking.date);
            response.json({ status: "bookings retrived!", bookings });
        });
    });
});

app.post('/api/getScheduleForDate', (request, response) => {
    const { userDate, bookingDuration = 60 } = request.body;
    const bookingRef = firebaseDB.ref('/bookings');
    const timeRangeRef = firebaseDB.ref('/timeRange');
    const bookingModel = { status: "available", duration: bookingDuration, date: Date.now(), type: "", cliendId: "" }; // status: available, reserved, done
    const bookings = [];

    bookingRef.once('value', bookingSnapshot => {
        const bookingsRaw = [];
        bookingSnapshot.forEach(booking => {
            bookingsRaw.push(booking.val());
        });
        // filtered by request date
        const reservedBookings = bookingsRaw.map(bookingReserved => {
            if (isSameDay(bookingReserved.date, userDate)) {
                return bookingReserved;
            }
        }).filter(bookingReserved => bookingReserved !== undefined);
        // filtered asc order
        reservedBookings.sort((firstBooking, secondBooking) => firstBooking.date - secondBooking.date);

        timeRangeRef.once('value', timeRangeSnapshot => {
            // calculate schedule range for date
            const { morningScheduleTime, afternoonScheduleTime } = timeRangeSnapshot.val();
            const [mStartingTime, mEndingTime] = morningScheduleTime.split("/").map(unixDate => Number(unixDate));
            const [aStartingTime, aEndingTime] = afternoonScheduleTime.split("/").map(unixDate => Number(unixDate));
            const hoursAmount = (new Date(mEndingTime).getHours() - new Date(mStartingTime).getHours()) + (new Date(aEndingTime).getHours() - new Date(aStartingTime).getHours());
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
                    reservedBookings.map(bookingReserved => {
                        if (new Date(bookingReserved.date).getHours() === new Date(bookingTemplate.date).getHours()) {
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

    response.json({ status: 'booking removed!' });
});

app.post('/api/payBooking', (request, response) => {
    const { bookingId, amount } = request.body;
    const bookingRef = firebaseDB.ref('/bookings');
    const billingRef = firebaseDB.ref('/billing');
    
    bookingRef.child(bookingId).update({ status: 'paid' });
    billingRef.push({ date: Date.now(), amount, bookingId });
    
    response.json({ status: 'billing saved!' });
});

app.post('/api/updateBooking', (request, response) => {
    const { userId, bookingId, type, duration, date, status } = request.body;
    const bookingRef = firebaseDB.ref('bookings/' + bookingId);

    bookingRef.set({ type, date, duration, status, clientId: userId }); 

    response.json({ status: 'booking updated!' });
});

app.post('/api/createUser', (request, response) => {
    const { name, email, phone, id } = request.body;
    const usersRef = firebaseDB.ref('users');
    const daysOffRef = firebaseDB.ref('/daysOff');
    const userModel = { name, email, id, phone, bookings: [] };
    const days = [];

    usersRef.push(userModel);

    daysOffRef.once('value', daysOff => {
        daysOff.forEach( dayOff => {
            days.push(dayOff.val());
        });
        response.json({ status: 'user created successfully!', daysOff: days, user: userModel });
    });
});


