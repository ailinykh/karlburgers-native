import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavBar, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigationBar extends NavBar {
  renderRightButton(props) {
    var count = this.props.cartProducts.reduce((sum, p) => { return sum + p.count}, 0);
    return (
      count > 0 ?
        <TouchableOpacity
          onPress={()=>Actions.cart()}
          style={{ width: 44, height: 30, right: 5, top: 20, position: 'absolute'}}>
          <View style={{flexDirection:'row', paddingTop: 10}}>
            <Icon name="ios-cart" size={21} style={{paddingTop: 2}}/>
            <Text style={{fontSize: 19, paddingLeft: 5}}>{count}</Text>
          </View>
        </TouchableOpacity>
      : null
    );
  }
}

export default connect((state) => ({
  cartProducts: state.cart.products
}))(NavigationBar);
