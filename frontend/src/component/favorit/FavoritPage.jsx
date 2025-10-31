import React, { useEffect, useState } from "react";
import "./FavoritPage.css"
import MovieCard from "../movieCard/MovieCard";
import axios from "axios";
import useUtils from "../utils/useUtils";


export default function FavoritPage() {
    const [favorit, setFavorit] = useState([])    

    function deleteFavorit(movieId) {
        axios.delete(`http://localhost:8080/favoriteList/delete/${sessionStorage.getItem("id")}/${movieId}`)
        .then(() => {
            setFavorit(favorit.filter(movie => movie.movieApiId !== movieId))
        })
        .catch(error => {
            console.error("Erreur lors de la suppression :", error);
        });
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8080/favoriteList/getByListId/${sessionStorage.getItem("id")}`)
          .then(response => {
            setFavorit(response.data); 
          })
          .catch(error => {
            console.error("Il y a eu une erreur lors de la récupération des films favoris !", error);
          });
      }, []);

    const {handleDetail} = useUtils();
      

    return (
        <div className="favorit-container">
            <h1 className="title">Favorit</h1>
            <h3 style={{color:"white"}}>{favorit.length} Element</h3>
            <hr style={{color:"white"}} />
            <div className="favorit-content" style={{color:"white", textAlign:"center"}}>
            {
                favorit.length ? 
                favorit.map((movie) => (
                    <div key={movie.id}>
                        <div className="movie-block" onClick={() => handleDetail(movie.type, movie.movieApiId   , movie.titre) }>
                            <MovieCard url={`https://image.tmdb.org/t/p/original/${movie.imageUrl}`} title={movie.titre} />
                            {/*
                            // à finir
                            <span className="delete" onClick={() => deleteFavorit(movie.movieApiId)}>X</span> */}

                        </div>
                        <button onClick={() => deleteFavorit(movie.movieApiId)}>delete</button>
                    </div>
                )) :
                <div>
                    <h1>Vous n'avez aucun favorit</h1>
                </div>

            } 
            </div>
        </div>
    )
}