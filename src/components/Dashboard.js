import React from 'react';
import { Paper, makeStyles, Typography, Grid, Divider, Card, CardContent } from '@material-ui/core'
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
        card: {
            background: '#FFFEF2'
        },
        paperContainer: {
            padding: "10px"
        },
        headingCell: {
            fontWeight: "bold"
        }
    })
})
export default function Dashboard(props) {
    const classes = createStyle()
    return (
        <Grid container className={classes.mainContainer} justifyContent='center' style={{ padding: '20px' }}>
            <Grid item xs={12}>
                <Paper elevation={10} className={classes.paper} component='div'>
                    <Grid container className={classes.paperContainer} spacing={2}>
                        <Grid item xs={12} >
                            <div className={classes.heading}>
                                <Typography component='span' variant='subtitle1'><b>Dashboard</b></Typography>
                            </div>
                            <Divider style={{ marginTop: "10px" }} />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '20px' }}>
                            <Grid container spacing={4} style={{ padding: '10px' }}>
                                <Grid item xs={4}>
                                    <Card style={{ minWidth: '33%' }} elevation={3} className={classes.card}>
                                        <CardContent>
                                            <Typography variant='h5'>Customers</Typography>
                                            <Typography variant='body1'>
                                                Total Customers registered : <Typography variant='h6' component='span' color='primary'>{(props.customers) ? props.customers.length : 0}</Typography>
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card style={{ minWidth: '33%' }} elevation={3} className={classes.card}>
                                        <CardContent>
                                            <Typography variant='h5'>Invoices</Typography>
                                            <Typography variant='body1'>
                                                Total Invoices generated : <Typography variant='h6' component='span' color='primary'>{(props.invoices) ? props.invoices.length : 0}</Typography>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card style={{ minWidth: '33%' }} elevation={3} className={classes.card}>
                                        <CardContent>
                                            <Typography variant='h5'>Items</Typography>
                                            <Typography variant='body1'>
                                                Total item in inventory : <Typography variant='h6' component='span' color='primary'>{(props.items) ? props.items.length : 0}</Typography>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card style={{ minWidth: '33%' }} elevation={3} className={classes.card}>
                                        <CardContent>
                                            <Typography variant='h5'>Trader</Typography>
                                            <Typography variant='body1'>
                                                Trader registered : <Typography variant='h6' component='span' color='primary'>{(props.trader) ? props.trader.name : ''}</Typography>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card style={{ minWidth: '33%' }} elevation={3} className={classes.card}>
                                        <CardContent>
                                            <Typography variant='h5'>Unit of measurements</Typography>
                                            <Typography variant='body1'>
                                                Total registered unit of measurements : <Typography variant='h6' component='span' color='primary'>{(props.unitOfMeasurements) ? props.unitOfMeasurements.length : 0}</Typography>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}
