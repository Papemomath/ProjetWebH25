import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './Carousel3.css';
import { Navigation } from 'swiper/modules';
import stockAvatar from '../../../assets/stockAvatar.jpg'; // ✅ import correct

export default function Carousel3({ actorCarousel = [] }) {

  const getActorImage = (actor) => {
    if (!actor || !actor.profile_path) {
      return stockAvatar;
    }
    return `https://image.tmdb.org/t/p/original/${actor.profile_path}`;
  };

  return (
    <>
      {actorCarousel.length > 0 && (
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
            1280: { slidesPerView: 5, spaceBetween: 20 },
            1440: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {actorCarousel.map((actor, index) => (
            <SwiperSlide key={actor.id || index}>
              <div className="card-actor">
                <div
                  className="actor-image"
                  style={{ backgroundImage: `url(${getActorImage(actor)})` }}
                ></div>

                <strong>
                  <a
                    href={`https://www.themoviedb.org/person/${actor.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {actor.name || 'Unknown'}
                  </a>
                </strong>

                <p>{actor.character || 'N/A'}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
