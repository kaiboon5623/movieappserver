const mongoose = require('mongoose');
const db = 'mongodb://imkb:pwd123456@ds053449.mlab.com:53449/kbassignment';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  id: { type: String },
  name: { type: String },
  description: { type: String },
  health: { type: String },
  age: { type: String },
  height: { type: String },
  youtubeurl: { type: String }
});

const assignment = mongoose.model('assignment', schema, 'assignmentCollection');

module.exports = assignment;
