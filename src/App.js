import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const API_KEY = "982ff953";
function App() {
  const [movie, setMovie] = useState("");
  const [movieDetails, setMovieDetails] = useState({});
  const [showMovie, setShowMovies] = useState(false);
  const [paginationNumbers, setPaginationNumbers] = useState([]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = await fetchMovieData();
      setMovieDetails(data);
      setShowMovies(true);

      const movies = Math.ceil(Number(data["totalResults"]));

      let paginatedMovies = [];
      for (let index = 1; index <= movies; index++) {
        paginatedMovies.push(index);
      }
      setPaginationNumbers(paginatedMovies);
    } catch (err) {
      console.log("Error");
    }
  }

  async function fetchMovieData(page = 1) {
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}&p=${page}`;
    const data = await fetch(url).then((res) => res.json());

    return data;
  }

  function handleClick(num) {
    const data = fetchMovieData(num);
    setMovieDetails(data);
  }

  return (
    <>
      <h1>Movies</h1>

      {/* form */}
      <form onSubmit={handleSubmit}>
        <label>Movie name:</label>
        <input
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Enter a movie name"
        />
      </form>
      {showMovie && (
        <div>
          {movieDetails &&
            movieDetails["Search"] &&
            movieDetails["Search"].map((data) => (
              <div className="movie-card">
                <p>{data.Title}</p>
                <p>{data.Year}</p>
              </div>
            ))}
        </div>
      )}

      {paginationNumbers &&
        paginationNumbers.length > 0 &&
        paginationNumbers.map((num) => {
          <button onClick={handleClick(num)} key={num}>
            {num}
          </button>;
        })}
    </>
  );
}

export default App;
