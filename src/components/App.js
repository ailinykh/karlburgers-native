import React, { Component, PropTypes } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import { Icon } from 'native-base';

import configureStore from '../store/configureStore';

import NavigationDrawer from './NavigationDrawer';
import Shop from './Shop';
import Product from './Product';
import About from './About';
import Cart from './Cart';
import Order from './Order';
import OrderPreview from './OrderPreview';

const store = configureStore();

export default class App extends Component {

  render() {
    return(
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene
              key="orderPreview"
              component={OrderPreview}
              title="Отправить заказ"/>
            <Scene
              key="drawer"
              component={NavigationDrawer}
              initial
              >
              <Scene key="main" tabs tabBarHidden>
                <Scene
                  key="shop"
                  component={Shop}
                  title="Меню"/>
                <Scene
                  key="about"
                  component={About}
                  title="Как нас найти"/>
              </Scene>
            </Scene>
            <Scene
              key="product"
              component={Product}
              title="Бургер"/>
            <Scene
              key="cart"
              component={Cart}
              title="Корзина"/>
            <Scene
              key="order"
              component={Order}
              title="Заказ"/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
