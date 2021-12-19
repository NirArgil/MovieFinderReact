const express = require("express");
require('dotenv').config();
const fetch = require('node-fetch');
const initStateMovies = require('./initStateMovies.js');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const apiKey = process.env.API_KEY;

app.get("/api/get-movie/:IDmovie", (req, res) => {
  try {
    const IDmovie = req.params.IDmovie;

    fetch(`http://www.omdbapi.com/?&apikey=${apiKey}&i=${IDmovie}`)
      .then(res => res.json())
      .then(data => {
        res.send({ data })
      })
  } catch (err) {
    res.sendStatus(400);
    console.error(err);
  }
})

app.get("/api/moviesByID", (req, res) => {
  try {
    const promises = initStateMovies.map(Movie => {
      return fetch(`http://www.omdbapi.com/?&apikey=${apiKey}&i=${Movie.imdbID}`)
        .then(res => res.json())
        .then(MovieDataByID => Promise.resolve(MovieDataByID))
        .catch(e => Promise.reject(new Error(e)));
    });

    Promise.all(promises).then(MovieDataByID => {
      res.send(MovieDataByID)
    }).catch(e => {
      console.log('Whoops something went wrong!', e);
    });

  } catch (err) {
    console.error(err);
  }
})

app.get("/api/:searchTerm", (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;

    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        res.send({ data })
      })
  } catch (err) {
    console.error(err);
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});