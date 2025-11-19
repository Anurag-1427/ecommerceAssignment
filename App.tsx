import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from '~navigation';
import { navigationRef } from '~utils/NavigationUtils';
import { configureGoogle } from 'auth/GoogleAuth';
import { useAuthStore } from '~store/auth.store.ts';

const App = () => {
  const restoreSession = useAuthStore((state: any) => state.restoreSession);

  useEffect(() => {
    configureGoogle();
    restoreSession();
  }, [restoreSession]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Navigation />
    </NavigationContainer>
  )
}

export default App;
