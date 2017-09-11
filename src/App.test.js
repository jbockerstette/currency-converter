import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';

global.fetch = require('jest-fetch-mock');
const mock_responses = require('../test/mock_responses');

beforeEach(() => {
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryCodes));
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));
});


describe('Testing App component', () => {
  it('renders without crashing', () => {
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
    const short = App.prototype.toShortName('United States dollar');
    expect(short).toEqual('USD');
  });
  it('should produce a ??? for the long name not found', () => {
    const short = App.prototype.toShortName('XXXXX');
    expect(short).toEqual('???');
  });
});

describe('fetchCurrencyRates method', () => {
  it('should fetch my mocks', () => {
    App.prototype.fetchCurrencyRates().then((rates) => {
      expect(rates.AUD.code).toEqual('AUD');
      expect(rates.USD.name).toEqual('United States dollar');
    })
  });
});

describe('fetchCurrencies method', () => {
  it('should fetch my mocks', () => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));
    App.prototype.fetchCurrencies().then((currencies) => {
      expect(currencies.filter(c => c.code === 'USD').length).toBeGreaterThan(1);
      expect(currencies.filter(c => c.code === 'AUD').length).toBeGreaterThan(1);
    })
  });
});

describe('fetchRate method', () => {
  it('should fetch my mocks', () => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mock_responses.rates));
    App.prototype.fetchRate('USD', 'EUR').then((rate) => {
      expect(rate).toEqual(0.82919);
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

describe('handleCurrencySelected method', () => {
  const component = shallow(<App/>);
  it('should set the state properly', (done) => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mock_responses.rates));
    component.instance().setState = (state) => {
      const {rightValue, conversionRate, selectedCurrencyCode, rightCurrencyCode} = state;
      expect(rightValue).toEqual(.83);
      expect(conversionRate).toEqual(.82919);
      expect(selectedCurrencyCode).toEqual('EUR');
      expect(rightCurrencyCode).toEqual('EUR');
      done();
    };
    component.instance().handleCurrencySelected('Euro');
  });
});

describe('handleOnChangeRight method', () => {
  const component = shallow(<App/>);
  it('should set the state properly', (done) => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mock_responses.rates));
    component.instance().setState = (state) => {
      const {rightValue, leftValue} = state;
      expect(rightValue).toEqual(2);
      expect(leftValue).toEqual(2);
      done();
    };
    component.instance().handleOnChangeRight(2);
  });
});

describe('handleOnChangeLeft method', () => {
  const component = shallow(<App/>);
  it('should set the state properly', (done) => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mock_responses.rates));
    component.instance().setState = (state) => {
      const {rightValue, leftValue} = state;
      expect(rightValue).toEqual(4);
      expect(leftValue).toEqual(4);
      done();
    };
    component.instance().handleOnChangeLeft(4);
  });
});


