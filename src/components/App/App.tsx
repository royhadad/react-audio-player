import React from 'react';
import styles from './styles';
import AudioPlayer from "./AudioPlayer";

const App: React.FC = () => {
    const classes = styles();

    return (
        <div className={classes.root}>
            <div className={classes.audioPlayerContainer}>
                <AudioPlayer/>
            </div>
        </div>
    );
}

export default App;
