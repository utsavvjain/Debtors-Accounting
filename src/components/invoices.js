import React from 'react';
import { Grid, makeStyles, Paper, Typography, Table, TableRow, TableCell, IconButton, TableContainer, TableHead, TableBody, TablePagination, TableFooter, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, OutlinedInput, InputLabel, List, ListItem, ListItemText, ListItemIcon, Checkbox, ListSubheader, Button, Divider, Toolbar, Select, MenuItem, Input } from '@material-ui/core';
import ViewInvoice from './ViewInvoice';
import AccountingAlert from './AccountingAlert';
import ProgressBar from './ProgressBar';
import EditIcon from '@material-ui/icons/Edit'
import Eye from '@material-ui/icons/Visibility'
import CancelIcon from '@material-ui/icons/Cancel'
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add'
import SettingsIcon from '@material-ui/icons/Settings'
import HomeIcon from '@material-ui/icons/Home'
import LocationIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

import ReceiptIcon from '@material-ui/icons/Receipt'
function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
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
            minHeight: "85vh"
        },
        paperContainer: {
            padding: "10px"
        },
        fieldset: {
            margin: "10px",
            padding: "18px"
        },
        headingCell: {
            fontWeight: "bold"
        },
        fab: {
            position: "fixed",
            bottom: 16,
            right: 16
        },
        invoicePaper: {
            marginTop: "20px",
            padding: "20px",
            background: '#FFFEF2'
        },
        traderDetails: {
            display: 'flex',
            justifyContent: 'flex-end'
        }

    })
})

function saveInvoiceAtBackEnd(invoice) {
    return new Promise((resolve, reject) => {
        fetch('/saveInvoice', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(invoice)
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
function updateInvoiceAtBackEnd(invoice) {
    return new Promise((resolve, reject) => {
        fetch('/updateInvoice', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(invoice)
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
function cancelInvoiceAtBackEnd(code) {
    return new Promise((resolve, reject) => {
        fetch('/cancelInvoice', {
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

function fetchInvoice(code) {
    return new Promise((resolve, reject) => {
        fetch(`/getInvoice?invoiceNumber=${code}`).then(response => response.json()).then(response => resolve(response)).catch((error) => {
            reject(error.message)
        })
    })
}

function AddItemDialog(props) {
    const [item, setItem] = React.useState()
    function closeDialog() {
        setItem(null);
        props.setShowDialog(false)
    }
    const itemSelectionHandler = (ev, item) => {
        setItem(item)
    }
    const addItem = () => {
        let invoiceItem = { code: item.code, name: item.name, hsnCode: item.hsnCode, uomTitle: item.unitOfMeasurement, rate: item.rate, quantity: item.quantity, igst: item.igst, sgst: item.sgst, cgst: item.cgst }
        props.addInvoiceItem(invoiceItem)
        closeDialog();
    }
    return (
        <Dialog open={props.showDialog} onClose={closeDialog} fullWidth>
            <DialogTitle><Typography>Add an item</Typography></DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Autocomplete
                            getOptionLabel={obj => obj.name}
                            options={props.items}
                            onChange={itemSelectionHandler}
                            renderInput={(params) => <TextField {...params} label="Item"
                            />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            fullWidth
                            id="hsnCode"
                            label="HSN Code"
                            variant='standard'
                            onChange={()=>{}}
                            value={(item) ? item.hsnCode : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='uomInputLabel'>Unit of measurement</InputLabel>
                            <Select labelId='uomInputLabel'
                                variant='standard'
                                label="Unit of measurement"
                                value={(item) ? item.unitOfMeasurement : ''}
                                onChange={(ev) => { setItem({ ...item, unitOfMeasurement: ev.target.value }) }}
                            >
                                {
                                    item && item.unitOfMeasurements.map((unitOfMeasurement, idx) => {
                                        return (
                                            <MenuItem key={'itemUom' + idx} value={unitOfMeasurement.title}>{unitOfMeasurement.title}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            fullWidth
                            id="cgst"
                            label="CGST"
                            variant='standard'
                            onChange={()=>{}}
                            value={(item) ? item.cgst : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            fullWidth
                            id="sgst"
                            label="SGST"
                            variant='standard'
                            onChange={()=>{}}
                            value={(item) ? item.sgst : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            fullWidth
                            id="igst"
                            label="IGST"
                            variant='standard'
                            onChange={()=>{}}
                            value={(item) ? item.igst : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            fullWidth
                            id="rate"
                            label="Rate"
                            variant='standard'
                            value={(item) ? item.rate : ''}
                            onChange={(ev) => { setItem({ ...item, rate: ev.target.value }) }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            fullWidth
                            id="quantity"
                            label="Quantity"
                            variant='standard'
                            value={(item) ? item.quantity : ''}
                            onChange={(ev) => { setItem({ ...item, quantity: ev.target.value }) }
                            }

                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color='primary'>Cancel</Button>
                <Button onClick={addItem} color='primary'>Add Item</Button>
            </DialogActions>

        </Dialog>
    )
}
function AddDialog(props) {
    const closeDialog = () => {
        setCustomer(null)
        setDate('')
        setSelectedInvoiceItems([])
        setInvoiceItems([])
        setAddCharges([])
        setSubTotalTaxAmout(0)
        setSubTotalAmount(0)
        setSubTotalCgst(0)
        setSubTotalSgst(0)
        setNetTotal(0);
        setRoundOff(0)
        setTotal(0)
        props.setShowDialog(false);
    }
    const classes = createStyle();
    const [customer, setCustomer] = React.useState(null)
    const [date, setDate] = React.useState()
    const [showAddItemDialog, setShowAddItemDialog] = React.useState(false);
    const [invoiceItems, setInvoiceItems] = React.useState([])
    const [addCharges, setAddCharges] = React.useState([])

    const [selectedInvoiceItems, setSelectedInvoiceItems] = React.useState([]);
    const [selectedAddCharges, setSelectedAddCharges] = React.useState([]);
    const [subTotalTaxAmount, setSubTotalTaxAmout] = React.useState(0);
    const [subTotalSgst, setSubTotalSgst] = React.useState(0);
    const [subTotalCgst, setSubTotalCgst] = React.useState(0);
    const [subTotalIgst, setSubTotalIgst] = React.useState(0);
    const [subTotalAmount, setSubTotalAmount] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [netTotal, setNetTotal] = React.useState(0);
    const [roundOff, setRoundOff] = React.useState(0);
    const addInvoiceItem = (invoiceItem) => {
        setInvoiceItems([...invoiceItems, invoiceItem])
    }
    const customerSelectionHandler = (ev, customer) => {
        setCustomer(customer);
    }
    const invoiceItemSelected = (ev) => {
        let newList = [...selectedInvoiceItems];
        if (ev.target.checked) {
            newList.push(ev.target.value)
        }
        else newList.splice(newList.findIndex(value => value == ev.target.value), 1)
        setSelectedInvoiceItems(newList)
    }
    const addChargeSelected = (ev) => {
        let newList = [...selectedAddCharges];
        if (ev.target.checked) {
            newList.push(ev.target.value)
        }
        else newList.splice(newList.findIndex(value => value == ev.target.value), 1)
        setSelectedAddCharges(newList)
    }

    React.useEffect(() => {
        if (!customer) return;
        let totalTaxAmount = 0, totalSgst = 0, totalCgst = 0, totalIgst = 0, totalAmount = 0;
        invoiceItems.forEach((invoiceItem) => {
            let amount;
            if (customer.stateCode != props.trader.stateCode) {
                let taxAmount = roundToTwo(invoiceItem.rate * invoiceItem.quantity);
                let igstValue = roundToTwo((taxAmount * invoiceItem.igst) / 100)
                amount = taxAmount + igstValue;
                totalTaxAmount += taxAmount
                totalAmount += amount;
                totalIgst += igstValue
            }
            else {
                let taxAmount = roundToTwo(invoiceItem.rate * invoiceItem.quantity);
                let sgstValue = roundToTwo((taxAmount * invoiceItem.sgst) / 100)
                let cgstValue = roundToTwo((taxAmount * invoiceItem.cgst) / 100)
                amount = roundToTwo(taxAmount + sgstValue + cgstValue);
                totalTaxAmount += taxAmount
                totalAmount += amount;
                totalCgst += cgstValue;
                totalSgst += sgstValue
            }
        })
        setSubTotalTaxAmout(roundToTwo(totalTaxAmount))
        setSubTotalAmount(roundToTwo(totalAmount))
        setSubTotalIgst(roundToTwo(totalIgst))
        setSubTotalCgst(roundToTwo(totalCgst))
        setSubTotalSgst(roundToTwo(totalSgst))
        let addItemsTotal = 0
        let charge;
        addCharges.forEach((addCharge) => {
            if (customer.stateCode == props.trader.stateCode) {
                charge = roundToTwo(
                    roundToTwo(addCharge.taxableAmount)
                    +
                    roundToTwo((addCharge.taxableAmount * addCharge.sgst) / 100)
                    +
                    roundToTwo((addCharge.taxableAmount * addCharge.cgst) / 100)
                )
            }
            else {
                charge = roundToTwo(
                    roundToTwo(addCharge.taxableAmount)
                    +
                    roundToTwo((addCharge.taxableAmount * addCharge.igst) / 100)
                )

            }
            addItemsTotal += (charge) ? charge : 0;
        })
        setTotal(addItemsTotal + totalAmount)
        setRoundOff(roundToTwo(Math.round(addItemsTotal + totalAmount) - (addItemsTotal + totalAmount)))
        setNetTotal(Math.round(addItemsTotal + totalAmount))
    }, [invoiceItems, addCharges])
    const addAdditionalCharges = () => {
        if (customer.stateCode != props.trader.stateCode) {
            setAddCharges([...addCharges, { code: Date.now(), description: '', igst: '', taxableAmount: '', total: '' }])
        }
        else {
            setAddCharges([...addCharges, { code: Date.now(), description: '', sgst: '', cgst: '', taxableAmount: '', total: '' }])
        }
    }
    const deleteItems = () => {
        setSelectedAddCharges([])
        let items = [...invoiceItems]
        selectedInvoiceItems.forEach((code) => {
            items.splice(items.findIndex((item) => { item.code == code }), 1)
        })
        setSelectedInvoiceItems([])
        setInvoiceItems(items)
        let addItems = [...addCharges]
        selectedAddCharges.forEach((code) => {
            addItems.splice(addItems.findIndex(charge => charge.code == code), 1)
        })
        setAddCharges([...addItems])
        setSelectedAddCharges([])
    }
    const saveInvoice = () => {
        props.setShowProgress(true)
        let backEndInvoice;
        if (customer.stateCode != props.trader.stateCode) {
            backEndInvoice = {
                customerCode: customer.code,
                items: invoiceItems.map((item) => { return { itemCode: item.code, uomTitle: item.uomTitle, rate: item.rate, quantity: item.quantity } }),
                additionalCharges: addCharges.map((charge) => { return { description: charge.description, taxableValue: charge.taxableAmount, igstPercentage: charge.igst } }),
                date: new Date().toISOString().replace(/T.*/, '').split('-').join('-')
            }

        }
        else {
            backEndInvoice = {
                customerCode: customer.code,
                items: invoiceItems.map((item) => { return { itemCode: item.code, uomTitle: item.uomTitle, rate: item.rate, quantity: item.quantity } }),
                additionalCharges: addCharges.map((charge) => { return { description: charge.description, taxableValue: charge.taxableAmount, cgstPercentage: charge.cgst, sgstPercentage: charge.sgst } }),
                date: new Date().toISOString().replace(/T.*/, '').split('-').join('-')
            }

        }
        saveInvoiceAtBackEnd(backEndInvoice).then((code) => {
            let igst = 0, sgst = 0, cgst = 0;
            invoiceItems.forEach((invoiceItem) => {
                let taxAmount = roundToTwo(invoiceItem.rate * invoiceItem.quantity);
                igst += roundToTwo((taxAmount * invoiceItem.igst) / 100)
                cgst += roundToTwo((taxAmount * invoiceItem.cgst) / 100)
                sgst += roundToTwo((taxAmount * invoiceItem.sgst) / 100)
            })
            addCharges.forEach((charge) => {
                igst += roundToTwo((charge.taxableAmount * charge.igst) / 100)
                cgst += roundToTwo((charge.taxableAmount * charge.cgst) / 100)
                sgst += roundToTwo((charge.taxableAmount * charge.sgst) / 100)
            })

            let invoice = {
                code: code,
                date: date,
                customer: customer.name,
                netTotal: netTotal,
                igst: (igst) ? igst : 0,
                cgst: (cgst) ? cgst : 0,
                sgst: (sgst) ? sgst : 0
            }
            props.dispatch({
                type: "ADD_INVOICE",
                payload: invoice
            })
            props.showSnackbar(`Invoice created`, "success")
            props.setShowProgress(false);
            closeDialog();
        }, (error) => {
            props.showSnackbar(`Error creating invoice`, "error")
            props.setShowProgress(true)
        })
    }
    return (
        <React.Fragment>
            <AddItemDialog showDialog={showAddItemDialog} setShowDialog={setShowAddItemDialog} items={props.items} unitOfMeasurements={props.unitOfMeasurements} addInvoiceItem={addInvoiceItem} />
            <Dialog open={props.showDialog} onClose={closeDialog} fullScreen>
                <DialogTitle>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant='h5' component='div' >Generate a invoice</Typography>
                        </Grid>
                        <Grid item xs={2} style={{ position: 'absolute', top: 0, right: 0 }} >
                            <IconButton color='primary' onClick={closeDialog}>
                                <CancelIcon />
                            </IconButton>
                        </Grid>
                        <Grid xs={12}><Divider /></Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.invoicePaper}>
                        <Grid container>
                            <Fab className={classes.fab} color='primary' disabled={invoiceItems.length == 0} onClick={saveInvoice}><SaveIcon /></Fab>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <Grid container style={{ marginTop: "12px" }} spacing={4}>
                                    <Grid item xs={12}><Typography style={{ color: '#007bff' }} variant='h3'><ReceiptIcon fontSize='large' />&nbsp; Invoice To: </Typography></Grid></Grid>
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
                                        label="Invoice Date"
                                        value={date}
                                        onChange={(ev) => { setDate(ev.target.value) }}
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid style={{ marginTop: "20px", marginBottom: '20px' }} item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '60px' }}>
                                <Grid container style={{ marginTop: "12px" }} spacing={4}>
                                    <Grid item xs={12}><Typography style={{ color: '#007bff' }} variant='h3'><ShoppingBasketIcon fontSize='large' />&nbsp; Items</Typography></Grid>
                                </Grid>
                                {
                                    customer != null &&

                                    <TableContainer component={Paper} elevation={3} style={{ marginTop: "10px" }}>
                                        <Table >
                                            <TableHead>
                                                <TableRow >
                                                    <TableCell colspan={(customer.stateCode == props.trader.stateCode) ? 10 : 9}>
                                                        <Toolbar style={{ marginTop: '20px' }}>
                                                            <Typography variant='h6' style={{ flexGrow: 1 }}>Invoice items & charges</Typography>
                                                            <IconButton color='primary' onClick={() => { setShowAddItemDialog(true) }}>
                                                                <AddIcon />
                                                            </IconButton>
                                                            <IconButton color='primary' onClick={deleteItems} disabled={selectedAddCharges.length == 0 && selectedInvoiceItems.length == 0}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Toolbar>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {
                                                customer != null &&
                                                customer.stateCode != props.trader.stateCode &&
                                                <React.Fragment>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>Name</TableCell>
                                                            <TableCell className={classes.headingCell}>HSN Code</TableCell>
                                                            <TableCell className={classes.headingCell}>UOM</TableCell>
                                                            <TableCell className={classes.headingCell}>Rate</TableCell>
                                                            <TableCell className={classes.headingCell}>Quantity</TableCell>
                                                            <TableCell className={classes.headingCell}>Tax.Amt</TableCell>
                                                            <TableCell className={classes.headingCell}>IGST</TableCell>
                                                            <TableCell className={classes.headingCell}>Amount</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            invoiceItems.map((invoiceItem, idx) => {
                                                                let taxAmount = roundToTwo(invoiceItem.rate * invoiceItem.quantity);
                                                                let igstValue = roundToTwo((taxAmount * invoiceItem.igst) / 100)
                                                                let amount = taxAmount + igstValue;
                                                                return (
                                                                    <TableRow key={`invoiceItem` + idx}>
                                                                        <TableCell>
                                                                            <Checkbox
                                                                                value={invoiceItem.code}
                                                                                onClick={invoiceItemSelected}
                                                                                selected={Boolean(selectedInvoiceItems.find((item) => { return item.code == invoiceItem }))} />
                                                                        </TableCell>
                                                                        <TableCell>{invoiceItem.name}</TableCell>
                                                                        <TableCell>{invoiceItem.hsnCode}</TableCell>
                                                                        <TableCell>{invoiceItem.uomTitle}</TableCell>
                                                                        <TableCell>{invoiceItem.rate}</TableCell>
                                                                        <TableCell>{invoiceItem.quantity}</TableCell>
                                                                        <TableCell>{taxAmount}</TableCell>
                                                                        <TableCell>{igstValue + ' @ ' + invoiceItem.igst + '%'}</TableCell>
                                                                        <TableCell>{amount}</TableCell>

                                                                    </TableRow>
                                                                )
                                                            })
                                                        }

                                                        {
                                                            invoiceItems.length > 0 &&
                                                            <React.Fragment>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={6} style={{ textAlign: 'center' }}>Sub Total</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalTaxAmount}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalIgst}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalAmount}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={9} align='center'>Additional Charges</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={6} align='center'>Description</TableCell>
                                                                </TableRow>
                                                                {
                                                                    addCharges.map((addCharge, idx) => {
                                                                        return (
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    <Checkbox
                                                                                        value={addCharge.code}
                                                                                        onClick={addChargeSelected}
                                                                                        checked={Boolean(selectedAddCharges.find((code) => { return code == addCharge.code }))}
                                                                                    />
                                                                                </TableCell>

                                                                                <TableCell colSpan={5} >
                                                                                    <TextField
                                                                                        value={addCharge.description}
                                                                                        label='Description'
                                                                                        fullWidth
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, description: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell >
                                                                                    <TextField
                                                                                        value={addCharge.taxableAmount}
                                                                                        label='Taxable amount'
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, taxableAmount: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    {roundToTwo((addCharge.taxableAmount * addCharge.igst) / 100)}<br />
                                                                                    @<br />
                                                                                    <TextField
                                                                                        value={addCharge.igst}
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, igst: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                    %
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    <TextField
                                                                                    onChange={()=>{}}
                                                                                        value={
                                                                                            (roundToTwo(
                                                                                                roundToTwo(addCharge.taxableAmount)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.igst) / 100)

                                                                                            )) ? roundToTwo(
                                                                                                roundToTwo(addCharge.taxableAmount)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.igst) / 100)

                                                                                            ) : 0

                                                                                        }
                                                                                        label='Amount'
                                                                                    />
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        }
                                                    </TableBody>
                                                </React.Fragment>
                                            }
                                            {
                                                customer != null &&
                                                customer.stateCode == props.trader.stateCode &&
                                                <React.Fragment>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                <Checkbox />
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>Name</TableCell>
                                                            <TableCell className={classes.headingCell}>HSN Code</TableCell>
                                                            <TableCell className={classes.headingCell}>UOM</TableCell>
                                                            <TableCell className={classes.headingCell}>Rate</TableCell>
                                                            <TableCell className={classes.headingCell}>Quantity</TableCell>
                                                            <TableCell className={classes.headingCell}>Tax.Amt</TableCell>
                                                            <TableCell className={classes.headingCell}>SGST</TableCell>
                                                            <TableCell className={classes.headingCell}>CGST</TableCell>
                                                            <TableCell className={classes.headingCell}>Amount</TableCell>
                                                        </TableRow>
                                                    </TableHead>                                                                                                    <TableBody>
                                                        {
                                                            invoiceItems.map((invoiceItem, idx) => {
                                                                let taxAmount = roundToTwo(invoiceItem.rate * invoiceItem.quantity);
                                                                let sgstValue = roundToTwo((taxAmount * invoiceItem.sgst) / 100)
                                                                let cgstValue = roundToTwo((taxAmount * invoiceItem.cgst) / 100)
                                                                let amount = roundToTwo(taxAmount + sgstValue + cgstValue);
                                                                return (
                                                                    <TableRow key={`invoiceItem` + idx}>
                                                                        <TableCell>
                                                                            <Checkbox
                                                                                value={invoiceItem.code}
                                                                                onClick={invoiceItemSelected}
                                                                                selected={Boolean(selectedInvoiceItems.find((item) => { return item.code == invoiceItem }))} />
                                                                        </TableCell>
                                                                        <TableCell>{invoiceItem.name}</TableCell>
                                                                        <TableCell>{invoiceItem.hsnCode}</TableCell>
                                                                        <TableCell>{invoiceItem.uomTitle}</TableCell>
                                                                        <TableCell>{invoiceItem.rate}</TableCell>
                                                                        <TableCell>{invoiceItem.quantity}</TableCell>
                                                                        <TableCell >{taxAmount}</TableCell>
                                                                        <TableCell >{sgstValue + ' @ ' + invoiceItem.sgst + '%'}</TableCell>
                                                                        <TableCell >{cgstValue + ' @ ' + invoiceItem.cgst + '%'}</TableCell>
                                                                        <TableCell >{amount}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            invoiceItems.length > 0 &&
                                                            <React.Fragment>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={6} style={{ textAlign: 'center' }}>Sub Total</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalTaxAmount}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalSgst}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalCgst}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalAmount}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={10} align='center'>Additional Charges</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={6} align='center'>Description</TableCell>
                                                                </TableRow>
                                                                {
                                                                    addCharges.map((addCharge, idx) => {
                                                                        return (
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    <Checkbox
                                                                                        value={addCharge.code}
                                                                                        onClick={addChargeSelected}
                                                                                        checked={Boolean(selectedAddCharges.find((code) => { return code == addCharge.code }))}
                                                                                    />
                                                                                </TableCell>

                                                                                <TableCell colSpan={5} >
                                                                                    <TextField
                                                                                        value={addCharge.description}
                                                                                        label='Description'
                                                                                        fullWidth
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, description: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell >
                                                                                    <TextField
                                                                                        value={addCharge.taxableAmount}
                                                                                        label='Taxable amount'
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, taxableAmount: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    {roundToTwo((addCharge.taxableAmount * addCharge.sgst) / 100)}<br />
                                                                                    @
                                                                                    <TextField
                                                                                        value={addCharge.sgst}
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, sgst: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                    %
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    {roundToTwo((addCharge.taxableAmount * addCharge.cgst) / 100)}<br />
                                                                                    @
                                                                                    <TextField
                                                                                        value={addCharge.cgst}
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, cgst: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                    %
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    <TextField
                                                                                        onChange={()=>{}}
                                                                                        value={
                                                                                            (roundToTwo(
                                                                                                roundToTwo(addCharge.taxableAmount)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.sgst) / 100)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.cgst) / 100)

                                                                                            )) ? roundToTwo(
                                                                                                roundToTwo(addCharge.taxableAmount)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.sgst) / 100)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.cgst) / 100)

                                                                                            ) : 0

                                                                                        }
                                                                                        label='Amount'
                                                                                    />
                                                                                </TableCell>

                                                                            </TableRow>
                                                                        )
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        }
                                                    </TableBody>
                                                </React.Fragment>
                                            }
                                            {customer &&
                                                <TableFooter>
                                                    {
                                                        invoiceItems.length > 0 &&
                                                        <TableRow >
                                                            <TableCell colSpan={(customer.stateCode == props.trader.stateCode) ? 10 : 9} style={{ textAlign: 'center' }}>
                                                                <Fab size='small' color='primary' onClick={addAdditionalCharges}>
                                                                    <AddIcon />
                                                                </Fab>
                                                            </TableCell>
                                                        </TableRow>

                                                    }
                                                    {
                                                        roundOff != 0 &&
                                                        <TableRow>
                                                            <TableCell colSpan={(customer.stateCode == props.trader.stateCode) ? 9 : 8} style={{ textAlign: 'center' }} >
                                                                Total
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>{total}</TableCell>
                                                        </TableRow>

                                                    }
                                                    {
                                                        roundOff != 0 &&
                                                        <TableRow>
                                                            <TableCell colSpan={(customer.stateCode == props.trader.stateCode) ? 9 : 8} style={{ textAlign: 'center' }} >
                                                                Round Off
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>{roundOff}</TableCell>
                                                        </TableRow>
                                                    }
                                                    {
                                                        invoiceItems.length > 0 &&
                                                        <TableRow>
                                                            <TableCell colSpan={(customer.stateCode == props.trader.stateCode) ? 9 : 8} style={{ textAlign: 'center' }}>
                                                                Net Total
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>{netTotal}</TableCell>
                                                        </TableRow>
                                                    }
                                                </TableFooter>
                                            }
                                        </Table>

                                    </TableContainer>
                                }
                            </Grid>
                            <Grid item xs={12}><Divider /></Grid>
                            <Grid item xs={12} style={{ marginTop: '20px' }}>
                                <Grid container >
                                    <Grid item xs={12}><Typography style={{ color: '#007bff' }} variant='h4'><ReceiptIcon fontSize='medium' />&nbsp; Bank Details </Typography></Grid>
                                </Grid>
                                <br />
                                <Grid container alignItems='baseline'>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>Name</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.trader.bankName}</Typography></Grid>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>Branch</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.trader.bankBranchName}</Typography></Grid>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>IFSC Code</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.trader.bankBranchIFSCCode}</Typography></Grid>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>Acc. number</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.trader.bankAccountNumber}</Typography></Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                </DialogContent >
            </Dialog >
        </React.Fragment>
    )
}




function UpdateDialog(props) {
    const closeDialog = () => {
        props.setShowDialog(false);
    }
    const classes = createStyle();
    const [customer, setCustomer] = React.useState()
    const [date, setDate] = React.useState('')
    const [showAddItemDialog, setShowAddItemDialog] = React.useState(false);
    const [invoiceItems, setInvoiceItems] = React.useState([])
    const [addCharges, setAddCharges] = React.useState([])
    const [selectedInvoiceItems, setSelectedInvoiceItems] = React.useState([]);
    const [selectedAddCharges, setSelectedAddCharges] = React.useState([]);
    const [subTotalTaxAmount, setSubTotalTaxAmout] = React.useState(0);
    const [subTotalSgst, setSubTotalSgst] = React.useState(0);
    const [subTotalCgst, setSubTotalCgst] = React.useState(0);
    const [subTotalIgst, setSubTotalIgst] = React.useState(0);
    const [subTotalAmount, setSubTotalAmount] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [netTotal, setNetTotal] = React.useState(0);
    const [roundOff, setRoundOff] = React.useState(0);
    React.useEffect(() => {
        if(!props.invoice) return;
        setSelectedAddCharges([])
        setSelectedInvoiceItems([])
        setDate(new Date(props.invoice.date).toISOString().replace(/T.*/, '').split('-').join('-'))
        setCustomer(props.customers.find(customer => customer.code == props.invoice.customer.code))
        setInvoiceItems(
            props.invoice.invoiceItems.map((invoiceItem) => {
                return {
                    code: props.items.find((item) => { return item.name == invoiceItem.item.name }).code,
                    name: invoiceItem.item.name,
                    hsnCode: invoiceItem.item.hsnCode,
                    uomTitle: invoiceItem.item.unitOfMeasurement,
                    rate: invoiceItem.rate,
                    quantity: invoiceItem.quantity,
                    igst: (invoiceItem.item.igst != "null") ? roundToTwo(invoiceItem.item.igst)  : null,
                    sgst: (invoiceItem.item.sgst != "null") ? roundToTwo(invoiceItem.item.sgst) : null,
                    cgst: (invoiceItem.item.cgst != "null") ? roundToTwo(invoiceItem.item.cgst) : null
                }
            }
            )
        )
        setAddCharges(
            props.invoice.additionalCharges.map((addCharge,idx) => {
                let code=Date.now()+idx
                return {
                    code: code,
                    description: addCharge.description,
                    igst: (addCharge.igstPercentage != "null") ? roundToTwo(addCharge.igstPercentage) : null,
                    cgst: (addCharge.cgstPercentage != "null") ? roundToTwo(addCharge.cgstPercentage) : null,
                    sgst: (addCharge.sgstPercentage != "null") ? roundToTwo(addCharge.sgstPercentage) : null,
                    taxableAmount: addCharge.taxableValue,
                    total: addCharge.subTotal
                }
            })
        )
    }, [props.invoice])
    const addInvoiceItem = (invoiceItem) => {
        setInvoiceItems([...invoiceItems, invoiceItem])
    }
    const invoiceItemSelected = (ev) => {
        let newList = [...selectedInvoiceItems];
        if (ev.target.checked) {
            newList.push(ev.target.value)
        }
        else newList.splice(newList.findIndex(value => value == ev.target.value), 1)
        setSelectedInvoiceItems(newList)
    }
    const addChargeSelected = (ev) => {
        let newList = [...selectedAddCharges];
        if (ev.target.checked) {
            newList.push(ev.target.value)
        }
        else newList.splice(newList.findIndex(value => value == ev.target.value), 1)
        setSelectedAddCharges(newList)
    }

    React.useEffect(() => {
        if (!customer) return;
        let totalTaxAmount = 0, totalSgst = 0, totalCgst = 0, totalIgst = 0, totalAmount = 0;
        invoiceItems.forEach((invoiceItem) => {
            let amount;
            if (customer.stateCode != props.trader.stateCode) {
                let taxAmount = roundToTwo(invoiceItem.rate * invoiceItem.quantity);
                let igstValue = roundToTwo((taxAmount * invoiceItem.igst) / 100)
                amount = taxAmount + igstValue;
                totalTaxAmount += taxAmount
                totalAmount += amount;
                totalIgst += igstValue
            }
            else {
                let taxAmount = roundToTwo(invoiceItem.rate * invoiceItem.quantity);
                let sgstValue = roundToTwo((taxAmount * invoiceItem.sgst) / 100)
                let cgstValue = roundToTwo((taxAmount * invoiceItem.cgst) / 100)
                amount = roundToTwo(taxAmount + sgstValue + cgstValue);
                totalTaxAmount += taxAmount
                totalAmount += amount;
                totalCgst += cgstValue;
                totalSgst += sgstValue
            }
        })
        setSubTotalTaxAmout(roundToTwo(totalTaxAmount))
        setSubTotalAmount(roundToTwo(totalAmount))
        setSubTotalIgst(roundToTwo(totalIgst))
        setSubTotalCgst(roundToTwo(totalCgst))
        setSubTotalSgst(roundToTwo(totalSgst))
        let addItemsTotal = 0
        let charge;
        addCharges.forEach((addCharge) => {
            if (customer.stateCode == props.trader.stateCode) {
                charge = roundToTwo(
                    roundToTwo(addCharge.taxableAmount)
                    +
                    roundToTwo((addCharge.taxableAmount * addCharge.sgst) / 100)
                    +
                    roundToTwo((addCharge.taxableAmount * addCharge.cgst) / 100)
                )
            }
            else {
                charge = roundToTwo(
                    roundToTwo(addCharge.taxableAmount)
                    +
                    roundToTwo((addCharge.taxableAmount * addCharge.igst) / 100)
                )

            }
            addItemsTotal += (charge) ? charge : 0;
        })
        setTotal(addItemsTotal + totalAmount)
        setRoundOff(roundToTwo(Math.round(addItemsTotal + totalAmount) - (addItemsTotal + totalAmount)))
        setNetTotal(Math.round(addItemsTotal + totalAmount))
    }, [invoiceItems, addCharges])
    const addAdditionalCharges = () => {
        if (customer.stateCode != props.trader.stateCode) {
            setAddCharges([...addCharges, { code: Date.now(), description: '', igst: '', taxableAmount: '', total: '' }])
        }
        else {
            setAddCharges([...addCharges, { code: Date.now(), description: '', sgst: '', cgst: '', taxableAmount: '', total: '' }])
        }        
    }
    const deleteItems = () => {
        
        let items = [...invoiceItems]
        selectedInvoiceItems.forEach((code) => {
            items.splice(items.findIndex((item) => { return item.code == code }), 1)
        })
        setInvoiceItems(items)
        let addItems = [...addCharges]
        selectedAddCharges.forEach((code) => {
            addItems.splice(addItems.findIndex(charge => charge.code == code), 1)
        })
        setAddCharges([...addItems])
        setSelectedInvoiceItems([])
        setSelectedAddCharges([])
    }
    const saveInvoice = () => {
        props.setShowProgress(true)
        let backEndInvoice;
        if (customer.stateCode != props.trader.stateCode) {
            backEndInvoice = {
                code : props.invoice.code,
                customerCode: customer.code,
                items: invoiceItems.map((item) => { return { itemCode: item.code, uomTitle: item.uomTitle, rate: item.rate, quantity: item.quantity } }),
                additionalCharges: addCharges.map((charge) => { return { description: charge.description, taxableValue: charge.taxableAmount, igstPercentage: charge.igst } }),
                date: new Date().toISOString().replace(/T.*/, '').split('-').join('-'),
                areFromSameState: customer.stateCode == props.trader.stateCode
            }

        }
        else {
            backEndInvoice = {
                code : props.invoice.code,
                customerCode: customer.code,
                items: invoiceItems.map((item) => { return { itemCode: item.code, uomTitle: item.uomTitle, rate: item.rate, quantity: item.quantity } }),
                additionalCharges: addCharges.map((charge) => { return { description: charge.description, taxableValue: charge.taxableAmount, cgstPercentage: charge.cgst, sgstPercentage: charge.sgst } }),
                date: new Date().toISOString().replace(/T.*/, '').split('-').join('-'),
                areFromSameState: customer.stateCode == props.trader.stateCode
            }

        }
        updateInvoiceAtBackEnd(backEndInvoice).then(() => {
            let igst = 0, sgst = 0, cgst = 0;
            invoiceItems.forEach((invoiceItem) => {
                let taxAmount = roundToTwo(invoiceItem.rate * invoiceItem.quantity);
                igst += roundToTwo((taxAmount * invoiceItem.igst) / 100)
                cgst += roundToTwo((taxAmount * invoiceItem.cgst) / 100)
                sgst += roundToTwo((taxAmount * invoiceItem.sgst) / 100)
            })
            addCharges.forEach((charge) => {
                igst += roundToTwo((charge.taxableAmount * charge.igst) / 100)
                cgst += roundToTwo((charge.taxableAmount * charge.cgst) / 100)
                sgst += roundToTwo((charge.taxableAmount * charge.sgst) / 100)
            })

            let invoice = {
                code: props.invoice.code,
                date: date,
                customer: customer.name,
                netTotal: netTotal,
                igst: (igst) ? igst : 0,
                cgst: (cgst) ? cgst : 0,
                sgst: (sgst) ? sgst : 0
            }
            props.dispatch({
                type: "UPDATE_INVOICE",
                payload: invoice
            })
            props.showSnackbar(`Invoice updated`, "success")
            props.setShowProgress(false);
            closeDialog();
        }, (error) => {
            props.showSnackbar(`Error creating invoice`, "error")
            props.setShowProgress(true)
        })
    }
    return (
        <React.Fragment>
            <AddItemDialog showDialog={showAddItemDialog} setShowDialog={setShowAddItemDialog} items={props.items} unitOfMeasurements={props.unitOfMeasurements} addInvoiceItem={addInvoiceItem} />
            <Dialog open={props.showDialog} onClose={closeDialog} fullScreen>
                <DialogTitle>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant='h5' component='div' >Update invoice</Typography>
                        </Grid>
                        <Grid item xs={2} style={{ position: 'absolute', top: 0, right: 0 }} >
                            <IconButton color='primary' onClick={closeDialog}>
                                <CancelIcon />
                            </IconButton>
                        </Grid>
                        <Grid xs={12}><Divider /></Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.invoicePaper}>
                        <Grid container>
                            <Fab className={classes.fab} color='primary' disabled={invoiceItems.length == 0} onClick={saveInvoice}><SaveIcon /></Fab>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <Grid container style={{ marginTop: "12px" }} spacing={4}>
                                    <Grid item xs={12}><Typography style={{ color: '#007bff' }} variant='h3'><ReceiptIcon fontSize='large' />&nbsp; Invoice To: </Typography></Grid></Grid>
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
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <TextField
                                        id="date"
                                        label="Invoice Date"
                                        value={date}
                                        onChange={(ev) => { setDate(ev.target.value) }}
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid style={{ marginTop: "20px", marginBottom: '20px' }} item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '60px' }}>
                                <Grid container style={{ marginTop: "12px" }} spacing={4}>
                                    <Grid item xs={12}><Typography style={{ color: '#007bff' }} variant='h3'><ShoppingBasketIcon fontSize='large' />&nbsp; Items</Typography></Grid>
                                </Grid>
                                {
                                    customer != null &&

                                    <TableContainer component={Paper} elevation={3} style={{ marginTop: "10px" }}>
                                        <Table >
                                            <TableHead>
                                                <TableRow >
                                                    <TableCell colspan={(customer.stateCode == props.trader.stateCode) ? 10 : 9}>
                                                        <Toolbar style={{ marginTop: '20px' }}>
                                                            <Typography variant='h6' style={{ flexGrow: 1 }}>Invoice items & charges</Typography>
                                                            <IconButton color='primary' onClick={() => { setShowAddItemDialog(true) }}>
                                                                <AddIcon />
                                                            </IconButton>
                                                            <IconButton color='primary' onClick={deleteItems} disabled={selectedAddCharges.length == 0 && selectedInvoiceItems.length == 0}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Toolbar>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {
                                                customer != null &&
                                                customer.stateCode != props.trader.stateCode &&
                                                <React.Fragment>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>Name</TableCell>
                                                            <TableCell className={classes.headingCell}>HSN Code</TableCell>
                                                            <TableCell className={classes.headingCell}>UOM</TableCell>
                                                            <TableCell className={classes.headingCell}>Rate</TableCell>
                                                            <TableCell className={classes.headingCell}>Quantity</TableCell>
                                                            <TableCell className={classes.headingCell}>Tax.Amt</TableCell>
                                                            <TableCell className={classes.headingCell}>IGST</TableCell>
                                                            <TableCell className={classes.headingCell}>Amount</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            invoiceItems.map((invoiceItem, idx) => {
                                                                let taxAmount = roundToTwo(invoiceItem.rate * invoiceItem.quantity);
                                                                let igstValue = roundToTwo((taxAmount * invoiceItem.igst) / 100)
                                                                let amount = taxAmount + igstValue;
                                                                return (
                                                                    <TableRow key={`invoiceItem` + idx}>
                                                                        <TableCell>
                                                                            <Checkbox
                                                                                value={invoiceItem.code}
                                                                                onClick={invoiceItemSelected}
                                                                                selected={Boolean(selectedInvoiceItems.find((code) => { return code == invoiceItem.code }))} />
                                                                        </TableCell>
                                                                        <TableCell>{invoiceItem.name}</TableCell>
                                                                        <TableCell>{invoiceItem.hsnCode}</TableCell>
                                                                        <TableCell>{invoiceItem.uomTitle}</TableCell>
                                                                        <TableCell>{invoiceItem.rate}</TableCell>
                                                                        <TableCell>{invoiceItem.quantity}</TableCell>
                                                                        <TableCell>{taxAmount}</TableCell>
                                                                        <TableCell>{igstValue + ' @ ' + invoiceItem.igst + '%'}</TableCell>
                                                                        <TableCell>{amount}</TableCell>

                                                                    </TableRow>
                                                                )
                                                            })
                                                        }

                                                        {
                                                            invoiceItems.length > 0 &&
                                                            <React.Fragment>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={6} style={{ textAlign: 'center' }}>Sub Total</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalTaxAmount}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalIgst}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalAmount}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={9} align='center'>Additional Charges</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={6} align='center'>Description</TableCell>
                                                                </TableRow>
                                                                {
                                                                    addCharges.map((addCharge, idx) => {
                                                                        return (
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    <Checkbox
                                                                                        value={addCharge.code}
                                                                                        onClick={addChargeSelected}
                                                                                        checked={Boolean(selectedAddCharges.find((code) => { return code == addCharge.code }))}
                                                                                    />
                                                                                </TableCell>

                                                                                <TableCell colSpan={5} >
                                                                                    <TextField
                                                                                        value={addCharge.description}
                                                                                        label='Description'
                                                                                        fullWidth
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, description: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell >
                                                                                    <TextField
                                                                                        value={addCharge.taxableAmount}
                                                                                        label='Taxable amount'
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, taxableAmount: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    {roundToTwo((addCharge.taxableAmount * addCharge.igst) / 100)}<br />
                                                                                    @<br />
                                                                                    <TextField
                                                                                        value={addCharge.igst}
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, igst: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                    %
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    <TextField
                                                                                        onChange={()=>{}}
                                                                                        value={
                                                                                            (roundToTwo(
                                                                                                roundToTwo(addCharge.taxableAmount)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.igst) / 100)

                                                                                            )) ? roundToTwo(
                                                                                                roundToTwo(addCharge.taxableAmount)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.igst) / 100)

                                                                                            ) : 0

                                                                                        }
                                                                                        label='Amount'
                                                                                    />
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        }
                                                    </TableBody>
                                                </React.Fragment>
                                            }
                                            {
                                                customer != null &&
                                                customer.stateCode == props.trader.stateCode &&
                                                <React.Fragment>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                <Checkbox />
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>Name</TableCell>
                                                            <TableCell className={classes.headingCell}>HSN Code</TableCell>
                                                            <TableCell className={classes.headingCell}>UOM</TableCell>
                                                            <TableCell className={classes.headingCell}>Rate</TableCell>
                                                            <TableCell className={classes.headingCell}>Quantity</TableCell>
                                                            <TableCell className={classes.headingCell}>Tax.Amt</TableCell>
                                                            <TableCell className={classes.headingCell}>SGST</TableCell>
                                                            <TableCell className={classes.headingCell}>CGST</TableCell>
                                                            <TableCell className={classes.headingCell}>Amount</TableCell>
                                                        </TableRow>
                                                    </TableHead>                                                                                                    <TableBody>
                                                        {
                                                            invoiceItems.map((invoiceItem, idx) => {
                                                                let taxAmount = roundToTwo(invoiceItem.rate * invoiceItem.quantity);
                                                                let sgstValue = roundToTwo((taxAmount * invoiceItem.sgst) / 100)
                                                                let cgstValue = roundToTwo((taxAmount * invoiceItem.cgst) / 100)
                                                                let amount = roundToTwo(taxAmount + sgstValue + cgstValue);
                                                               
                                                                return (
                                                                    <TableRow key={`invoiceItem` + idx}>
                                                                        <TableCell>
                                                                            <Checkbox
                                                                                value={invoiceItem.code}
                                                                                onClick={invoiceItemSelected}
                                                                                checked={Boolean(selectedInvoiceItems.find((code) => { return code == invoiceItem.code }))} />
                                                                        </TableCell>
                                                                        <TableCell>{invoiceItem.name}</TableCell>
                                                                        <TableCell>{invoiceItem.hsnCode}</TableCell>
                                                                        <TableCell>{invoiceItem.uomTitle}</TableCell>
                                                                        <TableCell>{invoiceItem.rate}</TableCell>
                                                                        <TableCell>{invoiceItem.quantity}</TableCell>
                                                                        <TableCell >{taxAmount}</TableCell>
                                                                        <TableCell >{sgstValue + ' @ ' + invoiceItem.sgst + '%'}</TableCell>
                                                                        <TableCell >{cgstValue + ' @ ' + invoiceItem.cgst + '%'}</TableCell>
                                                                        <TableCell >{amount}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            invoiceItems.length > 0 &&
                                                            <React.Fragment>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={6} style={{ textAlign: 'center' }}>Sub Total</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalTaxAmount}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalSgst}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalCgst}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{subTotalAmount}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={10} align='center'>Additional Charges</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={6} align='center'>Description</TableCell>
                                                                </TableRow>
                                                                {
                                                                    addCharges.map((addCharge, idx) => {
                                                                        return (
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    <Checkbox
                                                                                        value={addCharge.code}
                                                                                        onClick={addChargeSelected}
                                                                                        checked={Boolean(selectedAddCharges.find((code) => { return code == addCharge.code }))}
                                                                                    />
                                                                                </TableCell>

                                                                                <TableCell colSpan={5} >
                                                                                    <TextField
                                                                                        value={addCharge.description}
                                                                                        label='Description'
                                                                                        fullWidth
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, description: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell >
                                                                                    <TextField
                                                                                        value={addCharge.taxableAmount}
                                                                                        label='Taxable amount'
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, taxableAmount: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    {roundToTwo((addCharge.taxableAmount * addCharge.sgst) / 100)}<br />
                                                                                    @
                                                                                    <TextField
                                                                                        value={addCharge.sgst}
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, sgst: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                    %
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    {roundToTwo((addCharge.taxableAmount * addCharge.cgst) / 100)}<br />
                                                                                    @
                                                                                    <TextField
                                                                                        value={addCharge.cgst}
                                                                                        onChange={(ev) => {
                                                                                            let charges = [...addCharges];
                                                                                            let charge = { ...addCharge, cgst: ev.target.value }
                                                                                            charges[idx] = charge;
                                                                                            setAddCharges(charges)
                                                                                        }}
                                                                                    />
                                                                                    %
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    <TextField
                                                                                        onChange={()=>{}}
                                                                                        value={
                                                                                            (roundToTwo(
                                                                                                roundToTwo(addCharge.taxableAmount)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.sgst) / 100)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.cgst) / 100)

                                                                                            )) ? roundToTwo(
                                                                                                roundToTwo(addCharge.taxableAmount)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.sgst) / 100)
                                                                                                +
                                                                                                roundToTwo((addCharge.taxableAmount * addCharge.cgst) / 100)

                                                                                            ) : 0

                                                                                        }
                                                                                        label='Amount'
                                                                                    />
                                                                                </TableCell>

                                                                            </TableRow>
                                                                        )
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        }
                                                    </TableBody>
                                                </React.Fragment>
                                            }
                                            {customer &&
                                                <TableFooter>
                                                    {
                                                        invoiceItems.length > 0 &&
                                                        <TableRow >
                                                            <TableCell colSpan={(customer.stateCode == props.trader.stateCode) ? 10 : 9} style={{ textAlign: 'center' }}>
                                                                <Fab size='small' color='primary' onClick={addAdditionalCharges}>
                                                                    <AddIcon />
                                                                </Fab>
                                                            </TableCell>
                                                        </TableRow>

                                                    }
                                                    {
                                                        roundOff != 0 &&
                                                        <TableRow>
                                                            <TableCell colSpan={(customer.stateCode == props.trader.stateCode) ? 9 : 8} style={{ textAlign: 'center' }} >
                                                                Total
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>{total}</TableCell>
                                                        </TableRow>

                                                    }
                                                    {
                                                        roundOff != 0 &&
                                                        <TableRow>
                                                            <TableCell colSpan={(customer.stateCode == props.trader.stateCode) ? 9 : 8} style={{ textAlign: 'center' }} >
                                                                Round Off
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>{roundOff}</TableCell>
                                                        </TableRow>
                                                    }
                                                    {
                                                        invoiceItems.length > 0 &&
                                                        <TableRow>
                                                            <TableCell colSpan={(customer.stateCode == props.trader.stateCode) ? 9 : 8} style={{ textAlign: 'center' }}>
                                                                Net Total
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>{netTotal}</TableCell>
                                                        </TableRow>
                                                    }
                                                </TableFooter>
                                            }
                                        </Table>

                                    </TableContainer>
                                }
                            </Grid>
                            <Grid item xs={12}><Divider /></Grid>
                            <Grid item xs={12} style={{ marginTop: '20px' }}>
                                <Grid container >
                                    <Grid item xs={12}><Typography style={{ color: '#007bff' }} variant='h4'><ReceiptIcon fontSize='medium' />&nbsp; Bank Details </Typography></Grid>
                                </Grid>
                                <br />
                                <Grid container alignItems='baseline'>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>Name</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.trader.bankName}</Typography></Grid>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>Branch</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.trader.bankBranchName}</Typography></Grid>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>IFSC Code</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.trader.bankBranchIFSCCode}</Typography></Grid>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>Acc. number</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.trader.bankAccountNumber}</Typography></Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                </DialogContent >
            </Dialog >
        </React.Fragment>
    )
}

function DeleteDialog(props){
    const closeDialog=()=>{
        props.setShowDialog(false) 
    }
    function cancelInvoice(){
        props.setShowProgress(true);
        let code=props.code
         cancelInvoiceAtBackEnd(props.code).then(()=>{
            props.dispatch({
                type: "DELETE_INVOICE",
                payload: code
            })    
            props.showSnackbar(`Invoice ${props.code} cancelled`,"success")
            props.setShowProgress(false);
            closeDialog();
         },(error)=>{
        props.showSnackbar(error,"error")
        props.setShowProgress(false);
        })
    }

    return (
        <Dialog open={props.showDialog} onClose={closeDialog}>
            <DialogTitle>Cancel Invoice</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure, you want to cancel invoice with invoice numvber <b>{props.code}</b>
                </DialogContentText>
                <DialogActions>
                    <Button color='primary' onClick={closeDialog}>Cancel</Button>
                    <Button color='primary' onClick={cancelInvoice}>Delete</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}


export default function Invoices(props) {
    const [showInvoice, setShowInvoice] = React.useState(false);
    const [showProgress, setShowProgress] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState();
    const [alertSeverity, setAlertSeverity] = React.useState();
    const classes = createStyle();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [showAddDialog, setShowAddDialog] = React.useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = React.useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
    const [invoiceCode,setInvoiceCode]=React.useState(0)
    const [selectedInvoice, setSelectedInvoice] = React.useState(null)

    function showSnackbar(message, severity) {
        setShowAlert(true)
        setAlertMessage(message)
        setAlertSeverity(severity)
    }
    const onPageChange = (event, newPage) => {
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0)
    }
    const viewInvoice = (code) => {
        setShowProgress(true)
        fetchInvoice(code).then((response) => {
            if (response.success) {
                setSelectedInvoice(response.invoice)
                setShowInvoice(true)
            }
            setShowProgress(false);
        }, (error) => {
            showSnackbar(`Error : ${error}`, "error")
            etShowProgress(true)
        })
    }
    const updateInvoice = (code) => {
        setShowProgress(true)
        fetchInvoice(code).then((response) => {
            if (response.success) {
                setSelectedInvoice(response.invoice)
                setShowUpdateDialog(true)
            }
            setShowProgress(false);
        }, (error) => {
            showSnackbar(`Error : ${error}`, "error")
            etShowProgress(true)
        })
    }
    const cancelInvoice = (code) => {
        setShowProgress(true)
        fetchInvoice(code).then((response) => {
            if (response.success) {
                setSelectedInvoice(response.invoice)
                setShowUpdateDialog(true)
            }
            setShowProgress(false);
        }, (error) => {
            showSnackbar(`Error : ${error}`, "error")
            etShowProgress(true)
        })
    }

    return (
        <div className={classes.container}>
            {showInvoice && <ViewInvoice invoice={selectedInvoice} showDialog={showInvoice} setShowDialog={setShowInvoice} />}
            <AccountingAlert open={showAlert} message={alertMessage} severity={alertSeverity} onClose={() => { setShowAlert(false) }} onExit={() => { setShowAlert(false) }} />
            {showProgress && <ProgressBar />}
            <Grid container className={classes.mainContainer} justifyContent='center'>
                <Grid item xs={12}>
                    <Paper elevation={10} className={classes.paper} component='div'>
                        <Grid container className={classes.paperContainer} spacing={2}>
                            <Grid item xs={12} >
                                <div className={classes.heading}>
                                    <SettingsIcon /> &nbsp;
                                    <Typography component='span' variant='subtitle1'><b>Invoice master</b></Typography>
                                </div>
                                <Divider style={{ marginTop: "10px" }} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent='center'>
                                <Table stickyHeader>
                                    <TableHead className={classes.tableHeading}>
                                        <TableRow >
                                            <TableCell className={classes.headingCell}>Invoice number</TableCell>
                                            <TableCell className={classes.headingCell}>Date</TableCell>
                                            <TableCell className={classes.headingCell}>Customer name</TableCell>
                                            <TableCell className={classes.headingCell}>SGST</TableCell>
                                            <TableCell className={classes.headingCell}>CGST</TableCell>
                                            <TableCell className={classes.headingCell}>IGST</TableCell>
                                            <TableCell className={classes.headingCell}>Amount</TableCell>
                                            <TableCell className={classes.headingCell}>View</TableCell>
                                            <TableCell className={classes.headingCell}>Edit</TableCell>
                                            <TableCell className={classes.headingCell}>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            props.invoices && props.invoices.slice((page) * rowsPerPage, (page) * rowsPerPage + rowsPerPage).map((invoice) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: 'right' }}>{invoice.code}</TableCell>
                                                        <TableCell>{new Date(invoice.date).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</TableCell>
                                                        <TableCell>{invoice.customer}</TableCell>
                                                        <TableCell style={{ textAlign: 'right' }}>{invoice.sgst}</TableCell>
                                                        <TableCell style={{ textAlign: 'right' }}>{invoice.cgst}</TableCell>
                                                        <TableCell style={{ textAlign: 'right' }}>{invoice.igst}</TableCell>
                                                        <TableCell style={{ textAlign: 'right' }}>{invoice.netTotal}</TableCell>
                                                        <TableCell>
                                                            <IconButton color='primary' onClick={() => { viewInvoice(invoice.code) }}>
                                                                <Eye />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton color='primary' onClick={() => { updateInvoice(invoice.code) }}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton color='primary' onClick={()=>{
                                                                setInvoiceCode(invoice.code)
                                                                setShowDeleteDialog(true)
                                                            }}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                    <TableFooter >
                                        <TableRow>
                                            {props.invoices != undefined && <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                page={page}
                                                count={props.invoices.length}
                                                rowsPerPage={rowsPerPage}
                                                colSpan={5}
                                                onPageChange={onPageChange}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />}
                                        </TableRow>
                                    </TableFooter>

                                </Table>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => { setShowAddDialog(true) }}>
                <AddIcon />
            </Fab>
            <AccountingAlert open={showAlert} message={alertMessage} severity={alertSeverity} onClose={() => { setShowAlert(false) }} onExit={() => { setShowAlert(false) }} />
            <AddDialog showDialog={showAddDialog} trader={props.trader} customers={props.customers} items={props.items} setShowDialog={setShowAddDialog} dispatch={props.dispatch} showSnackbar={showSnackbar} setShowProgress={setShowProgress} states={props.states} unitOfMeasurements={props.unitOfMeasurements} />
            {selectedInvoice && <UpdateDialog invoice={selectedInvoice} showDialog={showUpdateDialog} trader={props.trader} customers={props.customers} items={props.items} setShowDialog={setShowUpdateDialog} dispatch={props.dispatch} showSnackbar={showSnackbar} setShowProgress={setShowProgress} states={props.states} unitOfMeasurements={props.unitOfMeasurements} />}
            <DeleteDialog showDialog={showDeleteDialog} setShowDialog={setShowDeleteDialog} code={invoiceCode} dispatch={props.dispatch} showSnackbar={showSnackbar} setShowProgress={setShowProgress} />
        </div>
    )
}