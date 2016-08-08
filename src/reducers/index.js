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

const rootReducer = combineReducers({
  products
});

export default rootReducer;
