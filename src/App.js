import { Fragment, useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import classes from './App.module.css'
import axios from 'axios';
import ClockLoader from "react-spinners/ClipLoader";
import NoMovie from './components/NoMovie';
import Error from './components/Error';
import AddMovie from './components/AddMovie';


const override = {
  display: "block",
  margin: "0 auto",
};

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [addMovieModalVisibility, setAddMovieModalVisibility] = useState(false)

  function addMovieModalHandler() {
    setAddMovieModalVisibility((prevState) => {
      return !prevState
    })
  }
  async function addMovieHandler(movie) {
    const postResponse = await axios.post('https://console.firebase.google.com/project/movielisting-275b2/database/movielisting-275b2-default-rtdb/data/~2F/movies.json', movie, {
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
    })
    movie.id = postResponse.data.id
    setMovies((prevState) => {
      return [movie, ...prevState]
    })
  }

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      //axious also throws error for bad status codes
      const response = await axios.get('https://swapi.dev/api/films')
      const movies = response.data.results.map((movieObj) => {
        return { title: movieObj.title, releaseDate: movieObj.release_date, openingText: movieObj.opening_crawl, id: movieObj.episode_id }
      })
      setMovies(movies)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])
  return <Fragment>
    <section className={classes.movie_fetch_add}>
      <div className={classes.actions}>
        <button onClick={fetchMoviesHandler} className={`${classes.button_fetch} ${classes.button}`}
        >Fetch Movies</button>
        <button onClick={addMovieModalHandler} className={`${classes.button_add} ${classes.button}`}
        >Add Movie</button>
      </div>
      {addMovieModalVisibility && <AddMovie onAddMovie={addMovieHandler} />}
    </section>
    <section className={classes.container}>
      <ClockLoader
        loading={isLoading}
        cssOverride={override}
      />
      {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      {!isLoading && !error && movies.length === 0 && <NoMovie message='No Movies Found.' />}
      {!isLoading && error && <Error message={error} />}
    </section>
  </Fragment >
}

export default App;
