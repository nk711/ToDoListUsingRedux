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
import { useEffect } from 'react';

const component = (
  <StoreProvider store = {store}>
    <Home/>
  </StoreProvider>
)

describe('Check Home Screen Components', () => {

  test('renders as expected', () => {
    jest.spyOn(global.Math, 'floor').mockReturnValue(0);
    const {toJSON } = render(component);
    expect(toJSON()).toMatchSnapshot();
  });

});




// describe('CardComponent', () => {


  
  
//   test('If card is displayed properly', () => {
//     store.dispatch(
//       addCard({
//           key: Math.random(),
//           todo: 'test message :)',
//           isComplete: false
//       })
//     );
//     const {getByTestId } = render(component);
//     const inputField = getByTestId('AddCard.Input');
//     expect(inputField).toBeTruthy();
    
//   });


//   test('if user can add a card.', () => {
//     const {getByTestId} = render(component);
//     const inputField = getByTestId('AddCard.Input');
//     const addCardButton = getByTestId('AddCard.Button');
//     fireEvent.changeText(inputField, 'Test Message');
//     fireEvent.press(addCardButton)
//     const list = store.getState().cards.items
//     const card = list[list.length - 1]
//     expect(card.todo).toEqual('Test Message');
//     expect(card.isComplete).toEqual(false);
//   });
// });