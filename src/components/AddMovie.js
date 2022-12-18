import { useRef } from 'react'
import classes from './AddMovie.module.css'

function AddMovie(props) {
    //https://console.firebase.google.com/project/movielisting-275b2/database/movielisting-275b2-default-rtdb/data/~2F

    const titleRef = useRef()
    const opn_textRef = useRef()
    const rdateRef = useRef()

    function processMovieDataHandler(event) {
        event.preventDefault()
        const movie = {
            title: titleRef.current.value,
            openingText: opn_textRef.current.value,
            releaseDate: rdateRef.current.value
        }
        if ((!movie.title || movie.title.trim().length === 0) ||
            (!movie.openingText || movie.openingText.trim().length === 0)) {
            return null;
        }
        props.onAddMovie(movie)
    }

    return <form className={classes.form} onSubmit={processMovieDataHandler}>
        <div className={classes.input_control}>
            <label htmlFor='title'>Title</label>
            <input ref={titleRef} id='title' type='text' placeholder='Avengers'></input>
        </div>
        <div className={classes.input_control}>
            <label htmlFor='opening_text'>Opening Text</label>
            <textarea ref={opn_textRef} id='opening_text' placeholder='Describe the movie...'></textarea>
        </div>
        <div className={classes.input_control}>
            <label htmlFor='release_date'>Release Date</label>
            <input ref={rdateRef} id='release_date' type='date'></input>
        </div>
        <div className={classes.form_actions}>
            <button type='submit'>Add Movie</button>
        </div>
    </form>
}

export default AddMovie