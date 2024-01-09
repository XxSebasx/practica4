const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.get("/api/:n", function (req, res) {
  let n = parseInt(req.params.n);
  let contador = 0;

  if (n > 5000000000) {
    n = 5000000000; // Corregido el nombre de la variable y añadido el bloque de código.
  }

  for (let i = 0; i <= n; i++) {
    contador += i;
  }

  res.send(`La cuenta final es ${contador}`);
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});
