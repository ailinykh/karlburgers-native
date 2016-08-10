import { combineReducers } from 'redux';
import * as types from '../actions';

const products = (state = {
  isFetching: false,
  data: []
}, action) => {
  switch (action.type) {
    case types.REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.RECEIVE_PRODUCTS:
      // sort by group
      var products = [];
      action.data.groups.sort('order').map((group) => {
        products.push(...action.data.products.filter((p) => p.parentGroup == group.id))
      })
      return Object.assign({}, state, {
        isFetching: false,
        data: products
      });
    default:
      return state;
  }
}

const cart = (state = {
  products: []
}, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      var products = [...state.products];
      var product = products.find((p) => p.id == action.product.id);
      if (product == undefined) {
        action.product.count = 1;
        products.push(action.product);
      } else {
        product.count++;
      }
      return {
        ...state,
        products: products
      }
    case types.REMOVE_FROM_CART:
      var products = [...state.products];
      var product = products.find((p) => p.id == action.product.id);
      if (product) {
        if (product.count <= 1) {
          products.splice(products.indexOf(product), 1);
        } else {
          product.count--;
        }
      }
      return {
        ...state,
        products: products
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  products,
  cart,
});

export default rootReducer;
