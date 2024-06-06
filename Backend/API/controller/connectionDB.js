const mongoose = require('mongoose');

async function conectar(){

    // const url = 'mongodb://Sol:Sol123@127.0.0.1:27017/test';
    const url = 'mongodb://pia:pia1234@127.0.0.1:27017/test';

    await mongoose.connect(url).then(() => {
        console.log('Conexión exitosa')
    }).catch((error) => {
        console.error('Error al conectar a la base de datos', error)
    });
}

module.exports = {conectar}