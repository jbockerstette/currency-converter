import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
global.fetch = require('jest-fetch-mock');
const mock_responses = require('../test/mock_responses');

describe('Testing App component', () => {
  it('renders without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify(mock_responses.countryCodes));
    fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));
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


