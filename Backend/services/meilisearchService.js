const { MeiliSearch } = require('meilisearch');

const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700'
});


async function search(indexName, query) {
  const index = client.index(indexName);
  return index.search(query);
}

async function addDocuments(indexName, documents) {
  const index = client.index(indexName);
  return index.addDocuments(documents);
}


async function getDocument(indexName, id) {
  const index = client.index(indexName);
  return index.getDocument(id);
}

module.exports = {
  search,
  addDocuments,
  getDocument,
};
