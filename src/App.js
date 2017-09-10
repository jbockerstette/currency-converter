import React from 'react';
import logo from '../src/images/cash-calculator.svg';
import './scss/App.css';
import SelectCurrency from "./components/SelectCurrency";
import CurrencyConverter from "./components/CurrencyConverter";
import {has, values} from 'lodash';


let longToShortName = {'US Dollars': 'USD'};


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currencyNames: [],
      leftCurrencyCode: 'USD',
      rightCurrencyCode: 'USD',
      conversionRate: 1.00,
      leftValue: 1.00,
      rightValue: 1.00,
      selectedCurrencyCode: 'USD'
    };
    this.currencies = {};
  }

  componentWillMount() {
    this.fetchCurrencyRates().then((currencies) => {
      this.currencies = currencies;
      longToShortName = this.getNameMap(values(this.currencies), 'name', 'code');
      this.setState({
        currencyNames: Object.keys(longToShortName)
      });
    }).catch(error => console.log('parsing failed', error));
  }

  toShortName(longName) {
    if (has(longToShortName, longName)) {
      return longToShortName[longName];
    }
    return '???';
  }

  getNameMap(currencies, from, to) {
    return currencies.reduce((longNameToShortName, currency) =>
      Object.assign(longNameToShortName, {[currency[from]]: currency[to]}), {});
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
      })).then(() => currencyRates);
  }

  fetchCurrencies() {
    const currencies = [];
    return fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.forEach((country) => {
        const currency = country['currencies'][0];
        if (currency) {
          const nextCurrency = {};
          Object.assign(nextCurrency, currency, {flag: country.flag});
          currencies.push(nextCurrency);
        }
      })).then(() => currencies);
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

  handleCurrencySelected(longCurrencyName) {
    const {leftCurrencyCode, leftValue} = this.state;
    const selectedCode = this.toShortName(longCurrencyName);
    this.fetchRate(leftCurrencyCode, selectedCode).then((rate) => {
      this.setState({
        rightValue: this.round(leftValue * rate),
        conversionRate: rate,
        selectedCurrencyCode: selectedCode,
        rightCurrencyCode: selectedCode
      });
    });
  }

  handleOnChangeRight(newValue) {
    const newLeftValue = this.round(newValue / this.state.conversionRate);
    this.setState({
      leftValue: newLeftValue,
      rightValue: newValue
    });
  }

  handleOnChangeLeft(newValue) {
    const newRightValue = this.round(newValue * this.state.conversionRate);
    this.setState({
      leftValue: newValue,
      rightValue: newRightValue
    });
  }

  round(value) {
    const num = typeof value === 'string' ? Number.parseFloat(value) : value;
    return Number.parseFloat(num.toFixed(2));
  };

  render() {
    const {
      currencyNames, leftCurrencyCode, rightCurrencyCode, conversionRate, leftValue, rightValue
    } = this.state;

    const leftCurrency = this.currencies[leftCurrencyCode];
    const rightCurrency = this.currencies[rightCurrencyCode];

    if (!leftCurrency || !rightCurrency) {
      return null;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Currency Converter</h2>
        </div>
        <div className="row justify-content-center">
          <h3 className="my-card-title">Select Currency</h3>
        </div>
        <SelectCurrency selectedCurrency={rightCurrency.name} currencies={currencyNames}
                        handleCurrencySelected={this.handleCurrencySelected.bind(this)}/>
        <div className="row">
          <div className="col-sm-6 col-md-auto my-col">
            <CurrencyConverter currency={leftCurrency} value={leftValue}
                               handleOnChange={this.handleOnChangeLeft.bind(this)}/>
          </div>
          <div className="col-sm-6 col-md-auto my-col">
            <CurrencyConverter currency={rightCurrency} value={rightValue}
                               handleOnChange={this.handleOnChangeRight.bind(this)}/>
          </div>
        </div>
        <div className="row text-left">
          <div className="col-12 my-col-exchange-rate">
            <b>Exchange
              Rate </b> {`${leftCurrency.symbol} 1 ${leftCurrency.code} = ${rightCurrency.symbol}
              ${conversionRate} ${rightCurrency.code}`}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
