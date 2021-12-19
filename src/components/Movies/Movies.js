import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar.js';
import Card from '../Card/Card.js';
// import * as initStateMovies from '../../initStateMovies';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  const searchMovie = (e) => {
    e.preventDefault();

    const apiURL = `http://localhost:3001/api/${searchTerm}`;
    fetch(apiURL)
      .then(res => res.json())
      .then((result) => {
        setMovies(result.data.Search)
      })
  }

  const getMyMovies = () => {
    const URL = `http://localhost:3001/api/moviesByID`;

    fetch(URL)
      .then(res => res.json())
      .then((moviesData) => {
        setMovies(moviesData)
      })
    }

  useEffect(() => {
    getMyMovies()
  }, [])

  return (
    <div>
      <Navbar
        searchMovie={searchMovie}
        searchTerm={searchTerm}
        setsearchTerm={setsearchTerm}
      />

      <div className="cardlistMovies">
        {movies
          ? movies.filter((movie) => movie.Poster).map((movie) => <Card key={movie.imdbID} movie={movie} />)
          : <h3>Movie Not Found, Try another movie</h3>}
      </div>
    </div>
  )
}

export default Movies;