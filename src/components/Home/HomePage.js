import videoHomePage from "../../assets/video_homepage.mp4"

const HomePage =()=>{

    return(
        <div className="homepage-container">
             <div className="hero__video">
             <video autoPlay loop muted width="600" height="400"  >
        <source
          src={videoHomePage}
          type="video/mp4"
        />
      </video>
             </div>
            <div className="hero__content">
                <h1>
                Forms
that break
the norm
                </h1>
                <p>Get more data—like signups, feedback, and anything else—with forms designed to be <strong>refreshingly different.</strong></p>
                <button className="btn btn-primary btn-lg">Get started—it's free</button>
            </div>
        </div>
    )
}

export default HomePage