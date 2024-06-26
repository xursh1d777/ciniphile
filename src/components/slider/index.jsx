import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation'
import { FaChevronRight } from "react-icons/fa";
import styles from './slider.module.scss'
import InfoSlide from '../infoSlide';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../store/dataSlice';

function Slider({ type, data }) {
  const [movie, setMovie] = useState(null)
  const [serie, setSerie] = useState(null)
  const dispatch = useDispatch()
  const { detailMovie, detailSerie, castsMovie, castsSerie } = useSelector(state => state.data)
  useEffect(() => {
    if (movie || serie) {
      dispatch(getData(`${type == 'movie' ? `movie/${movie}` : `tv/${serie}`}`))
      dispatch(getData(`${type == 'movie' ? `movie/${movie}/credits` : `tv/${serie}/credits`}`))
    }
  }, [movie, serie])
  return (
    <div className={styles.slider}>
      <h2 className={styles.slider__title}>{type == 'movie' ? "Фильмы" : "Сереалы"} <FaChevronRight /> </h2>
      <Swiper
        slidesPerView={5}
        spaceBetween={25}
        navigation={true}
        modules={[Navigation]}
        className={styles.slider__swiper}
      >
        {data.map((item) => (
          <SwiperSlide onClick={() => type == 'movie' ? setMovie(item.id) : setSerie(item.id)} key={item.id} className={styles.slider__slide}>
            <img
              src={import.meta.env.VITE_DB_IMAGE + item.poster_path}
              alt={item.title || item.name}
              className={styles.slider__image}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide className={styles.slider__slide}>
          <FaChevronRight />
          <p className={styles.slider__slide_text}>Все {type == 'movie' ? "Фильмы" : "Сереалы"}</p>
        </SwiperSlide>
      </Swiper>
      {movie && <InfoSlide data={detailMovie} casts={castsMovie} type={type} setMovie={setMovie} />}
      {serie && <InfoSlide data={detailSerie} casts={castsSerie} type={type} setSerie={setSerie} />}
    </div>
  )
}

export default Slider