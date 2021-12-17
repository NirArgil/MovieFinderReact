import React, { Fragment } from 'react';
import './Navbar.css';

const Navbar = ({ searchMovie, searchTerm, setsearchTerm, movies }) => {
    return (
        <Fragment>
            <div className="navbar">
                <h3 className="title">Movie-search</h3>

                <div className="search">
                    <form className="search-form" onSubmit={searchMovie}>
                        <label
                            htmlFor="query"
                            className="name"
                        >
                        </label>
                        <input
                            type="text"
                            name="query"
                            placeholder="i.e Guardians of the Galaxy Vol. 2"
                            value={searchTerm}
                            onChange={(e) => setsearchTerm(e.target.value)}
                        />
                        <button className="NavButton" type="submit">Search</button>
                    </form>
                </div>
            </div>


        </Fragment>
    )
}

export default Navbar;