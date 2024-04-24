import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import PosterCarousel from "../components/poster_carousel.jsx"
import MovieReview from "../components/movie_review.jsx";
import SimilarCarousel from "../components/similar_carousel.jsx";
import { Flex, Spin } from 'antd';
import "../styles/home.css";
import "../styles/movie.css"

export default function Movie({ moviesPerPage }) {
    const { id } = useParams();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    //  const moviesPerPage = queryParams.get('moviesPerPage');
    const [movie, setMovie] = useState(null);
    const [posters, setPosters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы актёров
    const actorsPerPage = 10; // Количество актёров на одной странице
    const API_URL = `https://api.kinopoisk.dev/v1.4/movie/${id}`;

    
    const getApiData = async () => {
        fetch(API_URL, {
            headers: {
                'X-API-KEY': process.env.TOKEN
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setMovie(data);
                console.log(data.similarMovies);
                // console.log(data.isSeries);
                //data.seasonsInfo.forEach((season) => console.log (season.number) )
            })
            .catch(e => {
                console.log(`Проверьте токен ${e}`);
            });
    };

    useEffect(() => {
        getApiData();
    }, [API_URL]);

    if (!movie || typeof id === 'undefined') {
        return <div>Loading...</div>;
    }


    const indexOfLastActor = currentPage * actorsPerPage;
    const indexOfFirstActor = indexOfLastActor - actorsPerPage;
    const currentActors = movie.persons.slice(indexOfFirstActor, indexOfLastActor);

    const onClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movie.persons.length / actorsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <>
            <div className="background_movie"><img src={movie.poster.url} alt="" /></div>
            {<Link to={`/?page=${currentPage}&limit=${moviesPerPage}`}>
                <button>Назад</button>
            </Link>
            }

            {(!movie) ? (
                <Flex align="center" gap="middle">
                    <Spin size="large" />
                </Flex>
            ) : (
                <div className="movie-page">
                    <div className="movie-poster">
                        <img src={movie.poster.url} alt={movie.name} />
                        <PosterCarousel movie_id={id} />
                    </div>
                    <div className="movie-main">
                        <h2 className="movie-page-name">{movie.name}</h2>
                        <div className="country-year">
                            <p>{movie.countries.map(country => country.name).join(", ")} </p>
                            <p>{movie.year}</p>
                        </div>
                        <div className="imdb-rate">Рейтинг IMDb: {movie.rating.imdb}</div>
                        <div className="movie-genres">{movie.genres.map(genre => <span className="movie-genre">{genre.name}</span>)}</div>
                        <p>{movie.description}</p>
                    </div>
                    <div className="movie-actors">
                        <div className={Number(movie.rating.kp) >= 8 ? "rating green" : " rating grey"}>{Math.round(Number(movie.rating.kp) * 100) / 100}</div>
                        <h3 className="movie-actors-title">Список актёров</h3>
                        <ul className="movie-actors-list">
                            {currentActors.map((actor, index) => (
                                <li key={index}>{actor.name}</li>
                            ))}
                        </ul>
                        <ul className="pagination">
                            {pageNumbers.map((number) => (
                                <li key={number} className={currentPage === number ? "selected" : ""} onClick={() => onClick(number)}>
                                    {number}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {(movie.similarMovies) ? <SimilarCarousel movies={movie.similarMovies} /> : <>Информации о похожих фильмах нет</>}

            {/* <div className="similar-carousel">

                <h2>Похожие фильмы</h2>
                <Slider {...settings}>
                <div className="similar-container">
                
                    {movie.similarMovies && movie.similarMovies.map(similar_movie => (
                        // <Link to={`/similar_movie/${similar_movie.id}`}>
                       
                        // </Link>
                    ))}
                     </div>
                </Slider>
               
               
            </div>  */}
            <MovieReview movie_id={id} />
        </>
    );
}




{/* <div className="movie-card">
                   
                    <div className="movie-info"> */}




{/* </div>
                </div> */}
{/* <h1>{movie.name}</h1>
                <p>{movie.description}</p>
                <p>Рейтинг: {movie.rating.imdb}</p>
                <img src={movie.poster.url} alt={movie.name} /> */}