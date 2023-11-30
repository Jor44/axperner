import React from "react";
import { useGlobalContext } from "./context/AuthProvider";
import { NavLink } from "react-router-dom";
import './movies.scss'

const Movies = () => {
    const { movie, isLoading } = useGlobalContext();

    if (isLoading) {
        return (
            <div className="">
                <div className="loading">Loading...</div>
            </div>
        )
    }
    return (
        <section className="movie-page">
            <div className="container grid grid-4-col">
                {movie.map((curMovie) => {
                    const { imdbID, Title, Poster } = curMovie;
                    const movieName = Title.substring(0, 25)
                    return (
                        <NavLink to={`movie/${imdbID}`} key={imdbID}>
                            <div className="card">
                                <div className="card-info">
                                    <h2>
                                        {movieName.length >= 25 ? `${movieName}...` : movieName}
                                    </h2>
                                    <img src={Poster} alt={imdbID} />
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </section>
    )
}

export default Movies