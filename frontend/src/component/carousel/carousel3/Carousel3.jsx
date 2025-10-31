import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../carousel1/Carousel1.css'
import './Carousel3.css';

import { Navigation } from 'swiper/modules';


export default function Carousel3({ actorCarousel = [null]}) {


    function actorImg(actor) {
        var allImg = document.getElementsByTagName("img");
        for (let i = 0; i < allImg.length; i++) {
            if (actor.profile_path == null) {
                return "/src/assets/stockAvatar.jpg";
            } else {
                return `https://image.tmdb.org/t/p/original/${actor.profile_path}`;
            }
        }
    }

    return (
        <>
            {
                actorCarousel &&
                <Swiper
                    // pagination={{
                    //     clickable: 'fraction',
                    // }}
                    // slidesPerView={5}
                    // spaceBetween={20}
                    // navigation={true}
                    // modules={[Navigation]}
                    // className="mySwiper"
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        480: { slidesPerView: 2, spaceBetween: 15 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                        1280: { slidesPerView: 5, spaceBetween: 20 },
                        1440: { slidesPerView: 8, spaceBetween: 20},
                    }}
                >
                    {
                        actorCarousel &&
                        actorCarousel.map((actor) => (
                            <SwiperSlide key={actor.id}>
                                <div className='card-actor'>
                                    <div className='actor-image' style={{ backgroundImage: `url(${actorImg(actor)})` }}></div>
                                    {/* <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}/>             */}
            
                                    {/* case pour div handleActorDetail */}
                                    <strong><a href={`https://www.themoviedb.org/person/${actor.id}`} target='_blank'>{actor.name}</a></strong>
                                    
                                    <p>{actor.character}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }
        </>
    );
}
