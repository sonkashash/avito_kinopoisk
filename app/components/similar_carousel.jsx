import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/movie.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const SimilarCarousel = ({ movies }) => {

// SETTINGS FOR RESPONSIVE DESIGN
    // var settings = {
    //     dots: true,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     initialSlide: 0,
    //     responsive: [
    //       {
    //         breakpoint: 1024,
    //         settings: {
    //           slidesToShow: 3,
    //           slidesToScroll: 3,
    //           infinite: true,
    //           dots: true
    //         }
    //       },
    //       {
    //         breakpoint: 600,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 2,
    //           initialSlide: 2
    //         }
    //       },
    //       {
    //         breakpoint: 480,
    //         settings: {
    //           slidesToShow: 1,
    //           slidesToScroll: 1
    //         }
    //       }
    //     ]
    //   };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3
    };


    return (
        <div className="similar-container">
            <h2>Похожие фильмы</h2>
            <Slider {...settings}>
                {movies.map(movie => (
                    <div className="similar-card">
                    <Link to={`/movie/${movie.id}`}>
                        <h4 className="similar-name">{movie.name}</h4>
                        <div className="similar-poster">
                            <img src={movie.poster.url} alt={movie.name} />
                        </div> 
                    
                     </Link>
                     </div>
                ))}
            </Slider>
        </div>
    );
};

export default SimilarCarousel;