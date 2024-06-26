import { useEffect, useState } from 'react'
import Container from '../../layout/container'
import styles from './search.module.scss'
import Loader from '../../ui/loader'
import Card from '../../components/card'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../store/dataSlice'

function Search() {
  const [search, setSearch] = useState({ search: "", page: 1 })
  const dispatch = useDispatch()
  const {searchResult,popularMovies} = useSelector(state => state.data)

  useEffect(()=>{
    dispatch(getData(`search/multi?query=${search.search}&page=${search.page}`))
    if (!popularMovies) {
      dispatch(getData('movie/popular'))
    }
  },[search])

  function handlePageClick(e) {
    setSearch({ ...search, page: e.selected + 1 });
  }
  if (!searchResult || !popularMovies) return <Loader />
  return (
    <div className={styles.search}>
      <Container className={styles.search__container}>
        <input
          type="text"
          className={styles.search__input}
          placeholder='Найти фильм, сериал...'
          value={search.search}
          onChange={(e) => setSearch({ ...search, search: e.target.value })}
        />
        {searchResult.results.length ? (
          <>
            <div className={styles.search__results}>
              {searchResult.results.map((item) => (
                <Card data={item} key={item.id} type={item.media_type} />
              ))}
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={searchResult.total_pages}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className={styles.search__paginate}
            />
          </>
        ) : (
          <>
            <h3 className={styles.search__recommend}>Рекомендации</h3>
            <div className={styles.search__cards}>
              {popularMovies.results.slice(0, 4).map((item) => (
                <Card data={item} key={item.id} type="movie" />
              ))}
            </div>
          </>
        )}

      </Container>
    </div>
  )
}

export default Search