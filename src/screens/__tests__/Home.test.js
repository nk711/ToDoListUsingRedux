/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
// Note: test renderer must be required after react-native.
import {render, fireEvent} from '@testing-library/react-native';
import { Home } from '../Home';
import store from '../../redux/store'

const component = (
  <StoreProvider store = {store}>
    <Home/>
  </StoreProvider>
)

test('renders as expected', () => {
  const {toJSON} = render(component);
  expect(toJSON()).toMatchSnapshot();
});
