import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('Testing App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
  });
});

describe('Testing App methods', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
  });
});


