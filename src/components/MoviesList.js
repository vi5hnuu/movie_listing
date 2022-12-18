import classes from './MoviesList.module.css'
import Movie from './Movie'

function MoviesList(props) {
    console.log('Movies list');
    console.log(props.movies);
    return <ul className={classes.moviesList}>
        {
            props.movies.map((movie) => {
                return <Movie
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    openingText={movie.openingText}
                    releaseDate={movie.releaseDate} />
            })
        }
    </ul>
}

export default MoviesList