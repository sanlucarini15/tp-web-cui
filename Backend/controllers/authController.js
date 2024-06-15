const bcrypt = require('bcryptjs');
const passport = require('passport');
const users = require('../models/user');

let activeUser = null; // Variable global para guardar el usuario actualmente logeado

//REGISTER
exports.register = (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Nombre de usuario ya existente' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword });

  res.status(200).json({ message: 'Usuario registrado exitosamente!' });
};

//LOGIN
exports.login = (req, res, next) => {
  if (activeUser) {
    return res.status(403).json({ message: 'Ya hay un usuario logueado. Por favor, cierra sesión primero.' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      activeUser = user.username; // Setea el usuario que recién se logeó como activo
      return res.status(200).json({ message: 'Sesión iniciada correctamente!', username: user.username });
    });
  })(req, res, next);
};

//LOGOUT
exports.logout = (req, res, next) => {
  if (!activeUser) {
    return res.status(400).json({ message: 'No hay ningún usuario logueado.' });
  }

  req.logout((err) => {
    if (err) {
      return next(err);
    }
    activeUser = null; // Resetea el usuario activo
    res.status(200).json({ message: 'Sesión cerrada correctamente.' });
  });
};
  
//CHECK AUTH (IF USER IS LOGGED)
exports.checkAuthentication = (req, res) => {
  if (req.isAuthenticated() && req.user.username === activeUser) {
    return res.status(200).json({ message: 'Usuario autenticado', username: req.user.username });
  }
  res.status(401).json({ message: 'Usuario no autenticado' });
};

//GET REGISTERED USERS
exports.getUsers = (req, res) => {
  res.status(200).json(users);
};
