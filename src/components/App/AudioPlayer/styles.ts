import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => {
    return {
        root: {
            margin: '50px 10%',
            [theme.breakpoints.down('sm')]: {
                margin: '0'
            },
        }
    }
})

export default styles;