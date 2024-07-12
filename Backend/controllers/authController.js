const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user'); // Importa el modelo de usuario

// REGISTER
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Nombre de usuario ya existente' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    console.log("backend registro: " + username);
    res.status(200).json({ message: 'Usuario registrado exitosamente!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el registro de usuario' });
  }
};

// LOGIN
exports.login = (req, res, next) => {
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

      console.log("Usuario logueado: " + user.username);
      printAuthenticationStatus(req);

      return res.status(200).json({ message: 'Sesión iniciada correctamente!', username: user.username });
    });
  })(req, res, next);
};

// LOGOUT
exports.logout = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(400).json({ message: 'No hay ningún usuario logueado.' });
  }

  const username = req.user.username;

  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.status(200).json({ message: `Sesión cerrada correctamente para el usuario ${username}.` });
  });
};

// CHECK AUTH (IF USER IS LOGGED)
exports.checkAuthentication = (req, res) => {
  printAuthenticationStatus(req);

  if (req.isAuthenticated()) {
    return res.status(200).json({ message: 'Usuario autenticado', username: req.user.username });
  }
  res.status(401).json({ message: 'Usuario no autenticado' });
};

// Función para imprimir estado de autenticación
function printAuthenticationStatus(req) {
  console.log("Estado de autenticación - user:", req.user);
}

// GET REGISTERED USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username'); // Excluir las contraseñas
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};
