import React from 'react'



export default function NotifModal({setMainPageActivate, setLoginSucc, loginSucc, activeCard, setActiveCard, regSucc, setRegSucc, logoutAcc, setLogoutAcc}) {
  
  return (
    <div className={`modal-wrapper ${(loginSucc || regSucc || logoutAcc) ? "active" : ""}`}>

    <div className='modal-overlay'></div>
    <div className='modal-card'>
          <p>{
             logoutAcc ? "Hope you like this App, Thankyou." : loginSucc ?
             "Thank you for your support" :
             "Thank you for joining us!"
            }</p>
          <h3>Successfully {logoutAcc ? "Logged out" : loginSucc ? "logged in" : "registered"}</h3>
          <button onClick={() => {
            if (logoutAcc) return setLogoutAcc(false);
            if (loginSucc) return setMainPageActivate(true);
            
            setRegSucc(false);
            setActiveCard("login");
            }}>{logoutAcc ? "Ok" : loginSucc ? "Back to home" : "Login your account"}</button>
        </div> 
    </div>
  )
}
