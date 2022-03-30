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
import { configureStore } from '@reduxjs/toolkit';

const component = (
  <StoreProvider store = {store}>
    <Home/>
  </StoreProvider>
)

const percentCompleted = (completed, total) => {
  return Math.round(total === 0 ? 0 :  completed / total * 100);
}

describe('Check Home Screen Components', () => {
  test('When the user loads the app, the screen should render as expected', () => {
    jest.spyOn(global.Math, 'floor').mockReturnValue(0);
    const {toJSON } = render(component);
    expect(toJSON()).toMatchSnapshot();
  });

  test('When the user is on the home screen, the add card input should be rendered', () => {
    const {getByTestId } = render(component);
    const inputField = getByTestId('AddCard-Input');
    expect(inputField).toBeTruthy();
  });


});

describe('Testing Card Component Functions', () => {

  beforeAll(() => {
    const { getByTestId} = render(component);
    const inputField = getByTestId('AddCard-Input');
    const addCardButton = getByTestId('AddCard-Button');
    fireEvent.changeText(inputField, 'Test Message');
    fireEvent.press(addCardButton)
  })

  
  test('should handle a card being added to an empty list', () => {
    const card =  store.getState().cards.items[0]
    const item = {
      key: 1,
      todo: 'Test Message',
      isComplete: false,
    }
    expect(card).toEqual(item)
  });

  test('Given a card is added, the field to edit the card content should be rendered', () => {
    const { getByTestId } = render(component);
    const editInputField = getByTestId('Card-Input-1');
    expect(editInputField).toBeTruthy();
  });

  test('Given a card is added, an update to the card content using the "Card Input" field should update the state', () => {
    const { getByTestId} = render(component);    
    const editInputField = getByTestId('Card-Input-1');
    fireEvent.changeText(editInputField, 'Edited Message');

    const card =  store.getState().cards.items[0]
    expect(card.todo).toEqual('Edited Message')
  });

  test('Given a card is added, updating the card status to completed by pressing the "Card-IsComplete" button should update the state', () => {
    const { getByTestId} = render(component);    
    const isCompleteButton = getByTestId('Card-IsComplete-1');
    fireEvent.press(isCompleteButton);
    const card =  store.getState().cards.items[0]
    expect(card.isComplete).toBe(true)
  });

  test('Given a card is added, deleting a card by clicking the "Card-Delete" button should update the state accordingly', () => {
    const { getByTestId} = render(component);    
    const deleteButton = getByTestId('Card-Delete-1');
    fireEvent.press(deleteButton, 'Edited Message');
    const list =  store.getState().cards.items
    expect(list).toHaveLength(0)
  });

});



describe('Testing Card Statistics Component', () => {
  
  beforeAll (() => {
    // Adding list of cards
    const {getByTestId} = render(component);
    const inputField = getByTestId('AddCard-Input');
    const addCardButton = getByTestId('AddCard-Button');
    for (let i= 0; i<10; i++) {
      fireEvent.changeText(inputField, 'Test Message ' + i);
      fireEvent.press(addCardButton);
    }
  });

  test('Given that 10 cards are added, the Completed Items label should be rendered ', () => {
    const { getByTestId } = render(component);    
    const completedItems = getByTestId('CompletedItems');
    expect(completedItems).toBeTruthy();
  });

  test('Given that 10 cards are added, the Completed Items label should be set to 0', () => {
    const { getByTestId } = render(component);    
    const completedItems = getByTestId('CompletedItems');
    expect(completedItems.props.children).toEqual([" * Items completed: ", 0]);
  });

  test('Given that 10 cards are added, the Total Items label should be rendered ', () => {
    const {toJSON, getByTestId} = render(component);    
    const totalItems = getByTestId('TotalItems');
    expect(totalItems).toBeTruthy();
  });

  test('Given that 10 cards are added, the Total Items label should be set to 10 ', () => {
    const {toJSON, getByTestId} = render(component);    
    const totalItems = getByTestId('TotalItems');
    expect(totalItems.props.children).toEqual([" * Total items: ", 10]);
  });

  test('Given that 10 cards are added, the Incomplete Items label should be rendered ', () => {
    const {toJSON, getByTestId} = render(component);    
    const incompleteItems = getByTestId('IncompleteItems');
    expect(incompleteItems).toBeTruthy();
  });

  test('Given that 10 cards are added, the Incomplete Items label should be set to 10 ', () => {
    const {toJSON, getByTestId} = render(component);    
    const incompleteItems = getByTestId('IncompleteItems');
   expect(incompleteItems.props.children).toEqual([" * Items not completed: ", 10]);
  });

  test('Given that 10 cards are added, the percentage label should be rendered ', () => {
    const {toJSON, getByTestId} = render(component);    
    const percentageText = getByTestId('Percentage');
    expect(percentageText).toBeTruthy();
  });

  test('Given that 10 cards are added, the percentage label should be set to 0', () => {
    const {toJSON, getByTestId} = render(component);    
    const percentageText = getByTestId('Percentage');
    expect(percentageText.props.children).toEqual([" * Percent completed: ", 0]);

  });


  test('Given that 10 cards are added and 5 cards are set as completed, the Completed Items label should be set to 5', () => {
    const {toJSON, getByTestId} = render(component); 
    let isCompleteButton;   
    for (let i= 1; i<6; i++) {
      isCompleteButton = getByTestId('Card-IsComplete-'+i);
      fireEvent.press(isCompleteButton);
    }
    const completedItems = getByTestId('CompletedItems');
    expect(completedItems.props.children).toEqual([" * Items completed: ", 5]);
  });

  test('Given that 10 cards are added and 5 cards are set as completed, the Total Items label should be set to 10', () => {
    const {toJSON, getByTestId} = render(component); 
    let isCompleteButton;   
    for (let i= 1; i<6; i++) {
      isCompleteButton = getByTestId('Card-IsComplete-'+i);
      fireEvent.press(isCompleteButton);
    }   
    const totalItems = getByTestId('TotalItems');
    expect(totalItems.props.children).toEqual([" * Total items: ", 10]);
  });

  
  test('Given that 10 cards are added and 5 cards are set as completed, the Incomplete Items label should be set to 5', () => {
    const {toJSON, getByTestId} = render(component); 
    let isCompleteButton;   
    for (let i= 1; i<6; i++) {
      isCompleteButton = getByTestId('Card-IsComplete-'+i);
      fireEvent.press(isCompleteButton);
    }   
    const incompleteItems = getByTestId('IncompleteItems');
    expect(incompleteItems.props.children).toEqual([" * Items not completed: ", 5]);
  });

  test('Given that 10 cards are added and 5 cards are set as completed, the percentage label should be set to 50', () => {
    const {toJSON, getByTestId} = render(component);    
    const percentageText = getByTestId('Percentage');
    expect(percentageText.props.children).toEqual([" * Percent completed: ", 50]);
  });

});


describe('Test Card Filter Component', () => {

  beforeAll (() => {
    // Adding list of cards
    const { getByTestId} = render(component);
    const inputField = getByTestId('AddCard-Input');
    const addCardButton = getByTestId('AddCard-Button');
    let i = 0;
    for (i= 1; i<=10; i++) {
      fireEvent.changeText(inputField, 'Test Message ' + i);
      fireEvent.press(addCardButton);
    }

    let isCompleteButton;
    for (i= 1; i<4; i++) {
      isCompleteButton = getByTestId('Card-IsComplete-'+i);
      fireEvent.press(isCompleteButton);
    }

    const filterInput = getByTestId('FilterInput');
    fireEvent(filterInput, 'valueChange', 'All')
  });

  test('Given 10 cards is added and 3 cards are set as completed, check if the filter value can be changed to Completed', () => {
    const { getByTestId} = render(component);    
    const filterInput = getByTestId('FilterInput');
    fireEvent(filterInput, 'valueChange', 'Completed')
    expect(store.getState().cards.filter).toBe('Completed')
  });

  test('Given 10 cards is added and 3 cards are set as completed, check if the filter value can be changed to Incomplete', () => {
    const {getByTestId} = render(component);    
    const filterInput = getByTestId('FilterInput');
    fireEvent(filterInput, 'valueChange', 'Incomplete')
    expect(store.getState().cards.filter).toBe('Incomplete')
  });

  test('Given 10 cards is added and 3 cards are set as completed, check if the filter value can be changed to All', () => {
    const { getByTestId} = render(component);    
    const filterInput = getByTestId('FilterInput');
    fireEvent(filterInput, 'valueChange', 'All')
    expect(store.getState().cards.filter).toBe('All')
  });

  test('Given 10 cards is added and 3 cards are set as completed, check if changing the filter value changes the state', () => {
    const { getByTestId} = render(component);    
    const filterInput = getByTestId('FilterInput');
    fireEvent(filterInput, 'valueChange', 'Completed')
    expect(store.getState().cards.filter).toBe('Completed')
  });

  test('Given 10 cards is added and 3 cards are set as completed, Check if the list of cards get filtered when the filter is set to Completed', () => {
    const {toJSON, getByTestId} = render(component);    
    const filterInput = getByTestId('FilterInput');
    fireEvent(filterInput, 'valueChange', 'Completed')
    expect(toJSON()).toMatchSnapshot();
  });

  test('Given 10 cards is added and 3 cards are set as completed, Check if the list of cards get filtered when the filter is set to All', () => {
    const {toJSON, getByTestId} = render(component);    
    const filterInput = getByTestId('FilterInput');
    fireEvent(filterInput, 'valueChange', 'All')
    expect(toJSON()).toMatchSnapshot();
  });

  test('Given 10 cards is added and 3 cards are set as completed, Check if the list of cards get filtered when the filter is set to Incomplete', () => {
    const {toJSON, getByTestId} = render(component);    
    const filterInput = getByTestId('FilterInput');
    fireEvent(filterInput, 'valueChange', 'Incomplete')
    expect(toJSON()).toMatchSnapshot();
  });


})

