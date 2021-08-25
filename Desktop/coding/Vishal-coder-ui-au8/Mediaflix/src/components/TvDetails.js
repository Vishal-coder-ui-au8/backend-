import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/MovieDetails.css";
import axios from "axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

//const base_url = "https://image.tmdb.org/t/p/original";

function TvDetails(props) {
  let { id } = useParams();

  const [TvDetail, setTvDetail] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    // method 2
    axios
      .get(
        `
      https://api.themoviedb.org/3/tv/${id}?api_key=c2d5579d618254f564c00320d87fad1e&language=en-US
      `
      )
      .then((response) => {
        setLoading(false);
        setTvDetail(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
      // eslint-disable-next-line
  }, []);

  const [trailerUrl, setTrailerUrl] = useState();

  const playTrailer = () => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(TvDetail?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoPlay: 1,
    },
  };

  const contentClass = trailerUrl ? "fullOpacity" : "";

  return loading ? (
    <div>Loading...</div>
  ) : (
    <header
      className="bannerA"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${TvDetail?.backdrop_path}") `,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={`banner_contentsA ${contentClass}`}>
        <h1 className="banner_titleA">{TvDetail?.name}</h1>

        <div className="banner_buttonsA">
          <button className="banner_buttonA" onClick={playTrailer}>
            {trailerUrl ? "Stop" : "Play"}
          </button>
          <div className="banner_buttonA" style={{ marginLeft: "8px" }}>
            <span style={{ color: "yellow" }}> * </span>
            {TvDetail?.vote_average} / 10
            <span style={{ color: "yellow" }}> *</span>
          </div>
        </div>

        {trailerUrl && (
          <div style={{ marginTop: "16px" }}>
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}

        <div className="genres">
          {TvDetail?.genres?.map((genre, i) => (
            <div className="genre" style={{ marginRight: "8px" }} key={i}>
              {genre.name}
            </div>
          ))}
        </div>

        <h1 className="banner_descriptionA">{TvDetail?.overview}</h1>
        {/* {truncate(movie?.overview, 150)} */}
      </div>

      <div className="banner--fadeBottomA" />
    </header>
  );
}

export default TvDetails;
