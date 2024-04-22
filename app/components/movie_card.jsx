import React from "react";
import { Flex, Spin } from 'antd';
import "../styles/home.css";


const MovieCard = ({ movie_info }) => {
    console.log(movie_info)
    return (
        <div className="movie-card">
            <div className="movie-image" >
                {(!movie_info.poster || !movie_info.poster.url) ? (
                    <span className="stub">Нет постера</span>
                ) : (
                    <img src={movie_info.poster.url} alt={movie_info.name} />
                )}
            </div>
            <div className="movie-info">
                <h2 className="movie-name">{movie_info.name}</h2>
                <div className="country-year">
                    <p>{movie_info.countries.map(country => country.name).join(", ")} </p>
                    <p>{movie_info.year}</p>
                </div>
                {/* <div className="imdb-rate">Рейтинг IMDb: {movie_info.rating.imdb}</div> */}
                <div className="movie-genres">{movie_info.genres.map(genre => <span className="movie-genre"> {genre.name}</span>)}</div>
                {(!movie_info.rating || !movie_info.rating.kp) ? (
                    <div className="kinopoisk-rate grey">0</div>
                ) : (
                    <div className={Number(movie_info.rating.kp) >= 8 ? "kinopoisk-rate green" : "kinopoisk-rate grey"}>
                        {Math.round(Number(movie_info.rating.kp) * 100) / 100}
                    </div>
                )}<p className="movie-description">{movie_info.description}</p>
            </div>
        </div>
    );
};

export default MovieCard;