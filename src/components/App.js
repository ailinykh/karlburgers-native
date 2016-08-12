import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { Scene, Router } from 'react-native-router-flux';

import NavigationDrawer from './NavigationDrawer';
import ProductList from './ProductList';
import ProductView from './ProductView';
import About from './About';

const store = configureStore();

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="drawer" component={NavigationDrawer} drawerImage={require("../images/navicon.png")}>
              <Scene key="main" tabs tabBarHidden>
                <Scene
                  key="productList"
                  drawerImage={require("../images/navicon.png")}
                  component={ProductList}
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
              key="productView"
              component={ProductView}
              title="Бургер"/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
