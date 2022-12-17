import classes from './Movie.module.css'

function Movie(props) {
    return <li key={props.id} className={classes.movie}>
        <h2 className={classes.movie_title}>{props.title}</h2>
        <h3 className={classes.release_date}>{props.releaseDate}</h3>
        <p className={classes.movie_description}>{props.openingText}</p>
    </li>
}

export default Movie