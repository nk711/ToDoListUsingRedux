/**
 * @format
 */
 import 'react-native';
 import React from 'react';
 import { Provider as StoreProvider } from 'react-redux';
 // Note: test renderer must be required after react-native.
 import {render, fireEvent} from '@testing-library/react-native';
 import store from '../../redux/store'
import { AddCard } from '../AddCard';
import { Card} from '../Card'
 
const item = {
    key: Math.random(),
    todo: 'test message',
    isComplete: false
  }


const component = (
  <StoreProvider store = {store}>
      <Card item = {item}/>
  </StoreProvider>
)


describe('CardComponent', () => {

    beforeEach = () => {
      dispatch(addCard(item));
    }


    test('Card values are displayed correctly', () => {
      const {getByTestId, getByText} = render(component);
      const inputField = getByTestId('Card.Input');
      const isCompleteButton = getByTestId('Card.IsComplete');
      expect(inputField.props.value).toBe('test message');
      expect(isCompleteButton.props.style.backgroundColor).toBe('orange');
    });

    test('Can set card to be completed', () => {
      const {getByTestId} = render(component);
      const inputField = getByTestId('Card.Input');
      const isCompleteButton = getByTestId('Card.IsComplete');
      console.log("Before", store.getState().cards)

      fireEvent.press(isCompleteButton)
      console.log("After", store.getState().cards)

      expect(inputField.props.value).toBe('test message');
      expect(isCompleteButton.props.style.backgroundColor).toBe('#99d372');
      const card = store.getState().cards.filter((obj) => obj.key===item.key)
      expect(card.isComplete).toBe(true);
    });


  });
  
  