import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

import styles from './intro.module.scss'
import Button from '../../ui/button';
import { useRef } from 'react';
import { useState } from 'react';
import classNames from 'classnames';

function Intro({data}) {
    const line = useRef(null);
    const [next,setNext] = useState(1)
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (line.current) {
        line.current.style.width = `${(1 - progress) * 100}%`
    }
  }
  function changeSlide(slide) {
    if (slide.activeIndex == 19) {
        setNext(0)
    } else {
        setNext(slide.activeIndex + 1)
    }
  }
  return (
    <>
        <Swiper
            modules={[Autoplay,Navigation]}
            autoplay={{
                delay:10000,
                disableOnInteraction: false,
            }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            onSlideChange={changeSlide}
            navigation={{nextEl: '.next__slide'}}
            className={styles.intro__swiper}
        >
            {data.map((item)=>(
                <SwiperSlide className={styles.intro__slide} key={item.id}>
                    <img src={import.meta.env.VITE_DB_ORIGINAL + item.backdrop_path} alt={item.title} className={styles.intro__bg} />
                    <h1 className={styles.intro__title}>{item.title || "Sarlavhasi berilmagan"}</h1>
                    <p className={styles.intro__text}>{item.overview || "Izoh keltirilmagan"}</p>
                    <Button type="movie" id={item.id} />
                </SwiperSlide>
            ))}
            <div className={classNames(styles.intro__next,"next__slide")}>
                <img src={import.meta.env.VITE_DB_ORIGINAL + data[next].backdrop_path} alt={data[next].title} className={styles.intro__next_bg} />
                <p className={styles.intro__next_text}>Следующий</p>
                <h3 className={styles.intro__next_title}>{data[next].title || "Sarlavhasi berilmagan"}</h3>
                <div className={styles.intro__line} ref={line} ></div>
            </div>
        </Swiper>
    </>
  )
}

export default Intro