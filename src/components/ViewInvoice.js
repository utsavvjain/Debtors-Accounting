import React from 'react';
import { Grid, makeStyles, Paper, Typography, Table, TableRow, TableCell, IconButton, TableContainer, TableHead, TableBody, TablePagination, TableFooter, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, OutlinedInput, InputLabel, List, ListItem, ListItemText, ListItemIcon, Checkbox, ListSubheader, Button, Divider, Toolbar, Select, MenuItem, Input } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel'
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
export default function ViewInvoice(props) {
    const closeDialog = () => {
        props.setShowDialog(false);
    }
    const classes = createStyle();
    return (
        <React.Fragment>
            <Dialog open={props.showDialog} onClose={closeDialog} fullScreen>
                <DialogTitle>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant='h5' component='div' >Invoice</Typography>
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
                            <Grid item xs={12}>
                                <Grid container >
                                    <Grid item xs={11} style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}><Typography style={{ color: '#007bff' }} variant='h5'>{props.invoice.trader.name}</Typography></Grid>
                                </Grid>
                                <Grid container justifyContent='flex-end'>
                                    <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}><HomeIcon color='primary' />&nbsp; </Grid>
                                    <Grid item xs={2}><Typography variant='body1' component='span'>{props.invoice.trader.address}</Typography></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex' }}><LocationIcon color='primary' />&nbsp; </Grid>
                                    <Grid item xs={2}><Typography variant='body1' component='span'>{props.invoice.trader.state}</Typography></Grid>
                                </Grid>
                                <Grid container alignItems='baseline'>
                                    <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>GST</b></Typography>&nbsp; </Grid>
                                    <Grid item xs={2}><Typography variant='body1' component='span'>{props.invoice.trader.gstNum}</Typography></Grid>
                                </Grid>
                                {
                                    props.invoice.trader.contact1 != "null" &&
                                    <Grid container>
                                        <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                        <Grid item xs={2}><Typography variant='body1' component='span'>{props.invoice.trader.contact1}</Typography></Grid>
                                    </Grid>

                                }
                                {
                                    props.invoice.trader.contact2 != "null" &&
                                    <Grid container>
                                        <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                        <Grid item xs={2}><Typography variant='body1' component='span'>{props.invoice.trader.contact2}</Typography></Grid>
                                    </Grid>

                                }
                                {
                                    props.invoice.trader.contact3 != "null" &&
                                    <Grid container>
                                        <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                        <Grid item xs={2}><Typography variant='body1' component='span'>{props.invoice.trader.contact3}</Typography></Grid>
                                    </Grid>

                                }
                                {
                                    props.invoice.trader.regTitle1 != "null" &&
                                    <Grid container alignItems='baseline'>
                                        <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{props.invoice.trader.regTitle1}</b></Typography>&nbsp; </Grid>
                                        <Grid item xs={2}><Typography variant='body1' component='span'>{props.invoice.trader.regValue1}</Typography></Grid>
                                    </Grid>

                                }
                                {
                                    props.invoice.trader.regTitle2 != "null" &&
                                    <Grid container alignItems='baseline'>
                                        <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{props.invoice.trader.regTitle2}</b></Typography>&nbsp; </Grid>
                                        <Grid item xs={2}><Typography variant='body1' component='span'>{props.invoice.trader.regValue2}</Typography></Grid>
                                    </Grid>

                                }
                                {
                                    props.invoice.trader.regTitle3 != "null" &&
                                    <Grid container alignItems='baseline'>
                                        <Grid item xs={10} style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{props.invoice.trader.regTitle3}</b></Typography>&nbsp; </Grid>
                                        <Grid item xs={2}><Typography variant='body1' component='span'>{props.invoice.trader.regValue3}</Typography></Grid>
                                    </Grid>
                                }
                            </Grid>
                            <Grid item xs={12}><Divider /></Grid>
                            <Grid item xs={12}>
                                <Grid container style={{ marginTop: "12px" }} spacing={4}>
                                    <Grid item xs={12}><Typography style={{ color: '#007bff' }} variant='h3'><ReceiptIcon fontSize='large' />&nbsp; Invoice To: </Typography></Grid></Grid>
                                <Grid item xs={6} style={{ marginTop: "10px" }}>
                                    {
                                        <React.Fragment>
                                            <Typography variant='h5'>{props.invoice.customer.name}</Typography>
                                            <Grid container >
                                                <Grid item style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}><HomeIcon color='primary' />&nbsp; </Grid>
                                                <Grid item ><Typography variant='body1' component='span'>{props.invoice.customer.address}</Typography></Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item style={{ justifyContent: 'flex-end', display: 'flex' }}><LocationIcon color='primary' />&nbsp; </Grid>
                                                <Grid item ><Typography variant='body1' component='span'>{props.invoice.customer.state}</Typography></Grid>
                                            </Grid>
                                        </React.Fragment>
                                    }
                                    {
                                        props.invoice.customer.contact1 != "null" &&
                                        <Grid container>
                                            <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                            <Grid item ><Typography variant='body1' component='span'>{props.invoice.customer.contact1}</Typography></Grid>
                                        </Grid>

                                    }
                                    {
                                        props.invoice.customer.contact2 != "null" &&
                                        <Grid container>
                                            <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                            <Grid item><Typography variant='body1' component='span'>{props.invoice.customer.contact2}</Typography></Grid>
                                        </Grid>

                                    }
                                    {
                                        props.invoice.customer.contact3 != "null" &&
                                        <Grid container>
                                            <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><PhoneIcon />&nbsp; </Grid>
                                            <Grid ><Typography variant='body1' component='span'>{props.invoice.customer.contact3}</Typography></Grid>
                                        </Grid>

                                    }
                                    {
                                        props.invoice.customer.regTitle1 != "null" &&
                                        <Grid container alignItems='baseline'>
                                            <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{props.invoice.customer.regTitle1}</b></Typography>&nbsp; </Grid>
                                            <Grid item ><Typography variant='body1' component='span'>{props.invoice.customer.regValue1}</Typography></Grid>
                                        </Grid>

                                    }
                                    {
                                        props.invoice.customer.regTitle2 != "null" &&
                                        <Grid container alignItems='baseline'>
                                            <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{props.invoice.customer.regTitle2}</b></Typography>&nbsp; </Grid>
                                            <Grid item ><Typography variant='body1' component='span'>{props.invoice.customer.regValue2}</Typography></Grid>
                                        </Grid>

                                    }
                                    {
                                        props.invoice.customer.regTitle3 != "null" &&
                                        <Grid container alignItems='baseline'>
                                            <Grid item style={{ justifyContent: 'flex-end', display: 'flex', color: '#007bff', alignItems: 'center' }}><Typography variant='subtitle1' component='span'><b>{props.invoice.customer.regTitle3}</b></Typography>&nbsp; </Grid>
                                            <Grid item ><Typography variant='body1' component='span'>{props.invoice.customer.regValue3}</Typography></Grid>
                                        </Grid>
                                    }
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <TextField
                                        id="date"
                                        label="Invoice Date"
                                        defaultValue={new Date(props.invoice.date).toISOString().replace(/T.*/, '').split('-').join('-')}
                                        type="date"
                                        disabled
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
                                    <TableContainer component={Paper} elevation={3} style={{ marginTop: "10px" }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow >
                                                    <TableCell colspan={(props.invoice.customer.state == props.invoice.trader.state) ? 10 : 9}>
                                                        <Toolbar style={{ marginTop: '20px' }}>
                                                            <Typography variant='h6' style={{ flexGrow: 1 }}>Invoice items & charges</Typography>
                                                        </Toolbar>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {
                                                props.invoice.customer.state != props.invoice.trader.state &&
                                                <React.Fragment>
                                                    <TableHead>
                                                        <TableRow>
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
                                                            props.invoice.invoiceItems.map((invoiceItem, idx) => {
                                                                return (
                                                                    <TableRow key={`invoiceItem` + idx}>
                                                                        <TableCell>{invoiceItem.item.name}</TableCell>
                                                                        <TableCell>{invoiceItem.item.hsnCode}</TableCell>
                                                                        <TableCell>{invoiceItem.item.unitOfMeasurement}</TableCell>
                                                                        <TableCell>{invoiceItem.rate}</TableCell>
                                                                        <TableCell>{invoiceItem.quantity}</TableCell>
                                                                        <TableCell>{roundToTwo(invoiceItem.taxableValue)}</TableCell>
                                                                        <TableCell>{roundToTwo(invoiceItem.item.igstValue) + ' @ ' + roundToTwo(invoiceItem.item.igst) + '%'}</TableCell>
                                                                        <TableCell>{roundToTwo(invoiceItem.subTotal)}</TableCell>

                                                                    </TableRow>
                                                                )
                                                            })
                                                        }

                                                        {
                                                            <React.Fragment>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={5} style={{ textAlign: 'center' }}>Sub Total</TableCell>
                                                                    <TableCell className={classes.headingCell} >{roundToTwo(props.invoice.itemsTaxableValue)}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{roundToTwo(props.invoice.itemsTaxValue)}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{roundToTwo(props.invoice.itemsSubTotal)}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={8} align='center'>Additional Charges</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={5} align='center'>Description</TableCell>
                                                                </TableRow>
                                                                {
                                                                    props.invoice.additionalCharges.map((addCharge, idx) => {
                                                                        return (
                                                                            <TableRow>
                                                                                <TableCell colSpan={5} >
                                                                                    <TextField
                                                                                        value={addCharge.description}
                                                                                        label='Description'
                                                                                        fullWidth
                                                                                        onChange={()=>{}}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell >
                                                                                    <TextField
                                                                                        value={roundToTwo(addCharge.taxableValue)}
                                                                                        label='Taxable amount'
                                                                                        onChange={()=>{}}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    {roundToTwo(addCharge.igstValue)}<br />
                                                                                    @<br />
                                                                                    <TextField
                                                                                        value={roundToTwo(addCharge.igstPercentage)}
                                                                                        onChange={()=>{}}
                                                                                    />
                                                                                    %
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    <TextField
                                                                                        onChange={()=>{}}
                                                                                        value={roundToTwo(addCharge.subTotal)}
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

                                                props.invoice.customer.state == props.invoice.trader.state &&
                                                <React.Fragment>
                                                    <TableHead>
                                                        <TableRow>
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
                                                            props.invoice.invoiceItems.map((invoiceItem, idx) => {
                                                                return (
                                                                    <TableRow key={`invoiceItem` + idx}>
                                                                        <TableCell>{invoiceItem.item.name}</TableCell>
                                                                        <TableCell>{invoiceItem.item.hsnCode}</TableCell>
                                                                        <TableCell>{invoiceItem.item.unitOfMeasurement}</TableCell>
                                                                        <TableCell>{invoiceItem.rate}</TableCell>
                                                                        <TableCell>{invoiceItem.quantity}</TableCell>
                                                                        <TableCell >{roundToTwo(invoiceItem.taxableValue)}</TableCell>
                                                                        <TableCell >{roundToTwo(invoiceItem.item.sgst) + ' @ ' + roundToTwo(invoiceItem.item.sgstValue) + '%'}</TableCell>
                                                                        <TableCell >{roundToTwo(invoiceItem.item.cgst) + ' @ ' + roundToTwo(invoiceItem.item.cgstValue) + '%'}</TableCell>
                                                                        <TableCell >{roundToTwo(invoiceItem.subTotal)}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            <React.Fragment>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={5} style={{ textAlign: 'center' }}>Sub Total</TableCell>
                                                                    <TableCell className={classes.headingCell} >{props.invoice.itemsTaxableValue}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{props.invoice.invoiceItems.map(invoiceItem => invoiceItem.item.sgstValue).reduce((acc, num) => { return acc + num }, 0)}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{roundToTwo(props.invoice.invoiceItems.map(invoiceItem => invoiceItem.item.cgstValue).reduce((acc, no) => { return acc + no }, 0))}</TableCell>
                                                                    <TableCell className={classes.headingCell} >{props.invoice.itemsSubTotal}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={9} align='center'>Additional Charges</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell className={classes.headingCell} colspan={5} align='center'>Description</TableCell>
                                                                </TableRow>
                                                                {
                                                                    props.invoice.additionalCharges.map((addCharge, idx) => {
                                                                        return (
                                                                            <TableRow>
                                                                                <TableCell colSpan={5} >
                                                                                    <TextField
                                                                                        value={addCharge.description}
                                                                                        label='Description'
                                                                                        onChange={()=>{}}
                                                                                        fullWidth
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell >
                                                                                    <TextField
                                                                                        onChange={()=>{}}
                                                                                        value={addCharge.taxableValue}
                                                                                        label='Taxable amount'
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    {roundToTwo(addCharge.sgstPercentage)}<br />
                                                                                    @
                                                                                    <TextField
                                                                                        onChange={()=>{}}
                                                                                        value={addCharge.sgstValue}
                                                                                    />
                                                                                    %
                                                                                </TableCell>
                                                                                <TableCell  >
                                                                                    {roundToTwo(addCharge.cgstPercentage)}<br />
                                                                                    @
                                                                                    <TextField
                                                                                        onChange={()=>{}}
                                                                                        value={addCharge.cgstValue}
                                                                                    />
                                                                                    %
                                                                                </TableCell>
                                                                                <TableCell >
                                                                                    <TextField
                                                                                        onChange={()=>{}}
                                                                                        label='Amount'
                                                                                        value={addCharge.subTotal}
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
                                                <TableFooter>
                                                    {
                                                        props.roundOff != 0 &&
                                                        <TableRow>
                                                            <TableCell colSpan={(props.invoice.customer.state == props.invoice.trader.state) ? 8 : 7} style={{ textAlign: 'center' }} >
                                                                Total
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>{roundToTwo(props.invoice.subTotal)}</TableCell>
                                                        </TableRow>

                                                    }
                                                    {
                                                        props.roundOff != 0 &&
                                                        <TableRow>
                                                            <TableCell colSpan={(props.invoice.customer.state == props.invoice.trader.state) ? 8 : 7} style={{ textAlign: 'center' }} >
                                                                Round Off
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>{roundToTwo(props.invoice.roundOff)}</TableCell>
                                                        </TableRow>
                                                    }
                                                    {
                                                        <TableRow>
                                                            <TableCell colSpan={(props.invoice.customer.state == props.invoice.trader.state) ? 8 : 7} style={{ textAlign: 'center' }}>
                                                                Net Total
                                                            </TableCell>
                                                            <TableCell className={classes.headingCell}>{roundToTwo(props.invoice.netTotal)}</TableCell>
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
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>Name</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.invoice.trader.bankName}</Typography></Grid>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>Branch</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.invoice.trader.bankBranchName}</Typography></Grid>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>IFSC Code</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.invoice.trader.bankBranchIFSCCode}</Typography></Grid>
                                    <Grid item xs={12} > <Typography variant='h6' color='primary' component='span'><b>Acc. number</b></Typography>&nbsp;&nbsp;&nbsp;&nbsp;<Typography variant='body1' component='span'>{props.invoice.trader.bankAccountNumber}</Typography></Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                </DialogContent >
            </Dialog >
        </React.Fragment>

    )
}