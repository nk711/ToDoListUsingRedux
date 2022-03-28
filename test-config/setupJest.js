import {jest} from '@jest/globals';
import React, { Component } from 'react';
require('jest-fetch-mock').enableMocks();


// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


// jest.mock('@react-native-picker/picker', () => {
//     (props) => {
//         const MockComponent = require('./mockComponent')
//         return <MockComponent 
//             module='Picker' 
//             onPress={props => props.disabled ? () => {} : props.onPress}
//             {...props}
//         />
//    }
// })