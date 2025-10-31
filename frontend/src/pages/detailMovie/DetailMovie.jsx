import React from 'react';
import './DetailMovie.css';
import Carousel1 from '../../component/carousel/carousel1/Carousel1';
import useDetailMovie from '../../hooks/useDetailMovie';
import { blankAvatarStyler } from '../../hooks/useDetailMovie';
import Carousel3 from '../../component/carousel/carousel3/Carousel3';
import useUtils, { troubleShoot } from '../../utils/useUtils';
import axios from 'axios';
import { data } from 'react-router-dom';
import ScrollView from '../../utils/ScrollView';


function DetailMovie() {
    const {type, DataOmdb, dataInfo, dataPosterTmdb, dataRecommendation, ongletActor, setOngletActor, ongletMedia, setOngletMedia, dataActors, dataCrew, dataImages, dataVideos } = useDetailMovie();

    const {handleStream, loader} = useUtils();
    
    if (!DataOmdb || !dataRecommendation || !dataActors || !dataInfo) {
        return loader();
    }
    
    troubleShoot();
    blankAvatarStyler();

    // fonction a placer dans le useDetail
    function addFavorit() {
        if (sessionStorage.getItem("onlineStatus") == "true") {
            let favoriToAdd = {
                movieApiId: dataPosterTmdb.id,
                titre: type === "movie" ? dataPosterTmdb.original_title : dataPosterTmdb.original_name,
                imageUrl: `https://image.tmdb.org/t/p/original${dataPosterTmdb.poster_path}`,
                type: type
            };
    
            axios.post(`http://localhost:8080/favoriteList/add/${sessionStorage.getItem("id")}`, favoriToAdd)
            .then(response => {
                console.log(`${favoriToAdd.titre} à été ajouté au Favori avec succès`, response.data);
                document.getElementById('addOrFailContent').textContent = `${favoriToAdd.titre} à été ajouté au Favori avec succès`;
                document.getElementById('addOrFailContent').style.color = 'green';
                document.getElementById('addOrFailContent').style.margin = '10px';

                setTimeout(() => {
                    document.getElementById('addOrFailContent').textContent = "";
                }, 2000)
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du favori", error);
            });
        } else {
            document.getElementById('addOrFailContent').textContent = "you must login first";
            setTimeout(() => {
                document.getElementById('addOrFailContent').textContent = "";
            }, 2000)
        }
    }

    function loadMoviePosterBackdrops() {
        if (ongletMedia == "Posters") {
            return dataImages.posters.map((image) => (
                <img key={image.id} src={`https://image.tmdb.org/t/p/original/${image.file_path}`} />
            ))
        }
        if (ongletMedia == "Backdrops") {
            return dataImages.backdrops.map((image) => (
                <img key={image.id} src={`https://image.tmdb.org/t/p/original/${image.file_path}`} />
            ))
        }
    }
    
    return (
        <div className="container-detail" >

            <ScrollView/>

            <div className="movie-detail">
                {/* --- Image principale --- */}
                <div className="movie-image">
                    <img
                    src={`https://image.tmdb.org/t/p/original${dataPosterTmdb.poster_path}`}
                    alt={dataPosterTmdb.title || dataPosterTmdb.original_name || "Affiche du film"}
                    />
                </div>

                {/* --- Informations du film ou de la série --- */}
                <div className="movie-info">
                    <div className="content-info">
                    {/* Titre */}
                    <h1 id="movieTitle" style={{ textShadow: "2px 2px black" }}>
                        {type === "movie"
                        ? `${dataInfo.title} ${DataOmdb.Released?.split(" ")[2] || ""}`
                        : dataInfo.original_name}
                    </h1>

                    {/* --- Note et infos rapides --- */}
                    <p className="rate">
                        {type === "movie" ? (
                        <>
                            <strong>
                            {DataOmdb.Metascore !== "N/A"
                                ? `Rating: ⭐${DataOmdb.Metascore}%`
                                : ""}
                            </strong>
                            <span id="OMDb">OMDb</span>
                            <span id="rating">{DataOmdb.imdbRating}</span>
                            <span id="r">{DataOmdb.Runtime}</span>
                        </>
                        ) : (
                        <>
                            <strong>
                                Metascore: ⭐{Math.round((dataInfo.vote_average / 10) * 100)}%
                            </strong>
                            <span id="OMDb">OMDb</span>
                            <span id="rating">{DataOmdb.imdbRating}/10</span>
                            <span id="r">{DataOmdb.Year}</span>
                            <span id="r">{DataOmdb.Runtime}</span>
                        </>
                        )}
                    </p>

                    {/* --- Description --- */}
                    <p>{dataInfo.overview}</p>
                    <hr />

                    {/* --- Détails selon le type --- */}
                    {type === "movie" ? (
                        <>
                        <p><strong>Release :</strong> {DataOmdb.Released}</p>
                        <p><strong>Director :</strong> {DataOmdb.Director}</p>
                        <p><strong>Genre :</strong> {DataOmdb.Genre}</p>
                        <p><strong>Type :</strong> {type}</p>
                        <p><strong>Actor :</strong> {DataOmdb.Actors}</p>
                        <p><strong>Budget :</strong> {dataInfo.budget?.toLocaleString()} $</p>
                        </>
                    ) : (
                        <>
                        <p><strong>Release :</strong> {DataOmdb.Released}</p>
                        <p><strong>Nombre de saisons :</strong> {dataInfo.number_of_seasons}</p>
                        <p><strong>Genre :</strong> {DataOmdb.Genre}</p>
                        <p><strong>Type :</strong> {dataInfo.type}</p>
                        <p><strong>Actor :</strong> {DataOmdb.Actors}</p>
                        </>
                    )}

                    {/* --- Bouton d’ajout aux favoris --- */}
                    <div className="buttonDetail">
                        <button className="btn-handle-add-info" onClick={addFavorit}>
                            Add to favorite ✚
                        </button>
                        {/* <button className="watchStream" onClick={() => handleStream(type,dataInfo.id)}>
                            Regarder Maintenant  ▷
                        </button> */}
                            <button class="btn-handle-stream" onClick={() => handleStream(type, dataInfo.id)}>
                                Watch 🎧
                            </button>
                    </div>
                    <p id="addOrFailContent" style={{ textAlign: "center", color: "red" }}></p>
                    </div>
                </div>
                </div>

            <hr />

            <div className="container-nav-media">
                <h3>Tête d'affiche</h3>
                <div className="nav-media">
                    <a onClick={() => setOngletActor("Cast")}>Cast</a>
                    <a onClick={() => setOngletActor("Crew")}>Crew</a>
                </div>
            </div>
            <div className="content-actor">

                {ongletActor === "Cast" && dataActors.length > 0 &&
                    <Carousel3 actorCarousel={dataActors}/>
                }

                {ongletActor === "Crew" && dataCrew.length > 0 &&
                    <Carousel3 actorCarousel={dataCrew} />
                }
            </div>

            <div className="container-nav-media">
                <h3>Média</h3>
                <div className="nav-media">
                    <a onClick={() => setOngletMedia("Videos")}>Videos</a>
                    <a onClick={() => setOngletMedia("Posters")}>Posters</a>
                    <a onClick={() => setOngletMedia("Backdrops")}>Backdrops</a>
                </div>
            </div>
            <div className="media">
                {
                    ongletMedia === "Videos" &&
                    <div className='media-video'>
                        {
                            dataVideos && dataVideos.slice(0, 3).map((video, key) => (
                                <iframe key={key} width="560" height="315"
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                >
                                </iframe>
                            ))
                        }
                    </div>
                }
                {ongletMedia === "Posters" && loadMoviePosterBackdrops("Posters")}
                {ongletMedia === "Backdrops" && loadMoviePosterBackdrops("Backdrops")}

            </div>
            <hr />

            <h3>Titre similaire</h3>
            <div className="recommandations">
                <Carousel1 movieCarousel={dataRecommendation} type={type} />
            </div>

        </div>
    );
}
export default DetailMovie;