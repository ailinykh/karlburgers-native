import { IIKO_RESTARAUNT_ID } from '../constants';
import { AsyncStorage } from 'react-native';

export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS";
export const RECEIVE_PRODUCTS= "RECEIVE_PRODUCTS";

export const requestProducts = (): Object => {
  return {
    type: REQUEST_PRODUCTS
  };
};

export const receiveProducts = (data: Object): Object => {
  return {
    type: RECEIVE_PRODUCTS,
    data
  };
};

var REQUEST_URL = `http://deliverywiget.iiko.ru/Nomenclature/Nomenclature/${IIKO_RESTARAUNT_ID}?lang=ru`;

export const fetchProducts = (): Function => {
  return (dispatch) => {
    dispatch(requestProducts());
    return fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        // setTimeout(() => dispatch(receiveProducts(responseJson)), 1000);
        dispatch(receiveProducts(responseJson));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (product: Object): Object => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const removeFromCart = (product: Object): Object => {
  return {
    type: REMOVE_FROM_CART,
    product
  }
}

export const REQUEST_ORDER_HISTORY = "REQUEST_ORDER_HISTORY";
export const RECEIVE_ORDER_HISTORY= "RECEIVE_ORDER_HISTORY";
export const ADD_ORDER_TO_HISTORY= "ADD_ORDER_TO_HISTORY";

export const requestOrderHistory = (): Object => {
  return {
    type: REQUEST_ORDER_HISTORY
  };
};

export const receiveOrderHistory = (data: Object): Object => {
  return {
    type: RECEIVE_ORDER_HISTORY,
    data
  };
};

export const addOrderToHistory = (data: Object): Object => {
  return {
    type: ADD_ORDER_TO_HISTORY,
    data
  };
};

export const fetchOrderToHistory = (): Function => {
  return (dispatch) => {
    dispatch(requestOrderHistory());
    return AsyncStorage.getItem('OrderHistory', (err, result) => {
      dispatch(receiveOrderHistory(result ? JSON.parse(result) : []));
    })
  };
};
