import React from 'react'
import MovieTemplate from './MovieTemplate';
import data from '../MoviesData';


export default function RecommendedList({setFavorite, isFav, setMovieView, setViewOverlay, setLoginSucc}) {
  
  const recommendList = data.recommends.map((info, index) => {
    return <MovieTemplate setViewOverlay={setViewOverlay} setMovieView={setMovieView} isFav={isFav} setFavorite={setFavorite} data={info} key={index} setLoginSucc={setLoginSucc}/>;
  });

  return (
    <div className='recommend-list'>
      <h2>Recommended for you</h2>
      <div>
        {recommendList}
      </div>
    </div>
  )
}
