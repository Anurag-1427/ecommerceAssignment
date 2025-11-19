import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from '~navigation';
import { navigationRef } from '~utils/NavigationUtils';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Navigation />
    </NavigationContainer>
  )
}

export default App;
