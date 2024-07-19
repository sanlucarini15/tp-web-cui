const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

// REGISTER
exports.register = async (req, res) => {
  const { firstName, lastName, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Nombre de usuario ya existente' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  
  const newUser = new User({
    firstName,
    lastName,
    username,
    password: hashedPassword
  });

  await newUser.save();
  res.status(200).json({ message: 'Usuario registrado exitosamente!' });
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
  if (req.isAuthenticated()) {
    return res.status(200).json({ message: 'Usuario autenticado', username: req.user.username });
  }
  res.status(401).json({ message: 'Usuario no autenticado' });
};


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

// GET USER PREFERENCES
exports.getPreferences = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  const userId = req.user.id;

  try {
    const user = await User.findById(userId, 'preferences');
    res.status(200).json({ preferences: user.preferences });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener las preferencias' });
  }
};

// ADD USER PREFERENCES
exports.addPreference = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  const userId = req.user.id;
  const { preference } = req.body;

  if (!preference) {
    return res.status(400).json({ message: 'La preferencia no puede estar vacía' });
  }

  try {
    const user = await User.findById(userId);
    user.preferences.push(preference);
    await user.save();
    res.status(200).json({
      message: `Preferencia '${preference}' agregada al usuario ${user.username}`,
      preferences: user.preferences
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al agregar la preferencia' });
  }
};
