import {
  Text
} from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { shallow } from 'enzyme';

import ShopItem, { styles } from '../ShopItem';
import { products } from '../../../config/jest/mockData';

const product = products[0];

it('renders a ShopItem', () => {
  const wrapper = shallow(
    <ShopItem
      product={product}
      cartCount={0}
      addToCartAction={jest.fn()}
    />
  );

  expect(wrapper.find({style: styles.image}).length).toBe(1);
  expect(wrapper.contains(<Text style={styles.title}>{product.name}</Text>)).toBe(true);
});
