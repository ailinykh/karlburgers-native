import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { IIKO_RESTARAUNT_ID, KB_ORANGE } from '../constants';

export default class ShopItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => Actions.product({product: this.props.product, title: this.props.product.name})} style={styles.item} underlayColor='whitesmoke'>
        <View>
          <Image style={styles.image}
            resizeMode={Image.resizeMode.contain}
            defaultSource={require('../images/kb-placeholder.png')}
            source={{uri: `http://deliverywiget.iiko.ru/Content/User/${IIKO_RESTARAUNT_ID}/${this.props.product.imageId}_Medium_.png`}}
          />
          <View style={styles.orderContainer}>
            <Text style={styles.priceContainer}>
              <Text style={styles.price}>{this.props.product.price}</Text> руб.
            </Text>
            <TouchableOpacity onPress={() => this.props.addToCartAction(this.props.product)}>
              <Text style={styles.cartContainer}>
                <Icon name="ios-cart-outline" size={19} style={styles.cartButton}/> {this.props.cartCount}
              </Text>
            </TouchableOpacity>
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
}

var width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#CCC',
    padding: 10,
    width: width*.5,
    height: width > 320 ? width*.87 : width*.94,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    height: width*.4
  },
  orderContainer: {
    padding: width > 320 ? 10 : 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'aqua'
  },
  priceContainer: {
    fontSize: 17,
    // backgroundColor: 'burlywood',
  },
  cartContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'right',
    color: KB_ORANGE,
    fontSize: 19,
    // backgroundColor: 'beige',
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
