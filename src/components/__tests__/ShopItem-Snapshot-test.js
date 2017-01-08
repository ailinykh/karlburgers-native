import React from 'react';
import renderer from 'react-test-renderer';

import ShopItem from '../ShopItem';
import { products } from '../../../config/jest/mockData';

it('renders a ShopItem using Snapshots', () => {
  expect(renderer.create(
    <ShopItem
      product={products[0]}
      cartCount={0}
      addToCartAction={jest.fn()}
    />
  )).toMatchSnapshot();

  const component = renderer.create(
    <ShopItem
      product={products[0]}
      cartCount={0}
      addToCartAction={jest.fn()}
    />
  );
});
