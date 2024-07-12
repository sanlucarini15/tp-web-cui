const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();
require('./config/database'); // Conectar a la base de datos
require('./config/passport'); // Asegúrate de requerir la configuración de passport

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true, // Asegúrate de que las cookies se envían al cliente
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
    secure: false, // Asegúrate de que esto esté en false para desarrollo; en producción debe ser true
    sameSite: 'lax' // Otras opciones: 'strict' o 'none'
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions)); // CORS

// Routes
app.use('/api/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
