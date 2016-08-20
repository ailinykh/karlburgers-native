import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Platform, Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import { addOrderToHistory, flushCart } from '../actions';
import { Actions, ActionConst } from 'react-native-router-flux';
import { IIKO_RESTARAUNT_ID, KB_ORANGE_DARK, KB_PHONE_NUMBER, KB_FULL_PHONE_NUMBER } from '../constants';
import { Button, Icon, List, ListItem, Spinner } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import _ from 'lodash';

export default class OrderPreview extends Component {

  state = {
    isLoading: false
  }

  render() {
    const { order } = this.props;
    return (
      <ScrollView style={styles.container}>
        <List>
          <ListItem itemDivider>
            <Text>Заказ</Text>
          </ListItem>
          { order.products.map((product) =>
            <ListItem key={product.id}>
              <View style={styles.listItem}>
                <Text>{product.name}</Text>
                <Text style={styles.info}>{product.count}</Text>
              </View>
            </ListItem>)}
          <ListItem>
            <Text style={{fontWeight: 'bold'}}>Всего: {order.products.reduce((sum, p) => sum+p.count*p.price, 0)} руб.</Text>
          </ListItem>

          <Text> </Text>

          <ListItem itemDivider>
            <Text>Данные</Text>
          </ListItem>
          <ListItem>
            <View style={styles.listItem}>
              <Text>Имя</Text>
              <Text style={styles.info}>{order.name}</Text>
            </View>
          </ListItem>
          <ListItem>
            <View style={styles.listItem}>
              <Text>Телефон</Text>
              <Text style={styles.info}>{order.phone}</Text>
            </View>
          </ListItem>

          { order.orderType == 'address' ?
              <ListItem>
                <View style={styles.listItem}>
                  <Text>Адрес</Text>
                  <Text style={styles.info}>{order.street}, {order.home}</Text>
                </View>
              </ListItem>
            : null
          }

          { order.comment ?
              <ListItem>
                <View>
                  <Text>Примечание</Text>
                  <Text style={styles.info}>{order.comment}</Text>
                </View>
              </ListItem>
            : null
          }
        </List>
        { this.state.isLoading ?
          <Spinner color="orange" />
          :
          <Button
            block
            style={{margin: 25, backgroundColor: KB_ORANGE_DARK}}
            onPress={() => this._sendOrder(order)}>
            Отправить
          </Button>
        }
      </ScrollView>
    );
  }

  _sendOrder(order) {
    this.setState({isLoading: true})
    fetch(`http://deliverywiget.iiko.ru/Orders/AddOrder/${IIKO_RESTARAUNT_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `json=${encodeURIComponent(JSON.stringify(this._getJSON(order)))}&lang=ru`
    }).then((response) => {
      this.setState({isLoading: false})
      if (response.status == 200) {
        this.props.dispatch(addOrderToHistory(order));
        this.props.dispatch(flushCart());
        Alert.alert('Заказ оформлен!', 'Мы свяжемся с вами в ближайшее время', [
          {text: 'Ок', onPress: () => Actions.drawer({type: ActionConst.PUSH_OR_POP})}
        ])
      } else {
        Alert.alert('Упс! Что-то пошло не так', 'Не удается передать заказ на сервер, однако, Вы можете позвонить нам и сообщить о заказе по телефону!', [
          {text: `Позвонить ${KB_PHONE_NUMBER}`, onPress: () => Linking.openURL(`tel://${KB_FULL_PHONE_NUMBER}`).catch(err => console.error('An error occurred', err))},
          {text: 'Ок'}
        ])
      }
    })
    .catch((error) => {
      this.setState({isLoading: false})
      Alert.alert('Ошибка!', 'Не удалось отправить запрос. Попробуйте повторить запрос чуть позже');
      console.error(error);
    });
  }

  _getJSON(order) {
    var deviceInfo = 'Отправлено из приложения для '+(Platform.OS == 'ios' ? 'iPhone' : 'Android');
    var json = {
      restaraunt: IIKO_RESTARAUNT_ID,
      order: {
        id: this._guid(),
        phone: '+7'+order.phone.replace(/\D/g, '').slice(-10),
        orderType: order.orderType,
        address: {
          street: order.street || '',
          streetClassifierId: order.streetClassifierId || null,
          home: order.home || '',
          city: "Орел",
          cityId: "5700000100000"
        },
        date: null,
        items: order.products.map(p => ({
          id: p.id,
          name: p.name,
          code: p.code,
          amount: p.count,
          category: p.category,
          modifiers: []
        })),
        paymentItems: order.paymentType == 'card' ? [{
          paymentType: {
            id: '692b19c9-735e-0558-bc8e-7db97f1bed79',
            code: 'CARD',
            name: 'Банковская карта',
            comment: '',
            combinable: false
          },
          sum: order.products.reduce((sum, p) => sum+p.count*p.price, 0)
        }] : null,
        isSelfService: order.orderType == 'self',
        personsCount: 0,
        comment: order.comment ? [order.comment, '=========', deviceInfo].join("\n") : deviceInfo
      },
      customer: {
        id: null,
        phone: '+7'+order.phone.replace(/\D/g, '').slice(-10),
        name: order.name
      }
    }
    if (order.orderType == 'self') {
      json.deliveryTerminalId = '1812d21f-f1e9-8999-0153-4dc2af5a823e';
    }
    return json;
  }

  _guid() {
    var s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    flex: 1
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
    color: 'gray',
  },
});

export default connect((state) => ({
}))(OrderPreview);
