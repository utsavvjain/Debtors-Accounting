export default function AccountingReducer(state = {}, action) {
    if (action.type == "INIT_ITEMS") {
        state.items = action.payload;
    }
    if (action.type == "INIT_UOM") {
        state.unitOfMeasurements = action.payload
    }
    if (action.type == "INIT_CUSTOMERS") {
        state.customers = action.payload
    }
    if (action.type == "INIT_STATES") {
        state.states = action.payload
    }
    if (action.type == "INIT_TRADER") {
        state.trader = action.payload
    }
    if (action.type == "INIT_INVOICES") {
        state.invoices = action.payload
    }
    if (action.type == "ADD_UOM") {
        let uom = [...(state.unitOfMeasurements), action.payload]
        state.unitOfMeasurements = uom;
    }
    if (action.type == "ADD_ITEM") {
        let items = [...(state.items), action.payload];
        state.items = items;
    }
    if (action.type == "ADD_CUSTOMER") {
        let customers = [...(state.customers), action.payload];
        state.customers = customers;
    }
    if (action.type == "ADD_INVOICE") {
        let invoices = [...(state.invoices), action.payload];
        state.invoices = invoices;
    }
    if (action.type == 'SAVE_TRADER') {
        state.trader = action.payload
    }
    if (action.type == "UPDATE_ITEM") {
        let items = [...(state.items)];
        items.splice(items.findIndex((item) => { return item.code == action.payload.code }), 1)
        items[items.length - 1] = action.payload;
        state.items = items;
    }
    if (action.type == "UPDATE_CUSTOMER") {
        let customers = [...(state.customers)];
        customers.splice(customers.findIndex((customer) => { return customer.code == action.payload.code }), 1, action.payload)
        state.customers = customers
    }
    if (action.type == "UPDATE_INVOICE") {
        let invoices = [...(state.invoices)];
        invoices.splice(invoices.findIndex((invoice) => { return invoice.code == action.payload.code }), 1, action.payload)
        state.invoices = invoices
    }

    if (action.type == "DELETE_ITEM") {
        let items = [...(state.items)];
        items.splice(items.findIndex((item) => { return item.code == action.payload }), 1)
        state.items = items;
    }
    if (action.type == "DELETE_CUSTOMER") {
        let customers = [...(state.customers)];
        customers.splice(customers.findIndex((customer) => { return customer.code == action.payload.code }), 1)
        state.customers = customers
    }
    if (action.type == "DELETE_INVOICE") {
        let invoices = [...(state.invoices)];
        invoices.splice(invoices.findIndex((invoice) => {return invoice.code == action.payload }),1)
        state.invoices = invoices
    }

    return { ...state };
}