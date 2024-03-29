require("dotenv").config();
const express = require("express");
const Note = require("./models/note");

const app = express();
app.use(express.static("dist"));
app.use(express.json());

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id).then((note) => {
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  }).catch((e) => next(e));
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  }).catch((e) => next(e));
});

app.post("/api/notes", (request, response, next) => {
  const { body } = request;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  }).catch((e) => next(e));
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(request.params.id, { content, important }, {
    new: true,
    runValidators: true,
    context: "query",
  }).then(
    (updatedNote) => {
      response.json(updatedNote);
    },
  ).catch((e) => next(e));
});

app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
