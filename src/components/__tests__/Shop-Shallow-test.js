import {
  ListView,
  Text,
} from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import Shop from '../Shop';
import { products } from '../../../config/jest/mockData';

import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
const store = configureStore();

it('renders a Product list using Enzyme', () => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  const dataSource = ds.cloneWithRows(products);

  const wrapper = shallow(
    <Provider store={store}>
      <Shop
        isFetching={false}
        products={products}
        cartProducts={[]}
      />
    </Provider>
  );

  expect(wrapper.contains(
    <ListView
      dataSource={dataSource}
      renderRow={() => {}}
    />
  ))
});
