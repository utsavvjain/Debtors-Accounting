import React from 'react';
import { Grid, makeStyles, Paper, Typography, Table, TableRow, TableCell, IconButton, TableContainer, TableHead, TableBody, Collapse, Chip, Box, TablePagination, TableFooter, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputAdornment, FormControl, OutlinedInput, InputLabel, List, ListItem, ListItemText, ListItemIcon, Checkbox, ListSubheader, Button, Divider } from '@material-ui/core';
import { Stack } from '@mui/material';
import AccountingAlert from './AccountingAlert';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import ProgressBar from './ProgressBar';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
const createStyle = makeStyles((theme) => {
    return ({
        container: {
            margin: "10px",
            padding: "10px",
        },
        heading: {
            textAlign: 'center'
        },
        tableHeading: {
            background: "orange"
        },
        headingCell: {
            fontWeight: "bold"
        },
        detailsTableCell: {
            paddingBottom: 0,
            paddingTop: 0
        },
        detailsTableHeader: {
            fontWeight: "bold"
        },
        icon: {
            color: "blue"
        },
        fab: {
            position: "fixed",
            bottom: 16,
            right: 16
        },
        inputField: {
            paddingBottom: theme.spacing(2),
            marginRight: theme.spacing(2)
        },
        transferListButtonGridItem: {
            flexDirection: 'column',
            display: "flex",
            justifyContent: "center"
        },
        transferList: {
            height: "250px",
            overflow: "auto"
        },
        dialog : {
            top : theme.mixins.toolbar
        }
    })
})
function ItemTableRow(props) {
    const [open, setOpen] = React.useState(false);
    const classes = createStyle();
    return (
        <React.Fragment>
            <TableRow hover>
                <TableCell>
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </TableCell>
                <TableCell>{props.item.index}</TableCell>
                <TableCell>{props.item.code}</TableCell>
                <TableCell>{props.item.name}</TableCell>
                <TableCell>
                    <IconButton className={classes.icon} onClick={() => { props.updateItem(props.item) }}>
                        <EditIcon />
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton className={classes.icon} onClick={() => { props.deleteItem(props.item) }}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={classes.detailsTableCell} colSpan={4}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Typography variant='h5'>Details</Typography>
                        <Box style={{ margin: 1 }}>
                            <Table size='small'>
                                <TableHead >
                                    <TableRow >
                                        <TableCell className={classes.detailsTableHeader}>HSN Code</TableCell>
                                        <TableCell className={classes.detailsTableHeader}>SGST</TableCell>
                                        <TableCell className={classes.detailsTableHeader}>CGST</TableCell>
                                        <TableCell className={classes.detailsTableHeader}>IGST</TableCell>
                                        <TableCell className={classes.detailsTableHeader}>Unit Of meaurements</TableCell>
                                    </TableRow>
                                </TableHead >
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{props.item.hsnCode}</TableCell>
                                        <TableCell>{props.item.sgst} %</TableCell>
                                        <TableCell>{props.item.cgst} %</TableCell>
                                        <TableCell>{props.item.igst} %</TableCell>
                                        <TableCell>
                                            <Stack direction='row' spacing={1}>
                                                {
                                                    props.item.unitOfMeasurements.map((uom, idx) => {
                                                        return (
                                                            <Chip label={uom.title} />
                                                        )
                                                    })
                                                }
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
function TransferList(props) {
    const [leftChecked, setLeftChecked] = React.useState([]);
    const [rightChecked, setRightChecked] = React.useState([]);
    const uomLeftSelected = (ev, uom) => {
        if (ev.target.checked) setLeftChecked([...leftChecked, uom])
        else {
            const list = [...leftChecked];
            list.splice(list.indexOf(list.find((u) => { return u.title == uom.title })), 1);
            setLeftChecked(list)
        }
    }
    const uomRightSelected = (ev, uom) => {
        if (ev.target.checked) setRightChecked([...rightChecked, uom])
        else {
            const list = [...rightChecked];
            list.splice(list.indexOf(list.find((u) => { return u.title == uom.title })), 1);
            setRightChecked(list)
        }
    }
    const moveToRight = () => {
        props.handleSelected([...props.selectedList, ...leftChecked]);
        let list = [...props.selectFromList]
        leftChecked.forEach((uom) => {
            list.splice(list.findIndex((u) => { return uom.title === u.title }), 1)
        })
        props.handleSelectFrom(list);
        setLeftChecked([])
    }
    const moveToLeft = () => {
        props.handleSelectFrom([...props.selectFromList, ...rightChecked]);
        let list = [...props.selectedList];
        rightChecked.forEach((uom) => {
            list.splice(list.findIndex((u) => { return u.title == uom.title }), 1)
        })
        props.handleSelected(list);
        setRightChecked([])
    }

    const classes = createStyle()
    return (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <ListSubheader >Select From</ListSubheader>
                <Paper className={classes.transferList}>
                    <List dense component='div' role='list'>
                        {props.selectFromList &&
                            props.selectFromList.map((uom, idx) => {
                                return (
                                    <ListItem id={`lUom${idx}`}>
                                        <ListItemIcon><Checkbox value={uom.title} onClick={(ev) => { uomLeftSelected(ev, uom) }} checked={Boolean(leftChecked.find((u) => { return u.title == uom.title }))} /></ListItemIcon>
                                        <ListItemText>{uom.title}</ListItemText>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Paper>
            </Grid>
            <Grid Item xs={2} className={classes.transferListButtonGridItem}>
                <Button
                    style={{ marginBottom: 4 }}
                    size="small"
                    color='primary'
                    variant='outlined'
                    onClick={moveToRight}
                    disabled={leftChecked.length == 0}
                >&gt;</Button>
                <Button
                    size="small"
                    color='primary'
                    variant='outlined'
                    disabled={rightChecked.length == 0}
                    onClick={moveToLeft}
                >&lt;</Button>

            </Grid>
            <Grid item xs={5}>
                <ListSubheader>Selected</ListSubheader>
                <Paper className={classes.transferList}>
                    <List dense component='div' role='list'>
                        {
                            props.selectedList.map((uom) => {
                                return (
                                    <ListItem>
                                        <ListItemIcon><Checkbox value={uom.title} onClick={(ev) => { uomRightSelected(ev, uom) }} checked={Boolean(rightChecked.find((u) => { return u.title == uom.title }))} /></ListItemIcon>
                                        <ListItemText>{uom.title}</ListItemText>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Paper>

            </Grid>
        </Grid>
    )
}
function addUnitOfMeasurementBackEnd(uom) {
    return new Promise((resolve, reject) => {
        fetch('/addUnitOfMeasurement', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ title: uom })
        }).then(response => response.json()).then((response) => {
            if (!response.success) {
                reject(response.error)
            }
            else {
                resolve({ code: response.code, title: uom })
            }
        }).catch((error) => {
            reject(error.message)
        })
    })
}
function addItemBackEnd(itm) {
    let item = { ...itm, unitOfMeasurements: [...itm.unitOfMeasurements] };
    item.unitOfMeasurements = item.unitOfMeasurements.map((item) => {
        return item.code
    })
    return new Promise((resolve, reject) => {
        fetch('/addItem', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(item)
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
function updateItemBackEnd(itm) {
    let item = { ...itm, unitOfMeasurements: [...itm.unitOfMeasurements] };
    item.unitOfMeasurements = item.unitOfMeasurements.map((item) => {
        return item.code
    })
    return new Promise((resolve, reject) => {
        fetch('/updateItem', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(item)
        }).then(response => response.json()).then((response) => {
            if (!response.success) {
                reject(response.error)
            }
            else resolve()
        }).catch((error) => {
            reject(error.message)
        })
    })

}
function deleteItemBackEnd(code) {
    return new Promise((resolve, reject) => {
        fetch('/deleteItem', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ code: code })
        }).then(response => response.json()).then((response) => {
            if (!response.success) {
                reject(response.error)
            }
            else resolve()
        }).catch((error) => {
            reject(error.message)
        })
    })

}

function DeleteDialog(props) {
    const closeDialog = () => {
        props.setShowDialog(false)
    }
    function deleteItem() {
        props.showProgress();
        deleteItemBackEnd(props.code).then(() => {
            props.dispatch({
                type: "DELETE_ITEM",
                payload: props.code
            })
            props.showSnackbar(`Item ${props.name} deleted`, "success")
            props.hideProgress();
            closeDialog();
        }, (error) => {
            props.showSnackbar(error, "error")
            props.hideProgress();
        })
    }

    return (
        <Dialog open={props.showDialog} onClose={closeDialog} disablePortal>
            <DialogTitle>Delete item</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure, you want to delete {props.name}
                </DialogContentText>
                <DialogActions>
                    <Button color='primary' onClick={closeDialog}>Cancel</Button>
                    <Button color='primary' onClick={deleteItem}>Delete</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
function AddDialog(props) {
    function clearForm() {
        setSelected([]);
        setSelectFrom(props.unitOfMeasurements)
        setName('')
        setHSNCode('')
        setCgst('')
        setSgst('')
        setIgst('')
        setUnitOfMeasurement('')
    }
    const addUnitOfMeasurement = () => {
        props.showProgress();
        addUnitOfMeasurementBackEnd(unitOfMeasurement).then((uom) => {
            props.dispatch({
                type: "ADD_UOM",
                payload: uom
            })
            props.showSnackbar("Unit Of measurement added", "success")
            props.hideProgress();
            setUnitOfMeasurement('')
        }, (error) => {
            props.showSnackbar(error, "error")
            props.hideProgress();
        })
    }
    const [selectFrom, setSelectFrom] = React.useState(props.unitOfMeasurements);
    const [selected, setSelected] = React.useState([])
    const [name, setName] = React.useState('');
    const [hsnCode, setHSNCode] = React.useState('');
    const [cgst, setCgst] = React.useState('');
    const [sgst, setSgst] = React.useState('');
    const [igst, setIgst] = React.useState('');
    React.useEffect(() => {
        if (props.unitOfMeasurements != undefined) {
            if (selected.length == 0) setSelectFrom(props.unitOfMeasurements)
            else setSelectFrom(props.unitOfMeasurements.filter((value) => {
                return selected.findIndex((u) => { return u.title == value.title })
            }));
        }
    }, [props.unitOfMeasurements])
    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState('');
    const closeDialog = () => {
        props.setShowDialog(false)
        clearForm();
    }
    function addItem() {
        let item = {};
        item.code = 0;
        item.name = name;
        item.hsnCode = hsnCode;
        item.cgst = cgst;
        item.sgst = sgst;
        item.igst = igst;
        item.unitOfMeasurements = [...selected];
        props.showProgress();
        addItemBackEnd(item).then((itm) => {
            item.code = itm
            props.dispatch({
                type: "ADD_ITEM",
                payload: item
            })
            props.showSnackbar(`Item ${item.name} added`, "success")
            props.hideProgress();
            closeDialog();
        }, (error) => {
            props.showSnackbar(error, "error")
            props.hideProgress();
        })
    }
    const classes = createStyle();
    return (
        <Dialog open={props.showDialog} onClose={closeDialog} scroll="body" className={classes.dialog}>
            <DialogTitle>Add an item</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}><Typography variant='subtitle'>General Information</Typography></Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            id="name"
                            value={name}
                            onChange={(ev) => { setName(ev.target.value) }}
                            label="Item name"
                            required
                            variant='standard'
                            fullWidth

                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            fullWidth
                            id="hsnCode"
                            label="hsnCode"
                            variant='standard'
                            value={hsnCode}
                            onChange={(ev) => { setHSNCode(ev.target.value) }}
                            required
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item xs={12}><Typography variant='subtitle'>Tax Details</Typography></Grid>
                    <Grid item xs={4}>
                        <TextField
                            InputProps={{
                                endAdornment: (<InputAdornment position='end'>%</InputAdornment>)
                            }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            margin="dense"
                            id="cgst"
                            required
                            label='CGST'
                            value={cgst}
                            onChange={(ev) => { setCgst(ev.target.value) }}
                            variant='standard'
                            className={classes.inputField}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            InputProps={{ endAdornment: (<InputAdornment position='end'>%</InputAdornment>) }}
                            margin="dense"
                            id="sgst"
                            label="SGST"
                            variant='standard'
                            value={sgst}
                            onChange={(ev) => { setSgst(ev.target.value) }}
                            required
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            InputProps={{ endAdornment: (<InputAdornment position='end'>%</InputAdornment>) }} margin="dense"
                            id="igst"
                            label="IGST"
                            variant='standard'
                            value={igst}
                            onChange={(ev) => { setIgst(ev.target.value) }}
                            required
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item xs={12}><Typography variant='subtitle'>Unit of Measurements</Typography></Grid>
                    <Grid item xs={12}>
                        <TransferList selectFromList={selectFrom} selectedList={selected} handleSelectFrom={setSelectFrom} handleSelected={setSelected} />
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={4}>
                        <TextField
                            label='Unit Of Measurement'
                            helperText="Add unit of measurement"
                            value={unitOfMeasurement}
                            onChange={(ev) => { setUnitOfMeasurement(ev.target.value) }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button variant='outlined' color='primary' onClick={addUnitOfMeasurement}>Add</Button>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={closeDialog}>Cancel</Button>
                <Button color='primary' onClick={addItem}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

function UpdateDialog(props) {
    function clearForm() {
        setSelected([]);
        setSelectFrom(props.unitOfMeasurements)
        setName('')
        setHSNCode('')
        setCgst('')
        setSgst('')
        setIgst('')
        setUnitOfMeasurement('')
    }
    const addUnitOfMeasurement = () => {
        props.showProgress();
        addUnitOfMeasurementBackEnd(unitOfMeasurement).then((uom) => {
            props.dispatch({
                type: "ADD_UOM",
                payload: uom
            })
            props.showSnackbar("Unit Of measurement added", "success")
            props.hideProgress();
            setUnitOfMeasurement('')
        }, (error) => {
            props.showSnackbar(error, "error")
            props.hideProgress();
        })
    }
    const [selectFrom, setSelectFrom] = React.useState(props.unitOfMeasurements);
    const [selected, setSelected] = React.useState(props.item.unitOfMeasurements)
    const [name, setName] = React.useState(props.item.name);
    const [code, setCode] = React.useState(props.item.code);
    const [hsnCode, setHSNCode] = React.useState(props.item.hsnCode);
    const [cgst, setCgst] = React.useState(props.item.cgst);
    const [sgst, setSgst] = React.useState(props.item.sgst);
    const [igst, setIgst] = React.useState(props.item.igst);
    React.useEffect(() => {
        if (props.unitOfMeasurements != undefined && selected != undefined) {
            if (selected.length == 0) setSelectFrom(props.unitOfMeasurements)
            else setSelectFrom(props.unitOfMeasurements.filter((value) => {
                return selected.findIndex((u) => { return u.title == value.title })
            }));
        }
    }, [props.unitOfMeasurements])
    const [unitOfMeasurement, setUnitOfMeasurement] = React.useState('');
    const closeDialog = () => {
        props.setShowDialog(false)
        clearForm();
    }
    function updateItem() {
        let item = {};
        item.code = code;
        item.name = name;
        item.hsnCode = hsnCode;
        item.cgst = cgst;
        item.sgst = sgst;
        item.igst = igst;
        item.unitOfMeasurements = [...selected];
        props.showProgress();
        updateItemBackEnd(item).then(() => {
            props.dispatch({
                type: "UPDATE_ITEM",
                payload: item
            })
            props.showSnackbar(`Item ${item.name} updated`, "success")
            props.hideProgress();
            closeDialog();
        }, (error) => {
            props.showSnackbar(error, "error")
            props.hideProgress();
        })
    }
    const classes = createStyle();
    return (
        <Dialog open={props.showDialog} onClose={closeDialog} scroll="body" disablePortal>
            <DialogTitle>Update item</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}><Typography variant='subtitle'>General Information</Typography></Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            id="name"
                            value={name}
                            onChange={(ev) => { setName(ev.target.value) }}
                            label="Item name"
                            required
                            variant='standard'
                            fullWidth

                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            fullWidth
                            id="hsnCode"
                            label="hsnCode"
                            variant='standard'
                            value={hsnCode}
                            onChange={(ev) => { setHSNCode(ev.target.value) }}
                            required
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item xs={12}><Typography variant='subtitle'>Tax Details</Typography></Grid>
                    <Grid item xs={4}>
                        <TextField
                            InputProps={{
                                endAdornment: (<InputAdornment position='end'>%</InputAdornment>)
                            }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            margin="dense"
                            id="cgst"
                            required
                            label='CGST'
                            value={cgst}
                            onChange={(ev) => { setCgst(ev.target.value) }}
                            variant='standard'
                            className={classes.inputField}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            InputProps={{ endAdornment: (<InputAdornment position='end'>%</InputAdornment>) }}
                            margin="dense"
                            id="sgst"
                            label="SGST"
                            variant='standard'
                            value={sgst}
                            onChange={(ev) => { setSgst(ev.target.value) }}
                            required
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            InputProps={{ endAdornment: (<InputAdornment position='end'>%</InputAdornment>) }} margin="dense"
                            id="igst"
                            label="IGST"
                            variant='standard'
                            value={igst}
                            onChange={(ev) => { setIgst(ev.target.value) }}
                            required
                            fullWidth
                            className={classes.inputField}
                        />
                    </Grid>
                    <Grid item xs={12}><Typography variant='subtitle'>Unit of Measurements</Typography></Grid>
                    <Grid item xs={12}>
                        <TransferList selectFromList={selectFrom} selectedList={selected} handleSelectFrom={setSelectFrom} handleSelected={setSelected} />
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={4}>
                        <TextField
                            label='Unit Of Measurement'
                            helperText="Add unit of measurement"
                            value={unitOfMeasurement}
                            onChange={(ev) => { setUnitOfMeasurement(ev.target.value) }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button variant='outlined' color='primary' onClick={addUnitOfMeasurement}>Add</Button>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={closeDialog}>Close</Button>
                <Button color='primary' onClick={updateItem}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}


export default function Items(props) {
    const onPageChange = (event, newPage) => {
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0)
    }
    const classes = createStyle();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [showAddItemDialog, setShowAddItemDialog] = React.useState(false);
    const [showUpdateItemDialog, setShowUpdateItemDialog] = React.useState(false);
    const [showDeleteItemDialog, setShowDeleteItemDialog] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState();
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState();
    const [alertSeverity, setAlertSeverity] = React.useState();
    const [showProgress, setShowProgress] = React.useState(false);
    function showSnackbar(message, severity) {
        setShowAlert(true)
        setAlertMessage(message)
        setAlertSeverity(severity)
    }
    const displayProgress = () => {
        setShowProgress(true)
    }
    const hideProgress = () => {
        setShowProgress(false);
    }
    const updateItem = (item) => {
        setSelectedItem(item);
        setShowUpdateItemDialog(true);
    }
    const deleteItem = (item) => {
        setSelectedItem(item);
        setShowDeleteItemDialog(true);
    }

    return (
        <div className={classes.container}>
            {showProgress && <ProgressBar />}
            <Grid container spacing={4} >
                <Grid item xs={12}><Typography className={classes.heading} variant='h3'>Item Master</Typography></Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent='center'>
                        <Grid item xs={12}>
                            <TableContainer component={Paper} >
                                <Table stickyHeader>
                                    <TableHead className={classes.tableHeading}>
                                        <TableRow >
                                            <TableCell />
                                            <TableCell className={classes.headingCell}>S.No.</TableCell>
                                            <TableCell className={classes.headingCell}>Code</TableCell>
                                            <TableCell className={classes.headingCell}>Name</TableCell>
                                            <TableCell className={classes.headingCell}>Edit</TableCell>
                                            <TableCell className={classes.headingCell}>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.items &&
                                            props.items.slice((page) * rowsPerPage, (page) * rowsPerPage + rowsPerPage).map((item, idx) => {
                                                item = { ...item, index: idx + 1 + (page) * rowsPerPage }
                                                return (
                                                    <ItemTableRow key={`itemRow${idx}`} item={item} deleteItem={deleteItem} updateItem={updateItem} />
                                                )
                                            })
                                        }
                                    </TableBody>
                                    <TableFooter >
                                        <TableRow>
                                            {props.items != undefined && <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                page={page}
                                                count={props.items.length}
                                                rowsPerPage={rowsPerPage}
                                                colSpan={5}
                                                onPageChange={onPageChange}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />}
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => { setShowAddItemDialog(true) }}>
                <AddIcon />
            </Fab>
            <AccountingAlert open={showAlert} message={alertMessage} severity={alertSeverity} onClose={() => { setShowAlert(false) }} onExit={() => { setShowAlert(false) }} />
            <AddDialog showDialog={showAddItemDialog} setShowDialog={setShowAddItemDialog} unitOfMeasurements={props.unitOfMeasurements} dispatch={props.dispatch} showSnackbar={showSnackbar} showProgress={displayProgress} hideProgress={hideProgress} />
            {showUpdateItemDialog && <UpdateDialog showDialog={showUpdateItemDialog} item={selectedItem} setShowDialog={setShowUpdateItemDialog} unitOfMeasurements={props.unitOfMeasurements} dispatch={props.dispatch} showSnackbar={showSnackbar} showProgress={displayProgress} hideProgress={hideProgress} />}
            {showDeleteItemDialog && <DeleteDialog showDialog={showDeleteItemDialog} code={selectedItem.code} name={selectedItem.name} setShowDialog={setShowDeleteItemDialog} dispatch={props.dispatch} showSnackbar={showSnackbar} showProgress={displayProgress} hideProgress={hideProgress} />}
        </div>
    )
}