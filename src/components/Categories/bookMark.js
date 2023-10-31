import React from 'react'
import MovieTemplate from '../MovieTemplate'

export default function bookMark({isFav, setFavorite, list, setMovieView, setLoginSucc}) {


  const bookMarkList = list.map((info, index) => {
    return <MovieTemplate setMovieView={setMovieView} isFav={isFav} setLoginSucc={setLoginSucc} setFavorite={setFavorite} data={info} key={index}/>
  });

  return (
    <div className='recommend-list'>
      <h2>Bookmark</h2>
      <div>
        {list.length <= 0 ? <h1 className='error-msg'>No bookmark</h1> : bookMarkList}
      </div>
    </div>
  )
}
