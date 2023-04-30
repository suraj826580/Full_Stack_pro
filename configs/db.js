const { default: mongoose } = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://surajyadav8265:8265807053@cluster0.nlfobqe.mongodb.net/UserDB?retryWrites=true&w=majority"
);

module.exports = { connection };
