import {makeStyles} from "@material-ui/core/styles";

const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const styles = makeStyles((theme) => {
    return {
        root: {
            border: '1px solid black',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        title: {
            fontSize: '30px',
            margin: '10px 0px',
            flexGrow: 2,
            ...flexCenter
        },
        artist: {
            fontSize: '20px',
            marginBottom: '5px',
            flexGrow: 2,
            ...flexCenter
        },
        coverArt: {
            maxWidth: '80%',
            flexGrow: 1
        },
        bottomButtonsContainer: {
            width: '100%',
            margin: '10px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexGrow: 4
        },
        button: {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    }
})

export default styles;