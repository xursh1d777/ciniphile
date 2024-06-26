import { ImCancelCircle } from "react-icons/im";
import Button from '../../ui/button'
import styles from './info.module.scss'
import classNames from "classnames";
import useGetData from "../../hooks/useGetData";
import Loader from "../../ui/loader";

function InfoSlide({ data, casts, type, setSerie, setMovie }) {
    
    if (!data || !casts) return <Loader />
    return (
        <section className={data ? classNames(styles.info, styles.active) : styles.info}>
            <img src={import.meta.env.VITE_DB_ORIGINAL + data.backdrop_path} alt="" className={styles.info__bg} />
            <button className={styles.info__cancel} onClick={() => type == 'movie' ? setMovie(null) : setSerie(null)}>
                <ImCancelCircle />
            </button>
            <div className={styles.info__content}>
                <h2 className={styles.info__title}>{data.title || data.name}</h2>
                <p className={styles.info__text}>{data.overview}</p>
                <div className={styles.info__genres}>
                    <p className={styles.info__genre}>{new Date(data.release_date || data.first_air_date).getFullYear()}</p>
                    {data.genres.map((el) => (
                        <p key={el.id} className={styles.info__genre}>{el.name}</p>
                    ))}
                    {data.runtime && <p className={styles.info__genre}>{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</p>}
                </div>
                <div className={styles.info__actors}>
                    {casts.cast.slice(0,4).map((actor) => (
                        <div className={styles.info__actor} key={actor.id}>
                            <img src={import.meta.env.VITE_DB_IMAGE + actor.profile_path} alt={actor.name} />
                            <p>{actor.name}</p>
                        </div>
                    ))}
                </div>
                <Button type={type} id={data.id} />
            </div>
        </section>
    )
}

export default InfoSlide