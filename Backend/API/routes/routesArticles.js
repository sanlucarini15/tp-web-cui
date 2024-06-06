var express = require('express');
var router = express.Router();
var ctrlArticulos = require('../controller/operationsArticles');

// GET 
router.get('/', ctrlArticulos.findAll);
router.get('/price/:precio', ctrlArticulos.findByPrice);
router.get('/article/:nombre', ctrlArticulos.findByName);
router.get('/material/:material', ctrlArticulos.findByMaterial);
router.get('/:nombre/:material/:precio', ctrlArticulos.findByNameMaterialPrice);

// POST 
router.post('/insert/', ctrlArticulos.insertArticleJson);

// PUT
router.put('/updatePrice/:articulo', ctrlArticulos.updatePriceArticle);
router.put('/updateAmount/:articulo', ctrlArticulos.updateAmountArticle);

//DELETE
router.delete('/delete/:articulo', ctrlArticulos.deleteArticle);

module.exports = router;
