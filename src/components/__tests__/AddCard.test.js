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
 

 const component = (
    <StoreProvider store = {store}>
      <AddCard/>
    </StoreProvider>
  )

  
describe('AddCardComponent', () => {

    test('displays text when inputting text into the TextInput field', () => {
      const {getByTestId } = render(component);
      const inputField = getByTestId('AddCard.Input');
      expect(inputField).toBeTruthy();
    });
  
  
    test('if user can add a card.', () => {
      const {getByTestId} = render(component);
      const inputField = getByTestId('AddCard.Input');
      const addCardButton = getByTestId('AddCard.Button');
      fireEvent.changeText(inputField, 'Test Message');
      fireEvent.press(addCardButton)
      const list = store.getState().cards.items
      const card = list[list.length - 1]
      expect(card.todo).toEqual('Test Message');
      expect(card.isComplete).toEqual(false);
    });
  });
  
  