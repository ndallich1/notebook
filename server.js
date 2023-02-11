const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");
const dbJSON = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

// basic middleware to add to express projects that acts as a bridge between an operating system or database and applications, especially on a network.
app.use(express.static("public"));
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // this allows express to understand variables in the route

// get route for index.html
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// get route for notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.post("api/notes", (req, res) =>
  res.json(`${req.method} request received to add note`)
);

app.get("/api/notes", (req, res) => res.json(dbJSON));

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  // Destructuring assignment for the items in req.body
  const { title, text, id } = req.body;

  // If all the required properties are present
  if (req.body) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    dbJSON.push(newNote);

    readAndAppend(newNote, "./db/db.json");

    res.json("Note added successfully");
  } else {
    res.json("Error in posting note");
  }
});

// app.delete("/api/notes/:id", (req, res) => res.send(`DELETE route`));
app.delete("/api/notes/:id", (req, res) => {
  res.send("DELETE Request Called");
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
