import React from 'react';
import { Grid, makeStyles, Paper, Typography, IconButton, Box, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputAdornment, FormControl, OutlinedInput, InputLabel, List, ListItem, ListItemText, ListItemIcon, Checkbox, ListSubheader, Button, Divider, Avatar, ListItemAvatar, Select, MenuItem } from '@material-ui/core';
import AccountingAlert from './AccountingAlert';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'

import SettingsIcon from '@material-ui/icons/Settings'

import ProgressBar from './ProgressBar';

function saveTraderAtBackend(trader) {
    return new Promise((resolve, reject) => {
        fetch('/updateTrader', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(trader)
        }).then(response => response.json()).then((response) => {
            if (!response.success) {
                reject(response.error)
            }
            else {
                resolve()
            }
        }).catch((error) => {
            reject(error.message)
        })
    })
}

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
            width: "100%",
        },
        paperContainer: {
            padding: "10px"
        },
        fieldset: {
            margin: "10px",
            padding: "18px"
        },
        fab: {
            position: "fixed",
            bottom: 16,
            right: 20
        }
    })
})

export default function trader(props) {
    const [showProgress, setShowProgress] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState();
    const [alertSeverity, setAlertSeverity] = React.useState();
    const [name, setName] = React.useState();
    const [address, setAddress] = React.useState();
    const [stateCode, setStateCode] = React.useState(-1);
    const [gstNum, setGSTNum] = React.useState()
    const [regNoCounter, setRegNoCounter] = React.useState(0);
    const [regNumbers, setRegNumbers] = React.useState([]);
    const [contactCounter, setContactCounter] = React.useState(0);
    const [contactNumbers, setContactNumbers] = React.useState([]);
    const [blockAllInput, setBlockAllInput] = React.useState(false)
    const [bankName, setBankName] = React.useState();
    const [bankAccountNumber, setBankAccountNumber] = React.useState();
    const [bankBranchName, setBankBranchName] = React.useState();
    const [bankBranchIFSCCode, setBankBranchIFSCCode] = React.useState();

    const classes = createStyle();
    function addRegistrationNumberField() {
        setRegNoCounter(regNoCounter + 1)
        let regNum = [...regNumbers]
        regNum.push({ regTitle: '', regValue: '' })
        setRegNumbers(regNum)
    }
    function addContactNumberField() {
        setContactCounter(contactCounter + 1)
        let cnts = [...contactNumbers]
        cnts.push("")
        setContactNumbers(cnts)
    }
    function showSnackbar(message, severity) {
        setShowAlert(true)
        setAlertMessage(message)
        setAlertSeverity(severity)
    }
    React.useEffect(() => {
        let counter = 0;
        let regNum = [];
        if (!props.trader) return;
        setName(props.trader.name)
        setAddress(props.trader.address)
        setStateCode(props.trader.stateCode)
        setGSTNum(props.trader.gstNum)
        setBankName(props.trader.bankName)
        setBankBranchName(props.trader.bankBranchName)
        setBankAccountNumber(props.trader.bankAccountNumber)
        setBankBranchIFSCCode(props.trader.bankBranchIFSCCode)

        if (props.trader.regTitle1) {
            regNum.push({ regTitle: props.trader.regTitle1, regValue: props.trader.regValue1 })
            counter++;
        }
        if (props.trader.regTitle2) {
            regNum.push({ regTitle: props.trader.regTitle2, regValue: props.trader.regValue2 })
            counter++;
        }
        if (props.trader.regTitle3) {
            regNum.push({ regTitle: props.trader.regTitle3, regValue: props.trader.regValue3 })
            counter++;
        }
        setRegNumbers(regNum)
        setRegNoCounter(counter)
        let cnts = [];
        let cntsCount = 0;
        if (props.trader.contact1) {
            cnts.push(props.trader.contact1);
            cntsCount++;
        }
        if (props.trader.contact2) {
            cnts.push(props.trader.contact2);
            cntsCount++;
        }
        if (props.trader.contact3) {
            cnts.push(props.trader.contact3);
            cntsCount++;
        }
        setContactNumbers(cnts);
        setContactCounter(cntsCount);

    }, [props.trader])

    function saveTrader() {
        setBlockAllInput(true)
        setShowProgress(true);
        let trader = {
            code: 1,
            name: name,
            address: address,
            stateCode: stateCode,
            gstNum: gstNum,
            bankName : bankName,
            bankBranchName : bankBranchName,
            bankAccountNumber : bankAccountNumber,
            bankBranchIFSCCode : bankBranchIFSCCode
        };
        regNumbers.forEach((reg, idx) => {
            trader[`regTitle${idx + 1}`] = reg.regTitle;
            trader[`regValue${idx + 1}`] = reg.regValue;
        })
        if (!trader.regTitle1) {
            trader.regTitle1 = null;
            trader.regValue1 = null;
        }
        if (!trader.regTitle2) {
            trader.regTitle2 = null;
            trader.regValue2 = null;
        }
        if (!trader.regTitle3) {
            trader.regTitle3 = null;
            trader.regValue3 = null;
        }
        contactNumbers.forEach((cnt, idx) => {
            trader[`contact${idx + 1}`] = cnt;
        })
        if (!trader.contact1) trader.contact1 = null;
        if (!trader.contact2) trader.contact2 = null;
        if (!trader.contact3) trader.contact3 = null;

        saveTraderAtBackend(trader).then(() => {
            props.dispatch({
                type: "SAVE_TRADER",
                payload: trader
            })
            showSnackbar(`Trader details updated`, "success")
            setShowProgress(false);
            setBlockAllInput(false)
        }, (error) => {
            setShowProgress(error, "error")
            setShowProgress(false);
            setBlockAllInput(false)
        })

    }
    return (
        <div className={classes.container}>
            <Fab color="primary" onClick={saveTrader} className={classes.fab}>
                <SaveIcon />
            </Fab>
            <AccountingAlert open={showAlert} message={alertMessage} severity={alertSeverity} onClose={() => { setShowAlert(false) }} onExit={() => { setShowAlert(false) }} />
            {showProgress && <ProgressBar />}
            <Grid container className={classes.mainContainer} justifyContent='center'>
                <Grid item xs={12}>
                    <Paper elevation={10} className={classes.paper} component='div'>
                        <Grid container className={classes.paperContainer} spacing={2}>
                            <Grid item xs={12} >
                                <div className={classes.heading}>
                                    <SettingsIcon /> &nbsp;
                                    <Typography component='span' variant='h6'><b>Trader </b></Typography>
                                </div>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <fieldset className={classes.fieldset}>
                                    <legend>General information</legend>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                value={name}
                                                disabled={blockAllInput}
                                                variant='outlined'
                                                onChange={(ev) => { setName(ev.target.value) }}
                                                label='Trader Name' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant='outlined'
                                                fullWidth
                                                disabled={blockAllInput}
                                                value={address}
                                                onChange={(ev) => { setAddress(ev.target.value) }}
                                                label='Trader Address' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-helper-label" >State</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    variant='outlined'
                                                    fullWidth
                                                    disabled={blockAllInput}
                                                    label="State"
                                                    value={stateCode}
                                                    onChange={(ev) => { setStateCode(ev.target.value) }}
                                                >
                                                    <MenuItem disabled={true} value={-1}>&lt;Select State&gt;</MenuItem>
                                                    {
                                                        props.states &&
                                                        props.states.map((state, idx) => {
                                                            return (
                                                                <MenuItem key={'traderState' + idx} value={state.code}>{state.name}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </fieldset>
                            </Grid>
                            <Grid item xs={12}>
                                <fieldset className={classes.fieldset}>
                                    <legend>Registration Numbers</legend>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                variant='outlined'
                                                disabled={blockAllInput}
                                                fullWidth
                                                value={gstNum}
                                                onChange={(ev) => {
                                                    setGSTNum(ev.target.value)
                                                }}
                                                label="GST Number" />
                                        </Grid>.

                                        {
                                            regNumbers.map((regNumber, idx) => {
                                                return (
                                                    <React.Fragment>
                                                        <Grid item xs={4}>
                                                            <TextField
                                                                variant='outlined'
                                                                disabled={blockAllInput}
                                                                fullWidth
                                                                value={regNumbers[idx].regTitle}
                                                                onChange={(ev) => {
                                                                    let reg = regNumbers[idx];
                                                                    reg.regTitle = ev.target.value;
                                                                    let regNum = [...regNumbers];
                                                                    regNum[idx] = reg;
                                                                    setRegNumbers(regNum);
                                                                }}
                                                                label='Registration Title' />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                variant='outlined'
                                                                disabled={blockAllInput || (regNumbers[idx].regTitle.length == 0)}
                                                                fullWidth
                                                                value={regNumbers[idx].regValue}
                                                                onChange={(ev) => {
                                                                    let reg = regNumbers[idx];
                                                                    reg.regValue = ev.target.value;
                                                                    let regNum = [...regNumbers];
                                                                    regNum[idx] = reg;
                                                                    setRegNumbers(regNum);
                                                                }}
                                                                label={regNumbers[idx].regTitle} />
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <IconButton color='primary' onClick={() => {
                                                                let regNum = [...regNumbers];
                                                                regNum.splice(idx, 1);
                                                                setRegNumbers(regNum)
                                                                setRegNoCounter(regNoCounter - 1)
                                                            }}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                        {
                                            regNoCounter < 3 &&
                                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Fab color="primary" size='small' onClick={addRegistrationNumberField}>
                                                    <AddIcon />
                                                </Fab>
                                            </Grid>

                                        }
                                    </Grid>
                                </fieldset>
                            </Grid>
                            <Grid item xs={12}>
                                <fieldset className={classes.fieldset}>
                                    <legend>Contact details</legend>
                                    <Grid container spacing={2} alignItems='center'>
                                        {
                                            contactNumbers.map((contactNumber, idx) => {
                                                return (
                                                    <React.Fragment>
                                                        <Grid item xs={10}>
                                                            <TextField
                                                                variant='outlined'
                                                                disabled={blockAllInput}
                                                                fullWidth
                                                                value={contactNumbers[idx]}
                                                                onChange={(ev) => {
                                                                    let cnts = [...contactNumbers]
                                                                    cnts[idx] = ev.target.value
                                                                    setContactNumbers(cnts);
                                                                }}
                                                                label="Contact number" />
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <IconButton color='primary' onClick={() => {
                                                                let cnt = [...contactNumbers]
                                                                cnt.splice(idx, 1);
                                                                setContactNumbers(cnt); let cnts = [...contactNumbers]
                                                                setContactCounter(contactCounter - 1)
                                                            }}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                        {
                                            contactCounter < 3 &&
                                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Fab color="primary" size='small' onClick={addContactNumberField}>
                                                    <AddIcon />
                                                </Fab>
                                            </Grid>

                                        }
                                    </Grid>
                                </fieldset>
                            </Grid>
                            <Grid item xs={12}>
                                <fieldset className={classes.fieldset}>
                                    <legend>Bank Details</legend>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                value={bankName}
                                                disabled={blockAllInput}
                                                variant='outlined'
                                                onChange={(ev) => { setBankName(ev.target.value) }}
                                                label='Name' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                value={bankBranchName}
                                                disabled={blockAllInput}
                                                variant='outlined'
                                                onChange={(ev) => { setBankBranchName(ev.target.value) }}
                                                label='Branch' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                value={bankAccountNumber}
                                                disabled={blockAllInput}
                                                variant='outlined'
                                                onChange={(ev) => { setBankAccountNumber(ev.target.value) }}
                                                label='Account number' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                value={bankBranchIFSCCode}
                                                disabled={blockAllInput}
                                                variant='outlined'
                                                onChange={(ev) => { setBankBranchIFSCCode(ev.target.value) }}
                                                label='IFSC Code' />
                                        </Grid>
                                    </Grid>
                                </fieldset>
                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}