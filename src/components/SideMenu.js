import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Linking } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchOrderToHistory } from '../actions';
import { KB_ORANGE, KB_ORANGE_DARK, KB_VK_URL, KB_VK_IN_APP_URL, KB_INSTAGRAM_URL, KB_INSTAGRAM_IN_APP_URL } from '../constants';

export class SideMenu extends Component {

  constructor(props, context) {
    super(props, context);
    this.drawer = context.drawer;

    this.props.dispatch(fetchOrderToHistory());
  }

  render() {
    return (
      <ScrollView style={styles.container} scrollsToTop={false}>
        <View style={styles.separator}/>
        <TouchableHighlight onPress={() => {this.drawer.close(); Actions.shop();}} underlayColor={KB_ORANGE_DARK}>
          <Text style={styles.row}>МЕНЮ</Text>
        </TouchableHighlight>
        <View style={styles.separator}/>
        <TouchableHighlight onPress={() => {this.drawer.close(); Actions.about();}} underlayColor={KB_ORANGE_DARK}>
          <Text style={styles.row}>КАК НАС НАЙТИ</Text>
        </TouchableHighlight>
        <View style={styles.separator}/>
        <View style={{padding: 15, flexDirection:'row'}}>
          <TouchableOpacity onPress={this._openVK}>
            <Icon name='vk' size={25} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._openInstagram}>
            <Icon name='instagram' size={25} color='white' style={{paddingLeft: 25}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.separator}/>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Последние заказы</Text>
        </View>
        {
          this.props.orders && this.props.orders.length > 0 ?
            this.props.orders.map((order, i) =>
              <View key={i}>
                <View style={styles.separator}/>
                <TouchableHighlight onPress={() => {this.drawer.close(); setTimeout(() => Actions.orderPreview({order, title: 'Повторный заказ'}), 500)}} underlayColor={KB_ORANGE_DARK}>
                  <Text
                    style={styles.row}>
                    {order.products.map((p) => p.name).join(', ')}
                  </Text>
                </TouchableHighlight>
            </View>
            )
          : <Text style={styles.row}>Нет заказов</Text>
        }
        <View style={styles.separator}/>
      </ScrollView>
    );
  }

  _openVK() {
    // http://handleopenurl.com/scheme/vk
    Linking.canOpenURL(KB_VK_IN_APP_URL).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: '+KB_VK_IN_APP_URL);
        return Linking.openURL(KB_VK_URL);
      } else {
        return Linking.openURL(KB_VK_IN_APP_URL);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  _openInstagram() {
    Linking.canOpenURL(KB_INSTAGRAM_IN_APP_URL).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: '+KB_INSTAGRAM_IN_APP_URL);
        return Linking.openURL(KB_INSTAGRAM_URL);
      } else {
        return Linking.openURL(KB_INSTAGRAM_IN_APP_URL);
      }
    }).catch(err => console.error('An error occurred', err));
  }
}

SideMenu.contextTypes = {
  drawer: React.PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: KB_ORANGE,
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: 'white',
    opacity:.4
  },
  row: {
    color: 'white',
    padding: 15,
  },
  headerContainer: {
    backgroundColor:'#fccfb0',
    marginTop:15,
  },
  header: {
    padding:10,
    paddingLeft:15,
  }
});

export default connect((state) => ({
  orders: state.orderHistory.orders
}))(SideMenu);
