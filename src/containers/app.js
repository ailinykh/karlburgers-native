import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { Actions, Scene, Router, Reducer } from 'react-native-router-flux';
import ProductList from './productList';
import ProductView from '../components/productView';
import NavigationDrawer from '../components/NavigationDrawer';

const store = configureStore();

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Router createReducer={reducerCreate}>
          <Scene key="root">
            <Scene key="drawer" component={NavigationDrawer}>
              <Scene key="main" drawerImage={require("../images/navicon.png")}>
                <Scene key="productList" component={ProductList} title="Меню" initial="true"/>
                <Scene key="productView" component={ProductView} title="Бургер"/>
              </Scene>
            </Scene>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
