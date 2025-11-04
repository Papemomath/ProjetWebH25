import React, { useEffect } from 'react';
import "./MoviePage.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import useMoviePage from '../../hooks/useMoviePage';
import useUtils from '../../utils/useUtils';
import { troubleShoot } from '../../utils/useUtils';
import MovieCard from '../../component/movieCard/MovieCard';
import { CiFilter } from "react-icons/ci";
import { FaArrowAltCircleUp } from "react-icons/fa";
import ScrollView from '../../utils/ScrollView';


function MoviePage() {
    const { movieRate,moviesTrending, movieFindByFiltre, page, maxPage, genresMovie, imageFiltre, setPage, setMovieRate, handleDisplayGenre, handleCheckCheckbox, handlefiltre, handleResetfiltre } = useMoviePage();

    const { handleDetail, loader } = useUtils();


    // function handleStyleRate(rate) {
    //     if (rate == "now_playing") {
    //         document.getElementById("now_playing").style.textDecoration = "underline";
    //     }
    // }

    if (!moviesTrending) return loader();
    troubleShoot();

    useEffect(() => {
        window.scrollTo({   
        top: 0,
        behavior: "smooth"
        });
    }, [page]);

    return (
        <div className='movie-container'>

            <ScrollView/>

            <h1 className='title'>Movies</h1>
            <div className="content-filter" style={{ color: localStorage.getItem("Title-Colors")}}>
                <div className="filters">
                    <a id='latest-flt' onClick={() => setMovieRate('now_playing')}>Latest</a>
                    <a id='trending-flt' onClick={() => setMovieRate('trending')}>Trending </a>
                    <a id='topRated-flt' onClick={() => setMovieRate('top_rated')}>Top-Rated</a>
                </div>

                <a id='genre' onClick={handleDisplayGenre}><span style={{ paddingRight: "4px" }}><CiFilter style={{fontSize:"20px"}}/></span>Filtrer</a>
            </div>

            <div className="filter-genre" id='filter-genre' style={{ display: "none" }}>
                <form>
                    {
                        genresMovie && genresMovie.map((genre) => (
                            <div key={genre.id}>
                                <label id='container' onClick={(e) => e.currentTarget.style.color = e.currentTarget.style.color === "rgb(95, 94, 94)" ? localStorage.getItem("Title-Colors") : "rgb(95, 94, 94)"}>
                                    <input id={genre.id} onChange={() => handleCheckCheckbox(genre.id)} type="checkbox" />
                                    <span>{genre.name}</span>
                                </label>
                            </div>
                        ))
                    }
                </form>
                <button id='confirmGenreBtn' onClick={handlefiltre}>Appliquer</button>
                <button onClick={handleResetfiltre}>Reset</button>
            </div>

            <div className="content">
                {
                    movieFindByFiltre.length > 0 ?
                        movieFindByFiltre.map((movie) => (
                            <div key={movie.id} onClick={() => handleDetail("movie", movie.id, movie.title)}>
                                <MovieCard url={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} title={movie.title} />
                                
                            </div>
                        ))
                        :
                        moviesTrending.map((movie) => (
                            <div key={movie.id} onClick={() => handleDetail("movie", movie.id, movie.title)}>
                                <MovieCard url={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} title={movie.title} />

                            </div>
                        ))
                }
            </div>
            
            <div className='pagination-box'>
                <div className="pagination">
                    <FaRegArrowAltCircleLeft id='left' style={{ color: localStorage.getItem("Title-Colors") }}
                        onClick={page > 1 ? () => setPage(page - 1) : () => setPage(1)} />

                    <h2>{page}/{maxPage}</h2>

                    <FaRegArrowAltCircleRight id='right' style={{ color: localStorage.getItem("Title-Colors") }}
                        onClick={page <= maxPage ? () => setPage(page + 1) : () => setPage(maxPage)} />
                </div>
            </div>
        </div>
    );
}
export default MoviePage;