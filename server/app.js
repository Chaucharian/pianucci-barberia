const express = require('express');
const path = require('path');
const app = express();
// const app = require("https-localhost")() // DEV ONLY
const cors = require('cors');
const api = require('./api');
const router = express.Router();
const rootPath = path.join(__dirname, '../');
const distPath = path.join(__dirname, '../') + 'dist/';
const port = process.env.PORT || 8080;

app.use(express.static(rootPath + 'dist'));
app.use('/assets', express.static(rootPath + 'src/assets'));
app.use(express.static(rootPath));
app.use(express.static(rootPath + 'src/'));
app.use(cors());
app.use(express.json());
app.use('/', router);

router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.listen(port, '0.0.0.0', () =>
  console.log(`Server running at ${port} port!`),
);

// redirect to ui router
app.get('/', (req, res) => res.sendFile(distPath + 'index.html'));
app.get('/login', (req, res) => res.sendFile(distPath + 'index.html'));
app.get('/admin', (req, res) => res.sendFile(distPath + 'index.html'));
app.use('/api', api);
