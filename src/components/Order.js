import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, ListView, View, Text, Image, TextInput, TouchableHighlight, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { Button, Icon } from 'native-base';
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
    this._onLocationButtonPressed = this._onLocationButtonPressed.bind(this)

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
          clearButtonMode: 'while-editing',
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
          clearButtonMode: 'while-editing',
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
          clearButtonMode: 'while-editing',
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
          clearButtonMode: 'while-editing',
          template: this._textFieldWithButtonTemplate.bind(this),
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

  _textFieldWithButtonTemplate(locals) {

    var containerStyle = {};
    var labelStyle = t.form.Form.stylesheet.controlLabel.normal;
    var textboxStyle = {...t.form.Form.stylesheet.textbox.normal, flex: 1};

    return (
      <View style={containerStyle}>
        <Text style={labelStyle}>{locals.label}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            style={textboxStyle}
            accessibilityLabel={locals.label}
            ref="input"
            autoCapitalize={locals.autoCapitalize}
            autoCorrect={locals.autoCorrect}
            autoFocus={locals.autoFocus}
            blurOnSubmit={locals.blurOnSubmit}
            editable={locals.editable}
            keyboardType={locals.keyboardType}
            maxLength={locals.maxLength}
            multiline={locals.multiline}
            onBlur={locals.onBlur}
            onEndEditing={locals.onEndEditing}
            onFocus={locals.onFocus}
            onLayout={locals.onLayout}
            onSelectionChange={locals.onSelectionChange}
            onSubmitEditing={locals.onSubmitEditing}
            placeholderTextColor={locals.placeholderTextColor}
            secureTextEntry={locals.secureTextEntry}
            selectTextOnFocus={locals.selectTextOnFocus}
            selectionColor={locals.selectionColor}
            numberOfLines={locals.numberOfLines}
            underlineColorAndroid={locals.underlineColorAndroid}
            clearButtonMode={locals.clearButtonMode}
            clearTextOnFocus={locals.clearTextOnFocus}
            enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
            keyboardAppearance={locals.keyboardAppearance}
            onKeyPress={locals.onKeyPress}
            returnKeyType={locals.returnKeyType}
            selectionState={locals.selectionState}
            onChangeText={(value) => locals.onChange(value)}
            onChange={locals.onChangeNative}
            placeholder={locals.placeholder}
            value={locals.value}/>
          <Button
            onPress={this._onLocationButtonPressed}
            transparent>
            <Icon name='md-locate'/>
          </Button>
        </View>
      </View>
    );
  }

  _onLocationButtonPressed() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&kind=house&geocode=${longitude},${latitude}`)
          .then((response) => response.json())
          .then((responseJson) => {
            const featureMember = responseJson.response.GeoObjectCollection.featureMember;
            var locations = featureMember.map((f) => {
              let tf = f.GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.Thoroughfare;
              return {
                text: [tf.ThoroughfareName, tf.Premise.PremiseNumber].join(', '),
                onPress: () => this._setDeliveryAddress(tf.ThoroughfareName, tf.Premise.PremiseNumber)
              }
            }).slice(0, 5);
            locations.push({text: 'Отмена'});
            Alert.alert('Адрес доставки', null, locations);
          })
          .catch((error) => {
            Alert.alert('Ошибка', 'Не удалось определить адрес');
            console.error(error);
          });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  _setDeliveryAddress(street, home) {
    this.setState({value: {...this.state.value, street, home}});
  }
}

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
