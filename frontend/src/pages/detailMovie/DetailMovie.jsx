import React from 'react';
import './DetailMovie.css';
import Carousel1 from '../../component/carousel/carousel1/Carousel1';
import useDetailMovie from '../../hooks/useDetailMovie';
import { blankAvatarStyler } from '../../hooks/useDetailMovie';
import Carousel3 from '../../component/carousel/carousel3/Carousel3';
import useUtils, { troubleShoot } from '../../utils/useUtils';
import ScrollView from '../../utils/ScrollView';


function DetailMovie() {
    const {type, DataOmdb, dataInfo, dataPosterTmdb, dataRecommendation, ongletActor, setOngletActor, ongletMedia, setOngletMedia, dataActors, dataCrew, dataImages, dataVideos } = useDetailMovie();
    const {loader} = useUtils();
    
    if (!DataOmdb || !dataRecommendation || !dataActors || !dataInfo) {
        return loader();
    }
    
    troubleShoot();
    blankAvatarStyler();


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
                            dataVideos.length > 0 ? 
                            dataVideos.slice(0, 3).map((video, key) => (
                                <iframe key={key} width="560" height="315"
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                >
                                </iframe>
                            ))
                            :
                            <div className='not-found'>
                                <h1>Aucune video</h1>
                            </div>
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