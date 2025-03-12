require("dotenv").config(); // Cargar variables de entorno desde .env

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const dbConnect = require("./config/db");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Montar rutas
app.use("/api/user", userRoutes);

// Conectar a la BBDD y arrancar el servidor
dbConnect().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});
