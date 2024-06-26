import Container from '../../layout/container'
import styles from './notfound.module.scss'
import notfound from '../../images/notfound.gif'

function NotFound() {
    return (
        <div className={styles.notfound}>
           <Container className={styles.notfound__container}>
            <img src={notfound} alt="notfound" className={styles.notfound__image} />
            <div className={styles.notfound__info}>
                <h3 className={styles.notfound__title}>Xatolik yuz berdi,</h3>
                <p className={styles.notfound__text}>Kechirasiz siz izlayotgan sahifa topilmadi!</p>
            </div>
            <button className={styles.notfound__button}>Bosh sahifaga qaytish</button>
           </Container>
        </div>
    )
}

export default NotFound

