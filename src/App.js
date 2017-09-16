import React from 'react';
import {Map, List, fromJS} from 'immutable';
import logo from '../src/images/cash-calculator.svg';
import react_logo from '../src/images/react.svg';
import redux_logo from '../src/images/redux.svg';
import './scss/App.css';
import CurrencyConverter from "./components/CurrencyConverter";
import {has} from 'lodash';
import {
  setCurrencies, setCurrencySelected, setLeftCurrency, setRightCurrency,
  setValues
} from "./actions/actions";


let longToShortName = Map({'US Dollars': 'USD'});

export const DEFAULT_STATE = Map({
  currencies: Map(),
  leftCurrencyCode: 'USD',
  rightCurrencyCode: 'USD',
  conversionRate: 1.00,
  leftValue: 1.00,
  rightValue: 1.00,
  selectedCurrencyCode: 'USD'
});


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: DEFAULT_STATE};
    this.store = props.store;
    this.store.subscribe(() => {
      const state = this.store.getState();
      this.setState({data: state});
    });
  }

  componentWillMount() {
    this.fetchCurrencyRates().then((currencies) => {
      longToShortName = this.getNameMap(Array.from(currencies.values()), 'name', 'code');
      this.store.dispatch(setCurrencies(currencies));
    }).catch(error => console.log('parsing failed', error));
  }

  toShortName(longName) {
    if (longToShortName.has(longName)) {
      return longToShortName.get(longName);
    }
    return '???';
  }


  getNameMap(currencies, from, to) {
    return Map(currencies.reduce((longNameToShortName, currency) => {
      return Object.assign(longNameToShortName, {[currency.get(from)]: currency.get(to)});
    }, {}));
  }

  fetchCurrencyRates() {
    let currencyCodes;
    let currencyRates = {};
    return fetch('http://api.fixer.io/latest')
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.rates)
      .then(rates => currencyCodes = rates)
      .then(() => this.fetchCurrencies())
      .then(currencies => currencies.forEach((currency) => {
        if (currency && has(currencyCodes, currency.code)) {
          currencyRates[currency.code] = {};
          Object.assign(currencyRates[currency.code], currency);
        }
      })).then(() => fromJS(currencyRates));
  }

  fetchCurrencies() {
    const currencies = [];
    return fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.forEach((country) => {
        const currency = country['currencies'][0];
        if (currency) {
          currencies.push(Object.assign({}, currency, {flag: country.flag}));
        }
      })).then(() => List(currencies));
  }

  fetchRate(fromCurrencyCode, toCurrencyCode) {
    // fetch('http://api.fixer.io/latest?base=USD&symbols=USD,EUR')
    return fetch(`http://api.fixer.io/latest?base=${fromCurrencyCode}&symbols=${toCurrencyCode}`)
      .then(response => response.json())
      .then(parsedJSON => {
        let rate = 1;
        if (toCurrencyCode !== fromCurrencyCode && parsedJSON.rates) {
          rate = parsedJSON.rates[toCurrencyCode];
        }
        return rate;
      }).catch(error => console.log('parsing failed', error));
  }

  handleCurrencySelectedLeft(longCurrencyName) {
    const data = this.state.data;
    const rightCurrencyCode = data.get('rightCurrencyCode');
    const rightValue = data.get('rightValue');
    const selectedCode = this.toShortName(longCurrencyName);
    this.fetchRate(selectedCode, rightCurrencyCode).then((rate) => {
      this.store.dispatch(setCurrencySelected(selectedCode, rate));
      this.store.dispatch(setValues(this.round(rightValue / rate), rightValue));
      this.store.dispatch(setLeftCurrency(selectedCode));
    });
  }

  handleCurrencySelectedRight(longCurrencyName) {
    const data = this.state.data;
    const leftCurrencyCode = data.get('leftCurrencyCode');
    const leftValue = data.get('leftValue');
    const selectedCode = this.toShortName(longCurrencyName);
    this.fetchRate(leftCurrencyCode, selectedCode).then((rate) => {
      this.store.dispatch(setCurrencySelected(selectedCode, rate));
      this.store.dispatch(setValues(leftValue, this.round(leftValue * rate)));
      this.store.dispatch(setRightCurrency(selectedCode));
    });
  }

  handleOnChangeRight(newRightValue) {
    const newLeftValue = this.round(newRightValue / this.state.data.get('conversionRate'));
    this.store.dispatch(setValues(newLeftValue, newRightValue));
  }

  handleOnChangeLeft(newLeftValue) {
    const newRightValue = this.round(newLeftValue * this.state.data.get('conversionRate'));
    this.store.dispatch(setValues(newLeftValue, newRightValue));
  }

  round(value) {
    const num = typeof value === 'string' ? Number.parseFloat(value) : value;
    return Number.parseFloat(num.toFixed(2));
  };

  render() {
    const data = this.state.data;
    const currencies = data.get('currencies');
    const leftCurrencyCode = data.get('leftCurrencyCode');
    const leftValue = data.get('leftValue');
    const rightCurrencyCode = data.get('rightCurrencyCode');
    const rightValue = data.get('rightValue');
    const conversionRate = data.get('conversionRate');
    const leftCurrency = currencies.get(leftCurrencyCode);
    const rightCurrency = currencies.get(rightCurrencyCode);

    if (!leftCurrency || !rightCurrency) {
      return null;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={react_logo} className="libs-logo" alt="logo"/>
          <img src={logo} className="App-logo" alt="logo"/>
          <img src={redux_logo} className="libs-logo" alt="logo"/>
          <h2>Currency Converter</h2>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-auto my-col">
            <CurrencyConverter currency={leftCurrency}
                               value={leftValue}
                               handleOnChange={this.handleOnChangeLeft.bind(this)}
                               handleCurrencySelected={this.handleCurrencySelectedLeft.bind(this)}
                               currencies={currencies}
            />
          </div>
          <div className="col-sm-6 col-md-auto my-col">
            <CurrencyConverter currency={rightCurrency}
                               value={rightValue}
                               handleOnChange={this.handleOnChangeRight.bind(this)}
                               handleCurrencySelected={this.handleCurrencySelectedRight.bind(this)}
                               currencies={currencies}
            />
          </div>
        </div>
        <div className="row text-left">
          <div className="col-12 my-col-exchange-rate">
            <b>Exchange
              Rate </b> {`${leftCurrency.get('symbol')} 1 ${leftCurrency.get('code')} = ${rightCurrency.get('symbol')}
              ${conversionRate} ${rightCurrency.get('code')}`}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
