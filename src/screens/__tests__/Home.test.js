/**
 * @format
 */

import 'react-native';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
// Note: test renderer must be required after react-native.
import {render, fireEvent} from '@testing-library/react-native';
import { Home } from '../Home';
import { Card } from '../../components/Card'
import { AddCard } from '../../components/AddCard';
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

  test('displays text when inputting text into the TextInput field', () => {
    const {getByTestId } = render(component);
    const inputField = getByTestId('AddCard-Input');
    expect(inputField).toBeTruthy();
  });


});

describe('Testing Card Slices', () => {

  test('can add a new card', () => {
    const {toJSON, getByTestId} = render(component);
    const inputField = getByTestId('AddCard-Input');
    const addCardButton = getByTestId('AddCard-Button');

    fireEvent.changeText(inputField, 'Test Message');
    fireEvent.press(addCardButton)

    const list = store.getState().cards.items
    const card = list[list.length - 1]

    expect(card.key).toEqual(list.length)
    expect(card.todo).toEqual('Test Message')
    expect(card.isComplete).toEqual(false)
    expect(toJSON()).toMatchSnapshot();
  });

  test('can delete a  card', () => {
    const {toJSON, getByTestId} = render(component);
    const inputField = getByTestId('AddCard-Input');
    const addCardButton = getByTestId('AddCard-Button');

    fireEvent.changeText(inputField, 'Test Message');
    fireEvent.press(addCardButton)

    const list = store.getState().cards.items
    const card = list[list.length - 1]

    expect(card.key).toEqual(list.length)
    expect(card.todo).toEqual('Test Message')
    expect(card.isComplete).toEqual(false)

    expect(toJSON()).toMatchSnapshot();
  });


});

//  went to the beach
// describe('Testing individual Card property', () => {

//   test('Card values are displayed correctly', () => {
//     const {getByTestId } = render(component);
//     const inputField = getByTestId('Card.Input');
//     const isCompleteButton = getByTestId('Card.IsComplete');


//     expect(inputField.props.value).toBe('test message');
//     expect(isCompleteButton.props.style.backgroundColor).toBe('orange');
//   });

//   test('Can set card to be completed', () => {
//     const {getByTestId} = render(component);
//     const inputField = getByTestId('Card.Input');
//     const isCompleteButton = getByTestId('Card.IsComplete');
//     fireEvent.press(isCompleteButton)

//     expect(inputField.props.value).toBe('test message');
//     expect(isCompleteButton.props.style.backgroundColor).toBe('#99d372');
//     const card = store.getState().cards.filter((obj) => obj.key===item.key)
//     expect(card.isComplete).toBe(true);
//   });


// });



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