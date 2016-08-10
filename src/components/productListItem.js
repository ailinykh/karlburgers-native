import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { IIKO_RESTARAUNT_ID, KB_ORANGE } from '../constants';

export default class ProductListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this._onPressButton.bind(this)} style={styles.item} underlayColor='whitesmoke'>
        <View>
          <Image style={styles.image}
            resizeMode={Image.resizeMode.contain}
            source={{uri: `http://deliverywiget.iiko.ru/Content/User/${IIKO_RESTARAUNT_ID}/${this.props.product.imageId}_Medium_.png`}}
          />
          <View style={styles.orderContainer}>
            <Text style={styles.priceContainer}>
              <Text style={styles.price}>{this.props.product.price}</Text> руб.
            </Text>
            <TouchableHighlight onPress={this._onPressCartButton.bind(this)} underlayColor='white'>
              <Text style={styles.cartContainer}>
                <Icon name="ios-cart-outline" size={19} style={styles.cartButton}/> {this.props.cartCount}
              </Text>
            </TouchableHighlight>
          </View>
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

  _onPressCartButton() {
    this.props.addToCartAction(this.props.product);
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
  orderContainer: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  priceContainer: {
    fontSize: 17,
    flex: .5,
  },
  cartContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: .5,
    textAlign: 'right',
    color: KB_ORANGE,
    fontSize: 19,
    // backgroundColor: 'aqua'
  },
  cartButton: {

  },
  price: {
    fontWeight:'bold',
  },
  title: {
    paddingBottom: 5,
    fontSize: 20,
    textAlign: 'center'
  },
  description: {
    textAlign: 'center'
  }
});
