const express = require("express");
const port = 3000;
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`El numero de nucleos es ${totalCPUs}`);
  console.log(`Master ${process.pid} esta activo`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Proceso secundario ${worker.process.pid} finalizado`);
    console.log("Creamos otro proceso secundario");
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`Proceso ${process.pid} iniciado`);

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
}

