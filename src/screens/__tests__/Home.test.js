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
  test('should render as expected', () => {
    jest.spyOn(global.Math, 'floor').mockReturnValue(0);
    const {toJSON } = render(component);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should display add card input text field', () => {
    const {getByTestId } = render(component);
    const inputField = getByTestId('AddCard-Input');
    expect(inputField).toBeTruthy();
  });


});

describe('Testing Card Component', () => {
  test('should be able to add a new card', () => {
    const {toJSON, getByTestId} = render(component);
    const inputField = getByTestId('AddCard-Input');
    const addCardButton = getByTestId('AddCard-Button');
    fireEvent.changeText(inputField, 'Test Message');
    fireEvent.press(addCardButton)
    const card =  store.getState().cards.items[0]

    const item = {
      key: 1,
      todo: 'Test Message',
      isComplete: false,
    }

    expect(card).toEqual(item)
  });

  test('should display card todo input text field', () => {
    const {getByTestId } = render(component);
    const editInputField = getByTestId('Card-Input-1');
    expect(editInputField).toBeTruthy();
  });

  test('should be able to edit a card', () => {
    const {toJSON, getByTestId} = render(component);    
    const editInputField = getByTestId('Card-Input-1');
    fireEvent.changeText(editInputField, 'Edited Message');

    const card =  store.getState().cards.items[0]
    expect(card.todo).toEqual('Edited Message')
  });

  test('should be able to set a card to completed', () => {
    const {toJSON, getByTestId} = render(component);    
    const isCompleteButton = getByTestId('Card-IsComplete-1');
    fireEvent.press(isCompleteButton, 'Edited Message');
    const card =  store.getState().cards.items[0]
    expect(card.isComplete).toBe(true)
  });

  test('should be able to delete a card', () => {
    const {toJSON, getByTestId} = render(component);    
    const deleteButton = getByTestId('Card-Delete-1');
    fireEvent.press(deleteButton, 'Edited Message');
    const list =  store.getState().cards.items
    expect(list).toHaveLength(0)
  });

});



describe('Testing if stats render correctly', () => {
  
  beforeAll (() => {
    // Adding list of cards
    const {toJSON, getByTestId} = render(component);
    const inputField = getByTestId('AddCard-Input');
    const addCardButton = getByTestId('AddCard-Button');
    for (let i= 0; i<10; i++) {
      fireEvent.changeText(inputField, 'Test Message ' + i);
      fireEvent.press(addCardButton);
    }
  });

  test('Check if Completed Items label is rendered ', () => {
    const {toJSON, getByTestId} = render(component);    
    const completedItems = getByTestId('CompletedItems');
    expect(completedItems).toBeTruthy();
  });

  test('Check if Completed Items is set as 0 items', () => {
    const {toJSON, getByTestId} = render(component);    
    const completedItems = getByTestId('CompletedItems');
    expect(completedItems.props.children).toEqual([" * Items completed: ", 0]);
  });

  test('Check if Total Items label is rendered ', () => {
    const {toJSON, getByTestId} = render(component);    
    const totalItems = getByTestId('TotalItems');
    expect(totalItems).toBeTruthy();
  });

  test('Check if Total Items label is set as 10 items', () => {
    const {toJSON, getByTestId} = render(component);    
    const totalItems = getByTestId('TotalItems');
    expect(totalItems.props.children).toEqual([" * Total items: ", 10]);
  });

  test('Check if Incomplete Items label is rendered ', () => {
    const {toJSON, getByTestId} = render(component);    
    const incompleteItems = getByTestId('IncompleteItems');
    expect(incompleteItems).toBeTruthy();
  });

  test('Check if Incomplete Items label is set as 10 ', () => {
    const {toJSON, getByTestId} = render(component);    
    const incompleteItems = getByTestId('IncompleteItems');
   expect(incompleteItems.props.children).toEqual([" * Items not completed: ", 10]);
  });

  test('Check if percentage label is rendered ', () => {
    const {toJSON, getByTestId} = render(component);    
    const percentageText = getByTestId('Percentage');
    expect(percentageText).toBeTruthy();
  });

  test('Check if percentage label is set as 0', () => {
    const {toJSON, getByTestId} = render(component);    
    const percentageText = getByTestId('Percentage');
    expect(percentageText.props.children).toEqual([" * Percent completed: ", 0]);

  });

  test('Check if Completed Items is set as 5 items after setting 5 cards as completed', () => {
    const {toJSON, getByTestId} = render(component);    
    for (let i= 1; i<6; i++) {
      let isCompleteButton = getByTestId('Card-IsComplete-'+i);
      fireEvent.press(isCompleteButton);
    }
    const completedItems = getByTestId('CompletedItems');
    expect(completedItems.props.children).toEqual([" * Items completed: ", 5]);
  });

  test('Check if Total Items label is set as 10 items after setting 5 cards as completed', () => {
    const {toJSON, getByTestId} = render(component);    
    const totalItems = getByTestId('TotalItems');
    expect(totalItems.props.children).toEqual([" * Total items: ", 10]);

  });

  
  test('Check if Incomplete Items label is set as 5 items after setting 5 cards as completed', () => {
    const {toJSON, getByTestId} = render(component);    
    const incompleteItems = getByTestId('IncompleteItems');
    expect(incompleteItems.props.children).toEqual([" * Items not completed: ", 5]);
  });


  test('Check if percentage label is set as 50, after setting 5 cards as completed', () => {
    const {toJSON, getByTestId} = render(component);    
    const percentageText = getByTestId('Percentage');
    expect(percentageText.props.children).toEqual([" * Percent completed: ", 50]);

  });




});


describe('Test Card Filter Component', () => {

  test('Check if filter value can be changed to Incomplete', () => {
    const {toJSON, getByTestId} = render(component);    
    const filterInput = getByTestId('FilterInput');
    //fireEvent.call(filterInput, 'Completed')
    // const filterComplete = getByTestId('FilterComplete');
    // fireEvent.press(filterComplete)
    
    fireEvent(filterInput, 'onChange', null, 'Completed')
    //console.log(filterInput.props.selectedIndex)
    expect(store.getState().cards.filter).toBe('Completed')
  });

  // test('Check if filter value can be changed to Incomplete', () => {
  //   const {toJSON, getByTestId} = render(component);    
  //   const filterInput = getByTestId('FilterIncomplete');
  //   fireEvent.changeText(filterInput, 'Order')
  //   expect(store.getState().cards.filter).toBe('Incomplete')
  // });

  // test('Check if filter value can be changed to Incomplete', () => {
  //   const {toJSON, getByText} = render(component);    
  //   const filterInput = getByText('All');
  //   fireEvent.
  //   fireEvent.press(filterInput)
  //   expect(store.getState().cards.filter).toBe('All')
  // });
})

