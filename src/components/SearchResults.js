import React from 'react'
import MovieTemplate from './MovieTemplate';
import MoviesData from '../MoviesData'

export default function SearchResults({userSearch, setFavorite, isFav, activePage, list, setMovieView, setViewOverlay, setLoginSucc}) {

  const bookList = [];
   for (let x in list) {
     bookList.push(list[x].title)
   }


    const filteredArray = MoviesData.general.filter((movie, index) => {
      let condition;
      switch(activePage) {
        case 'movies':
          condition = movie.category === "Movie";
        break;

        case 'tv-series':
          condition = movie.category === "TV Series";
        break;

        case 'home':
          condition = true;
        break;

        case 'bookmark':
          condition = bookList.includes(movie.title);
        break;
      }
      return condition;
    });

    const resultsList = filteredArray.map((info, index) => {
  
    const movieTitle = info.title.toUpperCase().trim();
    const userSearchValue = userSearch.toUpperCase().trim();

    if (movieTitle.includes(userSearchValue) &&
      userSearch !== "") {
        return <MovieTemplate setLoginSucc={setLoginSucc} setViewOverlay={setViewOverlay} setMovieView={setMovieView} isFav={isFav} setFavorite={setFavorite} data={info} key={index}/>
    }
    return undefined;
  });

  
  return (
    <div className='recommend-list results'>
      <h2>Results</h2>
      <div>
       {
        resultsList.every(item => item === undefined) ? 
        
         <h1 className='error-msg'>Nothing to show.</h1>

         : resultsList 
        
       }
      </div>
      {}
    </div>
  )
}
