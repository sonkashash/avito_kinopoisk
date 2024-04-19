import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/movie_card.jsx";
import Header from "../components/header.jsx";
import "../styles/home.css";
import { Flex, Spin, Select, Pagination } from 'antd';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [filters, setFilters] = useState({});
  const [searchText, setSearchText] = useState("");
  const containerRef = useRef(null); 
  const API_URL = 'https://api.kinopoisk.dev/v1.4/movie';


  const getApiData = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append('query', searchText);
    queryParams.append('limit', moviesPerPage);
    queryParams.append('page', currentPage); 
    for (const key in filters) {
      if (filters[key] !== "") {
        queryParams.append(key, filters[key]);
      }
    }
    const queryString = queryParams.toString();

    fetch(searchText? (`${API_URL}/search?${queryString}`
) : `${API_URL}?${queryString}`, {
      headers: {
        'X-API-KEY': process.env.TOKEN
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setMovies(data.docs);

        setTotalPages(data.pages);
        setTotalElements(data.total)

      })
      .catch(e => {
        console.log(`Проверьте токен ${e}`);
      });
  };
  console.log(totalPages)
  useEffect(() => {
    getApiData();
  }, [currentPage, moviesPerPage, filters, searchText]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  const handleFilterChange = (key, value) => {
    setFilters(prevState => ({
      ...prevState,
      [key]: value
    }));
    setCurrentPage(1);
  };

  const handleSearchInput = (event) => {
    setSearchText(event.target.value);
  };

  // const filteredMovies = searchText? movies.filter(movie =>
  //       movie.name.toLowerCase().includes(searchText.toLowerCase())
  //      ) : movies;
       

  return (
    <div ref={containerRef} className="home-container"> 
    <Header searchText={searchText} onSearchInput={handleSearchInput} />
    <div className="filters">
            <Select defaultValue="" onChange={(value) => handleFilterChange('year', value)}>
              <Select.Option value="">Все годы</Select.Option>
              <Select.Option value="2023">2023</Select.Option>
              <Select.Option value="2022">2022</Select.Option>
              <Select.Option value="2021">2021</Select.Option>
              <Select.Option value="2020">2020</Select.Option>
              <Select.Option value="2019">2019</Select.Option>
              <Select.Option value="2018">2018</Select.Option>
              <Select.Option value="2017">2017</Select.Option>
              <Select.Option value="2016">2016</Select.Option>
              <Select.Option value="2015">2015</Select.Option>
              <Select.Option value="2014">2014</Select.Option>
              <Select.Option value="2013">2013</Select.Option>
              <Select.Option value="2012">2012</Select.Option>
              <Select.Option value="2011">2011</Select.Option>
              <Select.Option value="2010">2010</Select.Option>
            </Select>
            <Select defaultValue="" onChange={(value) => handleFilterChange('countries.name', value)}>
              <Select.Option value="">Все страны</Select.Option>
              <Select.Option value="США">США</Select.Option>
              <Select.Option value="Россия">Россия</Select.Option>
              <Select.Option value="Великобритания">Великобритания</Select.Option>
              <Select.Option value="Китай">Китай</Select.Option>
              <Select.Option value="Франция">Франция</Select.Option>
              <Select.Option value="Индия">Индия</Select.Option>
              <Select.Option value="Германия">Германия</Select.Option>
              <Select.Option value="СССР">СССР</Select.Option>
              <Select.Option value="Канада">Канада</Select.Option>
              <Select.Option value="Италия">Италия</Select.Option>
            </Select>
            <Select defaultValue="" onChange={(value) => handleFilterChange('ageRating', value)}>
              <Select.Option value="">Все возрастные рейтинги</Select.Option>
              <Select.Option value="0">0+</Select.Option>
              <Select.Option value="6">6+</Select.Option>
              <Select.Option value="12">12+</Select.Option>
              <Select.Option value="16">16+</Select.Option>
              <Select.Option value="18">18+</Select.Option>
            </Select>
          </div>
      {(!movies.length) ? (
        <Flex align="center" gap="middle" className="spinner">
          <Spin size="large" />
        </Flex>
      ) : (
        <>
          <div className="movie-list">
            {movies.map(movie => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <MovieCard key={movie.id} movie_info={movie} />
              </Link>
            ))}
          </div>
          <Pagination current={currentPage} total={totalElements} onChange={handlePageChange} onShowSizeChange={(current, pageSize)=>setMoviesPerPage(pageSize)}/>
        </>
      )}
    </div>
  );
}

