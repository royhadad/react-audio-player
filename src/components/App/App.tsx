import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import AudioPlayer from "./AudioPlayer";

const createClasses = makeStyles((theme) => {
    return {
        root: {
            margin: '50px 10%',
            [theme.breakpoints.down('sm')]: {
                margin: '0'
            },
        }
    }
})

const App: React.FC = () => {
    const classes = createClasses();

    return (
        <div className={classes.root}>
            <AudioPlayer/>
        </div>
    );
}

export default App;
