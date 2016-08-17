import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { IIKO_RESTARAUNT_ID, KB_ORANGE } from '../constants';
import { Button, Icon, List, ListItem } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import _ from 'lodash';

export default class OrderPreview extends Component {

  constructor(props) {
    super(props);
    this._onButtonPress = this._onButtonPress.bind(this);
  }

  render() {
    const { order } = this.props;
    console.log(order);
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

          { order.note ?
              <ListItem>
                <View>
                  <Text>Примечание</Text>
                  <Text style={styles.info}>{order.note}</Text>
                </View>
              </ListItem>
            : null
          }
        </List>

        <Button
          block
          style={{margin: 25}}
          onPress={this._onButtonPress}>
          Отправить
        </Button>
      </ScrollView>
    );
  }

  _onButtonPress() {
    const { order } = this.props;
    console.log('ORDER SENT!');
    this._saveOrderToHistory(order);
  }

  _saveOrderToHistory(order) {
    AsyncStorage.getItem('OrderHistory', (err, result) => {
      var orders = [];
      if (result) {
        orders = JSON.parse(result).filter((o) => !_.isEqual(order.products, o.products));
      }
      orders.unshift(order);
      AsyncStorage.setItem('OrderHistory', JSON.stringify(orders));
      console.log(orders);
    })
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
