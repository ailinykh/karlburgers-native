import { IIKO_RESTARAUNT_ID } from '../constants';

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
