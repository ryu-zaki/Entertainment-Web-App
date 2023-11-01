import React, {useEffect, useRef} from 'react'
import SideNavBar from './components/SideNavBar'
import MainContents from './components/MainContents'
import LoginSignupPage from './components/LoginSignupPage';
import './App.css';
import IntroPage from './components/IntroPage';
import LoginErrorModal from './components/loginErrorModal';
import MovieMainPage from './components/MovieMainPage';

export default function App() {

  /* Login and Signup Functionality */
  const [activeCard, setActiveCard] = React.useState("login");

  /* Register User Informations */
  const [regData, setRegData] = React.useState({
    regEmail: "",  regPass: "", confirmPass: ""
  });

  /* Login User Informations */
  const [loginData, setLoginData] = React.useState({
    logEmail: "",  logPass: ""
  });

  const [loginSucc, setLoginSucc] = React.useState();

  /* For DOM manipulation and changing the classList */
  const regEmailInputRef = useRef();
  const regPassInputRef = useRef();
  const regConfirmPassInputRef = useRef();

  const logEmailInputRef = useRef();
  const logPassInputRef = useRef();

  const saveUserAccount = (e) => {
    const { id, value } = e.target;
    switch(activeCard) {
      case "login":
        setLoginData(prevState => ({
          ...prevState,
          [id]: value
        }))

        switch(id) {
          case "logEmail":
           logEmailInputRef.current.classList.remove("active");
          break

          case "logPass":
           logPassInputRef.current.classList.remove("active");
          break

          default:
            break;
        }
      break;

      case "register":
        setRegData(prevState => ({
          ...prevState,
          [id]: value
        }))

        switch(id) {
          case "regEmail":
           regEmailInputRef.current.classList.remove("active");
          break

          case "regPass":
           regPassInputRef.current.classList.remove("active");
          break

          case "confirmPass":
           regConfirmPassInputRef.current.classList.remove("active");
          break

          default:
            break;
        }
      break;

      default:
        break;
    }
  };


  /* Bookmark States Functionality */
  const [mainPageActivate, setMainPageActivate] = React.useState(true);
  const [isFav, setIsFav] = React.useState({});
  const [activePage, setActivePage] = React.useState("home");
  const pageClickHandler = ({target}) => {
    setActivePage(target.id);
  }
  
  const [favToogle, setFavToogle] = React.useState(true);

  const retrieveBookmark = () => {
      fetch("/retrieve-bookmarks", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id: localStorage.getItem("user_id")})
      })
      .then(res => res.json())
      .then(data => {
        if (data.confirmation) {
          if (!!data.arrData) {
            const txtArr = data.arrData;
            const arr = txtArr.split(",");

            arr.forEach(item => {
              setIsFav(prevState => ({
                ...prevState,
                [item]: true
              }))
              setLoginSucc("login");
            })
          } else {
            setIsFav({});
          }
          
          
        } else {
          alert('error');
        }
      })
  }
  let movArr = [''];
  useEffect(() => {
    
    for (let x in isFav) {
      if (isFav[x] === true) {
        movArr.push(x)
      }
    }
    const haveAnId = !!localStorage.getItem("user_id");


    if (movArr.length >= 1 && (loginSucc &&  haveAnId)) {  
     fetch("/bookmark-add", {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({data: movArr, user_id: localStorage.getItem("user_id")})
     })
     .then(res => res.json())
     .then(data => {
       if (data.confirmation) {
         console.log("Bookmark Success");
       } else {
         console.log("Bookmark failed");
       }
     })
     
   }

  


  else if (movArr.length === 1 && (!(!!loginSucc) &&  haveAnId))  {
    retrieveBookmark();
    }
  }, [favToogle]);
  

  const setFavorite = (e) => {
    fetch("/bookmark-check", {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
      if (data.confirmation === true) {
        const {id} = e.target;
        setFavToogle(prev => !prev);
         setIsFav((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }))
        
        
        return;
      } 

      /* To activate the error modal */
      setLoginSucc(false);

    })
    .catch(err => console.log(err));
  }


  /* Main Contents States Functionality*/
  const [userSearch, setUserSearch] = React.useState('');
  const [isRender, setIsRender] = React.useState(false);

  const searchHandler = ({target}) => {
    setUserSearch(target.value);
    setIsRender(true);
  }

  const homeNav = () => {
    setIsRender(false);
    setUserSearch('');
  }

/* Introduction Page Function */
const [startPage, setStartPage] = React.useState(false);
  
/* Overlay state */
const [viewOverlay, setViewOverlay] = React.useState(false);
  

const [regSucc, setRegSucc] = React.useState(false);


/* Logout State */
const [logoutAcc, setLogoutAcc] = React.useState(false);


/* Active Movie Viewer */
const [movieView, setMovieView] = React.useState("");


/* 
<MovieMainPage movieView={movieView} setMovieView={setMovieView}/>
*/

  return (
    <>
    <div className={`${viewOverlay ? "active" : ""} overlay-page`}>
      <h2>Please wait...</h2>
      <div class="leap-frog">
        <div className="leap-frog__dot"></div>
        <div className="leap-frog__dot"></div>
        <div className="leap-frog__dot"></div>
      </div>
     </div>
    {
     startPage || localStorage.getItem("startPage") === "true" ? (mainPageActivate ? movieView !== "" ? (<MovieMainPage setViewOverlay={setViewOverlay} movieView={movieView} setMovieView={setMovieView}/>) : 
     (<div className='main-wrapper'>
    <LoginErrorModal loginSucc={loginSucc} setLoginSucc={setLoginSucc}/>
     <SideNavBar 
       activePage={activePage} 
       pageClickHandler={pageClickHandler}
       homeNav={homeNav}
       setMainPageActivate={setMainPageActivate}
       setActiveCard={setActiveCard}
       loginSucc={loginSucc}
       setLoginSucc={setLoginSucc}
       setViewOverlay={setViewOverlay}
       logoutAcc={logoutAcc}
       setLogoutAcc={setLogoutAcc}
       setIsFav={setIsFav}
     />

     <MainContents 
       userSearch={userSearch} 
       isRender={isRender} 
       searchHandler={searchHandler} 
       setFavorite={setFavorite} 
       isFav={isFav}
       setActivePage={setActivePage}
       activePage={activePage}
       setViewOverlay={setViewOverlay}
       setMovieView={setMovieView}
       logoutAcc={logoutAcc}
       setLogoutAcc={setLogoutAcc}
       setLoginSucc={setLoginSucc}
        
     />
   </div>)
     : <LoginSignupPage 
     saveUserAccount={saveUserAccount} 
     setMainPageActivate={setMainPageActivate} 
     mainPageActivate={mainPageActivate}
     setActiveCard={setActiveCard}
     setViewOverlay={setViewOverlay}
     activeCard={activeCard} 
     regData={regData}
     loginData={loginData}
     loginSucc={loginSucc}
     regSucc={regSucc}
     setLoginSucc={setLoginSucc}
     setRegSucc={setRegSucc}
     setLoginData={setLoginData}
     setRegData={setRegData}
     regEmailInputRef={regEmailInputRef}
     regPassInputRef={regPassInputRef}
     regConfirmPassInputRef={regConfirmPassInputRef}
     logEmailInputRef={logEmailInputRef}
     logPassInputRef={logPassInputRef}
     retrieveBookmark={retrieveBookmark}
     
     />) : <IntroPage setStartPage={setStartPage} setViewOverlay={setViewOverlay}/>
      

      
    }
    </>
  )
}
