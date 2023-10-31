import React from 'react'




export default function IntroPage({setStartPage, setViewOverlay}) {

  const startThePage = () => {
    setStartPage(true);
    setViewOverlay(true);

    localStorage.setItem("startPage", "true");


  }

  return (
    <div className='intro-page'>
      <div className='rightP'></div>
      <div className='leftP'></div>
      <div className='text-section'>
        <h1>Entertainment Web App</h1>
        <p>Developed by Jhonwell Española.</p>
        <button onClick={startThePage}>Get Started</button>
      </div>      
    </div>
  )
}
