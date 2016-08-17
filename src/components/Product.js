import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, Dimensions, WebView } from 'react-native';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../actions';
import { Actions } from 'react-native-router-flux';
import { IIKO_RESTARAUNT_ID, KB_ORANGE } from '../constants';
import { Button, Icon } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class Product extends Component {

  constructor(props) {
    super(props);
    var product = props.products.find((p) => p.id == this.props.product.id);
    this.state = {
      webViewHeight: 100,
      cartCount: product ? product.count : 0
    };
  }

  componentWillReceiveProps(nextProps) {
    var product = nextProps.products.find((p) => p.id == this.props.product.id);
    this.setState({cartCount: product ? product.count : 0});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.image}
          resizeMode={Image.resizeMode.contain}
          source={{ uri: `http://deliverywiget.iiko.ru/Content/User/${IIKO_RESTARAUNT_ID}/${this.props.product.imageId}_Large_.png`}}/>
        <Text style={styles.price}>{this.props.product.price} руб.</Text>
        <View style={styles.controls}>
          <View/>
            <Button
              style={styles.buttonAdd}
              onPress={() => this.props.dispatch(addToCart(this.props.product))}
            >
              <Icon name="md-add"/>
            </Button>
            <Text style={{ paddingTop:10, fontSize:17 }}>В корзине: {this.state.cartCount}</Text>
            <Button
              style={styles.buttonRemove}
              onPress={() => this.props.dispatch(removeFromCart(this.props.product))}
            >
              <Icon name="md-remove" style={{color:'black'}}/>
            </Button>
          <View/>
        </View>
        <WebView
          style={{height: this.state.webViewHeight}}
          injectedJavaScript="document.body.scrollHeight;"
          scrollEnabled={false}
          onNavigationStateChange={(event) => this.setState({webViewHeight: parseInt(event.jsEvaluationValue)})}
          source={{html: `<html><body style="font-family: HelveticaNeue, san-serif">${this.props.product.description.replace(/(\n<br>)+/g, '<br/>').replace(/img\ssrc/g, 'img style="max-width:100%; margin-top:5px;" src')}</body></html>`}}/>
      </ScrollView>
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
    height: width*.5
  },
  price: {
    textAlign: 'center',
    fontSize: 19,
  },
  controls: {
    padding: 10,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  buttonAdd: {
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: KB_ORANGE,
  },
  buttonRemove: {
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: 'aliceblue'
  }
});

export default connect((state) => ({
  products: state.cart.products
}))(Product);
