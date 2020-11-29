const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var db = mongoose.createConnection("mongodb://localhost:27017/notes_db",{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true   });

db.mongoose = mongoose;


const noteSchema = new mongoose.Schema({
  title:{type:String, required:true},
  text:{type:String, required:true},
  id:{type:Number, required:true}
})
db.notes = db.model('notes', noteSchema);

module.exports = db;