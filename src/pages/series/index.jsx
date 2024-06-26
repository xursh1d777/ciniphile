import { useEffect, useState } from 'react'
import useGetData from '../../hooks/useGetData'
import Container from '../../layout/container'
import Loader from '../../ui/loader'
import styles from './series.module.scss'
import Card from '../../components/card'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../store/dataSlice'

function Series() {
  const [pageNum, setPageNum] = useState(1)
  const dispatch = useDispatch()
  const {upcomingSeries} = useSelector(state => state.data)
  useEffect(()=>{
    if (!upcomingSeries) dispatch(getData(`tv/airing_today?page=1`))
  },[pageNum])
  function handlePageClick(e) {
    setPageNum(e.selected + 1);
    dispatch(getData(`tv/airing_today?page=${pageNum}`))
  }
  if (!upcomingSeries) return <Loader />
  return (
    <div className={styles.series}>
      <Container className={styles.series__container}>
        <h2 className={styles.series__title}>Все сереалы</h2>
        <div className={styles.series__list}>
          {upcomingSeries.results.map((item) => (
            <Card data={item} key={item.id} type="tv" />
          ))}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={upcomingSeries.total_pages}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className={styles.series__paginate}
        />
      </Container>
    </div>
  )
}

export default Series