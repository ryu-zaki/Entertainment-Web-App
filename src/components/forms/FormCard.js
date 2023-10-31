import React, {useRef} from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export default function FormCard({
  category, activeCard, setActiveCard, classCondition, setMainPageActivate, saveUserAccount, regData, loginData, setViewOverlay, setLoginSucc, setRegSucc, setLoginData, regEmailInputRef, logEmailRef, logPassRef, regPassRef, regPassInputRef, regConfirmPassInputRef, logPassInputRef, logEmailInputRef, setRegData, retrieveBookmark, loginSucc}) {


  const condition = category === "login" ;
   
  const introGreetings = condition ?  
    "Hello Again!" :
    "Join us today"; 
  const subTitle = condition ? 
    "Welcome back to our Application." :
    "Please register to get started.";

  const imgSrc = condition ? 
  "https://images.pexels.com/photos/12316450/pexels-photo-12316450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" :
  "https://images.pexels.com/photos/2072060/pexels-photo-2072060.jpeg";

  const formEventHandler = (e) => {
      saveUserAccount(e);
  }

  const emptyInputHandler = (input, inputEl) => {
    const inputBox = inputEl.querySelector("input");
    if (!input.trim() || !inputBox.checkValidity()) {
      inputEl.classList.add("active");
      inputEl.querySelector("input").focus();

      inputEl.querySelector("p").innerText = inputBox.validationMessage;
    }
    setViewOverlay(false);
  }
  

  const accLogin = () => {
    
    fetch('/login-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
      if (data.confirmation) {
        setLoginSucc(true);
        
      } else {
        setLoginSucc(false)
      }
      setViewOverlay(false);


    })
    .catch(err => console.log(err));
  }

  const registerAcc = () => {
    const {regPass, confirmPass, regEmail} = regData;
  //  const emptyChecker = !!regPass || !!confirmPass;
    regEmailInputRef.current.classList.remove("active");
    regPassInputRef.current.classList.remove("active");
    regConfirmPassInputRef.current.classList.remove("active");
  
    const notMatchedFunc = (container, para) => {
      container.classList.add("active");
      para.innerText = "Passwords did not matched";
    }

    if (regPass.trim() == "" || 
        confirmPass.trim() == "" || 
        regEmail.trim() == ""
       ) {

        emptyInputHandler(confirmPass, regConfirmPassInputRef.current);
        emptyInputHandler(regPass, regPassInputRef.current);
        emptyInputHandler(regEmail, regEmailInputRef.current);
    }    

    else if (!regEmailInputRef.current.querySelector('input').checkValidity()) {
      emptyInputHandler(regEmail, regEmailInputRef.current);
    }

    else if (confirmPass.trim() !==  regPass.trim()) {
     


      const passInput = regPassInputRef.current;
      const confirmPassInput = regConfirmPassInputRef.current;

      notMatchedFunc(passInput, passInput.querySelector('p'));
      notMatchedFunc(confirmPassInput, confirmPassInput.querySelector('p'));
      setViewOverlay(false);
    }
    
    else {
     fetch("/register-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(regData)
     })
     .then(res => res.json())
     .then(data => {
      if (data.confirmation) {
        setRegSucc(true);
        
      } else {
        setRegSucc(false);
        regEmailInputRef.current.classList.add("active");
        regEmailInputRef.current.querySelector("input").focus();

        regEmailInputRef.current.querySelector('p').innerText = "This email was already taken";
   
      }
      setViewOverlay(false);
     })
     .catch(err => console.log(err));
    } 
    
  }

  const formSubmitHandler = () => {
    setViewOverlay(true);

    switch(category) {
      case "register":
        registerAcc();
      
      break;

      case "login":

      
      const {logEmail, logPass} = loginData;
      const logEmailInput = logEmailInputRef.current.querySelector("input");
      if ((logEmail == "" || logPass == "") || !logEmailInput.checkValidity()) {
          setViewOverlay(false);
          emptyInputHandler(logEmail, logEmailInputRef.current);
          emptyInputHandler(logPass, logPassInputRef.current);
      }
      
      else {

         fetch('/login-check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
         })
         .then(res => res.json())
         .then(data => {
          if (data.confirmation) {
            localStorage.setItem("user_id", data.id);
            retrieveBookmark();
            fetch('/login-account', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({})
            })
            .then(res => res.json())
            .then(data => {
              if (data.confirmation) {
                setLoginSucc(true);
                
              } else {
                setLoginSucc(false)
              }
              setViewOverlay(false);


            })
            .catch(err => console.log(err));
          } else {
            setLoginSucc(false);
            setViewOverlay(false);
          }
            
         })
         .catch(err => console.log(err));
      } 

      break;
    }
  }
    
  const [toggle, setToggle] = React.useState({
    regPass: true, confirmPass: true, logPass: true
  });
  const passView = (e) => {
    if (toggle[e.target.id]) {
    e.target.src = "./assets/eye-slash.png";
    e.target.previousElementSibling.type = "text";
    setToggle(prevState => ({
      ...prevState,
    [e.target.id]: false
    }))

    } else {
      e.target.src = "./assets/eye.png";
      e.target.previousElementSibling.type = "password";
    setToggle(prevState => ({
      ...prevState,
    [e.target.id]: true
    }))

    }

  }
  return (
    <div className={`card ${category} ${classCondition ? "active" : ""}`}>
        <div className='image-section'>
        {/* <img src={imgSrc} alt=''/> */}
        <div className='overlay'>
          <a onClick={() => setMainPageActivate(true)}>Back to home</a>
          {/* <h2>{condition ? `Please Login your Account` : "Register and be part of our Journey!"}</h2> */}
        </div>
        </div>

        <div className='form-section'>
          <div className='title-text'>
            <h2>
              {introGreetings}
            </h2>
            <p>{subTitle}</p>
          </div>

          <div className='input-section'>
            <div ref={!condition ? regEmailInputRef : logEmailInputRef}>
               
                <input 
                ref={condition ? logEmailRef : null}
                onInput={formEventHandler}
                name={condition ? "log-email" : "reg-email"} 
                required
                id={condition ? "logEmail" : "regEmail"}
                type='email'
                />
                
                <label htmlFor={condition ? "logEmail" : "regEmail"}>Email</label>
                <p></p>
               
            </div>

            <div ref={!condition ? regPassInputRef : logPassInputRef}>
                <input 
                  ref={condition ? logPassRef : regPassRef}
                  onInput={formEventHandler}
                  name={condition ? "log-pass" : "reg-pass"} 
                  type='password' 
                  id={condition ? "logPass" : "regPass"}
                  required/>
                  <img onClick={passView} id='regPass' className='pass-view' width="20" src={`./assets/eye.png`} alt=""/>
                <label>Password</label>
                <p></p>
            </div>

            {condition ? 
            <p>Recover Password</p> : 
            (<div ref={!condition ? regConfirmPassInputRef : null}>
                <input 
                  onInput={formEventHandler} 
                  id="confirmPass" 
                  name='confirm-pass' 
                  type='password' 
                  required/>
                  
                  <img onClick={passView} id='confirmPass' className='pass-view' width="20" src={`./assets/eye.png`} alt=""/>
                <label htmlFor="confirmPass">Confirm Password</label>
                <p></p>
            </div>)}

          </div>

          <button onClick={formSubmitHandler}>{category}</button>
          {condition ? 
          <p>Not a member? <span onClick={() => setActiveCard("register")}>register now</span></p> : <p>Have an account ? <span onClick={() => setActiveCard("login")}>login now</span></p>}
          <div className='other-options'>
          
          
              <GoogleOAuthProvider clientId='824231704072-gsrcn341ikphj2a0n5deb86q4t83qbgr.apps.googleusercontent.com'>
               <GoogleLogin
                 text='continue_with' 
                 width="50px"
                 shape='circle'  
                 onSuccess={credentialResponse => {
                  setViewOverlay(true);
                  const decode = jwtDecode(credentialResponse.credential);
                  

                  fetch("/google-acc-auth", {
                    method: 'POST',
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email: decode.email})
                  })
                  .then(res => res.json())
                  .then(data => {
                    if (data.confirmation) {
                      localStorage.setItem("user_id", data.id);
                      accLogin();
                      retrieveBookmark();
                      setActiveCard("login");
                      setLoginSucc(true);
                      setViewOverlay(false)
                    } else {
                      fetch("/register-account", {
                        method: 'POST',
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({regEmail: decode.email, regPass: null})
                      })
                      .then(res => res.json())
                      .then(data => {
                        accLogin();
                        setActiveCard("login");
                        setLoginSucc(true);
                        setViewOverlay(false)
                      })
                    }
                  })
                    
                 }}
                 onError={() => {
                   console.error('Login Failed!');
                 }}
               />
              </GoogleOAuthProvider>
            
          </div>
        </div>

        </div>
  )
}
