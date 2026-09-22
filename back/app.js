const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.get("/dades", (req, res) => {
  fs.readFile("preguntes.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error llegint preguntes.json");
    }

    res.json(JSON.parse(data));
  });
});

app.post("/respostes", (req, res) => {
  const dades = req.body;
  console.log(dades)
  console.log("Ara em connecto a la base de dades i per cada pregunta miro si esta be o malament")
  for (let i=0;i<dades.contadorPreguntes;i++){
    console.log(`comprovo si la pregunta ${dades.respostesUsuari[i].id} amb resposta
                ${dades.respostesUsuari[i].resp} es correcta o no`)
  }
  const total = dades.contadorPreguntes;

  //ME INVENTO LAS CORRECTAS Y LAS FALSAS
  const correctes = Math.floor(Math.random() * (total + 1));
  const incorrectes = total - correctes;
      res.json({
        correctes: correctes,
        incorrectes: incorrectes
      });
  });

app.listen(PORT, () => {
  console.log(`Servidor funcionant a http://localhost:${PORT}`);
});