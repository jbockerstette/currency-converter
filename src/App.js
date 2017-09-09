import React from 'react';
import logo from '../src/images/cash-calculator.svg';
import './scss/App.css';
import SelectCurrency from "./components/SelectCurrency";
import CurrencyConverter from "./components/CurrencyConverter";
import {has} from 'lodash';


const currencies = {};
const longToShortName = {};
const shortToLongName = {};


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currenyNames: [],
      leftCurrencyCode: 'USD',
      rightCurrencyCode: 'USD',
      conversionRate: 1.00,
      leftValue: 1.00,
      rightValue: 1.00,
      selectedCurrencyCode: 'USD'
    }
  }

  componentWillMount() {
    this.fetchCountryData();
  }

  toShortName(longName) {
    return longToShortName[longName];
  }

  toLongName(shortName) {
    return shortToLongName[shortName];
  }

  addCurrency(currency) {
    if (currency && has(currencyCodes, currency.code)) {
      currencies[currency.code] = {};
      Object.assign(currencies[currency.code], currency, {flag: country.flag});
      longToShortName[currency.name] = currency.code;
      shortToLongName[currency.code] = currency.name;
    }
  }


  fetchCountryData() {
    let currencyCodes;
    fetch('http://api.fixer.io/latest')
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.rates)
      .then(rates => currencyCodes = rates)
      .then(() => fetch('https://restcountries.eu/rest/v2/all'))
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.forEach((country) => {
        const currency = country['currencies'][0];
        if (currency && has(currencyCodes, currency.code)) {
          currencies[currency.code] = {};
          Object.assign(currencies[currency.code], currency, {flag: country.flag});
          longToShortName[currency.name] = currency.code;
          shortToLongName[currency.code] = currency.name;
        }
      })).then(() => {
      this.setState({
        currenyNames: Object.keys(longToShortName)
      });
    })
      .catch(error => console.log('parsing failed', error));
  }

  fetchRate(fromCurrencyCode, toCurrencyCode) {
    const {leftValue} = this.state;

    // fetch('http://api.fixer.io/latest?base=USD&symbols=USD,EUR')
    fetch(`http://api.fixer.io/latest?base=${fromCurrencyCode}&symbols=${toCurrencyCode}`)
      .then(response => response.json())
      .then(parsedJSON => {
        let rate = 1;
        if (toCurrencyCode !== fromCurrencyCode && parsedJSON.rates) {
          rate = parsedJSON.rates[toCurrencyCode];
        }
        this.setState({
          rightValue: leftValue * rate,
          conversionRate: rate
        });
      }).catch(error => console.log('parsing failed', error));
  }

  handleCurrencySelected(longCurrencyName) {
    const {leftCurrencyCode} = this.state;
    const selectedCode = this.toShortName(longCurrencyName);
    this.fetchRate(leftCurrencyCode, selectedCode);
    this.setState({
      selectedCurrencyCode: selectedCode,
      rightCurrencyCode: selectedCode
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
    return num.toFixed(2);
  };

  render() {
    const {
      currenyNames, leftCurrencyCode, rightCurrencyCode, conversionRate, leftValue, rightValue
    } = this.state;

    const leftCurrency = currencies[leftCurrencyCode];
    const rightCurrency = currencies[rightCurrencyCode];

    console.log(leftCurrency);

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
        <SelectCurrency selectedCurrency={rightCurrency.name} currencies={currenyNames}
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
