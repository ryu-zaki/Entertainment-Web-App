import React from 'react'
import NavImages from './NavImages';
export default function SideNavBar({activePage, pageClickHandler, homeNav, setMainPageActivate, setActiveCard, loginSucc, setLoginSucc, setViewOverlay, setLogoutAcc, setIsFav}) {

 
  const [actModal, setActModal] = React.useState(false);
  const navCategories = ["home", "movies", "tv-series", "bookmark"];

  let images = navCategories.map((nav, index) => {
    return <NavImages key={index} pageClickHandler={pageClickHandler} category={nav} activePage={activePage} homeNav={homeNav}/>
  });

  const pageActivate = (e) => {
    setMainPageActivate(false)
    
    const cardId = e.target.innerText[0].toLowerCase() + e.target.innerText.slice(1);
    setActiveCard(cardId);

  }

  const logoutAccount = () => {
    setLoginSucc(null)
    setViewOverlay(true);
    
   
    fetch('/logout-account', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user_id: localStorage.getItem("user_id")})
    })
    .then(res => res.json())
    .then(data => {
      if (data.confirmation) {
        
        localStorage.removeItem('user_id');
        setLogoutAcc(true);
        setIsFav({});
      }
      setViewOverlay(false);
    })
    .catch(err => console.log(err));
  }

  return (
      <nav>
       <img src='./assets/logo.svg' alt='movie logo'/>

        <div>
            {images}
        </div>

        <div className='sign-log-box'>
         <img onClick={() => setActModal(prev => !prev)} src={!actModal ? './assets/user.png' : './assets/cross-icon.png'}/>
         <div className={actModal ? 'active' : ''}>

          {
            loginSucc || localStorage.getItem("user_id") ? 
              <button onClick={logoutAccount}>Logout</button> : 
              (<>
              <button onClick={pageActivate}>Register</button>
             <button onClick={pageActivate}>Login</button>
            </>)
          }
          
         </div>
        </div>
      </nav>
  )
}
