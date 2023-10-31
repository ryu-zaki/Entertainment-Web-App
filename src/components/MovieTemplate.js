import React from 'react';

export default function RecommendMovie({data, setFavorite, isFav, movieView, setMovieView, setViewOverlay, setLoginSucc}) {

  const {title, imgUrl, year, category, categoryImg, movieLevel} = data;

  const playMovie = () => {
    setViewOverlay(true);
    fetch("/bookmark-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
      if (data.confirmation) {
        setMovieView(title);
      } else { 
        setMovieView('');
        setLoginSucc(false);
      }
    setViewOverlay(false);

    })
  } 

  return (
    <div className='recommend-movie'>
      <div>
      <img src={`./assets/thumbnails/${imgUrl}`} draggable="false" alt=''/>
      <div className='bookmark-con'>
      <img className='bookmark' id={title} onClick={setFavorite} src={`./assets/icon-bookmark-${isFav[title] ? "full" : "empty"}.svg`} alt=''/> 
      <i></i>  
      </div> 
        <div className='overlay'>
          <div className='play-btn' onClick={() => playMovie()}>
            <img src='./assets/icon-play.svg' alt='' draggable="false"/>
            <p>Play</p>
          </div>
        </div>
      </div>

      <div className='details'>
        
        <div className='infos'>
          <div>
            <p>{year}</p>
            <p><img src={`./assets/${categoryImg}`} alt=''/> {category}</p>
            <p>{movieLevel}</p>
          </div>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  )
}
