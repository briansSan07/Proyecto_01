const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'brian',
  database: 'inventario'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/crear-producto', (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body;
  
    // Validar que precio y cantidad sean numéricos
    if (isNaN(precio) || isNaN(cantidad)) {
      return res.status(400).send('El precio y la cantidad deben ser valores numéricos.');
    }
  
    const sql = 'INSERT INTO productos (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, descripcion, precio, cantidad], (err, result) => {
      if (err) {
        console.error('Error al crear el producto:', err);
        return res.status(500).send('Error al crear el producto');
      }
      res.send('Producto creado con éxito');
    });
  });
  

// Ruta para ver todos los productos
app.get('/ver-productos', (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Ruta para actualizar un producto
app.put('/actualizar-producto/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, cantidad } = req.body;
  
    // Validar que nombre, descripcion, precio y cantidad no estén vacíos
    if (!nombre || !descripcion || isNaN(precio) || isNaN(cantidad) || precio === '' || cantidad === '') {
      return res.status(400).send('Datos inválidos. Asegúrate de que todos los campos estén llenos y que precio y cantidad sean numéricos.');
    }
  
    const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE id = ?';
    db.query(sql, [nombre, descripcion, precio, cantidad, id], (err, result) => {
      if (err) {
        console.error('Error al actualizar el producto:', err);
        return res.status(500).send('Error al actualizar el producto');
      }
      res.send('Producto actualizado con éxito');
    });
  });
  

// Ruta para eliminar un producto
app.delete('/eliminar-producto/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM productos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Producto eliminado con éxito');
  });
});

// Iniciar el servidor
app.listen(3001, () => {
  console.log('Servidor ejecutándose en el puerto 3001');
});
