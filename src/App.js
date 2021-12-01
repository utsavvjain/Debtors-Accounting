import React from 'react';
import Appbar from './components/Appbar';
import AppDrawer from './components/AppDrawer';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './components/Dashboard';
import Items from './components/Items';
import Customers from './components/Customers';
import Trader from './components/Trader';
import Invoices from './components/invoices';
import Receipt from './components/Receipt';
import InvoiceReport from './components/InvoiceReport';
import OutstandingReport from './components/OutstandingReport';
import SplashScreen from './components/SplashScreen';
function fetchData(dispatch,setFetched,setProgress) {
  setProgress('Fetching inventory items...')
  fetch('/getItems').then((response) => { return response.json() }).then((items) => {
    dispatch({
      type: "INIT_ITEMS",
      payload: items
    })    
    setTimeout(()=>{
      setProgress('Fetching inventory unit of measurements...')
    },1500)
    fetch('/getUnitOfMeasurements').then((response) => { return response.json() }).then((items) => {
      dispatch({
        type: "INIT_UOM",
        payload: items

      })
      setTimeout(()=>{
        setProgress('Fetching customer details...')
      },1500)
      fetch('/getCustomers').then(response => response.json()).then((customers) => {
        dispatch({
          type: "INIT_CUSTOMERS",
          payload: customers
        })
        setTimeout(()=>{
          setProgress('Fetching states...')
        },1500)
        fetch('/getStates').then(response => response.json()).then((states) => {
          dispatch({
            type: "INIT_STATES",
            payload: states
          })
        })
        setTimeout(()=>{
          setProgress('Fetching trader details...')
        },1500)
        fetch('/getTrader').then(response => response.json()).then((trader) => {
          dispatch({
            type: "INIT_TRADER",
            payload: trader
          })
        })
        setTimeout(()=>{
          setProgress('Fetching invoice details...')
        },1500)
        fetch('/getAllInvoices').then(response => response.json()).then((response) => {
          dispatch({
            type: "INIT_INVOICES",
            payload: response.invoices
          })
          setTimeout(()=>{
            setProgress('Configuring application, please wait...')
          },1500)
          setTimeout(()=>{
            setFetched(true)
          },6000)
        })
      })
    })
  })
}

function App(props) {

  const [drawerOpenState, setDrawerOpenState] = React.useState(false)
  const [tabSelected, setTabSelected] = React.useState('dashboardTab')
  const [fetched,setFetched]=React.useState(false)
  const [progress,setProgress]=React.useState('')
  const toggleDrawer = () => {
    setDrawerOpenState(!drawerOpenState);
  }
  const closeDrawer = () => {
    setDrawerOpenState(false)
  }
  React.useEffect(() => {
    fetchData(props.dispatch,setFetched,setProgress)
  }, [])

  if(!fetched) return (
    <SplashScreen progress={progress}/>
  )
else  return (
    <BrowserRouter>
      <Route path='/' render={() => { return (<Appbar toggleDrawer={toggleDrawer} tabSelected={tabSelected} setTabToTrader={() => { setTabSelected('trader') }} />) }} />
      <Route path='/' render={() => { return (<AppDrawer closeDrawerFunction={closeDrawer} openDrawer={drawerOpenState} tabSelected={tabSelected} setTabSelected={setTabSelected} />) }} />
      <Route path='/' exact render={() => { return <Dashboard customers={props.customers} invoices={props.invoices} items={props.items} trader={props.trader} unitOfMeasurements={props.unitOfMeasurements} states={props.states} /> }} />
      <Route path='/items' exact render={() => { return <Items items={props.items} dispatch={props.dispatch} unitOfMeasurements={props.unitOfMeasurements} /> }} />
      <Route path='/customers' exact render={() => { return <Customers dispatch={props.dispatch} customers={props.customers} states={props.states} /> }} />
      <Route path='/settings/trader' exact render={() => { return <Trader dispatch={props.dispatch} states={props.states} trader={props.trader} /> }} />
      <Route path='/invoices' exact render={() => { return <Invoices dispatch={props.dispatch} states={props.states} trader={props.trader} customers={props.customers} items={props.items} invoices={props.invoices} unitOfMeasurements={props.unitOfMeasurements} /> }} />
      <Route path='/receipts' exact render={() => { return <Receipt states={props.states} customers={props.customers} trader={props.trader} /> }} />
      <Route path='/reports/invoiceReport' exact render={() => { return <InvoiceReport invoices={props.invoices} /> }} />
      <Route path='/reports/outstandingReport' exact render={() => { return <OutstandingReport /> }} />
    </BrowserRouter>
  );
}
const stateToPropsMapper = (state) => {
  return {
    items: state.items,
    unitOfMeasurements: state.unitOfMeasurements,
    customers: state.customers,
    states: state.states,
    trader: state.trader,
    invoices: state.invoices
  }
}
export default connect(stateToPropsMapper)(App);
