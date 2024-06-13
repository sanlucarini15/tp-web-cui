const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./config/passport'); // Asegúrate de que passport.js está configurado correctamente
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

// Middleware
app.use(bodyParser.json());
app.use(session({ 
    secret: 'yourSecretKey', 
    resave: false, 
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

// Routes
app.use('/api/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
