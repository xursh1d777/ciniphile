import styles from './loader.module.scss'

function Loader() {
  return (
    <div className={styles.loader}>
        <div className={styles.loader__box}></div>
    </div>
  )
}

export default Loader