import React from 'react';
import TrendMovie from './TrendMovie';
import data from '../MoviesData';

export default function TrendingList({setFavorite, isFav, setMovieView, setViewOverlay, setLoginSucc}) {
  
  const trendList = data.trends.map((movie, index) => {
    return <TrendMovie setLoginSucc={setLoginSucc} setViewOverlay={setViewOverlay} setMovieView={setMovieView} isFav={isFav} setFavorite={setFavorite} data={movie} key={index}/>;
  });

   
  React.useEffect(() => {
    const trendCon = document.querySelector('.trend-con');
    const trendWrapper = document.querySelector('.trend-wrapper');

    //check if the container is dragging
    let dragged = false, startX, startScrollLeft;


    trendCon.addEventListener('mousedown', (e) => {
      dragged = true;

      trendCon.classList.add('dragging')
      startX = e.clientX;
      
      startScrollLeft = trendWrapper.scrollLeft;
      
    })

    trendCon.addEventListener('mousemove', (e) => {
      if (!dragged) return;
      trendWrapper.scrollLeft = startScrollLeft - (e.clientX - startX);

    })

    document.addEventListener('mouseup', () => {
      dragged = false;
      trendCon.classList.remove('dragging')

    })

  }, [])

  return (
    <div className='trending-list'>
      <h2>Trending</h2>
      <div className='trend-wrapper'>
        <div className='trend-con'>
          {trendList}
        </div>
      </div>
    </div>
  )
}
