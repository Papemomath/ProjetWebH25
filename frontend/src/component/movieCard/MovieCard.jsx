import React from 'react';
import './MovieCard.css'
import { CiBookmark } from "react-icons/ci";


function MovieCard(props) {
    return (
        <div className="content__shows">
            <div >
        
                <div className="bookmark-icon">
                    <CiBookmark style={{ fontSize: "28px" }} />
                </div>

                <img src={props.url} alt="Movie Poster" />
                
                <div className="title-box"></div>
                <div className="name">{props.title}</div>
            </div>

        </div>
    );
}

export default MovieCard;
