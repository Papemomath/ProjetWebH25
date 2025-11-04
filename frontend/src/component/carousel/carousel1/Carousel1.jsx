import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './Carousel1.css'
import { Navigation } from 'swiper/modules';
import MovieCard from '../../movieCard/MovieCard';
import useUtils from '../../../utils/useUtils';

export default function Carousel1({ movieCarousel = [null], type = null }) {

  const {handleDetail} = useUtils();

  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 20 },
          1440: { slidesPerView: 8, spaceBetween: 20},
        }}
      >
        {
          movieCarousel && 
          type == "movie" ? 
          movieCarousel.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div onClick={() => handleDetail(type, movie.id ,movie.title) }>
                <MovieCard url={movie.image || `https://image.tmdb.org/t/p/original/${movie.poster_path}`} title={movie.title} />
              </div>
            </SwiperSlide>
          ))
          :
          movieCarousel.map((serie) => (
            <SwiperSlide key={serie.id}>
              <div onClick={() => handleDetail(type, serie.id ,serie.title) }>
                <MovieCard url={`https://image.tmdb.org/t/p/original/${serie.poster_path}`} title={serie.original_name} />
                
              </div>
            </SwiperSlide>
          ))
        }

      </Swiper>
    </>
  );
}
