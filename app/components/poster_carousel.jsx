import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import "../styles/movie.css";

export default function PosterCarousel({movie_id}) {
    const [posters, setPosters] = useState([]);
    const API_URL_POSTERS = `https://api.kinopoisk.dev/v1.4/image?page=1&limit=10&movieId=${movie_id}`;

    const getApiPosters = async () => {
        fetch(API_URL_POSTERS, {
            headers: {
                'X-API-KEY': process.env.TOKEN
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setPosters(data.docs);
            })
            .catch(e => {
                console.log(`Проверьте токен ${e}`);
            });
    };


    useEffect(() => {
        getApiPosters();
    }, [API_URL_POSTERS]);

    return (
        <>
            <h4>Кадры, постеры</h4>
            <div className="carousel-container">
            <Carousel autoplay>
                {posters.map((poster, index) => (
                    <div key={index}>
                        <img src={poster.url} alt={`Poster ${index}`} />
                    </div>
                ))}
            </Carousel>
        </div>
            {/* <div className="posters-container">
                {posters.map((poster, index) => (
                    <img key={index} src={poster.url} alt={`Poster ${index}`} />
                ))}
            </div> */}
        </>
    )
}