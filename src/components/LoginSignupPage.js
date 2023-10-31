import React, {useRef} from 'react'
import FormCard from './forms/FormCard'
import NotifModal from './NotifModal'
import LoginErrorModal from './loginErrorModal';

export default function LoginSignupPage(
  {setMainPageActivate, setActiveCard, activeCard, saveUserAccount, regData, loginData, setViewOverlay, loginSucc, setLoginSucc, setRegSucc, regSucc, setLoginData, regEmailInputRef, regConfirmPassInputRef, regPassInputRef, logPassInputRef, logEmailInputRef, setRegData, retrieveBookmark}) {

  const logEmailRef = useRef(null);
  const logPassRef = useRef(null); 

  const regPassRef = useRef();
  
  
  
    React.useEffect(() => {
      const inputEmailValue = logEmailRef.current.value;
        const inputPassValue = logPassRef.current.value;
        
        /* If the auto fill out form occured */
        
          setLoginData({
            logEmail: inputEmailValue,
            logPass: inputPassValue
          })
       
        
    }, [activeCard]) 

  return (
    <div className='log-sign-page'>
      <NotifModal 
        setLoginSucc={setLoginSucc}
        loginSucc={loginSucc}
        setMainPageActivate={setMainPageActivate}
        condition={activeCard === "login"} 
        setActiveCard={setActiveCard}
        setRegSucc={setRegSucc}
        regSucc={regSucc}
        activeCard={activeCard}
      />

      <LoginErrorModal 
        loginSucc={loginSucc}
        setLoginSucc={setLoginSucc}
      />
      <a onClick={() => setMainPageActivate(true)}>Back to home</a>
      <div className='card-wrapper'>
       <FormCard 
         activeCard={activeCard} 
         classCondition={activeCard === "login"} 
         category={"login"}
         setActiveCard={setActiveCard}   
         setMainPageActivate={setMainPageActivate}
         saveUserAccount={saveUserAccount}
         loginData={loginData}
         setViewOverlay={setViewOverlay}
         setLoginSucc={setLoginSucc}
         setLoginData={setLoginData}
         setRegData={setRegData}
         regEmailInputRef={regEmailInputRef}
         logEmailRef={logEmailRef}
         logPassRef={logPassRef}
         logPassInputRef={logPassInputRef}
         retrieveBookmark={retrieveBookmark}
         logEmailInputRef={logEmailInputRef}
      />

       <FormCard 
         activeCard={activeCard} 
         classCondition={activeCard === "register"}
         category={"register"}
         setActiveCard={setActiveCard}   
         setMainPageActivate={setMainPageActivate}
         setViewOverlay={setViewOverlay}
         setLoginSucc={setLoginSucc}
         saveUserAccount={saveUserAccount}
         regData={regData}
         setRegData={setRegData}
         setRegSucc={setRegSucc}
         regEmailInputRef={regEmailInputRef}
         regPassRef={regPassRef}
         regPassInputRef={regPassInputRef}
         regConfirmPassInputRef={regConfirmPassInputRef}
         retrieveBookmark={retrieveBookmark}
        />
      </div>
      
    </div>
  )
}
