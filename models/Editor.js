// models/Editor.js

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const editorSchema = new Schema({
  name: String,
});

const Editor = mongoose.model("Editor", editorSchema);
module.exports = Editor;