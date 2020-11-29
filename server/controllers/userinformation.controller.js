const db = require("../models");
const note = db.notes;
exports.getnotes = (req, res) => {
  //var email = req.body.id;
  console.log('get notes');
  note.aggregate([{ $sort: { id: -1 } }])
    .then(data => {
      if (!data)
        res.status(404).send({ message: "notes not found " });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving with fetching" });
    });
}
exports.savenotes = (req, res) => {
  console.log(data);
  // Create a Tutorial
  if (!data)
    res.status(404).send({ message: "notes not found " });
  const notes = new Notes({
    title: req.body.title,
    text: req.body.text,
    id: req.body.id
  });
  Notes
    .create(notes)
    .then(data => {
      res.send({ status: true });
    })
    .catch(err => {
      res.send({
        status: false,
        message:
          err.message || "Some error occurred while creating the notes."
      });
    });


}

exports.deletenotes = (req, res) => {
  const id = req.params.id;
  Notes.updateOne({ $id: id }, { $set: { delete: true } })
    .then(data => {
      if (!data) {
        res.send({ status: false });
      }
      else {
        res.send({ status: true });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ status: "Error retrieving with id=" + id });
    });
}

exports.updatenotes = (req, res) => {
  const id = req.body.id;
  const text = req.body.text;
  const title = req.body.title;
  Notes.updateOne({ $id: id }, { $set: { text: text, title: title } })
    .then(data => {
      if (!data) {
        res.send({ status: false });
      }
      else {
        res.send({ status: true });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ status: "Error retrieving with id=" + id });
    });
}