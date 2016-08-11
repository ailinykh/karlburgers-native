import React, { Component } from 'react';
import { StyleSheet, ListView, RefreshControl, View, Text, Image } from 'react-native';
import { Drawer } from 'native-base';

export default class SideMenu extends Component {



  render() {
    return (
      <Drawer
        // ref="navigation"
        // open={navigationState.open}
        // onOpen={()=>Actions.refresh({key:navigationState.key, open: true})}
        // onClose={()=>Actions.refresh({key:navigationState.key, open: false})}
        // type="displace"
        // content={<DrawerContent />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
      >
        <Text>Side Menu</Text>
        <Text>Side Menu</Text>
        <Text>Side Menu</Text>
        <Text>Side Menu</Text>
        <Text>Side Menu</Text>
        <Text>Side Menu</Text>
        <Text>Side Menu</Text>
        <Text>Side Menu</Text>
        <Text>Side Menu</Text>
        <Text>Side Menu</Text>
      </Drawer>
    );
  }


}
