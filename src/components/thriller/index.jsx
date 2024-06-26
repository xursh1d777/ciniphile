import classNames from 'classnames';
import styles from './thriller.module.scss'
import { ImCancelCircle } from 'react-icons/im';
import YouTube from 'react-youtube';

function Thriller({ active, setActive, video }) {
  return (
    <section className={active ? classNames(styles.thriller,styles.active) : styles.thriller}>
      <div className={styles.thriller__card}>
        <button className={styles.thriller__cancel} onClick={()=>setActive(false)}><ImCancelCircle /></button>
        <YouTube
          videoId={video.results[0].key}
          opts={{height:"600px",width:"1000px"}}
          onReady={(e)=>e.target.pauseVideo()}
        />
      </div>
    </section>
  )
}

export default Thriller