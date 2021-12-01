import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core'
import ProgressBar from './ProgressBar';
const createStyle = makeStyles((theme) => {
    return ({
        centerGrid: {
            minHeight : '100vh'
        }
    })
})
export default function SplashScreen(props) {
    const classes = createStyle();
    return (
        <Grid container className={classes.centerGrid} direction='column'  alignItems="center"
        justifyContent="center">
            <Typography align='center' variant='h2' color='primary'>TM Debtors Accounting</Typography>
            <Typography align='center' variant='h6' color='primary'>{props.progress}</Typography>
            <ProgressBar/>
        </Grid>
    )
}