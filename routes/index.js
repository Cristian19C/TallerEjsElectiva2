//enrutamiento
//elemtos necesarios para hacer enrutamiento
const { log } = require('console');
const express = require('express')
const fs = require('fs')
const path = require('path');
const PDFDocument = require('pdfkit');
const router = express.Router()
let inventory = require('./../resources/inventory').inventory;

const filePath = path.join(__dirname, '..', 'resources', 'inventory.json');

router.get('/', (req, res) => res.render('index', {'title': 'Pagina inicio'}))
router.get('/inventory', (req, res) => {res.render('inventory', {'title': 'Inventario', 'data':inventory})
})

  
router.get('/add', (req, res) => res.render('addInventory', {'title': 'Agregar inventario', 'data':inventory}))

router.post('/add',(req,res)=>{
      const {id_product, name, price, number, description, brand} = req.body
      
      inventory.set(id_product,{'id_product':id_product,'name':name,'price':price,'number':number, 'description':description, 'brand':brand})
      // Leer el contenido actual del archivo JSON
      const jsonContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(jsonContent);
  
    // Agregar el nuevo registro al objeto 'data'
      data[id_product] = {
      id_product: id_product,
      name: name,
      price: price,
      number: number,
      description: description,
      brand: brand
    };
  
    // Convertir el objeto 'data' en una cadena JSON
    const updatedJsonContent = JSON.stringify(data, null, 2);
  
    // Escribir el contenido actualizado en el archivo JSON
    fs.writeFileSync(filePath, updatedJsonContent, 'utf8');
  
    res.redirect('/')
})

router.post('/delete/:id_product', (req, res) => {
    // const accion = req.body.accion; // Obtén el valor del atributo 'value' del formulario
    // console.log(accion);
        const id_product = req.params.id_product;
        // Leer el contenido actual del archivo JSON
        const jsonContent = fs.readFileSync(filePath, 'utf8');
        let data = JSON.parse(jsonContent);
      
         // Verificar si el registro existe en el archivo JSON
         if (data.hasOwnProperty(id_product)) {
          // Eliminar el registro del objeto 'data'
          delete data[id_product];
      
          // Convertir el objeto 'data' en una cadena JSON actualizada
          const updatedJsonContent = JSON.stringify(data, null, 2);
      
          // Escribir el contenido actualizado en el archivo JSON
          fs.writeFileSync(filePath, updatedJsonContent, 'utf8'); 
        }
    inventory = new Map(Object.entries(data));
    res.redirect('/inventory')
  
});

router.get('/:id_product', (req, res) => {
  console.log('entri');
    const id_product = req.params.id_product;
    console.log(id_product);
    // Leer el contenido actual del archivo JSON
    const jsonContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonContent);
  
    // Obtener el registro correspondiente utilizando el ID
    const dataInventory = data[id_product];
    console.log(dataInventory);
    // res.send(dataInventory)
  
    res.render('updateInventory', {'data': dataInventory, 'title': 'Actualizar registros'})
  
    // console.log('update');
});
  
router.post('/update', (req, res) => {
  const {id_product, name, price, number, description, brand} = req.body
      
      inventory.set(id_product,{'id_product':id_product,'name':name,'price':price,'number':number, 'description':description, 'brand':brand})
      // Leer el contenido actual del archivo JSON
      const jsonContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(jsonContent);
  
    // Agregar el nuevo registro al objeto 'data'
      data[id_product] = {
      id_product: id_product,
      name: name,
      price: price,
      number: number,
      description: description,
      brand: brand
    };
  
    // Convertir el objeto 'data' en una cadena JSON
    const updatedJsonContent = JSON.stringify(data, null, 2);
  
    // Escribir el contenido actualizado en el archivo JSON
    fs.writeFileSync(filePath, updatedJsonContent, 'utf8');

    inventory = new Map(Object.entries(data));
    res.redirect('/inventory')
    // res.end(`<script>window.location.reload();</script>`);
    

});

router.post('/pdf', (req, res) => {
  console.log('entro a generar pdf');

  const jsonContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonContent);
  const doc = new PDFDocument();

  // Encabezado del PDF
  doc.fontSize(18).text('Detalles del Producto', { align: 'center' });
  doc.moveDown();
  // Contenido del PDF
  // console.log(inventory);
  Object.values(data).forEach(product => {
    doc.fontSize(12)
      .text(`ID: ${product.id_product}`)
      .text(`Nombre: ${product.name}`)
      .text(`Precio: ${product.price}`)
      .text(`Cantidad: ${product.number}`)
      .text(`Descripción: ${product.description}`)
      .text(`Marca: ${product.brand}`)
      .moveDown();
  });

  // // Guardar el archivo PDF en el servidor
  const pdfFilePath = path.join(__dirname, '..', 'resources', 'product_details.pdf');
  doc.pipe(fs.createWriteStream(pdfFilePath));
  doc.end();

  res.download(pdfFilePath); // Descargar el archivo PDF generado
  
});



module.exports = router
