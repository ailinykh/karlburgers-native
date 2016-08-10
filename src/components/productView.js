import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, Dimensions, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { IIKO_RESTARAUNT_ID, KB_ORANGE } from '../constants';
import { Button, Icon } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class ProductView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      webViewHeight: 100
    };
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
          <Button style={styles.buttonAdd}><Icon name="md-add"/></Button>
          <Text style={{ paddingTop:10, fontSize:17 }}>В корзине: 10</Text>
          <Button style={styles.buttonRemove}><Icon name="md-remove" style={{color:'black'}}/></Button>
          <View/>
        </View>
        <WebView
          style={{height: this.state.webViewHeight}}
          injectedJavaScript="document.body.scrollHeight;"
          scrollEnabled={false}
          onNavigationStateChange={this._updateWebViewHeight.bind(this)}
          source={{html: `<html><body style="font-family: HelveticaNeue, san-serif">${this.props.product.description.replace(/(\n<br>)+/g, '<br/>').replace(/img\ssrc/g, 'img style="max-width:100%; margin-top:5px;" src')}</body></html>`}}/>
      </ScrollView>
    );
  }

  _updateWebViewHeight(event) {
    console.log('Set webViewHeight:'+event.jsEvaluationValue);
    this.setState({webViewHeight: parseInt(event.jsEvaluationValue)})
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
