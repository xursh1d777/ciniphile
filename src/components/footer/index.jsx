import styles from './footer.module.scss'
import proweb from '../../images/proweb.png'
import {footerList} from '../../helpers'
import { Link } from 'react-router-dom/dist'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__list}>
        {footerList.map((link)=>(
          <Link key={link.id} to={link.path}><link.name /></Link>
        ))}
      </div>
      <div className={styles.footer__info}>
        <p className={styles.footer__text}>© 2022 CINEPHILE. Может содержать информацию, не предназначенную для несовершеннолетних</p>
        <p className={styles.footer__text}>Данные получены с сайта themoviedb.org</p>
      </div>
      <img src={proweb} alt="proweb" className={styles.footer__image} />
    </footer>
  )
}

export default Footer