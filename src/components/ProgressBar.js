import React from 'react';
import {Box,LinearProgress} from "@mui/material"
import {makeStyles}  from '@material-ui/core';
const createStyles=makeStyles((theme)=>{
    return ({
        box : {
            width : "100%",
            position : "fixed",
            top : 0,
            zIndex : theme.zIndex.appBar+1454545
        }
    })
})
export default function ProgressBar(){
    const classes=createStyles();
    return (
        <Box className={classes.box}>
            <LinearProgress color="secondary"/>
        </Box>
    )
}