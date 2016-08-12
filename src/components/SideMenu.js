import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableHighlight, TouchableOpacity, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { KB_ORANGE, KB_ORANGE_DARK } from '../constants';

export default class SideMenu extends Component {

  constructor(props, context) {
    super(props, context);
    this.drawer = context.drawer;
  }

  render() {
    return (
      <ScrollView style={styles.container} scrollsToTop={false}>
        <View style={styles.separator}/>
        <TouchableHighlight onPress={() => {this.drawer.close(); Actions.productList();}} underlayColor={KB_ORANGE_DARK}>
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
        <Text style={styles.row}>Нет заказов</Text>
        <View style={styles.separator}/>
      </ScrollView>
    );
  }

  _openVK() {
    // Linking.openURL('https://vk.com/karl_burgers').catch(err => console.error('An error occurred', err));
    Linking.canOpenURL('vk://vk.com/karl_burgers').then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: vk:karl_burgers');
        return Linking.openURL('https://vk.com/karl_burgers');
      } else {
        return Linking.openURL('vk://vk.com/karl_burgers');
      }
    }).catch(err => console.error('An error occurred', err));
  }

  _openInstagram() {
    Linking.canOpenURL('instagram://user?username=karl_burgers').then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: instagram://user?username=karl_burgers');
        return Linking.openURL('https://instagram.com/karl_burgers');
      } else {
        return Linking.openURL('instagram://user?username=karl_burgers');
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