import React from 'react'


export default function TrendMovie({data, setFavorite, isFav, setMovieView, setViewOverlay, setLoginSucc}) {
  const {title, imgUrl, year, category, categoryImg, movieLevel} = data;


  const playMovie = () => {
    setViewOverlay(true)
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
    <div className='trendMovie'>
      <img  src={`./assets/thumbnails/${imgUrl}`}/>

      <div className='overlay'>
        <div className='play-btn' onClick={() => {playMovie()}}>
          <img src='./assets/icon-play.svg' alt='' draggable="false"/>
          <p>Play</p>
        </div>
      </div>

      <div className='details'>
        <div className='img-con'>
          <img id={title} onClick={setFavorite} src={`./assets/icon-bookmark-${isFav[title] ? "full" : "empty"}.svg`}/>
        </div>
        <div className='infos'>
          <div>
            <p>{year}</p>
            <p><img src={`./assets/${categoryImg}`}/> {category}</p>
            <p>{movieLevel}</p>
          </div>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  )
}
