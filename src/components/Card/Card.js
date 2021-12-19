import React, { useState } from 'react';
import './Card.css'

const Card = ({ movie }) => {
    const [MovieDatabyID, setMovieDatabyID] = useState({})
    const [newDetails, setNewDetails] = useState(false)

    const moreDetails = ({ currentTarget }) => {
        const movieId = currentTarget.getAttribute("data-video-id")

        let apiURL = `http://localhost:3001/api/get-movie/${movieId}`

        fetch(apiURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then((result) => {

                setMovieDatabyID(result.data);
                setNewDetails(true)
            })
    }


    return (
        <div className="cardlistMovies">
            {newDetails
                ? <div className="movieNewDetails">
                    <h3 className="heading">{MovieDatabyID.Title}</h3>
                    <p className="paragraph">Summary: {MovieDatabyID.Plot}</p>
                    <p className="paragraph">imdb Rating: {MovieDatabyID.imdbRating}</p>
                    <p className="paragraph">Year: {MovieDatabyID.Year}</p>
                    <p className="paragraph">Genre: {MovieDatabyID.Genre}</p>

                    <button className="toMoviesButton" onClick={() => setNewDetails(false)}>return to main card</button>
                </div>
                :
                <div className="card">
                    <img
                        className="movieImage"
                        src={movie.Poster}
                        alt="postal"
                    />
                    <div className="movieDetails" >
                        <p className="heading">{movie.Title}</p>
                        <button className="moreDetailsButton" onClick={moreDetails} data-video-id={movie.imdbID}>More Details</button>
                    </div>
                </div>
            }

        </div>

    )
}

export default Card;