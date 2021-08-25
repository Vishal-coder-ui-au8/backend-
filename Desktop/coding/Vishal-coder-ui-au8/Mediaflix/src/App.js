import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Row from "./components/Row";
import request from "./components/request";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import axios from "axios";
import { useHistory } from "react-router-dom";

function App() {
 
  const [movieList, setMovieList] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const netflixOriginals = await axios.get(request.fetchNetflixOriginals);
        const trending = await axios.get(request.fetchTrending);
        const topRated = await axios.get(request.fetchTopRated);
        const actionMovies = await axios.get(request.fetchActionMovies);
        const horrorMovies = await axios.get(request.fetchHorrorMovies);
        const comedyMovies = await axios.get(request.fetchComedyMovies);
        const romanceMovies = await axios.get(request.fetchRomanceMovies);
        const documentries = await axios.get(request.fetchDocumentries);

        const movies = [
          {
            label: "Netflix Originals",
            data: [...netflixOriginals.data.results],
          },
          { label: "Trending", data: [...trending.data.results] },
          {
            label: "Top Rated",
            data: [...topRated.data.results],
          },
          { label: "Documentries", data: [...documentries.data.results] },
          {
            label: "Action Movies",
            data: [...actionMovies.data.results],
          },
          { label: "Horror Movies", data: [...horrorMovies.data.results] },
          {
            label: "Comedy Movies",
            data: [...comedyMovies.data.results],
          },
          { label: "Romantic Movies", data: [...romanceMovies.data.results] },
        ];

        setMovieList([...movies]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      return request;
    }
    fetchData();
  }, []);

 

  const history = useHistory();
  const onMovieSelect = (id) => history.push("/" + id);

  return !loading ? (
    <div className="app">
      
      <Nav
        label="Search Movies"
        onChange={(event, value, reason) => {
          onMovieSelect(value.id);
        }}
        movieList={movieList}
      />
      <Banner />

      {movieList?.map((row) => (
        <Row title={row.label} movieList={row.data} />
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;