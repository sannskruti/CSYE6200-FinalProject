type CommonFieldsModel = {
    createdDate: Date,
    modifiedDate: Date
}

export type CustomerModel = CommonFieldsModel & {
    id: String,
    name: String,
    city: String,
    address: String,
    phoneNumber: String,
    orders: Object
}

export type MedicineListModel = CommonFieldsModel & {
    id: String,
    name: String,
    price: String,
    content: String,
    users: [{
        id: String,
        name: String,
        email: String
    }]
    // time: Date
}

export type OrdersListModel = CommonFieldsModel & {

    orderTotal: number
    quantity: number,
    customers: [{
        address: string,
        city: string,
        name: string,
        phoneNumber: string
    }],
    users: [{
        id: string,
        name: string,
        email: string
    }]
    // time: Date
}

export type CreateOrderType = {
    customerMobileNumber: string,
    medicineName: string,
    quantity: number
}