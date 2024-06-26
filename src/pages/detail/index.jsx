import Button from '../../ui/button'
import useGetData from "../../hooks/useGetData";
import Loader from "../../ui/loader";
import styles from './detail.module.scss'
import { useParams } from 'react-router-dom';
import Container from '../../layout/container';
import Card from '../../components/card';
import Thriller from '../../components/thriller';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../store/dataSlice';

function Detail() {
  const [active, setActive] = useState(false)
  const { type, id } = useParams()
  const dispatch = useDispatch()
  const {detailMovie, detailSerie, castsMovie, castsSerie, recommendMovie, recommendSerie, videoMovie, videoSerie} = useSelector(state => state.data)
  useEffect(()=>{
    if (type && id) {
      dispatch(getData(`${type}/${id}`))
      dispatch(getData(`${type}/${id}/credits`))
      dispatch(getData(`${type}/${id}/recommendations`))
      dispatch(getData(`${type}/${id}/videos`))
    }
  },[type, id])
  const data = type == 'movie' ? detailMovie : detailSerie
  const casts = type == 'movie' ? castsMovie : castsSerie
  const recommend = type == 'movie' ? recommendMovie : recommendSerie
  const video = type == 'movie' ? videoMovie : videoSerie
  if (!data || !casts || !recommend || !video) return <Loader />
  return (
    <>
      <section className={styles.detail}>
        <img src={import.meta.env.VITE_DB_ORIGINAL + data.backdrop_path} alt="" className={styles.detail__bg} />
        <img src={import.meta.env.VITE_DB_ORIGINAL + data.poster_path} alt="" className={styles.detail__image} />
        <div className={styles.detail__content}>
          <h2 className={styles.detail__title}>{data.title || data.name}</h2>
          <p className={styles.detail__text}>{data.overview}</p>
          <div className={styles.detail__genres}>
            <p className={styles.detail__genre}>{new Date(data.release_date || data.first_air_date).getFullYear()}</p>
            {data.genres.map((el) => (
              <p key={el.id} className={styles.detail__genre}>{el.name}</p>
            ))}
            {data.runtime && <p className={styles.detail__genre}>{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</p>}
          </div>
          <button className={styles.detail__thriller} onClick={()=>setActive(true)}>
            <FaPlay />
            <span>Смотерть трейлер</span>
          </button>
          <p className={styles.detail__role}>В главных ролях</p>
          <div className={styles.detail__actors}>
            {casts.cast.slice(0, 6).map((actor) => (
              <div className={styles.detail__actor} key={actor.id}>
                <img src={import.meta.env.VITE_DB_IMAGE + actor.profile_path} alt={actor.name} />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className={styles.detail__info}>
        <div className={styles.detail__info_box}>
          <h4 className={styles.detail__info_title}>Бюджет</h4>
          <p className={styles.detail__info_text}>${data?.budget?.toLocaleString()}</p>
        </div>
        <div className={styles.detail__info_box}>
          <h4 className={styles.detail__info_title}>Сборы</h4>
          <p className={styles.detail__info_text}>${data?.revenue?.toLocaleString()}</p>
        </div>
        <div className={styles.detail__info_box}>
          <h4 className={styles.detail__info_title}>Статус</h4>
          <p className={styles.detail__info_text}>{data.status || "no status"}</p>
        </div>
        <div className={styles.detail__info_box}>
          <h4 className={styles.detail__info_title}>Исходное название</h4>
          <p className={styles.detail__info_text}>{data.tagline || "no name"}</p>
        </div>
      </div>
      <Container>
        <h3 className={styles.detail__recommend}>Рекомендации</h3>
        <div className={styles.detail__cards}>
          {recommend.results.slice(0, 4).map((item) => (
            <Card data={item} key={item.id} type={item.media_type} />
          ))}
        </div>
      </Container>
      {video.results.length && <Thriller active={active} setActive={setActive} video={video} />}
    </>
  )
}

export default Detail