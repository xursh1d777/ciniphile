import { HiMenuAlt2 } from "react-icons/hi";
import styles from './button.module.scss'
import { useNavigate } from "react-router-dom";


function Button({ type, id }) {
  const navigate = useNavigate()
  return (
    <button className={styles.button} onClick={() => navigate(`/detail/${type}/${id}`)}>
      <HiMenuAlt2 />
      <span>Подробнее</span>
    </button>
  )
}

export default Button