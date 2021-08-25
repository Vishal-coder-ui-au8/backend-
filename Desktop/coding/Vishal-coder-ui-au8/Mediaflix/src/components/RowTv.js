import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Row.css";
import { useHistory } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";

function RowTv({ title, fetchUrl, isLargeRow }) {
  //Declaring a new state variable
  const [tv, setTv] = useState([]);
  // A snippet of code which runs on a specific conditions/variables-hook concept
  useEffect(() => {
    // if [] is empty,run once when the row loads and don't run again
    // method 1
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      // console.log(request.data.results);
      setTv(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  let history = useHistory();
  const handleTv = (id) => {
    history.push("/tv/" + id);
    console.log(id);
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/* several row_posters */}

        {tv.map((el) => (
          //   tv the map will take a fn as a callback to return in the function we will have a grammar which will have individual items
          <img
            onClick={() => handleTv(el.id)}
            key={el.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? el.poster_path : el.backdrop_path}`}
            alt={el.title}
          />
        ))}
      </div>

      {/* title-popular,toprated,tv episodes,etc */}
      {/* container that will contain the images/lets call them posters */}
    </div>
  );
}

export default RowTv;
