import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchMovie from './pages/Search/SearchMovie';
import DetailMovie from './pages/detailMovie/DetailMovie';
import NavBar from './component/navBar/NavBar';
import NotFoundPage from './component/NotFoundPage';
import MoviePage from './pages/movie/MoviePage'
import Home from './pages/home/Home';
import Setting from './pages/settings/Setting';
import SeriePage from './pages/serie/SeriePage';
import Login from './pages/auth/login/login';
import Register from './pages/auth/register/register';


function App() {
  return (
      <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='ProjetWebH25/' element={<Home/>}/>
          <Route path='ProjetWebH25/search' element={<SearchMovie/>}/>
          <Route path='ProjetWebH25/detail/:type/:id/:title' element={<DetailMovie/>}/>  
          <Route path='ProjetWebH25/movie' element={<MoviePage />}/>  
          <Route path='ProjetWebH25/serie' element={<SeriePage />}/>  

          <Route path='ProjetWebH25/setting' element={<Setting/>}/>

          {/* credential */}
          <Route path='ProjetWebH25/login' element={<Login/>}/>
          <Route path='ProjetWebH25/register' element={<Register/>}/>
          <Route path='ProjetWebH25/*' element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;