import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation'
import styles from './rating.module.scss'
import { useNavigate } from 'react-router-dom';

function Rating({data}) {
  const navigate = useNavigate()
  return (
    <div className={styles.rating}>
        <h2 className={styles.rating__title}>ТОП <span>10</span></h2>
        <Swiper
          slidesPerView={3.5}
          spaceBetween={25}
          navigation={true}
          modules={[Navigation]}
          className={styles.rating__swiper}
        >
          {data.slice(0,10).map((item,i)=>(
            <SwiperSlide onClick={()=>navigate(`detail/movie/${item.id}`)} key={item.id} className={styles.rating__slide}>
              <img 
                src={import.meta.env.VITE_DB_IMAGE + item.poster_path} 
                alt={item.title || item.name} 
                className={styles.rating__image} 
              />
              <h2 className={styles.rating__number}>{i+1}</h2>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  )
}

export default Rating