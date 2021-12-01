import React from 'react'
import { Grid, makeStyles, Paper, Typography, Table, TableRow, TableCell, IconButton, TableContainer, TableHead, TableBody, TablePagination, TableFooter, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, OutlinedInput, InputLabel, List, ListItem, ListItemText, ListItemIcon, Checkbox, ListSubheader, Button, Divider, Toolbar, Select, MenuItem, Input, InputAdornment } from '@material-ui/core';
import AccountingAlert from './AccountingAlert';
import ProgressBar from './ProgressBar';
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import AddIcon from '@material-ui/icons/Add'
import LocationIcon from '@material-ui/icons/LocationOn'
import HomeIcon from '@material-ui/icons/Home'
import PhoneIcon from '@material-ui/icons/Phone'
import Autocomplete from '@mui/material/Autocomplete';
import ReceiptIcon from '@material-ui/icons/Receipt'

const createStyle = makeStyles((theme) => {
    return ({
        container: {
            margin: "10px",
            padding: "10px"
        },
        heading: {
            display: 'flex',
            alignItems: 'center'
        },
        paper: {
            minHeight: "85vh"
        },
        paperContainer: {
            padding: "10px"
        },
        headingCell: {
            fontWeight: "bold"
        },
        addFab: {
            size: 'small',
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 54545
        },
        cancelFab: {
            size: 'small',
            position: "fixed",
            bottom: 16,
            right: 70,
            zIndex: 54545
        }
    })
})
function getCustomerBalance(code) {
    return new Promise((resolve, reject) => {
        fetch(`/getCustomerBalance?code=${code}`).then(response => response.json()).then(
            (response) => {
                if (response.success) resolve(response.balance)
                else reject(response.error)
            }
        ).catch((error) => {
            reject(error.message)
        })
    })
}
function saveReceiptAtBackEnd(receipt){
    return new Promise((resolve,reject)=>{
        fetch('/saveReceipt', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(receipt)
        }).then(response=>response.json()).then((response)=>{
            if(response.success) resolve()
            else reject(response.error)
        }).catch((error)=>{
            reject(error.message)
        })
    })
}
export default function Receipt(props) {
    const classes = createStyle();
    const [customer, setCustomer] = React.useState()
    const [date, setDate] = React.useState();
    const [narration, setNarration] = React.useState();
    const [amount, setAmount] = React.useState();
    const [showProgress, setShowProgress] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState();
    const [alertSeverity, setAlertSeverity] = React.useState();
    const [customerBalance, setCustomerBalance] = React.useState(0);
    const [balanceType, setBalanceType] = React.useState();
    function showSnackbar(message, severity) {
        setShowAlert(true)
        setAlertMessage(message)
        setAlertSeverity(severity)
    }

    const customerSelectionHandler = (ev, cust) => {
        if (!cust) return;
        setShowProgress(true)
        getCustomerBalance(cust.code).then((balance) => {
            setCustomer(cust);
            if(balance<0)
            {
                setBalanceType('CR');
                setCustomerBalance(-balance)
            }
            else
            {
                setBalanceType('DR');
                setCustomerBalance(balance)
            }
            setShowProgress(false)
        }, (error) => {
            alert(error)
            showSnackbar(error,'error')
            setShowProgress(false)
        })
    }
    const clearReceipt = () => {
        setNarration('')
        setDate('')
        setAmount('')
        setCustomer(undefined)
    }
    const saveReceipt=()=>{
        setShowProgress(true);
        let receipt={
            receiptDate : date,
            customerCode : customer.code,
            amount : amount,
            narration : narration
        }
        saveReceiptAtBackEnd(receipt).then(()=>{
            showSnackbar('Receipt has been created ','success');
            setShowProgress(false);
            clearReceipt();
        },(error)=>{
            showSnackbar(error,'error');
            setShowProgress(false);
        })
    }
    return (
        <Grid container className={classes.mainContainer} justifyContent='center' style={{ padding: '20px' }}>
            <AccountingAlert open={showAlert} message={alertMessage} severity={alertSeverity} onClose={() => { setShowAlert(false) }} onExit={() => { setShowAlert(false) }} />
            {showProgress && <ProgressBar />}
            <Fab color='secondary' className={classes.cancelFab} size='medium' onClick={clearReceipt}>
                <CancelIcon />
            </Fab>
            <Fab color='primary' className={classes.addFab} size='medium' onClick={saveReceipt}>
                <AddIcon />
            </Fab>
            <Grid item xs={12}>
                <Paper elevation={10} className={classes.paper} component='div'>
                    <Grid container className={classes.paperContainer} spacing={2}>
                        <Grid item xs={12} >
                            <div className={classes.heading}>
                                <Typography component='span' variant='subtitle1'><b>Generate a receipt</b></Typography>
                            </div>
                            <Divider style={{ marginTop: "10px" }} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container >
                            <Grid item xs={11} style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}><Typography style={{ color: '#007bff' }} variant='h5'>{props.trader.name}</Typography></Grid>
                        </Grid>
                        <Grid container justifyContent='flex-end'>
                            <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}><HomeIcon color='primary' />&nbsp; </Grid>
                            <Grid item xs={2}><Typography variant='body1' component='span'>{props.trader.address}</Typography></Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex' }}><LocationIcon color='primary' />&nbsp; </Grid>
                            <Grid item xs={2}><Typography variant='body1' component='span'>{props.states.find((state) => state.code == props.trader.stateCode).name}</Typography></Grid>
                        </Grid>
                        <Grid container alignItems='baseline'>
                            <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>GST</b></Typography>&nbsp; </Grid>
                            <Grid item xs={2}><Typography variant='body1' component='span'>{props.trader.gstNum}</Typography></Grid>
                        </Grid>
                        {
                            props.trader.contact1 &&
                            <Grid container>
                                <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                <Grid item xs={2}><Typography variant='body1' component='span'>{props.trader.contact1}</Typography></Grid>
                            </Grid>

                        }
                        {
                            props.trader.contact2 &&
                            <Grid container>
                                <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                <Grid item xs={2}><Typography variant='body1' component='span'>{props.trader.contact2}</Typography></Grid>
                            </Grid>

                        }
                        {
                            props.trader.contact3 &&
                            <Grid container>
                                <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                <Grid item xs={2}><Typography variant='body1' component='span'>{props.trader.contact3}</Typography></Grid>
                            </Grid>

                        }
                        {
                            props.trader.regTitle1 &&
                            <Grid container alignItems='baseline'>
                                <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{props.trader.regTitle1}</b></Typography>&nbsp; </Grid>
                                <Grid item xs={2}><Typography variant='body1' component='span'>{props.trader.regValue1}</Typography></Grid>
                            </Grid>

                        }
                        {
                            props.trader.regTitle2 &&
                            <Grid container alignItems='baseline'>
                                <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{props.trader.regTitle2}</b></Typography>&nbsp; </Grid>
                                <Grid item xs={2}><Typography variant='body1' component='span'>{props.trader.regValue2}</Typography></Grid>
                            </Grid>

                        }
                        {
                            props.trader.regTitle3 &&
                            <Grid container alignItems='baseline'>
                                <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{props.trader.regTitle3}</b></Typography>&nbsp; </Grid>
                                <Grid item xs={2}><Typography variant='body1' component='span'>{props.trader.regValue3}</Typography></Grid>
                            </Grid>
                        }
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12} style={{ padding: '20px' }}>
                        <Grid container style={{ marginTop: "12px" }} spacing={4}><Grid item xs={12}><Typography style={{ color: '#007bff' }} variant='h3'><ReceiptIcon fontSize='large' />&nbsp; Received From: </Typography></Grid></Grid>
                        <Grid item xs={6} style={{ marginTop: "10px" }}>
                            {
                                customer != null &&
                                <React.Fragment>
                                    <Typography variant='h5'>{customer.name}</Typography>
                                    <Grid container >
                                        <Grid item style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}><HomeIcon color='primary' />&nbsp; </Grid>
                                        <Grid item ><Typography variant='body1' component='span'>{customer.address}</Typography></Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item style={{ justifyContent: 'flex-end', display: 'flex' }}><LocationIcon color='primary' />&nbsp; </Grid>
                                        <Grid item ><Typography variant='body1' component='span'>{props.states.find((state) => state.code == customer.stateCode).name}</Typography></Grid>
                                    </Grid>
                                </React.Fragment>
                            }
                            {
                                customer != null && customer.contact1 &&
                                <Grid container>
                                    <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                    <Grid item ><Typography variant='body1' component='span'>{customer.contact1}</Typography></Grid>
                                </Grid>

                            }
                            {
                                customer != null && customer.contact2 &&
                                <Grid container>
                                    <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                    <Grid item><Typography variant='body1' component='span'>{customer.contact2}</Typography></Grid>
                                </Grid>

                            }
                            {
                                customer != null && customer.contact3 &&
                                <Grid container>
                                    <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                    <Grid ><Typography variant='body1' component='span'>{customer.contact3}</Typography></Grid>
                                </Grid>

                            }
                            {
                                customer != null && customer.regTitle1 &&
                                <Grid container alignItems='baseline'>
                                    <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{customer.regTitle1}</b></Typography>&nbsp; </Grid>
                                    <Grid item ><Typography variant='body1' component='span'>{customer.regValue1}</Typography></Grid>
                                </Grid>

                            }
                            {
                                customer != null && customer.regTitle2 &&
                                <Grid container alignItems='baseline'>
                                    <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{customer.regTitle2}</b></Typography>&nbsp; </Grid>
                                    <Grid item ><Typography variant='body1' component='span'>{customer.regValue2}</Typography></Grid>
                                </Grid>

                            }
                            {
                                customer != null && customer.regTitle3 &&
                                <Grid container alignItems='baseline'>
                                    <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{customer.regTitle3}</b></Typography>&nbsp; </Grid>
                                    <Grid item ><Typography variant='body1' component='span'>{customer.regValue3}</Typography></Grid>
                                </Grid>
                            }
                            {
                                customer == null &&
                                <Autocomplete
                                    getOptionLabel={obj => obj.name}
                                    options={props.customers}
                                    onChange={customerSelectionHandler}
                                    renderInput={(params) => <TextField {...params} label="Customer Name" />}
                                />
                            }
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <TextField
                                id="date"
                                label="Receipt Date"
                                value={date}
                                onChange={(ev) => { setDate(ev.target.value) }}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        {
                            customer && customerBalance != 0 &&
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '21px' }}>
                                <TextField
                                    label="Customer balance"
                                    value={customerBalance}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Typography variant='h6'>{balanceType}</Typography>
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={()=>{}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                        }

                        <Grid style={{ marginTop: "20px", marginBottom: '20px' }} item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ padding: '20px' }}>
                        <Grid container justifyContent='center'>
                            {
                                customer &&
                                <Table stickyHeader>
                                    <TableHead className={classes.tableHeading}>
                                        <TableRow >
                                            <TableCell className={classes.headingCell}>Narration</TableCell>
                                            <TableCell className={classes.headingCell}>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell width='75%'>
                                                <TextField
                                                    margin="dense"
                                                    fullWidth
                                                    value={narration}
                                                    onChange={(ev) => { setNarration(ev.target.value) }}
                                                    label="Narration"
                                                    variant='standard'
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={amount}
                                                    margin="dense"
                                                    fullWidth
                                                    onChange={(ev) => { setAmount(ev.target.value) }}
                                                    label="Amount"
                                                    variant='standard'
                                                    value={amount}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell width='75%' align='center'>
                                                <b>Total</b>
                                            </TableCell>
                                            <TableCell>
                                                <b>{amount}</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>

                            }
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}