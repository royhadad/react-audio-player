import {makeStyles} from "@material-ui/core/styles";

const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const styles = makeStyles((theme) => {
    return {
        root: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        title: {
            fontSize: '30px',
            margin: '10px 0px',
            height: '15%',
            textAlign: 'center',
            ...flexCenter
        },
        artist: {
            fontSize: '20px',
            marginBottom: '5px',
            height: '10%',
            textAlign: 'center',
            ...flexCenter
        },
        coverArt: {
            maxWidth: '90%',
            height: '60%',
        },
        bottomButtonsContainer: {
            width: '100%',
            margin: '10px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: '15%',
        },
        button: {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    }
})

export default styles;