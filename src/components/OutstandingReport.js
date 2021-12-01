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
function getOutstandingReport(){
    return new Promise((resolve,reject)=>{
        fetch('/getOutstandingReport').then(response=>response.json()).then((response)=>{
            if(response.success) resolve(response.outstandingReport)
            else reject(response.error)
        }).catch((error)=>{
            reject(error.message)
        })
    })
}
export default function InvoiceReport(props) {
    const classes = createStyle();
    const [showProgress, setShowProgress] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState();
    const [alertSeverity, setAlertSeverity] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [outstandingReport, setOutstandingReport] = React.useState([])
    const [balance,setBalance]=React.useState();
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
    React.useEffect(()=>{
        setShowProgress(true);
        getOutstandingReport().then((report)=>{
            setOutstandingReport(report)
            setShowProgress(false);
            let bal=report.map((report)=>{return report.balance}).reduce((acc,number)=>{return acc+number},0) 
            if(bal<0) setBalance(bal+' CR')
            else setBalance(bal+' DR')
        },(error)=>{
            setShowProgress(false);
            showSnackbar(error,'error')
        })
    },[])
    return (
        <Grid container className={classes.mainContainer} justifyContent='center' style={{ padding: '20px' }}>
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
                            <Typography variant='h3' align='center'>Report-Outstanding</Typography>
                        </Grid>
                        {outstandingReport.length > 0 &&
                            <React.Fragment>
                                <Grid item xs={12}>
                                    <Table stickyHeader>
                                        <TableHead className={classes.tableHeading}>
                                            <TableRow >
                                                <TableCell className={classes.headingCell}>S.No.</TableCell>
                                                <TableCell className={classes.headingCell}>Customer Name</TableCell>
                                                <TableCell className={classes.headingCell}>Balance</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                outstandingReport.slice((page) * rowsPerPage, (page) * rowsPerPage + rowsPerPage).map((report,idx) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell >{idx+1}</TableCell>
                                                            <TableCell >{report.customerName}</TableCell>
                                                            <TableCell ><Typography varaint='h6'>{ (report.balance<0)?-report.balance+' CR':report.balance+' DR' }</Typography></TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                        <TableFooter >
                                            <TableRow>
                                            <TableCell align='center' colSpan={2}> 
                                            <Typography varaint='h3'>Net Balance</Typography>
                                            </TableCell>
                                            <TableCell > 
                                            <Typography varaint='h3'>{balance}</Typography>
                                            </TableCell>

                                            </TableRow>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25]}
                                                    page={page}
                                                    count={outstandingReport.length}
                                                    rowsPerPage={rowsPerPage}
                                                    colSpan={5}
                                                    onPageChange={onPageChange}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />
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