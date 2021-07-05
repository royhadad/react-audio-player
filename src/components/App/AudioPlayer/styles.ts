import {makeStyles} from "@material-ui/core/styles";

const flexCenterMixin = {
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
            height: '15%',
            textAlign: 'center',
            ...flexCenterMixin
        },
        artist: {
            fontSize: '20px',
            height: '10%',
            textAlign: 'center',
            ...flexCenterMixin
        },
        coverArt: {
            maxWidth: '90%',
            height: '60%',
        },
        bottomButtonsContainer: {
            width: '100%',
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