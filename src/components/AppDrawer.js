import React from 'react'
import { Drawer } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { List,ListItem,ListItemText,ListItemIcon,Collapse } from "@material-ui/core";
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Box'
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import DescriptionIcon from "@material-ui/icons/Description";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import FileCopyIcon from "@material-ui/icons/FileCopy";

export default function AppDrawer(props){
    const selected=props.tabSelected;
    const onDrawerItemClicked=(ev)=>{
        props.setTabSelected(ev.currentTarget.id)
        props.closeDrawerFunction();
    }
    const [reportSectionExpanded,setReportSectionExpanded]=React.useState(selected==="invoiceReportTab" || selected==="outstandingReportTab");
return (
<Drawer open={props.openDrawer} variant='persistent' elevation={4} onClose={props.closeDrawerFunction}> 
    <Toolbar/>
    <Box>
<List>
    <ListItem button id='dashboardTab' component={Link} to='/' selected={selected==='dashboardTab'} onClick={onDrawerItemClicked}> 
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText>Dashboard</ListItemText>
    </ListItem>
    <ListItem button id='itemsTab' component={Link} to='/items'  selected={selected==='itemsTab'} onClick={onDrawerItemClicked}> 
        <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
        <ListItemText>Items</ListItemText>
    </ListItem>
    <ListItem button id='customersTab' component={Link} to='/customers'  selected={selected==="customersTab"} onClick={onDrawerItemClicked}>
        <ListItemIcon><PeopleAltIcon  /></ListItemIcon>
        <ListItemText>Customers</ListItemText>
    </ListItem>
    <ListItem button id='invoicesTab' component={Link} to='/invoices'  selected={selected==="invoicesTab"} onClick={onDrawerItemClicked}>
        <ListItemIcon><DescriptionIcon  /></ListItemIcon>
        <ListItemText>Invoices</ListItemText>
    </ListItem>
    <ListItem button id='receiptsTab' component={Link} to='/receipts'  selected={selected==="receiptsTab"} onClick={onDrawerItemClicked}>
        <ListItemIcon><ReceiptIcon /></ListItemIcon>
        <ListItemText>Receipts</ListItemText>
    </ListItem>
    <ListItem button id='reportsTab' onClick={()=>{setReportSectionExpanded(!reportSectionExpanded);}}>
        <ListItemIcon><FileCopyIcon /></ListItemIcon>
        <ListItemText>Reports</ListItemText>
        {(reportSectionExpanded)?<ExpandLess/>:<ExpandMore/>}
    </ListItem>
    <Collapse in={reportSectionExpanded} timeout="auto" unmountOnExit>
        <List>
        <ListItem button id='invoiceReportTab' component={Link} to='/reports/invoiceReport'  selected={selected==="invoiceReportTab"} onClick={onDrawerItemClicked}>
            <ListItemText>Invoice Report</ListItemText>
        </ListItem>
        <ListItem button id='outstandingReportTab' component={Link} to='/reports/outstandingReport'  selected={selected==="outstandingReportTab"} onClick={onDrawerItemClicked}>
            <ListItemText>Outstanding Report</ListItemText>
        </ListItem>

            </List>
    </Collapse>
</List>
</Box>
</Drawer>
)    
}