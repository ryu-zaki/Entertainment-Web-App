import React from 'react'
import MoviesData from '../MoviesData';
import "../MoviesStyle.module.css"

/* 
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
 */

export default function MovieMainPage({movieView, setMovieView, setViewOverlay}) {

  React.useEffect(() => {

    window.scrollTo(0, 0);
    setViewOverlay(false);

    const textCon = document.querySelector('.movie-main-page');

    textCon.classList.add('active');
  }, [])
      

  let movieArr = [];
  for (let i = 0; i < MoviesData.general.length; i++) {
    if (MoviesData.general[i].title === movieView) {
      movieArr.push(MoviesData.general[i]);
    }
  };

  const {title, year, description, imgUrl, ratings, length, movieLevel, category, episodes} = movieArr[0];

  

  return (
    <div className='movie-main-page'>
      <section className='intro-sec'>
      <section className='hero-page'>
        <img src={`./assets/thumbnails/${imgUrl.replace("small", "large")}`} alt='' className="bg-img"/>
        <div className='movie-overlay'>
        <p className='quality-tag'>HD 720p</p>
        <lord-icon
           src="https://cdn.lordicon.com/vduvxizq.json"
           trigger="loop"
           delay="2000"
           colors="primary:#FC4747"
           state="hover-ternd-flat-2"
           style={{width:"30px",height:"50px", transform: "rotate(180deg)", cursor:"pointer"}}
           onClick={() => {setMovieView(""); setViewOverlay(true)}}>
        </lord-icon>

        <div className='inner-text-poster'>
        <div className='text-header'>
          <h1>{title}</h1>
          <div className='categories'>
            <p>{movieLevel}</p>
            <p>{category}</p>
            {category === "TV Series" ? <p>{episodes} Episodes</p> : null}
          </div>
          <div className='ratings'>
          <lord-icon
            src="https://cdn.lordicon.com/whrxobsb.json"
            trigger="in"
            delay="1000"
            colors="primary:#FC4747"
            style={{width:"20px",height:"20px"}}>
         </lord-icon>
         
         <p>{ratings}/10</p>
          </div>

          <section className='movie-desc'>
        <p>
          <i>
          {description}
          </i>
        </p>
      </section>
      <section className='details-section'>
        <div>
          <p>Year</p>
          <p>{year}</p>
        </div>
        <div>
          <p>Country</p>
          <p>USA</p>
        </div>
        <div>
          <p>Length</p>
          <p>{length} mins</p>
        </div>
      </section>
        </div>

<div>
     <div className='poster-con'>
        <img className='bg-poster' src={`./assets/thumbnails/${imgUrl}`} alt=''/>
        <div className='play-btn'>
         <div class="triangle-right"></div>
        </div>
      </div>

      <section className='icon-sec'>
      <div>
      <lord-icon
    src="https://cdn.lordicon.com/ercyvufy.json"
    trigger="hover"
    colors="primary:#FFF"
    style={{width:"30px",height: "50px"}}>
</lord-icon>
<p>Share</p>
      </div>

<div>
<lord-icon
    src="https://cdn.lordicon.com/jkzgajyr.json"
    trigger="hover"
    colors="primary:#FFF"
    style={{width:"30px",height: "50px"}}>
</lord-icon>
<p>Save</p>
</div>

<div>
<lord-icon
    src="https://cdn.lordicon.com/yxczfiyc.json"
    trigger="hover"
    colors="primary:#FFF"
    style={{width:"30px",height: "50px"}}>
</lord-icon>
<p>Info</p>
</div>
      </section>


</div>
        
        </div>
        


        </div>
      </section>
      <div className='play-btn'>
      <div class="triangle-right"></div>
      </div>
    </section>

      <section className='details-section'>
        <div>
          <p>Year</p>
          <p>{year}</p>
        </div>
        <div>
          <p>Country</p>
          <p>USA</p>
        </div>
        <div>
          <p>Length</p>
          <p>{length} mins</p>
        </div>
      </section>

      <section className='movie-desc'>
        <p>
          <i>
          {description}
          </i>
        </p>
      </section>  

      <section className='icon-sec'>
      <div>
      <lord-icon
    src="https://cdn.lordicon.com/ercyvufy.json"
    trigger="hover"
    colors="primary:#FC4747"
    style={{width:"30px",height: "50px"}}>
</lord-icon>
<p>Share</p>
      </div>

<div>
<lord-icon
    src="https://cdn.lordicon.com/jkzgajyr.json"
    trigger="hover"
    colors="primary:#FC4747"
    style={{width:"30px",height: "50px"}}>
</lord-icon>
<p>Save</p>
</div>

<div>
<lord-icon
    src="https://cdn.lordicon.com/yxczfiyc.json"
    trigger="hover"
    colors="primary:#FC4747"
    style={{width:"30px",height: "50px"}}>
</lord-icon>
<p>Info</p>
</div>
      </section>

      <footer className='movie-footer'>
        <p>Follow us</p>
        <div className='icons'>
          <img width='25' src="./assets/fb-icon.png" alt=''/>
          <img width='25' src="./assets/ins-icon.png" alt=''/>
          <img width='25' src="./assets/twit-icon.png" alt=''/>
          <img width='25' src="./assets/tik-icon.png" alt=''/>
        </div>
        <p className='copyRightTag'>&#169; 2023 All Rights Reserved</p>
      </footer>
    </div>
  )
}
