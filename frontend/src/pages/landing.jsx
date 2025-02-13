import React from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {

  const router = useNavigate();

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>NexusMeet</h2>
        </div>
        <div className="navlist">

          <p onClick={() => {
           window.location.href = "/skjhf" 
          }}>Join as Guest</p>

          <p onClick={() => {
            router("/auth")
          }}>Register</p>

          <button onClick={() => {
            router("/auth")
          }}>Login</button>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="landingMainContent">
          <h1>Seamless Virtual Meetings <br/>and Collaboration</h1>
          <p>Transforming the Way You Connect, Communicate, and Collaborate in a Virtual World</p>
          <div role="button">
            <Link to={"/auth"}><button>Get Started</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
