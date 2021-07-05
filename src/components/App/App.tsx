import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import AudioPlayer from "./AudioPlayer";

const createClasses = makeStyles((theme) => {
    return {
        root: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                margin: '0'
            },
            background: 'linear-gradient(120DEG, #1DB954, #191414);'
        },
        audioPlayerContainer: {
            maxWidth: '600px',
            height: '100%'
        }
    }
})

const App: React.FC = () => {
    const classes = createClasses();

    return (
        <div className={classes.root}>
            <div className={classes.audioPlayerContainer}>
                <AudioPlayer/>
            </div>
        </div>
    );
}

export default App;
