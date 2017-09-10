import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';

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

describe('getNameMap method', () => {
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

describe('toShortName method', () => {
  it('should produce a short name for the long name', () => {
    const short = App.prototype.toShortName('US Dollars');
    expect(short).toEqual('USD');
  });
  it('should produce a ??? for the long name not found', () => {
    const short = App.prototype.toShortName('XXXXX');
    expect(short).toEqual('???');
  });
});

describe('fetchCurrencyRates method', () => {
  it('should fetch my mocks', () => {
    fetch.mockResponseOnce(JSON.stringify(mock_responses.countryCodes));
    fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));
    App.prototype.fetchCurrencyRates().then((rates) => {
      expect(rates.AUD.code).toEqual('AUD');
      expect(rates.USD.name).toEqual('United States dollar');
    })
  });
});

describe('fetchCurrencies method', () => {
  it('should fetch my mocks', () => {
    fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));
    App.prototype.fetchCurrencies().then((currencies) => {
      expect(currencies.filter(c => c.code === 'USD').length).toBeGreaterThan(1);
      expect(currencies.filter(c => c.code === 'AUD').length).toBeGreaterThan(1);
    })
  });
});

describe('fetchRate method', () => {
  it('should fetch my mocks', () => {
    fetch.mockResponseOnce(JSON.stringify(mock_responses.rates));
    App.prototype.fetchCurrencies().then((currencies) => {
      expect(currencies.filter(c => c.code === 'USD').length).toBeGreaterThan(1);
      expect(currencies.filter(c => c.code === 'AUD').length).toBeGreaterThan(1);
    })
  });
});

describe('round method', () => {
  it('should round to nearest 2 digits', () => {
    const rounded = App.prototype.round(12344.5678);
    expect(rounded).toEqual(12344.57);
  });
  it('should round a string number as well', () => {
    const rounded = App.prototype.round('12344.5678');
    expect(rounded).toEqual(12344.57);
  });
});


test('CurrencyConverter renders the props correctly', () => {
  const handleOnChange = (value) => {
    expect(value).toEqual(1);
  };
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryCodes));
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));

  // Render a CurrencyConverter
  const wrapper = shallow(
    <App/>
  );

  expect(wrapper.find('h2').text()).toEqual('US Dollars');
  // expect(wrapper.find('InputGroupAddon').at(0).children().text()).toEqual('$');
  // expect(wrapper.find('InputGroupAddon').at(1).children().text()).toEqual('USD');
  // wrapper.find('Input').simulate('change', {target:{value:1}});

});


