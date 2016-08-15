import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, ListView, View, Text, Image, Dimensions, TouchableHighlight } from 'react-native';
import { addToCart, removeFromCart } from '../actions';
import t from 'tcomb-form-native';
import { IIKO_RESTARAUNT_ID, KB_ORANGE } from '../constants';

var Form = t.form.Form;

var Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean        // a boolean
});

var options = {};

export default class Order extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>ORDER IS HERE!!!</Text>
        <Form
          ref="form"
          type={Person}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
  },
});

export default connect((state) => ({
}))(Order);
