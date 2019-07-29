import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false});
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_BURGER_SUCCES:
            const newOrder = updateObject(action.orderData, {id: action.orderId});
            return updateObject(state, {
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {loading: false});
        case actionTypes.FETCHED_ORDERS_START:
            return updateObject(state, {loading: true});
        case actionTypes.FETCHED_ORDERS_SUCCES:
            return updateObject(state, {orders: action.orders, loading: false});
        case actionTypes.FETCHED_ORDERS_FAIL:
            return updateObject(state, {loading: false});
        default:
            return state;
    }
};

export default reducer;