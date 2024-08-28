const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const { MeiliSearch } = require('meilisearch');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const mongoose = require('./config/database'); // Conexión a MongoDB
const User = require('./models/user');
const transporter = require('./config/mailer');

const app = express();
require('./config/passport'); // Configuración de Passport

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  },
}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas de endpoints
app.use('/api/', authRoutes);

// Inicializacion del cliente Meilisearch
const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700',
});


////////////////////// ENDPOINTS MEILISEARCH
async function importCSV(filePath, indexName) {
  const records = [];
  const index = client.index(indexName);

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Añadir un campo ID único si no existe
        if (!row.id) {
          row.id = uuidv4(); // Genera un nuevo ID único
        }
        records.push(row);
      })
      .on('end', async () => {
        try {
          console.log("Datos leídos desde el CSV:", records);

          // Agregar los documentos al índice
          const response = await index.addDocuments(records);
          console.log("Respuesta de Meilisearch:", response);

          resolve({ message: 'Datos importados a Meilisearch', response });
        } catch (error) {
          console.error('Error al agregar documentos:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('Error en la lectura del archivo CSV:', error);
        reject(error);
      });
  });
}

// Configuración de multer para almacenar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Crear la carpeta si no existe
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ruta para agregar documentos desde CSV cargado por el usuario
app.post('/api/add-documents', upload.single('csvFile'), async (req, res) => {
  const { indexName } = req.body;
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  try {
    const response = await importCSV(filePath, indexName);

    // Llamada a la función notifyUsersAboutNewContent después de la importación
    await notifyUsersAboutNewContent(indexName, fileName);

    res.json(response);
  } catch (error) {
    console.error('Error al agregar documentos desde CSV:', error);
    res.status(500).json({ error: 'Error al agregar documentos desde CSV' });
  }
});

async function notifyUsersAboutNewContent(indexName, fileName) {
  try {
    const users = await User.find({}).select('username email preferences');
    const newContent = await getNewCSVContent(indexName);

    for (const user of users) {
      const matchedPreferences = user.preferences.filter(preference => 
        newContent.some(item => 
          Object.values(item).some(value => 
            typeof value === 'string' && value.toLowerCase().includes(preference.toLowerCase())
          )
        )
      );

      if (matchedPreferences.length > 0) {
        console.log(`Se han encontrado nuevas preferencias para ${user.username}:`);
        
        let emailContent = `Hola ${user.username},\n\nSe ha cargado nuevo contenido que coincide con tus preferencias:\n\n`;
        matchedPreferences.forEach(pref => {
          console.log(`- Preferencia "${pref}" coincide con el nuevo contenido en ${fileName}`);
          emailContent += `- Tu preferencia "${pref}" coincide con nuevo contenido en ${fileName}\n`;
        });

        // Enviar correo electrónico
        await sendEmail(user.email, 'Nuevo contenido de interés', emailContent);
      }
    }
  } catch (error) {
    console.error('Error al notificar a los usuarios sobre el nuevo contenido:', error);
  }
}

async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: '"AppProyectos" <santinolucarini@gmail.com>',
      to: to,
      subject: subject,
      text: text,
    });
    console.log('Correo enviado: %s', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

// Función para obtener el contenido del CSV recién importado
async function getNewCSVContent(indexName) {
  const index = client.index(indexName);
  const searchResults = await index.search('', { limit: 1000 });
  return searchResults.hits;
}

// Ruta para importar documentos desde CSV (cuando el archivo ya está en el servidor)
app.post('/api/import-csv', async (req, res) => {
  const { indexName, fileName } = req.body;
  const filePath = path.join(__dirname, 'uploads', fileName);

  try {
    const response = await importCSV(filePath, indexName);
    res.json(response);
  } catch (error) {
    console.error('Error al importar desde CSV:', error);
    res.status(500).json({ error: 'Error al importar desde CSV' });
  }
});

// Ruta para búsqueda en Meilisearch
app.post('/api/search', async (req, res) => {
  const { indexName, query } = req.body;
  const index = client.index(indexName);

  try {
    const results = await index.search(query);
    res.json(results);
  } catch (error) {
    console.error('Error al realizar la búsqueda en Meilisearch:', error);
    res.status(500).json({ error: 'Error al realizar la búsqueda' });
  }
});

//////////////////////////////////////////////////////////////////////////

// Configuración del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
