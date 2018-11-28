const express = require('express');
const app = express();
const axios = require('axios');
const Assignment = require('./assignment');
const youtubeapikey = 'AIzaSyC4vvaXvMlvXcvq5CmeZFFUFqTvBeK99vo';
//const path = require('path'); //---heroku---
const cors = require('cors');
// const apikey = '385e80';

const port = process.env.PORT || 3000;

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//localhost:5000/gethero?id=id
app.get('/gethero', (req, res) => {
  const id = req.query.id;
  const querystr = `https://overwatch-api.net/api/v1/hero/${id}`;

  axios.get(querystr).then(response => {
    const id = response.data.id;
    const name = response.data.name;
    const description = response.data.description;
    const health = response.data.health;
    const age = response.data.age;
    const height = response.data.height;
    const oname = `${name} Origin Story`;

    const querystr2 = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${oname}&maxResults=5&key=${youtubeapikey}`;
    axios
      .get(querystr2)
      .then(response2 => {
        const videoid = response2.data.items[0].id.videoId;
        const url = `www.youtube.com/watch?v=${videoid}`;
        const youtubeimg = youtuberes.data.items[0].snippet.thumbnails.high.url;
        const assignment = new Assignment({
          youtubeurl: url,
          id: id,
          tubeimg: youtubeimg,
          name: name,
          description: description,
          health: health,
          age: age,
          height: height
        });
        return assignment.save();
      })

      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        console.log(error);
        res.status(400).json(error);
      });
  });
});

//localhost:3000/getallheroes
app.get('/getallheroes', (req, res) => {
  Assignment.find({})
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

//localhost:3000/deletehero?id=id
app.get('/deletehero', (req, res) => {
  Assignment.deleteMany({ id: req.query.id })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
