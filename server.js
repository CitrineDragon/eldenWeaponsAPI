const express = require('express');
const fs = require('fs');
const cors = require('cors');
const data = require('./weapons.json');
const PORT = 8000;

const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

app.get('/api/', (request, response) => {
  response.json(data);
});

app.get('/api/:class', (request, response) => {
  const weaponClass = request.params.class;
  if (data[weaponClass]) {
    response.json(data[weaponClass]);
  } else {
    response.json(data['unknown']);
  }
});

app.get('/api/:class/:name', (request, response) => {
  const weaponClass = request.params.class;
  const weaponName = request.params.name;
  if (data[weaponClass][weaponName]) {
    response.json(data[weaponClass][weaponName]);
  } else {
    response.json(data['unknown']);
  }
});

app.get('/style.css', (request, response) => {
  response.sendFile(__dirname + '/public/style.css');
});

app.get('/main.js', (request, response) => {
  response.sendFile(__dirname + '/public/main.js');
});

// defines what port my app will be served on
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
