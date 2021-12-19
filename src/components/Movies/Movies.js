import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar.js';
import Card from '../Card/Card.js';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');

    const searchMovie = (e) => {
        e.preventDefault();

        let apiURL = `http://localhost:3001/api/${searchTerm}`
        fetch(apiURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(res => res.json())
            .then((result) => {
                setMovies(result.data.Search)

            })
    }

    useEffect(() => {
        let URL = `http://localhost:3001/api/super`

        fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(res => res.json())
            .then((result) => {
                setMovies(result.data.Search)

            })
    }, [])

    return (
        <div>
            <Navbar
                searchMovie={searchMovie}
                searchTerm={searchTerm}
                setsearchTerm={setsearchTerm}
            />

            <div className="cardlistMovies">
                {movies ? movies.filter((movie) => movie.Poster).map((movie) => <Card key={movie.imdbID} movie={movie} />)
                    :
                    <h3>Movie Not Found, Try another movie</h3>}
            </div>
        </div>
    )
}

export default Movies;