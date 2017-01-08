import React from 'react';
import renderer from 'react-test-renderer';

import Shop from '../Shop';
import { products } from '../../../config/jest/mockData';

import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
const store = configureStore();

it.skip('renders a RepoList using Snapshots', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Shop
        isFetching={false}
        products={products}
        cartProducts={[]}
      />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});
