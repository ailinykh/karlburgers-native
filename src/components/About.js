import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Linking, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from './NavigationBar';
import { KB_PHONE_NUMBER, KB_FULL_PHONE_NUMBER } from '../constants';

export default class About extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{latitude: 52.961597, longitude: 36.064426, latitudeDelta: 0.002, longitudeDelta: 0.002}}
          >
          <MapView.Marker
            coordinate={{latitude: 52.961597, longitude: 36.064426}}
            title='Бургерная Карл Маркс'
            description='Карачевская 12/3'
          />
        </MapView>
        <Card style={{margin:15}}>
          <CardItem style={styles.card}>
            <Icon name="ios-home" size={21}/><Text style={styles.cardText}>Ежедневно (11:30 - 22:30)</Text>
          </CardItem>
          <CardItem style={styles.card} onPress={this._openPhone}>
            <Icon name="md-call" size={23}/><Text style={styles.cardTextHighlited}>+7 (4862) {KB_PHONE_NUMBER}</Text>
          </CardItem>
          <CardItem style={styles.card} onPress={this._openMap}>
            <Icon name="md-pin" size={25}/><Text style={styles.cardTextHighlited}>Карачевская 12/3</Text>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }

  _openPhone() {
    Linking.openURL(`tel://${KB_FULL_PHONE_NUMBER}`).catch(err => console.error('An error occurred', err));
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
  map: {
    height: 250,
    width: Dimensions.get('window').width,
    marginBottom: 15,
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
