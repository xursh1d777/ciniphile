import { useEffect, useState } from 'react'
import useGetData from '../../hooks/useGetData'
import Container from '../../layout/container'
import Loader from '../../ui/loader'
import styles from './movies.module.scss'
import Card from '../../components/card'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../store/dataSlice'

function Movies() {
  const [pageNum, setPageNum] = useState(1)
  const dispatch = useDispatch()
  const {upcomingMovies} = useSelector(state => state.data)
  useEffect(()=>{
    if (!upcomingMovies) dispatch(getData(`movie/upcoming?page=1`))
  },[pageNum])
  function handlePageClick(e) {
    setPageNum(e.selected + 1);
    dispatch(getData(`movie/upcoming?page=${pageNum}`))
  }
  if (!upcomingMovies) return <Loader />
  return (
    <div className={styles.movies}>
      <Container className={styles.movies__container}>
        <h2 className={styles.movies__title}>Все фильмы</h2>
        <div className={styles.movies__list}>
          {upcomingMovies.results.map((item) => (
            <Card data={item} key={item.id} type="movie" />
          ))}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={upcomingMovies.total_pages}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className={styles.movies__paginate}
        />
      </Container>
    </div>
  )
}

export default Movies