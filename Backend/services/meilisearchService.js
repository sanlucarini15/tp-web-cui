const { MeiliSearch } = require('meilisearch');

// Configuración de Meilisearch
const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700'
});

// Buscar documentos en un índice
async function search(indexName, query) {
  const index = client.index(indexName);
  return index.search(query);
}

// Agregar documentos a un índice
async function addDocuments(indexName, documents) {
  const index = client.index(indexName);
  return index.addDocuments(documents);
}

// Obtener documento por ID
async function getDocument(indexName, id) {
  const index = client.index(indexName);
  return index.getDocument(id);
}

module.exports = {
  search,
  addDocuments,
  getDocument,
};
