// npm install express body-parser cors
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para parsear JSON y habilitar CORS
app.use(bodyParser.json());
app.use(cors());

// Lista de usuarios en memoria
const users = [];

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// POST: Agregar un usuario
app.post('/data', (req, res) => {
  console.log('\n[POST] Datos recibidos:', req.body);
  
  users.push(req.body);

  res.json({
    status: 'Datos recibidos!',
    receivedData: req.body
  });

  console.log('Lista actual de usuarios:', users);
});

// GET: Obtener todos los usuarios
app.get('/users', (req, res) => {
  console.log('\n[GET] Se ha solicitado la lista de usuarios.');
  console.log('Usuarios actuales:', users);

  res.json(users);
});

// DELETE: Eliminar un usuario por email
app.delete('/users/:email', (req, res) => {
  const email = req.params.email;
  console.log(`\n[DELETE] Eliminando usuario con email: ${email}`);

  const index = users.findIndex(user => user.email === email);

  if (index !== -1) {
    users.splice(index, 1);
    console.log('Usuario eliminado correctamente.');
    console.log('Lista actualizada de usuarios:', users);
    res.json({ status: 'Usuario eliminado correctamente' });
  } else {
    console.log('[ERROR] Usuario no encontrado.');
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// PUT: Actualizar un usuario por email
app.put('/users/:email', (req, res) => {
  const email = req.params.email;
  const { nombre, nuevoEmail } = req.body;

  console.log(`\n[PUT] Intentando actualizar usuario con email: ${email}`);
  console.log('Datos de actualización recibidos:', req.body);

  const user = users.find(user => user.email === email);

  if (user) {
    user.nombre = nombre || user.nombre;
    user.email = nuevoEmail || user.email;

    console.log('Usuario actualizado correctamente.');
    console.log('Lista actualizada de usuarios:', users);
    res.json({ status: 'Usuario actualizado correctamente' });
  } else {
    console.log('[ERROR] Usuario no encontrado.');
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
