import React, { Component } from 'react';
import { StyleSheet, ScrollView, MapView, View, Text, TouchableOpacity, Linking } from 'react-native';
import { Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from './NavigationBar';

import { KB_ORANGE } from '../constants';

export default class About extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <MapView
          style={{height: 250}}
          region={{latitude: 52.961597, longitude: 36.064426, latitudeDelta: 0.002, longitudeDelta: 0.002}}
          annotations={[{latitude: 52.961597, longitude: 36.064426}]}
          />
        <Card style={{margin:15}}>
          <CardItem style={styles.card}>
            <Icon name="ios-home" size={21}/><Text style={styles.cardText}>Ежедневно (11:30 - 22:30)</Text>
          </CardItem>
          <TouchableOpacity onPress={this._openPhone}>
            <CardItem style={styles.card}>
              <Icon name="md-call" size={23}/><Text style={styles.cardTextHighlited}>+7 (4862) 44-53-69</Text>
            </CardItem>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._openMap}>
            <CardItem style={styles.card}>
              <Icon name="md-pin" size={25}/><Text style={styles.cardTextHighlited}>Карачевская 12/3</Text>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }

  _openPhone() {
    Linking.openURL('tel://+74862445369').catch(err => console.error('An error occurred', err));
  }

  _openMap() {
    Linking.openURL('http://maps.apple.com/maps?ll=52.961597,36.064426&z=19&q=Бургерная Карл Маркс').catch(err => console.error('An error occurred', err));
  }

  static renderNavigationBar(props) {
    return <NavigationBar {...props} />
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
  },
  card: {
    padding: 15,
    flexDirection:'row',
  },
  cardText: {
    paddingTop: 4,
    paddingLeft: 15
  },
  cardTextHighlited: {
    paddingTop: 4,
    paddingLeft: 15,
    color: 'royalblue',
  }
});
