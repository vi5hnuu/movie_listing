import classes from './Error.module.css'
import errorImage from './../assets/error.gif'

function Error(props) {
    return <div key='#' className={classes.error}>
        <img src={errorImage} alt={props.message} />
    </div>
}

export default Error