import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { IIKO_RESTARAUNT_ID } from '../constants';

export default class ProductView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image}
          resizeMode={Image.resizeMode.contain}
          source={{uri: `http://deliverywiget.iiko.ru/Content/User/${IIKO_RESTARAUNT_ID}/${this.props.product.imageId}_Large_.png`}}
        />
        <Text style={styles.title}>
          Hi! I am product
        </Text>
      </View>
    );
  }
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    flex: 1
  },
  image: {
    height: width*.7
  }
});
