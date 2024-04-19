import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import "../styles/movie.css";

export default function MovieReview({movie_id}) {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);
    const API_URL_REVIEW = `https://api.kinopoisk.dev/v1.4/review?page=${currentPage}&limit=10&movieId=${movie_id}`;

    const getApiReview = async () => {
        fetch(API_URL_REVIEW, {
            headers: {
                'X-API-KEY': process.env.TOKEN
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.docs)
                setReviews(data.docs);
                setTotalReviews(data.total);
            })
            .catch(e => {
                console.log(`Проверьте токен ${e}`);
            });
    };


    useEffect(() => {
        getApiReview();
    }, [currentPage, movie_id]);



    return (
        <div className="reviews-container">
        <h2>Отзывы</h2>
        <div className="reviews-list">
            {reviews.map((review, index) => (
                <div key={index} className="review">
                    <p className="review-content">{review.review}</p>
                    <h1 className="review-author">Автор: {review.author}</h1>
                </div>
            ))}
        </div>
        <Pagination defaultCurrent={1} onChange={(page) => setCurrentPage(page)} total={totalReviews} showSizeChanger={false} />
        {/* onShowSizeChange={(current, pageSize)=>setMoviesPerPage(pageSize)} */}
    </div>
    )
}