import React from 'react';
import { GlobalStateProvider } from './StateContext';
import App from '../App';

export default function AppWithProvider() {
  return (
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  );
}
