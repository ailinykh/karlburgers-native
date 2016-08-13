import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';

import configureStore from '../store/configureStore';

import NavigationDrawer from './NavigationDrawer';
import Shop from './Shop';
import Product from './Product';
import About from './About';
import Cart from './Cart';

const store = configureStore();

export default class App extends Component {

  render() {
    return(
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene
              key="drawer"
              component={NavigationDrawer}
              drawerImage={require("../images/navicon.png")}
              >
              <Scene key="main" tabs tabBarHidden>
                <Scene
                  key="shop"
                  drawerImage={require("../images/navicon.png")}
                  component={Shop}
                  title="Меню"
                  initial/>
                <Scene
                  key="about"
                  drawerImage={require("../images/navicon.png")}
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
          </Scene>
        </Router>
      </Provider>
    );
  }
}

// export default connect((state) => ({
//   cartProducts: state.cart.products
// }))(App);
