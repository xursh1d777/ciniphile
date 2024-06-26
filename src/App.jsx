import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Movies from "./pages/movies";
import Series from "./pages/series";
import Search from "./pages/search";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NotFound from "./pages/notfound";
import Detail from "./pages/detail";
import Thriller from "./components/thriller";
import Scroll from "./Scroll";

function App() {
  return (
    <Router>
      <Scroll />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:type/:id" element={<Detail />} />
        <Route path="/thriller/:id" element={<Thriller />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
