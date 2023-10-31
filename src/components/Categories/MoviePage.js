import React from 'react'
import MovieTemplate from '../MovieTemplate';
import MoviesData from '../../MoviesData';

export default function MoviePage({isFav, setFavorite, activePage, setMovieView, setViewOverlay, setLoginSucc}) {

  const txt = activePage === "tv-series" ? "TV Series" :
              activePage === "movies" ? "Movie" : 
              activePage === "bookmark" ? "bookmark" : "home"; 
  
  const MoviesList = MoviesData.general.map((info, index) => {
    if (info.category === txt) {
        return <MovieTemplate setViewOverlay={setViewOverlay} setMovieView={setMovieView} isFav={isFav} setFavorite={setFavorite} data={info} key={index} setLoginSucc={setLoginSucc}/>
    }
    return undefined;
  }); 
 
  return (
    <div className='recommend-list'>
      <h2>{txt === "Movie" ? "Movies" : txt}</h2>
      <div>
        {MoviesList}
      </div>
    </div>
  )
}
