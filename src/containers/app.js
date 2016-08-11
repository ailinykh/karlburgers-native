import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { Actions, Scene, Router, NavBar } from 'react-native-router-flux';
import ProductList from './productList';
import SideMenu from './sideMenu';
import ProductView from '../components/productView';

const store = configureStore();

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Router>
          <Scene key="root" leftTitle="SideMenu" onLeft={() => Actions.drawer()}>
            <Scene key="productList" component={ProductList} title="Меню" initial="true"/>
            <Scene key="productView" component={ProductView} title="Бургер"/>
            <Scene key="drawer" component={SideMenu} hideNavBar="true"/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
