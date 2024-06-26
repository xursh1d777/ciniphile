import { Link, NavLink } from 'react-router-dom'
import { FaSearch  } from "react-icons/fa";
import Container from '../../layout/container'
import styles from './navbar.module.scss'
import logo from "../../images/logo.png"
import classNames from 'classnames';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container className={styles.navbar__container}>
        <Link to="/" className={styles.navbar__logo}>
          <img src={logo} alt="logo" className={styles.navbar__logo_image} />
        </Link>
        <div className={styles.navbar__list}>
          <NavLink to="/" className={({isActive})=> isActive ? classNames(styles.navbar__link_active,styles.navbar__link) : styles.navbar__link}>Главная</NavLink>
          <NavLink to="/movies" className={({isActive})=> isActive ? classNames(styles.navbar__link_active,styles.navbar__link) : styles.navbar__link}>Фильмы</NavLink>
          <NavLink to="/series" className={({isActive})=> isActive ? classNames(styles.navbar__link_active,styles.navbar__link) : styles.navbar__link}>Сериалы</NavLink>
          <NavLink to="/search" className={({isActive})=> isActive ? classNames(styles.navbar__link_active,styles.navbar__link) : styles.navbar__link}><FaSearch  /></NavLink>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
