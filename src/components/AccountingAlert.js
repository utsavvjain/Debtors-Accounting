import React from "react";
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Slide from '@mui/material/Slide'
function SlideComponent(props){
    return (
        <Slide direction='up' {...props}/>
    )
}
export default function AccountingAlert(props){
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onExit={props.onExit} onClose={props.onClose}
        TransitionComponent={SlideComponent}
        >
        <Alert onClose={props.onClose} severity={props.severity} variant='filled' elevation={4}>
          {props.message}
        </Alert>
      </Snackbar>

    )
}