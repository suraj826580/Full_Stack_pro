const { default: mongoose } = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    category: String,
    author: String,
    authorID: String,
  },
  {
    versionKey: false,
  }
);
const NoteModel = mongoose.model("note", NoteSchema);

module.exports = { NoteModel };
