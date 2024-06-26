import { useDispatch, useSelector } from 'react-redux';
import Intro from '../../components/intro';
import Rating from '../../components/rating';
import Slider from '../../components/slider';
import Loader from '../../ui/loader';
import styles from './home.module.scss'
import { useEffect } from 'react';
import { getData } from '../../store/dataSlice';

function Home() {
  const dispatch = useDispatch()
  const {upcomingMovies,popularMovies,popularSeries,rating} = useSelector(state => state.data)
  useEffect(()=>{
    if(!upcomingMovies){
      dispatch(getData('movie/upcoming'))
    }
    if(!popularMovies){
      dispatch(getData('movie/popular'))
    }
    if(!popularSeries){
      dispatch(getData('tv/popular'))
    }
    if(!rating){
      dispatch(getData('movie/top_rated'))
    }
  },[])

  if (!upcomingMovies || !popularMovies || !popularSeries || !rating) return <Loader />

  return (
    <div className={styles.home}>
      <Intro data={upcomingMovies.results} />
      <Slider type="movie" data={popularMovies.results} />
      <Slider type="tv" data={popularSeries.results} />
      <Rating data={rating.results} />
    </div>
  )
}

export default Home