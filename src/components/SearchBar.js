import React from 'react'

export default function SearchBar({searchHandler, userSearch, activePage}) {

  const inputChangeHandler = (e) => {
   /*  setActivePage(''); */
    searchHandler(e);
  }
 
  return (
    <div className='search-bar'>
      <img src='./assets/icon-search.svg' alt=''/>
      <div className='input-box'>
        <input value={userSearch} onChange={inputChangeHandler} placeholder={`Search for ${activePage === 'home' ? 'Movies and TV Series' : activePage}`}/>
        <i></i>
      </div>
    </div>
  )
}
