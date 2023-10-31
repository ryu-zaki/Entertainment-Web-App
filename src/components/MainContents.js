import React from 'react';
import SearchBar from './SearchBar';
import TrendingList from './TrendingList';
import RecommendedList from './RecommendedList';
import SearchResults from './SearchResults';
import MoviePage from './Categories/MoviePage';
import BookMark from './Categories/bookMark';
import MoviesData from '../MoviesData';
import NotifModal from './NotifModal';
 
export default function MainContents({isFav, setFavorite, userSearch, searchHandler, setActivePage, activePage, setViewOverlay, logoutAcc, setLogoutAcc, setMovieView, setLoginSucc}) {

  React.useEffect(() => {
    setTimeout(() => {
      setViewOverlay(false);
    }, 1200);
  }, [])

  const filteredArray = [];
  for (let x in isFav) {
    if (isFav[x]) {
        filteredArray.push(x);
    }

  }
  
  const list = [];
  for (let i = 0; i < MoviesData.general.length; i++) {
    if (filteredArray.includes(MoviesData.general[i].title)) {
        list.push(MoviesData.general[i]);
    }
  }



let currentPage;

switch(activePage) {
  case 'tv-series':
    case 'movies':
    currentPage = <MoviePage
       isFav={isFav} 
       setFavorite={setFavorite} 
       activePage={activePage}
       setMovieView={setMovieView}
       setViewOverlay={setViewOverlay}
       setLoginSucc={setLoginSucc}
    />;
    
   break;

  case 'home':
    currentPage = (<><TrendingList 
      isFav={isFav} 
      setFavorite={setFavorite}
      setMovieView={setMovieView}
      setViewOverlay={setViewOverlay}
      setLoginSucc={setLoginSucc}
     />

     <RecommendedList 
       isFav={isFav} 
       setFavorite={setFavorite}
       setMovieView={setMovieView}
       setViewOverlay={setViewOverlay}
       setLoginSucc={setLoginSucc}
     />
  </>);
   break;

   case 'bookmark':
    currentPage = <BookMark 
                     isFav={isFav} 
                     setFavorite={setFavorite} 
                     activePage={activePage}
                     list={list}
                     setMovieView={setMovieView}
                     setViewOverlay={setViewOverlay}
                     setLoginSucc={setLoginSucc}
                  />

}
  
  return (
    
    <>
    <NotifModal logoutAcc={logoutAcc} setLogoutAcc={setLogoutAcc}/>
     <div className='wrapper'>
     
       <div>
        <SearchBar userSearch={userSearch} searchHandler={searchHandler} activePage={activePage} setActivePage={setActivePage}/> 

        {userSearch ? 
        <SearchResults setViewOverlay={setViewOverlay} setMovieView={setMovieView} activePage={activePage} userSearch={userSearch}  isFav={isFav} setFavorite={setFavorite} list={list}  setLoginSucc={setLoginSucc}/> : ''}
        
       
        {!userSearch ? currentPage : ''}
       </div>
        
    </div>
    </>
    
  )
}
