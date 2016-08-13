import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, addToCart } from '../actions';
import { StyleSheet, ListView, RefreshControl, View, Image } from 'react-native';

import NavigationBar from './NavigationBar';
import ProductListItem from './ProductListItem';
import { KB_ORANGE } from '../constants';

export default class ProductList extends Component {

  constructor(props) {
    super(props);
    this.props.dispatch(fetchProducts());
  }

  render() {
    return (
      <View style={ styles.container }>
        <Image
          resizeMode={Image.resizeMode.contain}
          style={styles.bgImage}
          source={require('../images/kb-bg.png')}
        >
          {this._renderList()}
        </Image>
      </View>
    );
  }

  _renderList() {
    if (this.props.products.size !== 0) {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return(
        <ListView
          enableEmptySections={true}
          contentContainerStyle={styles.list}
          dataSource={ds.cloneWithRows(this.props.products)}
          renderRow={(product) => {
            var cartProduct = this.props.cartProducts.find((p) => p.id == product.id);
            var cartCount = cartProduct ? cartProduct.count : undefined;
            return <ProductListItem product={product} cartCount={cartCount} addToCartAction={this._onPressAddButton.bind(this)}/>
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isFetching}
              onRefresh={() => this.props.dispatch(fetchProducts())}
              colors={['white']}
              tintColor={'white'}
            />
          }
        />
      );
    } else {
      return <Text>Hi! I am a product list!</Text>
    }
  }

  _onPressAddButton(product) {
    this.props.dispatch(addToCart(product));
  }

  static renderNavigationBar(props) {
    return <NavigationBar {...props} />
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    flex: 1
  },
  bgImage: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: KB_ORANGE,
    width: null,
    height: null,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  }
});

export default connect((state) => ({
  isFetching: state.products.isFetching,
  products: state.products.data,
  cartProducts: state.cart.products
}))(ProductList);
