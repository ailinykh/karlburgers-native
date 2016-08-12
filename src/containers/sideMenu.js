import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KB_ORANGE } from '../constants';

export default class SideMenu extends Component {

  render() {
    return (
      <ScrollView style={styles.container} scrollsToTop={false}>
        <View style={styles.separator}/>
        <Text style={styles.row}>МЕНЮ</Text>
        <View style={styles.separator}/>
        <Text style={styles.row}>КАК НАС НАЙТИ</Text>
        <View style={styles.separator}/>
        <View style={{padding: 15, flexDirection:'row'}}>
          <Icon name='vk' size={25} color='white'/>
          <Icon name='instagram' size={25} color='white' style={{paddingLeft: 25}}/>
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
}

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
