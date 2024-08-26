const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const roles = ['ADMIN', 'USER', 'INVITED'];

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
    password: hashedPassword,
    role: 'USER' // Asignar el rol de 'USER' por defecto
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
    return res.status(200).json({ 
      message: 'Usuario autenticado', 
      username: req.user.username,
      role: req.user.role
    });
  }
  res.status(200).json({ message: 'Usuario no autenticado', role: 'INVITED' });
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

// CHANGE ROLE
exports.changeUserRole = async (req, res) => {
  const { username, newRole } = req.body;

  // Verificar que el nuevo rol es válido
  if (!roles.includes(newRole)) {
    return res.status(400).json({ message: 'Rol no válido.' });
  }

  try {
    // Buscar el usuario por nombre de usuario
    const user = await User.findOne({ username });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Cambiar el rol del usuario
    user.role = newRole;
    await user.save();

    // Responder con éxito
    res.status(200).json({ message: `Rol del usuario ${username} cambiado a ${newRole}.` });
  } catch (err) {
    console.error('Error al cambiar el rol del usuario:', err);
    res.status(500).json({ message: 'Error al cambiar el rol del usuario.' });
  }
};

// GET AUTHENTICATED USER ROLE
exports.getAuthenticatedUserRole = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  const user = req.user;
  res.status(200).json({ username: user.username, role: user.role });
};


