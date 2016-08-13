import React, { Component } from 'react';
import { StyleSheet, ScrollView, MapView, View, Text, TouchableOpacity, Linking } from 'react-native';
import { Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import { KB_ORANGE } from '../constants';

export default class Cart extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>I AM A CART!</Text>
        <Text>I AM A CART!</Text>
        <Text>I AM A CART!</Text>
        <Text>I AM A CART!</Text>
        <Text>I AM A CART!</Text>
        <Text>I AM A CART!</Text>
        <Text>I AM A CART!</Text>
        <Text>I AM A CART!</Text>
        <Text>I AM A CART!</Text>
        <Text>I AM A CART!</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
  },
});
