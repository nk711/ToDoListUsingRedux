import React from 'react';
import { Text } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { Home } from './src/screens/Home';
import store from './src/redux/store'
const App = () => {
  return (
    <StoreProvider store={store}>
      <Home/>
    </StoreProvider>
  );
};
 
 export default App;