import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, Dimensions, WebView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { IIKO_RESTARAUNT_ID, KB_ORANGE } from '../constants';
import { Button, Icon } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class OrderPreview extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.order);
    return (
      <ScrollView style={styles.container}>
        <Text>transparent</Text>
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
});

export default connect((state) => ({
}))(OrderPreview);
