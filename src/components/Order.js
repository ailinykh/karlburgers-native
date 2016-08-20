import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  ListView,
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  AsyncStorage,
  Dimensions } from 'react-native';
import DismissKeyboard from 'dismissKeyboard';
import { Button, Icon } from 'native-base';
import t from 'tcomb-form-native';
import _ from 'lodash';
import Autocomplete from 'react-native-autocomplete-input';
import { Actions, ActionConst } from 'react-native-router-flux';
import { KLADR_API_KEY, KB_ORANGE_DARK } from '../constants';

var Form = t.form.Form;
const stylesheet = _.cloneDeep(t.form.Form.stylesheet)
stylesheet.textbox.normal.height = 100;

var min10dig = s => s.replace(/\D/g, '').length >= 10
var Phone = t.refinement(t.String, s => min10dig(s));
Phone.getValidationErrorMessage = s => {
  if (!s) {
    return 'Необходимо указать номер телефона';
  }
  if (!min10dig(s)) {
    return 'Номер телефона должен содержать 10 цифр минимум';
  }
};

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
  phone: Phone,
  paymentType: PaymentType,
  orderType: OrderType,
  street: t.maybe(t.String),
  home: t.maybe(t.String),
  comment: t.maybe(t.String)
});

export default class Order extends Component {

  constructor(props) {
    super(props);

    var options = {
      fields: {
        name: {
          label: 'Ваше имя',
          error: 'Необходимо указать имя',
          placeholder: 'Фридрих Энгельс',
          returnKeyType: 'next',
          autoCorrect: false,
          // autoFocus: true,
          enablesReturnKeyAutomatically: true,
          clearButtonMode: 'while-editing',
          onSubmitEditing: (event) => {
            this.refs.form.getComponent('phone').refs.input.focus();
          },
          onFocus: this._onInputFocus,
        },
        phone: {
          label: 'Контактный телефон',
          // error: 'Номер телефона должен содержать 10 цифр минимум',
          placeholder: '+7 999 999-99-99',
          keyboardType: 'phone-pad',
          clearButtonMode: 'while-editing',
          onFocus: this._onInputFocus,
          getValidationErrorMessage: (s) => 'LALKA'
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
          template: this._textFieldForStreetTemplate.bind(this),
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
            this.refs.form.getComponent('comment').refs.input.focus();
          },
          onFocus: this._onInputFocus,
        },
        comment: {
          label: 'Примечание к заказу',
          multiline: true,
          numberOfLines: 4,
          stylesheet: stylesheet,
          clearButtonMode: 'while-editing',
          offset: 200,
          onFocus: this._onInputFocus,
        }
      },
    };
    // Restore some user information
    AsyncStorage.multiGet(['name', 'phone', 'paymentType', 'orderType', 'comment'], (err, stores) => {
      stores.filter((store) => store[1] !== null).map((store) => {
        let obj = {};
        obj[store[0]] = store[1];
        this.setState({value: Object.assign({}, this.state.value, obj)});
      });
      this._onFormChange(this.state.value);
    })

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
        if (event && event.endCoordinates && event.endCoordinates.screenY == Dimensions.get('window').height) {
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
        keyboardShouldPersistTaps={true}
        keyboardDismissMode='on-drag'
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
            style={{margin: 25, backgroundColor: KB_ORANGE_DARK}}
            onPress={this._onFormSubmit}>
            Оформить заказ
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  _onInputFocus = (event) => {
    // TODO: https://gist.github.com/dbasedow/f5713763802e27fbde3fc57a600adcd3 try this!
    var input = event.target;
    setTimeout(()=>{
      let scrollResponder=this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        input,
        130, //additionalOffset
        true
      );
    }, 50)
  }

  _onFormChange = (value) => {
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

  _onFormSubmit = () => {
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
          this.refs.form.getComponent(result.firstError().path).refs.input.focus();
          return;
        }
      }
      var order = {...value, products: this.props.products, streetClassifierId: this.state.streetClassifierId};
      // Save user information for future orders
      var multiset = [
        ['name', order.name],
        ['phone', order.phone.toString()],
        ['paymentType', order.paymentType],
        ['orderType', order.orderType]
      ];

      if (order.comment) {
        multiset.push(['comment', order.comment]);
      } else {
        AsyncStorage.removeItem('comment');
      }

      AsyncStorage.multiSet(multiset);
      Actions.orderPreview({order: order});
    }
  }

  _onLocationButtonPressed = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&kind=house&geocode=${longitude},${latitude}`)
          .then((response) => response.json())
          .then((responseJson) => {
            const featureMember = responseJson.response.GeoObjectCollection.featureMember;
            if (featureMember.length > 0) {
              var locations = featureMember.map((f) => {
                let tf = f.GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.Thoroughfare;
                return {
                  text: [tf.ThoroughfareName, tf.Premise.PremiseNumber].join(', '),
                  onPress: () => this._setDeliveryAddress(tf.ThoroughfareName, tf.Premise.PremiseNumber)
                }
              }).slice(0, 5);
              locations.push({text: 'Отмена'});
              Alert.alert('Адрес доставки', null, locations);
            } else {
              Alert.alert('Ошибка', 'Не удалось определить адрес');
            }
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

    const types = ['аллея', 'бульвар', 'набережная', 'переулок', 'проезд', 'проспект', 'тупик', 'шоссе', 'улица'];
    var type = types.find((t) => street.indexOf(t) !== -1)
    if (type) {
      streetType = street.replace(type, '').trim();
      fetch(`http://kladr-api.ru/api.php?token=${KLADR_API_KEY}&key=${KLADR_API_KEY}&contentType=street&query=${streetType}&cityId=5700000100000&limit=10&_=${Date.now()}`)
        .then((response) => response.json())
        .then((responseJson) => {
          responseJson.result.forEach((obj) => {
            if (obj.type.toLowerCase() == type) {
              this.setState({streetClassifierId: obj.id});
            }
          });
        })
        .catch((error) => console.error(error));
    }
  }

  _textFieldForStreetTemplate(locals) {
    if (locals.hidden) {
      return null;
    }

    var labelStyle = t.form.Form.stylesheet.controlLabel.normal;
    var textboxStyle = {...t.form.Form.stylesheet.textbox.normal, flex: 1};
    var errorBlockStyle = locals.stylesheet.errorBlock;
    var data = this.state.suggestedStreets;

    var error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

    return (
      <View>
        <Text style={labelStyle}>{locals.label}</Text>
        <Autocomplete
          style={textboxStyle}
          inputContainerStyle={{borderWidth:0, margin: 0}}
          listStyle={{margin: 0}}
          data={data}
          defaultValue={locals.value}
          clearButtonMode={locals.clearButtonMode}
          onChangeText={(value) => {
            locals.onChange(value);
            fetch(`http://kladr-api.ru/api.php?token=${KLADR_API_KEY}&key=${KLADR_API_KEY}&contentType=street&query=${value}&cityId=5700000100000&limit=10&_=${Date.now()}`)
              .then((response) => response.json())
              .then((responseJson) => {
                this.setState({suggestedStreets: responseJson.result}, () => this.refs.form.getComponent('street').forceUpdate());
              })
              .catch((error) => console.error(error));
          }}
          onFocus={locals.onFocus}
          renderItem={data => (
            <TouchableOpacity onPress={() => {
              this.setState({streetClassifierId: data.id});
              locals.onChange([data.name, data.typeShort].join(', '));
              DismissKeyboard();
            }}>
              <View style={{flexDirection: 'row', padding: 5}}>
                <Text style={{fontWeight: 'bold'}}>{data.name}</Text>
                <Text>, {data.typeShort}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {error}
      </View>
    );
  }

  _textFieldWithButtonTemplate(locals) {
    if (locals.hidden) {
      return null;
    }

    var containerStyle = {};
    var labelStyle = t.form.Form.stylesheet.controlLabel.normal;
    var textboxStyle = {...t.form.Form.stylesheet.textbox.normal, flex: 1};
    var errorBlockStyle = locals.stylesheet.errorBlock;

    var error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

    return (
      <View style={containerStyle}>
        <Text style={labelStyle}>{locals.label}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            style={textboxStyle}
            ref="input"
            autoCorrect={locals.autoCorrect}
            onFocus={locals.onFocus}
            onSubmitEditing={locals.onSubmitEditing}
            onChangeText={(value) => locals.onChange(value)}
            onChange={locals.onChangeNative}
            returnKeyType={locals.returnKeyType}
            clearButtonMode={locals.clearButtonMode}
            placeholder={locals.placeholder}
            value={locals.value}/>
          <Button
            onPress={this._onLocationButtonPressed}
            transparent>
            <Icon name='md-locate'/>
          </Button>
        </View>
        {error}
      </View>
    );
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
  products: state.cart.products
}))(Order);
