import React from 'react'

export default function NavImages({category, pageClickHandler, activePage, homeNav}) {
  
  const handleClickEvents = (e) => {
    pageClickHandler(e);
    homeNav()

  }

  return (
    <img  
          id={category} 
          onClick={handleClickEvents} 
          src={`./assets/icon-nav-${category}${(activePage === category) ? "-white" : ''}.svg`} 
          alt={`${category} icon`}
    />
  )
}

