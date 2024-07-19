const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();
require('./config/database'); // Conexion con DB
require('./config/passport'); // Configuracion de passport

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    optionsSuccessStatus: 200 
};

// Middleware
app.use(bodyParser.json());
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax' 
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

// Rutas de endpoints
app.use('/api/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
