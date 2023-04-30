const { Router } = require("express");
const { auth } = require("../middleware/auth.middleware");
const { NoteModel } = require("../models/NoteModels");

const notesRouter = Router();

notesRouter.post("/create", auth, async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "New Note has been Added" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});
notesRouter.get("/", auth, async (req, res) => {
  const notes = await NoteModel.find({ authorID: req.body.authorID });
  res.send(notes);
});
notesRouter.patch("/update/:noteId", auth, async (req, res) => {
  const { noteId } = req.params;
  const user = await NoteModel.findOne({ _id: noteId });
  try {
    if (req.body.authorID !== user.authorID) {
      res.send({ msg: "You are Not Authorized to do this Action" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: noteId }, req.body);
      res.send({ msg: "Updated" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
notesRouter.delete("/delete/:noteId", auth, async (req, res) => {
  const { noteId } = req.params;
  const user = await NoteModel.findOne({ _id: noteId });
  try {
    if (req.body.authorID !== user.authorID) {
      res.send({ err: "You are Not Authorized to do this Action" });
    } else {
      await NoteModel.findByIdAndDelete({ _id: noteId });
      res.send({ msg: "Deleted" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { notesRouter };
