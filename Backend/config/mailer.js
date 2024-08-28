const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // Usa el servidor SMTP apropiado
  port: 587,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: 'santinolucarini@gmail.com', // Tu dirección de correo
    pass: 'Madafacka15'        // Tu contraseña
  }
});

module.exports = transporter;