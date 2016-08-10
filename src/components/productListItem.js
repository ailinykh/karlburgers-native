import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { IIKO_RESTARAUNT_ID } from '../constants';

export default class ProductListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this._onPressButton.bind(this)} style={styles.item} underlayColor='whitesmoke'>
        <View>
          <Image style={styles.image}
            resizeMode={Image.resizeMode.contain}
            source={{uri: `http://deliverywiget.iiko.ru/Content/User/${IIKO_RESTARAUNT_ID}/${this.props.product.imageId}_Medium_.png`}}
          />
          <Text style={styles.title}>
            {this.props.product.name}
          </Text>
          <Text style={styles.description}>
            {this.props.product.description.replace(/<br>/, '\n').split('\n')[0]}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onPressButton() {
    Actions.productView({product: this.props.product, title: this.props.product.name});
  }
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#CCC',
    padding: 10,
    width: width*.5,
    height: width*.8
  },
  image: {
    height: width*.4
  },
  title: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    textAlign: 'center'
  },
  description: {
    textAlign: 'center'
  }
});
