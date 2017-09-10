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

describe('getLongToShortCurrencyNameMap method', () => {
  it('should produce a long to short name lookup object', () => {
    const currencies = [
      {
        name: 'US Dollars',
        code: 'USD'
      },
      {
        name: 'Aussy Dollars',
        code: 'AUD'
      },
      ];
    const longToShort = App.prototype.getNameMap(currencies, 'name', 'code');
    expect(longToShort['US Dollars']).toEqual('USD');
    expect(longToShort['Aussy Dollars']).toEqual('AUD');
  });
});


