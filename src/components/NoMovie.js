import classes from './NoMovie.module.css'

function NoMovie(props) {
    return <div key='#' className={classes.nomovie}>
        <p>{props.message}</p>
    </div>
}

export default NoMovie