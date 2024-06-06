var model = require('../models/ArticleSchema.js');

async function findAll(req, res) {
    try {
        const query = {};
        const options = { "_id": 0, articulo: 1, material: 1, precio: 1, stock: 1, imagen: 1};
        const out = await model.find(query, options);
        res.json(out);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

async function findByPrice(req, res) {
    try {
        const precio = req.params.precio;
        const query = { precio: precio };
        const options = { "_id": 0, articulo: 1, material: 1, precio: 1, stock: 1, imagen: 1};
        const out = await model.find(query, options);
        res.json(out);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

async function findByName(req, res) {
    try {
        const nombre = req.params.nombre;
        const query = { articulo: { $regex: nombre} };
        const options = { "_id": 0, articulo: 1, material: 1, precio: 1, stock: 1, imagen: 1};
        const out = await model.find(query, options);
        res.json(out);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

async function findByMaterial(req, res) {
    try {
        const material = req.params.material;
        const query = { material: material };
        const options = { "_id": 0, articulo: 1, material: 1, precio: 1, stock: 1, imagen: 1};
        const out = await model.find(query, options);
        res.json(out);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

async function findByNameMaterialPrice(req, res) {
    try {
        const nombre = req.params.nombre;
        const precio = req.params.precio;
        const material = req.params.material;
        const query = { articulo: { $regex: nombre}, material: material, precio: precio };
        const options = { "_id": 0, articulo: 1, material: 1, precio: 1, stock: 1, imagen: 1};
        const out = await model.find(query, options);
        res.json(out);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

async function insertArticleJson(req, res) {
    try {
        const nuevoArt = req.body;
        const existenteArt = await model.findOne({
            articulo: { $regex: nuevoArt.articulo}
            // material: nuevoArt.material,
            // precio: nuevoArt.precio
        });
        if (existenteArt) {
            res.status(409).json({ message: "El artículo ya existe" });
        } else {
            await model.create(nuevoArt);
            res.status(201).json({ message: "Artículo insertado con éxito" }); 
        }
    } catch(error){
        res.status(500);
        res.send(error);
    }
}

async function updatePriceArticle(req, res) {
    try {
        const articulo = req.params.articulo;
        const precio = req.body;
        const actualizar = await model.updateOne({articulo: articulo}, {$set:{precio: precio}});
        res.json(actualizar)
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

async function updateAmountArticle(req, res) {
    try {
        const articulo = req.params.articulo;
        const cant = req.body;
        const actualizar = await model.updateOne({articulo: articulo}, cant);
        res.json(actualizar)
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

// Borrar articulo
async function deleteArticle(req, res) {
    try {
        const articulo = req.params.articulo;
        const eliminar = await model.deleteOne({articulo: articulo});
        res.json(eliminar)
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}


module.exports = {findAll, findByPrice, findByName, findByMaterial, findByNameMaterialPrice, insertArticleJson, updatePriceArticle, updateAmountArticle, deleteArticle}