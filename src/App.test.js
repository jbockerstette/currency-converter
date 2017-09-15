import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import {createStore} from "redux";
import {Map} from 'immutable';
import reducer from "./reducers/reducer";

global.fetch = require('jest-fetch-mock');
const mock_responses = require('../test/mock_responses');


beforeEach(() => {
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryCodes));
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));
});


describe('Testing App component', () => {
  const store = createStore(reducer);
  store.dispatch({type:''});
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App store={store}/>, div);
  });
});

describe('getNameMap method', () => {
  it('should produce a long to short name lookup object', () => {
    const currencies = Map(
      {
        USD: Map({
          name: 'US Dollars',
          code: 'USD'
        }),
        AUD: Map({
          name: 'Aussy Dollars',
          code: 'AUD'
        })
      });
    const longToShort = App.prototype.getNameMap(Array.from(currencies.values()), 'name', 'code');
    expect(longToShort.get('US Dollars')).toEqual('USD');
    expect(longToShort.get('Aussy Dollars')).toEqual('AUD');
  });
});

describe('fetchCurrencyRates method', () => {
  it('should fetch my mocks', () => {
    App.prototype.fetchCurrencyRates().then((rates) => {
      expect(rates.getIn(['AUD','code'])).toEqual('AUD');
      expect(rates.getIn(['USD', 'name'])).toEqual('United States dollar');
    })
  });
});

describe('fetchCurrencies method', () => {
  it('should fetch my mocks', () => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));
    App.prototype.fetchCurrencies().then((currencies) => {
      expect(currencies.filter(c => c.code === 'USD').size).toBeGreaterThan(1);
      expect(currencies.filter(c => c.code === 'AUD').size).toBeGreaterThan(1);
    })
  });
});

describe('fetchRate method', () => {
  it('should fetch my mocks', () => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mock_responses.rates));
    App.prototype.fetchRate('USD', 'AUD').then((rate) => {
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
  const store = createStore(reducer);
  store.dispatch({type:''});
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryCodes));
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));
  let skipStateChange = 0;
  const component = shallow(<App store={store}/>);
  it('should set the state properly', (done) => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mock_responses.rates));
    component.instance().setState = (state) => {
      // You have to skip some dispatches of the state change before we get to the final one.
      if (skipStateChange === 2) {
        const {rightValue, conversionRate, selectedCurrencyCode, rightCurrencyCode} = state.data.toJS();
        expect(rightValue).toEqual(.83);
        expect(conversionRate).toEqual(.82919);
        expect(selectedCurrencyCode).toEqual('AUD');
        expect(rightCurrencyCode).toEqual('AUD');
        done();
      }
      skipStateChange++;
    };
    component.instance().handleCurrencySelected('Australian dollar');
  });
});

describe('handleOnChangeRight method', () => {
  const store = createStore(reducer);
  store.dispatch({type:''});
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryCodes));
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));
  const component = shallow(<App store={store}/>);
  it('should set the state properly', (done) => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mock_responses.rates));
    component.instance().setState = (state) => {
      const {rightValue, leftValue} = state.data.toJS();
      expect(rightValue).toEqual(2);
      expect(leftValue).toEqual(2);
      done();
    };
    component.instance().handleOnChangeRight(2);
  });
});

describe('handleOnChangeLeft method', () => {
  const store = createStore(reducer);
  store.dispatch({type:''});
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryCodes));
  fetch.mockResponseOnce(JSON.stringify(mock_responses.countryData));
  const component = shallow(<App store={store}/>);
  it('should set the state properly', (done) => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(mock_responses.rates));
    component.instance().setState = (state) => {
      const {rightValue, leftValue} = state.data.toJS();
      expect(rightValue).toEqual(4);
      expect(leftValue).toEqual(4);
      done();
    };
    component.instance().handleOnChangeLeft(4);
  });
});


