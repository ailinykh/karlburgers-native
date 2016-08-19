import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, ListView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { Button } from 'native-base';
import { addToCart, removeFromCart } from '../actions';
import { IIKO_RESTARAUNT_ID, KB_ORANGE_DARK } from '../constants';

export default class Cart extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {ds};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this._renderList()}
      </ScrollView>
    );
  }

  _renderList() {
    var sum = this.props.products.reduce((sum, p) => {return sum + p.count*p.price}, 0);
    var buttonText = `Оформить заказ (${sum} руб.)`
    return(
      this.props.products.length > 0 ?
        <View>
          <ListView
            dataSource={this.state.ds.cloneWithRows(this.props.products)}
            renderRow={product => this._renderCartItem(product)}
          />
          <Button
            block
            style={{margin: 25, backgroundColor: KB_ORANGE_DARK}}
            onPress={() => Actions.order()}>
            {buttonText}
          </Button>
        </View>
      :
        <Text style={styles.empty}>Корзина пуста</Text>
    );
  }

  _renderCartItem(product) {
    return (
      <View style={styles.item}>
        <Image style={styles.image}
          resizeMode={Image.resizeMode.contain}
          source={{uri: `http://deliverywiget.iiko.ru/Content/User/${IIKO_RESTARAUNT_ID}/${product.imageId}_Medium_.png`}}
        />
        <View style={styles.text}>
          <Text style={styles.title}>
            {product.name}
          </Text>
          <Text style={styles.description}>
            {product.description.replace(/<br>/, '\n').split('\n')[0]}
          </Text>
        </View>
        <View style={styles.controls}>
          <Button
            transparent
            block
            style={styles.button}
            onPress={() => this.props.dispatch(addToCart(product))}>
            <Icon name="ios-add-circle-outline" size={23}/>
          </Button>
          <Text style={styles.count}>{product.count}</Text>
          <Button
            transparent
            block
            style={styles.button}
            onPress={() => this.props.dispatch(removeFromCart(product))}>
            <Icon name="ios-remove-circle-outline" size={23}/>
          </Button>
        </View>
      </View>
    );
  }
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // backgroundColor: 'aqua'
  },
  image: {
    width: width*.25,
    height: width*.25,
    // backgroundColor: 'burlywood',
  },
  text: {
    width: width*.6,
    // backgroundColor: 'beige',
  },
  title: {
    fontSize: 21,
    paddingTop: 5,
    paddingBottom: 5,
  },
  description: {
    color: 'grey',
  },
  controls: {
    width: width*.15,
  },
  count: {
    textAlign: 'center',
  },
  button: {
  },
  empty: {
    paddingTop: 20,
    fontSize: 19,
    textAlign: 'center',
  }
});

export default connect((state) => ({
  products: state.cart.products
}))(Cart);
