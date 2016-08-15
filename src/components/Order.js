import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, ListView, View, Text, Image, Dimensions, TouchableHighlight, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button } from 'native-base';
import t from 'tcomb-form-native';
import _ from 'lodash';
import { IIKO_RESTARAUNT_ID, KB_ORANGE } from '../constants';

var Form = t.form.Form;
const stylesheet = _.cloneDeep(t.form.Form.stylesheet)
stylesheet.textbox.normal.height = 100;

var PaymentType = t.enums({
  cash: 'Наличные',
  card: 'Банковская карта'
});

var OrderType = t.enums({
  address: 'Доставка на дом',
  self: 'Забрать из ресторана'
})

var Person = t.struct({
  name: t.String,
  phone: t.Number,
  paymentType: PaymentType,
  orderType: OrderType,
  street: t.maybe(t.String),
  home: t.maybe(t.String),
  note: t.maybe(t.String)
});

export default class Order extends Component {

  constructor(props) {
    super(props);

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onFormChange = this._onFormChange.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);

    var options = {
      fields: {
        name: {
          label: 'Ваше имя',
          error: 'Необходимо указать имя',
          placeholder: 'Фридрих Энгельс',
          returnKeyType: 'next',
          autoCorrect: false,
          autoFocus: true,
          enablesReturnKeyAutomatically: true,
          onSubmitEditing: (event) => {
            this.refs.form.getComponent('phone').refs.input.focus();
          },
          onFocus: this._onInputFocus,
        },
        phone: {
          label: 'Контактный телефон',
          error: 'Необходимо указать номер телефона',
          placeholder: '+7 999 999-99-99',
          keyboardType: 'phone-pad',
          onFocus: this._onInputFocus,
        },
        paymentType: {
          label: 'Оплата',
          nullOption: false
        },
        orderType: {
          label: 'Доставка',
          nullOption: false
        },
        street: {
          label: 'Улица',
          error: 'Необходимо указать адрес',
          returnKeyType: 'next',
          autoCorrect: false,
          onSubmitEditing: (event) => {
            this.refs.form.getComponent('home').refs.input.focus();
          },
          onFocus: this._onInputFocus,
        },
        home: {
          label: 'Дом',
          error: 'Необходимо указать номер дома',
          returnKeyType: 'next',
          autoCorrect: false,
          onSubmitEditing: (event) => {
            this.refs.form.getComponent('note').refs.input.focus();
          },
          onFocus: this._onInputFocus,
        },
        note: {
          label: 'Примечание к заказу',
          multiline: true,
          numberOfLines: 4,
          stylesheet: stylesheet,
          offset: 200,
          onFocus: this._onInputFocus,
        }
      },
    };

    this.state = {
      options,
      value: {
        paymentType: 'cash',
        orderType: 'address'
      }
    }
  }

  componentWillMount() {
    this.subscriptions = [
      Keyboard.addListener('keyboardWillChangeFrame', (event) => {
        if (event && event.endCoordinates && event.endCoordinates.screenY == 667) {
          var kb = this.refs.keyboardAvoidingView;
          setTimeout(() => kb.setState({bottom: 0}), 0); // KeyboardAvoidingView bugfix
        }
      })
    ]
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.remove());
  }

  _onInputFocus(event) {
    var input = event.target;
    setTimeout(()=>{
      let scrollResponder=this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        input,
        150, //additionalOffset
        true
      );
    }, 50)
  }

  _onFormChange(value) {
    var options = t.update(this.state.options, {
      fields: {
        street: {
          hidden: {'$set': value.orderType == 'self'},
        },
        home: {
          hidden: {'$set': value.orderType == 'self'}
        }
      }
    });
    this.setState({options: options, value: value});
  }

  render() {
    return (
      <ScrollView
        ref='scrollView'
        style={styles.container}>
        <KeyboardAvoidingView behavior='padding' ref='keyboardAvoidingView'>
          <Form
            ref="form"
            type={Person}
            options={this.state.options}
            value={this.state.value}
            onChange={this._onFormChange}
          />
          <Button
            block
            style={{margin: 25}}
            onPress={this._onFormSubmit}>
            Оформить заказ
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  _onFormSubmit() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      // check address if delivery type is courier
      if (value.orderType == 'address')
      {
        if (!value.street || value.street.length == 0 || !value.home || value.home.length == 0)
        {
          if (!value.street || value.street.length == 0) {
            this.refs.form.getComponent('street').setState({hasError:true});
          }

          if (!value.home || value.home.length == 0) {
            this.refs.form.getComponent('home').setState({hasError:true});
          }
          return;
        }
      }
      console.log(value); // value here is an instance of Person
    }
  }
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 74,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
});

export default connect((state) => ({
}))(Order);
