import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { Actions, Scene, Router, DefaultRenderer } from 'react-native-router-flux';
import ProductList from './productList';
import SideMenu from './sideMenu';
import ProductView from '../components/productView';
import { Drawer } from 'native-base';

export default class extends Component {
  render(){
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref="navigation"
        open={state.open}
        onOpen={()=>Actions.refresh({key:state.key, open: true})}
        onClose={()=>Actions.refresh({key:state.key, open: false})}
        type="displace"
        content={<SideMenu />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={(ratio) => ({
         main: { opacity:Math.max(0.54,1-ratio) }
      })}>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}


const store = configureStore();

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Router>
          <Scene key="root" leftTitle="SideMenu" onLeft={() => Actions.refresh({key: 'drawer', open: value => !value })}>
            <Scene key="productList" component={ProductList} title="Меню" initial="true"/>
            <Scene key="productView" component={ProductView} title="Бургер"/>
            <Scene key="drawer" component={Drawer} open={false}>
              <Scene key="sideMenu" component={SideMenu} hideNavBar="true"/>
            </Scene>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
