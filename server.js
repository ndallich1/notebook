const express = require("express");
const path = require("path");

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

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
