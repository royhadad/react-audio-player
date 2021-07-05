import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => {
    return {
        root: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(120DEG, #1DB954, #191414);'
        },
        audioPlayerContainer: {
            width: '600px',
            maxWidth: '100%',
            height: '100%'
        }
    }
})

export default styles;