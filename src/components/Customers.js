import React from 'react';
import { Grid, makeStyles, Paper, Typography, IconButton, Box, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputAdornment, FormControl, OutlinedInput, InputLabel, List, ListItem, ListItemText, ListItemIcon, Checkbox, ListSubheader, Button, Divider, Avatar, ListItemAvatar, Select, MenuItem } from '@material-ui/core';
import AccountingAlert from './AccountingAlert';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import ProgressBar from './ProgressBar';
import { ListItemButton, Autocomplete } from '@mui/material';

function updateCustomerBackEnd(customer) {
    return new Promise((resolve, reject) => {
        fetch('/updateCustomer', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(customer)
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
function deleteCustomerBackEnd(code) {
    return new Promise((resolve, reject) => {
        fetch('/deleteCustomer', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({code : code})
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

function addCustomerBackEnd(customer) {
    return new Promise((resolve, reject) => {
        fetch('/addCustomer', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(customer)
        }).then(response => response.json()).then((response) => {
            if (!response.success) {
                reject(response.error)
            }
            else {
                resolve(response.code)
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
            textAlign: 'center'
        },
        customerPaper: {
            padding: "2px",
        },
        customerMasterPaper: {
            padding: "20px",
            minHeight: "76vh",
        },

        customerList: {
            height: "72vh",
            overflow: "auto",
        },
        customerListSubheading: {
            padding: "10px"
        },
        customerDetailsFieldSet: {
            padding: "15px"
        },
        fab: {
            position: "fixed",
            bottom: 16,
            right: 40
        }
    })
})



function DisplayDetails({ customerSelected, states, setView }) {
    const classes = createStyle();
    if(!customerSelected) return (
        <React.Fragment></React.Fragment>
    )
    if( customerSelected) return (
        <React.Fragment>
            <Grid container alignItems='center' style={{ padding: "4px", margin: "2px" }}>
                <Grid item xs={10}><Typography variant='subtitle1'>Customer Master</Typography></Grid>
                <Grid item xs={2} style={{ display: 'flex', justifyContent: 'end' }}>
                    <IconButton color='primary' onClick={() => { setView('edit') }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color='primary' onClick={() => { setView('delete') }}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={12}><Divider /></Grid>
            </Grid>
            <Grid item xs={12}>
                <fieldset className={classes.customerDetailsFieldSet}>
                    <legend>General information</legend>
                    <Grid container >
                        <Grid item xs={4}>
                            <Typography variant='subtitle2'><b>Name</b> </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='subtitle2'>{customerSelected.name}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='subtitle2'><b>Address</b> </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='subtitle2'>{customerSelected.address}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='subtitle2'><b>State</b> </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='subtitle2'>{states.find((state) => { return state.code == customerSelected.stateCode }).name}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='subtitle2'><b>Opening balance</b> </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='subtitle2'>{`${(customerSelected.openingBalance < 0) ? -customerSelected.openingBalance : customerSelected.openingBalance} ${(customerSelected.openingBalance == 0) ? '' : (customerSelected.openingBalance > 0) ? "DR" : "CR"} `}</Typography>
                        </Grid>
                    </Grid>
                </fieldset>
            </Grid>
            <Grid item xs={12}>
                <fieldset className={classes.customerDetailsFieldSet}>
                    <legend>Registration Numbers</legend>
                    <Grid container >
                        {
                            customerSelected.regTitle1 &&
                            <React.Fragment>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle2'><b>{customerSelected.regTitle1}</b> </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle2'>{customerSelected.regValue1} </Typography>
                                </Grid>
                            </React.Fragment>
                        }
                        {
                            customerSelected.regTitle2 &&
                            <React.Fragment>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle2'><b>{customerSelected.regTitle2}</b> </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle2'>{customerSelected.regValue2} </Typography>
                                </Grid>
                            </React.Fragment>
                        }
                        {
                            customerSelected.regTitle3 &&
                            <React.Fragment>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle2'><b>{customerSelected.regTitle3}</b> </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle2'>{customerSelected.regValue3} </Typography>
                                </Grid>
                            </React.Fragment>
                        }
                    </Grid>
                </fieldset>
            </Grid>
            <Grid item xs={12}>
                <fieldset className={classes.customerDetailsFieldSet}>
                    <legend>Contact details</legend>
                    <Grid container >
                        {
                            customerSelected.contact1 &&
                            <React.Fragment>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle2'><b>Contact</b> </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle2'>{customerSelected.contact1} </Typography>
                                </Grid>
                            </React.Fragment>
                        }
                        {
                            customerSelected.contact2 &&
                            <React.Fragment>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle2'><b>Contact</b> </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle2'>{customerSelected.contact2} </Typography>
                                </Grid>
                            </React.Fragment>
                        }
                        {
                            customerSelected.contact3 &&
                            <React.Fragment>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle2'><b>Contact</b> </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle2'>{customerSelected.contact3} </Typography>
                                </Grid>
                            </React.Fragment>
                        }
                    </Grid>
                </fieldset>
            </Grid>
        </React.Fragment>
    )
}
function AddDialog(props) {
    const [name, setName] = React.useState();
    const [address, setAddress] = React.useState();
    const [stateCode, setStateCode] = React.useState(0);
    const [openingBalance, setOpeningBalance] = React.useState(0)
    const [regNoCounter, setRegNoCounter] = React.useState(0);
    const [regNumbers, setRegNumbers] = React.useState([]);
    const [contactCounter, setContactCounter] = React.useState(0);
    const [contactNumbers, setContactNumbers] = React.useState([]);
    const [openingBalanceType, setOpeningBalanceType] = React.useState();

    const [blockAllInput, setBlockAllInput] = React.useState(false);
    const closeDialog = () => {
        setName('');
        setAddress('')
        setStateCode(0);
        setOpeningBalance(0)
        setRegNoCounter(0);
        setContactCounter(0);
        setRegNumbers([])
        setContactNumbers([])
        setOpeningBalanceType('')
        props.setShowDialog(false);
    }
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
    function addCustomer() {
        setBlockAllInput(true)
        props.setShowProgress(true);
        let customer = {
            code: 0,
            name: name,
            address: address,
            stateCode: stateCode,
            openingBalance: openingBalance
        };
        regNumbers.forEach((reg, idx) => {
            customer[`regTitle${idx + 1}`] = reg.regTitle;
            customer[`regValue${idx + 1}`] = reg.regValue;
        })
        if (!customer.regTitle1) {
            customer.regTitle1 = null;
            customer.regValue1 = null;
        }
        if (!customer.regTitle2) {
            customer.regTitle2 = null;
            customer.regValue2 = null;
        }
        if (!customer.regTitle3) {
            customer.regTitle3 = null;
            customer.regValue3 = null;
        }
        contactNumbers.forEach((cnt, idx) => {
            customer[`contact${idx + 1}`] = cnt;
        })
        if (!customer.contact1) customer.contact1 = null;
        if (!customer.contact2) customer.contact2 = null;
        if (!customer.contact3) customer.contact3 = null;
        if (openingBalanceType == 'CR') customer.openingBalance = -customer.openingBalance;
        addCustomerBackEnd(customer).then((code) => {
            customer.code=code
            if (customer.openingBalance < 0) customer.openingBalance = -customer.openingBalance;
            props.dispatch({
                type: "ADD_CUSTOMER",
                payload: customer
            })
            props.showSnackbar(`Customer ${customer.name} added`, "success")
            props.setShowProgress(false);
            setBlockAllInput(false)
            closeDialog();
            props.setCustomerSelected(customer)
        }, (error) => {
            props.setShowProgress(error, "error")
            props.setShowProgress(false);
            setBlockAllInput(false)
        })

    }
    return (
        <Dialog open={props.showDialog} onClose={closeDialog} scroll="body" fullWidth>
            <DialogTitle>Add a customer</DialogTitle>
            <DialogContent style={{ padding: '20px' }}>
                <React.Fragment>

                    <Grid item xs={12}>
                        <fieldset className={classes.customerDetailsFieldSet}>
                            <legend>General information</legend>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        value={name}
                                        disabled={blockAllInput}
                                        variant='outlined'
                                        onChange={(ev) => { setName(ev.target.value) }}
                                        label='Customer Name' />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        disabled={blockAllInput}
                                        value={address}
                                        onChange={(ev) => { setAddress(ev.target.value) }}
                                        label='Customer Address' />
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
                                            {props.states &&
                                                props.states.map((state, idx) => {
                                                    return (
                                                        <MenuItem key={'custState' + idx} value={state.code}>{state.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        disabled={blockAllInput}
                                        value={openingBalance}
                                        onChange={(ev) => { setOpeningBalance(ev.target.value) }}
                                        label='Opening Balance' />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl fullWidth>
                                        <InputLabel >Type</InputLabel>
                                        <Select
                                            variant='outlined'
                                            fullWidth
                                            label='Type'
                                            value={openingBalanceType}
                                            onChange={(ev) => { setOpeningBalanceType(ev.target.value) }}
                                        >
                                            <MenuItem value='CR' selected={openingBalanceType == 'CR'}>CR</MenuItem>
                                            <MenuItem value='DR' selected={openingBalanceType == 'DR'}>DR</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </fieldset>
                    </Grid>
                    <Grid item xs={12}>
                        <fieldset className={classes.customerDetailsFieldSet}>
                            <legend>Registration Numbers</legend>
                            <Grid container spacing={2}>
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
                        <fieldset className={classes.customerDetailsFieldSet}>
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
                </React.Fragment>
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={closeDialog}>Cancel</Button>
                <Button color='primary' onClick={addCustomer}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

function EditDetails({ customerSelected, states, setView, setShowProgress, dispatch, showSnackbar, setCustomerSelected }) {
    const classes = createStyle();
    const [name, setName] = React.useState(customerSelected.name);
    const [address, setAddress] = React.useState(customerSelected.address);
    const [stateCode, setStateCode] = React.useState(customerSelected.stateCode);
    const [openingBalance, setOpeningBalance] = React.useState((customerSelected.openingBalance < 0) ? -customerSelected.openingBalance : customerSelected.openingBalance)
    const [regNoCounter, setRegNoCounter] = React.useState(0);
    const [regNumbers, setRegNumbers] = React.useState([]);
    const [contactCounter, setContactCounter] = React.useState(0);
    const [contactNumbers, setContactNumbers] = React.useState([]);
    const [openingBalanceType, setOpeningBalanceType] = React.useState((customerSelected.openingBalance < 0) ? 'CR' : 'DR');

    const [blockAllInput, setBlockAllInput] = React.useState(false);
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

    React.useEffect(() => {
        let counter = 0;
        let regNum = [];
        if (customerSelected.regTitle1) {
            regNum.push({ regTitle: customerSelected.regTitle1, regValue: customerSelected.regValue1 })
            counter++;
        }
        if (customerSelected.regTitle2) {
            regNum.push({ regTitle: customerSelected.regTitle2, regValue: customerSelected.regValue2 })
            counter++;
        }
        if (customerSelected.regTitle3) {
            regNum.push({ regTitle: customerSelected.regTitle3, regValue: customerSelected.regValue3 })
            counter++;
        }
        setRegNumbers(regNum)
        setRegNoCounter(counter)
        let cnts = [];
        let cntsCount = 0;
        if (customerSelected.contact1) {
            cnts.push(customerSelected.contact1);
            cntsCount++;
        }
        if (customerSelected.contact2) {
            cnts.push(customerSelected.contact2);
            cntsCount++;
        }
        if (customerSelected.contact3) {
            cnts.push(customerSelected.contact3);
            cntsCount++;
        }
        setContactNumbers(cnts);
        setContactCounter(cntsCount);
    }, [customerSelected])
    function updateCustomer() {
        setBlockAllInput(true)
        setShowProgress(true);
        let customer = {
            code: customerSelected.code,
            name: name,
            address: address,
            stateCode: stateCode,
            openingBalance: openingBalance
        };
        regNumbers.forEach((reg, idx) => {
            customer[`regTitle${idx + 1}`] = reg.regTitle;
            customer[`regValue${idx + 1}`] = reg.regValue;
        })
        if (!customer.regTitle1) {
            customer.regTitle1 = null;
            customer.regValue1 = null;
        }
        if (!customer.regTitle2) {
            customer.regTitle2 = null;
            customer.regValue2 = null;
        }
        if (!customer.regTitle3) {
            customer.regTitle3 = null;
            customer.regValue3 = null;
        }
        contactNumbers.forEach((cnt, idx) => {
            customer[`contact${idx + 1}`] = cnt;
        })
        if (!customer.contact1) customer.contact1 = null;
        if (!customer.contact2) customer.contact2 = null;
        if (!customer.contact3) customer.contact3 = null;
        if (openingBalanceType == 'CR') customer.openingBalance = -customer.openingBalance;
        updateCustomerBackEnd(customer).then(() => {
            dispatch({
                type: "UPDATE_CUSTOMER",
                payload: customer
            })
            showSnackbar(`Customer updated`, "success")
            setShowProgress(false);
            setBlockAllInput(false)
            setView('details')
            setCustomerSelected(customer)
        }, (error) => {
            setShowProgress(error, "error")
            setShowProgress(false);
            setBlockAllInput(false)
        })

    }
    return (
        <React.Fragment>
            <Grid container alignItems='baseline' style={{ padding: "4px", margin: "2px" }}>
                <Grid item xs={10}><Typography variant='subtitle1'>Customer Master</Typography></Grid>
                <Grid item xs={2} style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button color='primary' onClick={() => { setView('details') }}>Cancel</Button>
                    <Button color='primary' onClick={updateCustomer}>Update</Button>
                </Grid>
                <Grid item xs={12}><Divider /></Grid>
            </Grid>
            <Grid item xs={12}>
                <fieldset className={classes.customerDetailsFieldSet}>
                    <legend>General information</legend>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={name}
                                disabled={blockAllInput}
                                variant='outlined'
                                onChange={(ev) => { setName(ev.target.value) }}
                                label='Customer Name' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                disabled={blockAllInput}
                                value={address}
                                onChange={(ev) => { setAddress(ev.target.value) }}
                                label='Customer Address' />
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
                                    {
                                        states.map((state, idx) => {
                                            return (
                                                <MenuItem key={'custState' + idx} value={state.code}>{state.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                disabled={blockAllInput}
                                value={openingBalance}
                                onChange={(ev) => { setOpeningBalance(ev.target.value) }}
                                label='Opening Balance' />
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel >Type</InputLabel>
                                <Select
                                    variant='outlined'
                                    fullWidth
                                    label='Type'
                                    value={openingBalanceType}
                                    onChange={(ev) => { setOpeningBalanceType(ev.target.value) }}
                                >
                                    <MenuItem value='CR' selected={openingBalanceType == 'CR'}>CR</MenuItem>
                                    <MenuItem value='DR' selected={openingBalanceType == 'DR'}>DR</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </fieldset>
            </Grid>
            <Grid item xs={12}>
                <fieldset className={classes.customerDetailsFieldSet}>
                    <legend>Registration Numbers</legend>
                    <Grid container spacing={2}>
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
                <fieldset className={classes.customerDetailsFieldSet}>
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
        </React.Fragment>
    )
}
function DeleteDialog(props){
    const closeDialog=()=>{
        props.setShowDialog(false) 
    }
    function deleteCustomer(){
        props.setShowProgress(true);
         deleteCustomerBackEnd(props.code).then(()=>{
            props.dispatch({
                type: "DELETE_CUSTOMER",
                payload: props.code
            })    
            props.showSnackbar(`Customer ${props.name} deleted`,"success")
            props.setShowProgress(false);
            closeDialog();
            props.setCustomerSelected(undefined);
         },(error)=>{
        props.showSnackbar(error,"error")
        props.setShowProgress(true);
        })
    }

    return (
        <Dialog open={props.showDialog} onClose={closeDialog}>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure, you want to delete {props.name}
                </DialogContentText>
                <DialogActions>
                    <Button color='primary' onClick={closeDialog}>Cancel</Button>
                    <Button color='primary' onClick={deleteCustomer}>Delete</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}


export default function Customers(props) {
    const classes = createStyle();
    const [showProgress, setShowProgress] = React.useState(false);
    const [view, setView] = React.useState('details')
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState();
    const [alertSeverity, setAlertSeverity] = React.useState();
    const [customerSelected, setCustomerSelected] = React.useState();
    const [showAddDialog, setShowAddDialog] = React.useState(false)
    const [showDeleteDialog,setShowDeleteDialog]=React.useState(false)
    function showSnackbar(message, severity) {
        setShowAlert(true)
        setAlertMessage(message)
        setAlertSeverity(severity)
    }
    React.useEffect(()=>{
        if(view=='delete'){
            setShowDeleteDialog(true);
            setView('details')
        } ;
    },[view])
    return (
        <div className={classes.container}>
            <AccountingAlert open={showAlert} message={alertMessage} severity={alertSeverity} onClose={() => { setShowAlert(false) }} onExit={() => { setShowAlert(false) }} />
            {showProgress && <ProgressBar />}
            <Grid container spacing={4} >
                <Grid item xs={3}>
                    <Paper className={classes.customerPaper} elevation={7}>
                        <Box width="100%" bgcolor={Paper.bgcolor}>
                            <ListSubheader className={classes.customerListSubheading}><Typography component='div' variant='body1' >Customers</Typography></ListSubheader>
                            <Divider />
                            <List className={classes.customerList}>
                                {
                                    props.customers &&
                                    props.customers.map((customer, idx) => {
                                        return (
                                            <ListItemButton key={'customer' + idx} onClick={() => { setCustomerSelected(customer); setView('details') }} selected={Boolean(customerSelected) && customerSelected.name == customer.name}>
                                                <ListItemAvatar><Avatar /></ListItemAvatar>
                                                <ListItemText primary={customer.name} secondary={customer.address} />
                                            </ListItemButton>
                                        )
                                    })
                                }
                            </List>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={8} style={{ marginRight: '0' }}>
                    <Paper component='div' elevation={10} className={classes.customerMasterPaper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            </Grid>
                            {
                                customerSelected && view == 'details' &&
                                <DisplayDetails customerSelected={customerSelected} states={props.states} setView={setView} />
                            }
                            {
                                customerSelected && view == 'edit' && <EditDetails customerSelected={customerSelected} states={props.states} setView={setView} setShowProgress={setShowProgress} dispatch={props.dispatch} showSnackbar={showSnackbar} setCustomerSelected={setCustomerSelected} />
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <AddDialog showDialog={showAddDialog} setShowDialog={setShowAddDialog}  states={props.states} setShowProgress={setShowProgress} dispatch={props.dispatch} showSnackbar={showSnackbar} setCustomerSelected={setCustomerSelected}/>
            <Fab color="primary" className={classes.fab} onClick={() => { setShowAddDialog(true) }}>
                <AddIcon />
            </Fab>
            {showDeleteDialog && <DeleteDialog showDialog={showDeleteDialog} code={customerSelected.code} name={customerSelected.name}  setShowDialog={setShowDeleteDialog} dispatch={props.dispatch} showSnackbar={showSnackbar}  setShowProgress={setShowProgress} setCustomerSelected={setCustomerSelected}/>}

        </div>
    )
}