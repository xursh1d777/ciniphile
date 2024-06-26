import styles from './card.module.scss'
import noimage from '../../images/no-image.png'
import { useNavigate } from 'react-router-dom'

function Card({data, type}) {
    const navigate = useNavigate()
  return (
    <div className={styles.card} onClick={()=>navigate(`/detail/${type}/${data.id}`)}>
        <img 
            src={data.backdrop_path ? import.meta.env.VITE_DB_ORIGINAL + data.backdrop_path : noimage}
            alt={data.title || data.name || "no name"}
            className={styles.card__image}
        />
        <p className={styles.card__title}>{data.title || data.name || "no title"}</p>
    </div>
  )
}

export default Card