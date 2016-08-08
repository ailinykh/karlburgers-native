import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { Actions, Scene, Router } from 'react-native-router-flux';
import ProductList from './productList';

const store = configureStore();

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="productList" component={ProductList} title="Меню" initial="true"/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
