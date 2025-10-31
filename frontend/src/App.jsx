import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchMovie from './pages/Search/SearchMovie';
import DetailMovie from './pages/detailMovie/DetailMovie';
import NavBar from './component/navBar/NavBar';
import NotFoundPage from './component/NotFoundPage';
import MoviePage from './pages/movie/MoviePage'
import Home from './pages/home/Home';
import Profil from './component/profil/Profil';
import LogIn from './component/profil/logIn/LogIn';
import SignUp from './component/profil/SignUp/SignUp';
import Setting from './pages/settings/Setting';
import UserDelete from './pages/settings/UserDelete';
import Fifa from './component/sport/soccer/Fifa';
import SeriePage from './pages/serie/SeriePage';
import FavoritPage from './pages/favorit/FavoritPage';
import ResetPassword from './component/resetPassword/ResetPassword';
import StreamingPage from './pages/streaming/StreamingPage';


function App() {

  const sessionEtat = sessionStorage.getItem("onlineStatus") === "true";
  return (
      <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/search' element={<SearchMovie/>}/>
          <Route path='/detail/:type/:id/:title' element={<DetailMovie/>}/>  
          <Route path='/movie' element={<MoviePage />}/>  
          <Route path='/serie' element={<SeriePage />}/>  
          {/* <Route path='/favorit' element={sessionEtat ? <FavoritPage /> : <LogIn/>}/>   */}
          <Route path='/favorit' element={<FavoritPage/>} />  
          <Route path='/profil' element={<Profil />}/>
          <Route path='/logIn' element={sessionEtat ? <Profil /> : <LogIn/>}/>
          <Route path='/signUp' element={sessionEtat ? <Profil /> : <SignUp/>}/>
          <Route path='/resetPassword' element={sessionEtat ? <ResetPassword/> : <LogIn/>}/>        
          <Route path='/setting' element={<Setting/>}/>
          <Route path='/userDelete' element={<UserDelete/>}/>
          <Route path='/fifa' element={<Fifa/>}/>
          <Route path='/stream/:type/:id' element={<StreamingPage/>}/>
          <Route path='/stream/:type/:id/:saison/:episode' element={<StreamingPage/>}/>
          <Route path='/*' element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;
