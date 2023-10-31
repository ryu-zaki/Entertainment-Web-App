import React from 'react'

export default function loginErrorModal({loginSucc, setLoginSucc}) {
  return (
    <div className={`login-error-wrapper ${loginSucc === false ? "active" : ""}`}>
      <div className='error-card'>
        <div>
          <img draggable="false" src='./assets/warning-icon.png' alt=''/>
          <div>
            <h2>Oooppss</h2>
            <p>Looks like you haven't registered yet.</p>
          </div>
        </div>
        <button onClick={() => setLoginSucc(null)}>Try Again</button>
      </div>
      
    </div>
  )
}
