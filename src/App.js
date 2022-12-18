import { Fragment, useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import classes from './App.module.css'
// import axios from 'axios';
import ClockLoader from "react-spinners/ClipLoader";
import NoMovie from './components/NoMovie';
import Error from './components/Error';
import AddMovie from './components/AddMovie';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import conf from './conf'

//cors problem
const override = {
  display: "block",
  margin: "0 auto",
};
initializeApp(conf);
function App() {
  const [movies, setMovies] = useState([])
  const [isFetchLoading, setIsFetchLoading] = useState(false)
  const [addMovieLoading, setAddMovieLoading] = useState(false)
  const [error, setError] = useState(null)
  const [addMovieModalVisibility, setAddMovieModalVisibility] = useState(false)

  function addMovieModalHandler() {
    setAddMovieModalVisibility((prevState) => {
      return !prevState
    })
  }
  async function addMovieHandler(movie) {
    setAddMovieLoading(true)
    if (!movie) {
      console.log('error adding movie.');
      setAddMovieLoading(false)
      return
    }
    setTimeout(() => {
      const db = getDatabase()
      const postListRef = ref(db, 'movies');
      const newPostRef = push(postListRef);
      set(newPostRef, movie)
      setAddMovieLoading(false)
    }, 500);

  }

  const fetchMoviesHandler = useCallback(async () => {
    setIsFetchLoading(true)
    setError(null)
    // try {
    //   //axious also throws error for bad status codes
    //   const response = await axios.get('https://swapi.dev/api/films')
    //   const movies = response.data.results.map((movieObj) => {
    //     return { title: movieObj.title, releaseDate: movieObj.release_date, openingText: movieObj.opening_crawl, id: movieObj.episode_id }
    //   })
    //   setMovies(movies)
    // } catch (error) {
    //   setError(error.message)
    // }

    //
    const db = getDatabase();
    const dbRef = ref(db, 'movies');
    const movies = []
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        childData.id = childKey
        movies.push(childData)
      });
      setIsFetchLoading(false)
      setMovies(movies)
    }, {
      onlyOnce: true
    });
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
      <ClockLoader
        loading={addMovieLoading}
        cssOverride={override}
      />
      {addMovieModalVisibility && !addMovieLoading && <AddMovie onAddMovie={addMovieHandler} />}
    </section>
    <section className={classes.container}>
      <ClockLoader
        loading={isFetchLoading}
        cssOverride={override}
      />
      {!isFetchLoading && movies.length > 0 && <MoviesList movies={movies} />}
      {!isFetchLoading && !error && movies.length === 0 && <NoMovie message='No Movies Found.' />}
      {!isFetchLoading && error && <Error message={error} />}
    </section>
  </Fragment >
}

export default App;
