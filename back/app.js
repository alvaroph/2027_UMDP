const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 13333;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const db = mysql.createPool({
  socketPath: '/run/mysqld/mysqld.sock'
  host: "localhost",
  port: 3306,
  user: "aperezh_quiz",
  password: "InsPedralbes_2026",
  database: "aperezh_quiz"
});

app.get("/dades", async function (req, res) {

  try {

    const [files] = await db.query(`
      SELECT 
        id_pregunta AS id,
        text_pregunta AS pregunta,
        resposta1,
        resposta2,
        resposta3,
        resposta4,
        imatge
      FROM preguntes
    `);

    const preguntes = [];

    for (let i = 0; i < files.length; i++) {

      const p = files[i];

      const pregunta = {
        id: p.id,
        pregunta: p.pregunta,
        respostes: [
          { id: 1, resposta: p.resposta1 },
          { id: 2, resposta: p.resposta2 },
          { id: 3, resposta: p.resposta3 },
          { id: 4, resposta: p.resposta4 }
        ],
        imatge: p.imatge
      };

      preguntes.push(pregunta);
    }

    res.json({
      preguntes: preguntes
    });

  } catch (error) {

    console.error(error);

    res.status(500).send(
      "Error accedint a la base de dades"
    );
  }

});


app.post("/respostes", async (req, res) => {

  const dades = req.body;

  console.log(dades);

  let correctes = 0;

  try {

    for (let i = 0; i < dades.contadorPreguntes; i++) {

      const idPregunta =
        dades.respostesUsuari[i].id;

      const respostaUsuari =
        dades.respostesUsuari[i].resp;


      console.log(
        `Comprovo pregunta ${idPregunta} amb resposta ${respostaUsuari}`
      );


      const [files] = await db.query(
        "SELECT resposta_correcta FROM preguntes WHERE id_pregunta = ?",
        [idPregunta]
      );


      if (
        files.length > 0 &&
        respostaUsuari == files[0].resposta_correcta
      ) {
        correctes++;
      }

    }


    const incorrectes =
      dades.contadorPreguntes - correctes;


    res.json({
      correctes: correctes,
      incorrectes: incorrectes
    });


  } catch (error) {

    console.error(error);

    res.status(500).send(
      "Error comprovant les respostes"
    );
  }

});

// GET - obtener todas las preguntas
app.get("/preguntes", async (req, res) => {
  try {
    const [files] = await db.query("SELECT * FROM preguntes");
    res.json(files);
  } catch (error) {
    res.status(500).send("Error llegint preguntes");
  }
});


// POST - crear una pregunta
app.post("/preguntes", async (req, res) => {
  try {
    const p = req.body;

    const [resultat] = await db.query(
      `INSERT INTO preguntes
      (id_pregunta, text_pregunta, resposta1, resposta2, resposta3, resposta4, resposta_correcta, imatge)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.id_pregunta,
        p.text_pregunta,
        p.resposta1,
        p.resposta2,
        p.resposta3,
        p.resposta4,
        p.resposta_correcta,
        p.imatge
      ]
    );

    res.json({ missatge: "Pregunta creada" });

  } catch (error) {
    res.status(500).send("Error creant pregunta");
  }
});


// PUT - modificar una pregunta
app.put("/preguntes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const p = req.body;

    await db.query(
      `UPDATE preguntes
       SET text_pregunta = ?,
           resposta1 = ?,
           resposta2 = ?,
           resposta3 = ?,
           resposta4 = ?,
           resposta_correcta = ?,
           imatge = ?
       WHERE id_pregunta = ?`,
      [
        p.text_pregunta,
        p.resposta1,
        p.resposta2,
        p.resposta3,
        p.resposta4,
        p.resposta_correcta,
        p.imatge,
        id
      ]
    );

    res.json({ missatge: "Pregunta modificada" });

  } catch (error) {
    res.status(500).send("Error modificant pregunta");
  }
});


// DELETE - eliminar una pregunta
app.delete("/preguntes/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query(
      "DELETE FROM preguntes WHERE id_pregunta = ?",
      [id]
    );

    res.json({ missatge: "Pregunta eliminada" });

  } catch (error) {
    res.status(500).send("Error eliminant pregunta");
  }
});

app.listen(PORT, () => {
  console.log(
    `Servidor funcionant a http://localhost:${PORT}`
  );
});