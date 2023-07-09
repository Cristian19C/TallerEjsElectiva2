const fs = require('fs');

// Lee el contenido del archivo JSON
const jsonContent = fs.readFileSync('resources/inventory.json', 'utf8');

// Convierte el contenido JSON en un objeto JavaScript
const data = JSON.parse(jsonContent);

// Crea una nueva instancia del objeto Map
const inventory = new Map();

// Itera sobre los datos y agrega cada elemento al objeto Map
for (const key in data) {
  inventory.set(parseInt(key), data[key]);
}

// Exporta el objeto Map
module.exports.inventory = inventory;
