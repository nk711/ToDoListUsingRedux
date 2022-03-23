import {jest} from '@jest/globals';
require('jest-fetch-mock').enableMocks();


// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
