import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { NavBar, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

export class NavigationBar extends NavBar {

  static contextTypes = {
    drawer: PropTypes.object
  }

  renderLeftButton(props) {
    return(
      <TouchableOpacity onPress={this.context.drawer.toggle} style={styles.leftButton}>
        <View>
          <Icon name="md-menu" size={30} />
        </View>
      </TouchableOpacity>
    );
  }

  renderRightButton(props) {
    var count = this.props.cartProducts.reduce((sum, p) => { return sum + p.count}, 0);
    return (
      count > 0 && props.name == 'shop' ?
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

const styles = StyleSheet.create({
  leftButton: {
    width: 35,
    height: 30,
    left: 10,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 27,
      },
      android: {
        top: 20,
      }
    })
  }
});

export default connect((state) => ({
  cartProducts: state.cart.products
}))(NavigationBar);
