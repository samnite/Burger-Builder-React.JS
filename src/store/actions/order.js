import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSucces = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCES,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSucces(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchedOrdersSucces = (orders) => {
    return {
        type: actionTypes.FETCHED_ORDERS_SUCCES,
        orders: orders
    };
};

export const fetchedOrdersFail = (error) => {
    return {
        type: actionTypes.FETCHED_ORDERS_FAIL,
        error: error
    };
};

export const fetchedOrdersStart = () => {
    return {
        type: actionTypes.FETCHED_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        dispatch(fetchedOrdersStart())
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchedOrdersSucces(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchedOrdersFail(err));
            });
    }
}