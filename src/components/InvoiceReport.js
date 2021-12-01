import React from 'react'
import { Grid, makeStyles, Paper, Typography, Table, TableRow, TableCell, IconButton, TableContainer, TableHead, TableBody, TablePagination, TableFooter, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, OutlinedInput, InputLabel, List, ListItem, ListItemText, ListItemIcon, Checkbox, ListSubheader, Button, Divider, Toolbar, Select, MenuItem, Input, InputAdornment } from '@material-ui/core';
import AccountingAlert from './AccountingAlert';
import ProgressBar from './ProgressBar';
import SearchIcon from '@material-ui/icons/Search';
import Eye from '@material-ui/icons/Visibility'
import ViewInvoice from './ViewInvoice';

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
export default function InvoiceReport(props) {
    const classes = createStyle();
    const [showProgress, setShowProgress] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState();
    const [alertSeverity, setAlertSeverity] = React.useState();
    const [fromDate, setFromDate] = React.useState();
    const [toDate, setToDate] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filteredInvoices, setFilteredInvoices] = React.useState([])
    const [showInvoice, setShowInvoice] = React.useState(false);
    const [invoiceCode,setInvoiceCode]=React.useState(0)
    const [selectedInvoice, setSelectedInvoice] = React.useState(null)
    const onPageChange = (event, newPage) => {
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0)
    }
    function showSnackbar(message, severity) {
        setShowAlert(true)
        setAlertMessage(message)
        setAlertSeverity(severity)
    }
    function fetchInvoice(code) {
        return new Promise((resolve, reject) => {
            fetch(`/getInvoice?invoiceNumber=${code}`).then(response => response.json()).then(response => resolve(response)).catch((error) => {
                reject(error.message)
            })
        })
    }
    const filterInvoices = () => {
        setShowProgress(true);
        let list = props.invoices.filter(invoice => (new Date(invoice.date) <= new Date(toDate)) && (new Date(invoice.date) >= new Date(fromDate)) );
        if (list.length == 0) {
            showSnackbar('No record found!', 'warning')
            setFilteredInvoices([])
        }
        else setFilteredInvoices(list)
        setPage(0)
        setShowProgress(false);

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
    return (
        <Grid container className={classes.mainContainer} justifyContent='center' style={{ padding: '20px' }}>
            {showInvoice && <ViewInvoice invoice={selectedInvoice} showDialog={showInvoice} setShowDialog={setShowInvoice} />}
            <AccountingAlert open={showAlert} message={alertMessage} severity={alertSeverity} onClose={() => { setShowAlert(false) }} onExit={() => { setShowAlert(false) }} />
            {showProgress && <ProgressBar />}
            <Grid item xs={12}>
                <Paper elevation={10} className={classes.paper} component='div'>
                    <Grid container className={classes.paperContainer} spacing={2}>
                        <Grid item xs={12} >
                            <div className={classes.heading}>
                                <Typography component='span' variant='subtitle1'><b>Customer Invoice Report</b></Typography>
                            </div>
                            <Divider style={{ marginTop: "10px" }} />
                        </Grid>
                        <Grid item xs={12} style={{ margin: '20px' }}>
                            <Typography variant='h3' >Select Date Range</Typography>
                            <Grid container style={{ marginTop: '20px' }} spacing={4} alignItems='center'>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        value={fromDate}
                                        id="date"
                                        label="From date"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            max: (toDate) ? toDate : ''
                                        }}
                                        onChange={(ev) => { setFromDate(ev.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        value={toDate}
                                        id="date"
                                        label="To date"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            min: (fromDate) ? fromDate : ''
                                        }}
                                        onChange={(ev) => { setToDate(ev.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <IconButton color='primary' variant='outlined' onClick={filterInvoices}>
                                        <SearchIcon />
                                    </IconButton>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: '20px' }}><Divider /></Grid>
                        {filteredInvoices.length > 0 &&
                            <React.Fragment>
                                <Grid item xs={12} style={{ margin: '20px' }}>
                                    <Typography variant='h3' align='center'>Invoices</Typography>
                                </Grid>
                                <Grid item xs={12}>
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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                filteredInvoices.slice((page) * rowsPerPage, (page) * rowsPerPage + rowsPerPage).map((invoice) => {
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
                                                    count={filteredInvoices.length}
                                                    rowsPerPage={rowsPerPage}
                                                    colSpan={5}
                                                    onPageChange={onPageChange}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />}
                                            </TableRow>
                                        </TableFooter>

                                    </Table>
                                </Grid>
                            </React.Fragment>
                        }
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}