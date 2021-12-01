import React from "react";
import { AppBar, Toolbar, Menu, makeStyles, Typography } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const createStyles = makeStyles((theme) => {
    return ({
        appBarSpacer: theme.mixins.toolbar,
        appBarHeading: {
            flexGrow: 1
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 100
        },
    })
}
)
function Appbar(props) {
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const showMenu = (ev) => {
        setMenuAnchor(ev.currentTarget);
    }

    const classes = createStyles();
    const closeMenu = () => { setMenuAnchor(null) }
    return (
        <div>
            <AppBar position='fixed' className={classes.appBar} >
                <Toolbar >
                    <IconButton color='inherit' onClick={props.toggleDrawer}><MenuIcon /></IconButton>
                    <Typography variant='h6' component='div' className={classes.appBarHeading}>TMDebtors Accounting</Typography>
                    <IconButton color='inherit' onClick={showMenu}><AccountCircleIcon /></IconButton>
                    <Menu keepMounted anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}  disablePortal>
                        <MenuItem component={Link} to='/settings/trader' onClick={()=>{props.setTabToTrader();closeMenu();}} selected={props.tabSelected == 'trader'}>
                            <SettingsIcon fontSize='small' />
                            <Typography variant='caption'>Settings</Typography>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <div className={classes.appBarSpacer} />
        </div>
    )
}
export default Appbar;