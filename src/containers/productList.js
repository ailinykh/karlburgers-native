import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import { StyleSheet, ListView, View } from 'react-native';
import ProductListItem from '../components/productListItem';

export default class ProductList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    return (
      <View style={ styles.container }>
        {this._renderList()}
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
          renderRow={(product) => <ProductListItem style={styles.item} product={product}/>}
          // renderRow={(product) => <View style={styles.item} product={product}></View>}
        />
      );
    } else {
      return <Text>Hi! I am a product list!</Text>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    flex: 1
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default connect((state) => ({
  isFetching: state.products.isFetching,
  products: state.products.data
}))(ProductList);
