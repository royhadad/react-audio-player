import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

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
            
        </div>
    );
}

export default App;
