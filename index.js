const express = require("express");
const { connection } = require("./configs/db");
const { userRoute } = require("./routes/user.route");
const { notesRouter } = require("./routes/notes.route");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", userRoute);
app.use("/notes", notesRouter);

app.listen(8080, async () => {
  await connection;
  console.log("Server is Running on Port No 8080");
});
